
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// Main TrainingSubsection Type
export interface TrainingSubsection {
  id: string;
  title: string;
  description: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating
export type TrainingSubsectionInput = Omit<TrainingSubsection, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const trainingSubsectionsCollectionRef = collection(db, 'trainingSubsections');

/**
 * Saves a new subsection or updates an existing one.
 */
export async function saveTrainingSubsection(data: TrainingSubsectionInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'trainingSubsections', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(trainingSubsectionsCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/training');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving training subsection:', error);
    return { success: false, error: 'La subsección no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a subsection by its ID.
 */
export async function deleteTrainingSubsection(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDoc(doc(db, 'trainingSubsections', id));
    revalidatePath('/dashboard/training');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting training subsection:', error);
    return { success: false, error: 'No se pudo eliminar la subsección. ' + error.message };
  }
}
