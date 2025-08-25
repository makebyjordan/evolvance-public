
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

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
const invoicesInCollectionRef = collection(db, 'invoicesIn');

/**
 * Saves a new invoice or updates an existing one.
 */
export async function saveInvoiceIn(data: InvoiceInInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'invoicesIn', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(invoicesInCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
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
  try {
    await deleteDoc(doc(db, 'invoicesIn', id));
    revalidatePath('/dashboard/invoices-in');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting invoice:', error);
    return { success: false, error: 'No se pudo eliminar la factura. ' + error.message };
  }
}
