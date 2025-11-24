
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

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
/**
 * Saves a new video or updates an existing one.
 */
export async function saveVideo(data: VideoInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('video', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('video', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
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
    await deleteDocument('video', id);
    revalidatePath('/dashboard/videos');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting video:', error);
    return { success: false, error: 'No se pudo eliminar el video. ' + error.message };
  }
}

/**
 * Gets all videos.
 */
export async function getVideos(): Promise<Video[]> {
  try {
    return await getCollection<Video>('video');
  } catch (error: any) {
    console.error('Error getting videos:', error);
    return [];
  }
}
