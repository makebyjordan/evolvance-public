
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// Main Html Type
export interface Html {
  id: string;
  title: string;
  section: string;
  htmlText: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating a html
export type HtmlInput = Omit<Html, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const htmlsCollectionRef = collection(db, 'htmls');

/**
 * Saves a new html or updates an existing one.
 */
export async function saveHtml(data: HtmlInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'htmls', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(htmlsCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/jordan');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving html:', error);
    return { success: false, error: 'El HTML no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a html by its ID.
 */
export async function deleteHtml(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDoc(doc(db, 'htmls', id));
    revalidatePath('/dashboard/jordan');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting html:', error);
    return { success: false, error: 'No se pudo eliminar el HTML. ' + error.message };
  }
}
