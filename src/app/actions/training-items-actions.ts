
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

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
const trainingItemsCollectionRef = collection(db, 'trainingItems');

/**
 * Saves a new training item or updates an existing one.
 */
export async function saveTrainingItem(data: TrainingItemInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'trainingItems', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(trainingItemsCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
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
    await deleteDoc(doc(db, 'trainingItems', id));
    revalidatePath('/dashboard/training');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting training item:', error);
    return { success: false, error: 'No se pudo eliminar la formación. ' + error.message };
  }
}
