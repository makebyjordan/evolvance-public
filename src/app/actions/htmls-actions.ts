
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

// Main Html Type
export interface Html {
  id: string;
  title: string;
  section: string;
  htmlText: string;
  owner: 'sandra' | 'julian' | 'jordan';
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
/**
 * Saves a new html or updates an existing one.
 */
export async function saveHtml(data: HtmlInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('html', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('html', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    revalidatePath('/dashboard/jordan');
    revalidatePath('/dashboard/sandra');
    revalidatePath('/dashboard/julian');
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
    await deleteDocument('html', id);
    revalidatePath('/dashboard/jordan');
    revalidatePath('/dashboard/sandra');
    revalidatePath('/dashboard/julian');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting html:', error);
    return { success: false, error: 'No se pudo eliminar el HTML. ' + error.message };
  }
}

/**
 * Gets all htmls.
 */
export async function getHtmls(): Promise<Html[]> {
  try {
    return await getCollection<Html>('html');
  } catch (error: any) {
    console.error('Error getting htmls:', error);
    return [];
  }
}
