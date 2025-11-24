
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

// Main Objective Types
export interface ObjectiveTask {
  text: string;
  completed: boolean;
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  notes: string;
  tasks: ObjectiveTask[];
  owner: 'sandra' | 'julian' | 'jordan';
  createdAt: any;
  updatedAt: any;
}

export type ObjectiveInput = Omit<Objective, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Saves a new objective or updates an existing one.
 */
export async function saveObjective(data: ObjectiveInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('objective', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('objective', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    revalidatePath(`/dashboard/${data.owner}`);
    return { success: true, data: docId };

  } catch (error: any)
    {
    console.error('Error saving objective:', error);
    return { success: false, error: 'El objetivo no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes an objective by its ID.
 */
export async function deleteObjective(id: string, owner: string): Promise<ActionResult<null>> {
  try {
    await deleteDocument('objective', id);
    revalidatePath(`/dashboard/${owner}`);
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting objective:', error);
    return { success: false, error: 'No se pudo eliminar el objetivo. ' + error.message };
  }
}

/**
 * Gets all objectives.
 */
export async function getObjectives(): Promise<Objective[]> {
  try {
    return await getCollection<Objective>('objective');
  } catch (error: any) {
    console.error('Error getting objectives:', error);
    return [];
  }
}
