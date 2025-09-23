
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// Main Image Type
export interface StoredImage {
  id: string;
  title: string;
  url: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating
export type ImageInput = Omit<StoredImage, 'id' | 'createdAt' | 'updatedAt'> & { id?: string };


// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const imagesCollectionRef = collection(db, 'images');

/**
 * Saves a new image or updates an existing one.
 */
export async function saveImage(data: ImageInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'images', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(imagesCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/imagenes');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving image:', error);
    return { success: false, error: 'La imagen no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes an image by its ID.
 */
export async function deleteImage(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDoc(doc(db, 'images', id));
    revalidatePath('/dashboard/imagenes');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return { success: false, error: 'No se pudo eliminar la imagen. ' + error.message };
  }
}
