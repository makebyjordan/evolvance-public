
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp, getCollection } from '@/lib/firebase-adapter';

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
/**
 * Saves a new image or updates an existing one.
 */
export async function saveImage(data: ImageInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('image', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('image', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
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
    await deleteDocument('image', id);
    revalidatePath('/dashboard/imagenes');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return { success: false, error: 'No se pudo eliminar la imagen. ' + error.message };
  }
}

/**
 * Gets all images.
 */
export async function getImages(): Promise<StoredImage[]> {
  try {
    return await getCollection<StoredImage>('image');
  } catch (error: any) {
    console.error('Error getting images:', error);
    return [];
  }
}
