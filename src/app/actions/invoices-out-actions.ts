
'use server';

import { db, isFirebaseAdminInitialized } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Main InvoiceOut Type
export interface InvoiceOut {
  id: string;
  companyName: string;
  phone: string;
  address: string;
  email: string;
  location: string;
  total: number;
  vatType: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Type for creating/updating
export type InvoiceOutInput = Omit<InvoiceOut, 'id' | 'createdAt' | 'updatedAt' | 'fileUrl'> & { id?: string };


// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const invoicesOutCollection = db?.collection('invoicesOut');

/**
 * Saves a new invoice or updates an existing one.
 */
export async function saveInvoiceOut(data: InvoiceOutInput): Promise<ActionResult<string>> {
  if (!isFirebaseAdminInitialized() || !invoicesOutCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    const now = new Date();
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = invoicesOutCollection.doc(docId);
      await docRef.update({
        ...data,
        updatedAt: now,
      });
    } else {
      // Create
      const docRef = invoicesOutCollection.doc();
      await docRef.set({
        ...data,
        createdAt: now,
        updatedAt: now,
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/invoices-out');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving invoice:', error);
    return { success: false, error: 'La factura no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes an invoice by its ID.
 */
export async function deleteInvoiceOut(id: string): Promise<ActionResult<null>> {
  if (!isFirebaseAdminInitialized() || !invoicesOutCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    await invoicesOutCollection.doc(id).delete();
    revalidatePath('/dashboard/invoices-out');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting invoice:', error);
    return { success: false, error: 'No se pudo eliminar la factura. ' + error.message };
  }
}
