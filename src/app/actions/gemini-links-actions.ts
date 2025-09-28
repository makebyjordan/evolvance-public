
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

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
const geminiLinksCollectionRef = collection(db, 'geminiLinks');

/**
 * Saves a new link or updates an existing one.
 */
export async function saveGeminiLink(data: GeminiLinkInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'geminiLinks', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(geminiLinksCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
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
    await deleteDoc(doc(db, 'geminiLinks', id));
    revalidatePath('/dashboard/gemini');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting link:', error);
    return { success: false, error: 'No se pudo eliminar el enlace. ' + error.message };
  }
}
