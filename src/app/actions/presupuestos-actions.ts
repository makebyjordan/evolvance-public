'use server';

import { revalidatePath } from 'next/cache';
import { getDocument, updateDocument, createDocument, deleteDocument, generateFirebaseId, serverTimestamp, getCollection, queryCollection, firebaseTimestampToDate } from '@/lib/firebase-adapter';

// Main Presupuesto Types
export interface PresupuestoItem {
  description: string;
  price: number;
}

export interface Presupuesto {
  id: string;
  presupuestoNumber: string;
  clientName: string;
  clientInfo: string;
  date: any; // Firestore Timestamp
  status: 'Borrador' | 'Enviado' | 'Aceptado' | 'Rechazado';
  items: PresupuestoItem[];
  total: number;
  notes: string;
  createdAt: any;
  updatedAt: any;
}

export type PresupuestoInput = Omit<Presupuesto, 'id' | 'createdAt' | 'updatedAt' | 'total'> & {
  id?: string;
};

// Return type for server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Saves a new presupuesto or updates an existing one.
 */
export async function savePresupuesto(data: PresupuestoInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    const total = data.items.reduce((sum, item) => sum + item.price, 0);
    const presupuestoData = {
      ...data,
      total,
      date: new Date(data.date), // Ensure date is a JS Date object
    };
    
    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('presupuesto', docId, {
        ...presupuestoData,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('presupuesto', docId, {
        ...presupuestoData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    revalidatePath('/dashboard/presupuestos');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving presupuesto:', error);
    return { success: false, error: 'El presupuesto no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a presupuesto by its ID.
 */
export async function deletePresupuesto(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDocument('presupuesto', id);
    revalidatePath('/dashboard/presupuestos');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting presupuesto:', error);
    return { success: false, error: 'No se pudo eliminar el presupuesto. ' + error.message };
  }
}

/**
 * Creates a factura from a presupuesto.
 */
export async function createFacturaFromPresupuesto(
  presupuestoId: string,
  percentage: number
): Promise<ActionResult<string>> {
  try {
    const presupuestoRef = doc(db, 'presupuestos', presupuestoId);
    const presupuestoSnap = await getDoc(presupuestoRef);

    if (!presupuestoSnap.exists()) {
      return { success: false, error: 'El presupuesto no existe.' };
    }

    const presupuesto = presupuestoSnap.data() as Omit<Presupuesto, 'id'>;

    const facturaTotal = presupuesto.total * (percentage / 100);

    const batch = writeBatch(db);

    const facturaRef = doc(collection(db, 'facturas'));
    
    batch.set(facturaRef, {
      facturaNumber: `FACT-${Date.now()}`,
      presupuestoId: presupuestoId,
      clientName: presupuesto.clientName,
      clientInfo: presupuesto.clientInfo,
      date: serverTimestamp(),
      dueDate: serverTimestamp(),
      status: 'Pendiente',
      items: [
        {
          description: `Factura del ${percentage}% sobre el presupuesto ${presupuesto.presupuestoNumber}: ${presupuesto.items.map(i => i.description).join(', ')}`,
          price: facturaTotal,
        }
      ],
      total: facturaTotal,
      notes: `Factura generada desde el presupuesto ${presupuesto.presupuestoNumber}.`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    await batch.commit();
    
    revalidatePath('/dashboard/facturas');
    revalidatePath('/dashboard/presupuestos');

    return { success: true, data: facturaRef.id };

  } catch (error: any) {
    console.error('Error creating factura:', error);
    return { success: false, error: 'No se pudo crear la factura. ' + error.message };
  }
}

/**
 * Gets all presupuestos.
 */
export async function getPresupuestos(): Promise<Presupuesto[]> {
  try {
    return await getCollection<Presupuesto>('presupuesto');
  } catch (error: any) {
    console.error('Error getting presupuestos:', error);
    return [];
  }
}
