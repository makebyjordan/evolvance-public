
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// Main Video Type
export interface StoredVideo {
  id: string;
  title: string;
  url: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating
export type VideoInput = Omit<StoredVideo, 'id' | 'createdAt' | 'updatedAt'> & { id?: string };


// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const videosCollectionRef = collection(db, 'videos');

/**
 * Saves a new video or updates an existing one.
 */
export async function saveVideo(data: VideoInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'videos', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(videosCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/videos');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving video:', error);
    return { success: false, error: 'El video no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a video by its ID.
 */
export async function deleteVideo(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDoc(doc(db, 'videos', id));
    revalidatePath('/dashboard/videos');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting video:', error);
    return { success: false, error: 'No se pudo eliminar el video. ' + error.message };
  }
}
