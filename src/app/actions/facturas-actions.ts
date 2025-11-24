'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

// Main Factura Types
export interface FacturaItem {
  description: string;
  price: number;
}

export interface Factura {
  id: string;
  facturaNumber: string;
  presupuestoId?: string;
  clientName: string;
  clientInfo: string;
  date: any; // Firestore Timestamp
  dueDate: any; // Firestore Timestamp
  status: 'Borrador' | 'Enviada' | 'Pagada' | 'Vencida' | 'Cancelada';
  items: FacturaItem[];
  total: number;
  notes: string;
  createdAt: any;
  updatedAt: any;
}

export type FacturaInput = Omit<Factura, 'id' | 'createdAt' | 'updatedAt' | 'total'> & {
  id?: string;
};

// Return type for server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Saves a new factura or updates an existing one.
 */
export async function saveFactura(data: FacturaInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    const total = data.items.reduce((sum, item) => sum + item.price, 0);
    const facturaData = {
      ...data,
      total,
      date: new Date(data.date),
      dueDate: new Date(data.dueDate),
    };

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('factura', docId, {
        ...facturaData,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('factura', docId, {
        ...facturaData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    revalidatePath('/dashboard/facturas');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving factura:', error);
    return { success: false, error: 'La factura no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a factura by its ID.
 */
export async function deleteFactura(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDocument('factura', id);
    revalidatePath('/dashboard/facturas');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting factura:', error);
    return { success: false, error: 'No se pudo eliminar la factura. ' + error.message };
  }
}

/**
 * Gets all facturas.
 */
export async function getFacturas(): Promise<Factura[]> {
  try {
    return await getCollection<Factura>('factura');
  } catch (error: any) {
    console.error('Error getting facturas:', error);
    return [];
  }
}
