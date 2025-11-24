
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp } from '@/lib/firebase-adapter';

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
/**
 * Saves a new subsection or updates an existing one.
 */
export async function saveTrainingSubsection(data: TrainingSubsectionInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('training', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('training', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
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
    await deleteDocument('training', id);
    revalidatePath('/dashboard/training');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting training subsection:', error);
    return { success: false, error: 'No se pudo eliminar la subsección. ' + error.message };
  }
}
