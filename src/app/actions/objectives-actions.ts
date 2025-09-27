
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

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

const objectivesCollectionRef = collection(db, 'objectives');

/**
 * Saves a new objective or updates an existing one.
 */
export async function saveObjective(data: ObjectiveInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'objectives', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(objectivesCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
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
    await deleteDoc(doc(db, 'objectives', id));
    revalidatePath(`/dashboard/${owner}`);
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting objective:', error);
    return { success: false, error: 'No se pudo eliminar el objetivo. ' + error.message };
  }
}
