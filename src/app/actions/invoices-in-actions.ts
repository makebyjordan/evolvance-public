
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

// Main InvoiceIn Type
export interface InvoiceIn {
  id: string;
  companyName: string;
  cif: string;
  phone: string;
  address: string;
  email: string;
  location: string;
  total: number;
  vatType: number;
  description: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating
export type InvoiceInInput = Omit<InvoiceIn, 'id' | 'createdAt' | 'updatedAt'> & { id?: string };


// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
/**
 * Saves a new invoice or updates an existing one.
 */
export async function saveInvoiceIn(data: InvoiceInInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('invoiceIn', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('invoiceIn', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
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
  try {
    await deleteDocument('invoiceIn', id);
    revalidatePath('/dashboard/invoices-in');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting invoice:', error);
    return { success: false, error: 'No se pudo eliminar la factura. ' + error.message };
  }
}

/**
 * Gets all invoicesin.
 */
export async function getInvoicesIn(): Promise<InvoiceIn[]> {
  try {
    return await getCollection<InvoiceIn>('invoiceIn');
  } catch (error: any) {
    console.error('Error getting invoicesin:', error);
    return [];
  }
}
