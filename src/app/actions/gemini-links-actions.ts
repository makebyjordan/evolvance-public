
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

// Main GeminiLink Type
export interface GeminiLink {
  id: string;
  title: string;
  url: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating a link
export type GeminiLinkInput = Omit<GeminiLink, 'id' | 'createdAt' | 'updatedAt'> & {
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
 * Saves a new link or updates an existing one.
 */
export async function saveGeminiLink(data: GeminiLinkInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('geminiLink', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('geminiLink', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    revalidatePath('/dashboard/gemini');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving link:', error);
    return { success: false, error: 'El enlace no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a link by its ID.
 */
export async function deleteGeminiLink(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDocument('geminiLink', id);
    revalidatePath('/dashboard/gemini');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting link:', error);
    return { success: false, error: 'No se pudo eliminar el enlace. ' + error.message };
  }
}

/**
 * Gets all geminilinks.
 */
export async function getGeminiLinks(): Promise<GeminiLink[]> {
  try {
    return await getCollection<GeminiLink>('geminiLink');
  } catch (error: any) {
    console.error('Error getting geminilinks:', error);
    return [];
  }
}
