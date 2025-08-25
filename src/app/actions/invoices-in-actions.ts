
'use server';

import { db, isFirebaseAdminInitialized } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Main InvoiceIn Type
export interface InvoiceIn {
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
export type InvoiceInInput = Omit<InvoiceIn, 'id' | 'createdAt' | 'updatedAt' | 'fileUrl'> & { id?: string };


// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const invoicesInCollection = db?.collection('invoicesIn');

/**
 * Saves a new invoice or updates an existing one.
 */
export async function saveInvoiceIn(data: InvoiceInInput): Promise<ActionResult<string>> {
  if (!isFirebaseAdminInitialized() || !invoicesInCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    const now = new Date();
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      const docRef = invoicesInCollection.doc(docId);
      await docRef.update({
        ...data,
        updatedAt: now,
      });
    } else {
      // Create
      const docRef = invoicesInCollection.doc();
      await docRef.set({
        ...data,
        createdAt: now,
        updatedAt: now,
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/invoices-in');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving invoice:', error);
    return { success: false, error: 'La factura no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes an invoice by its ID.
 */
export async function deleteInvoiceIn(id: string): Promise<ActionResult<null>> {
  if (!isFirebaseAdminInitialized() || !invoicesInCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    await invoicesInCollection.doc(id).delete();
    revalidatePath('/dashboard/invoices-in');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting invoice:', error);
    return { success: false, error: 'No se pudo eliminar la factura. ' + error.message };
  }
}
