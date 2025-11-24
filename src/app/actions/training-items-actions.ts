
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

// Main TrainingItem Type
export interface TrainingItem {
  id: string;
  title: string;
  description: string;
  url: string;
  subsectionId: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating
export type TrainingItemInput = Omit<TrainingItem, 'id' | 'createdAt' | 'updatedAt'> & {
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
 * Saves a new training item or updates an existing one.
 */
export async function saveTrainingItem(data: TrainingItemInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('trainingItem', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('trainingItem', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    revalidatePath('/dashboard/training');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving training item:', error);
    return { success: false, error: 'La formación no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a training item by its ID.
 */
export async function deleteTrainingItem(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDocument('trainingItem', id);
    revalidatePath('/dashboard/training');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting training item:', error);
    return { success: false, error: 'No se pudo eliminar la formación. ' + error.message };
  }
}

/**
 * Gets all trainingitems.
 */
export async function getTrainingItems(): Promise<TrainingItem[]> {
  try {
    return await getCollection<TrainingItem>('trainingItem');
  } catch (error: any) {
    console.error('Error getting trainingitems:', error);
    return [];
  }
}
