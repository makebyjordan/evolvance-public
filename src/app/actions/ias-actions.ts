
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// Main IA Type
export interface AIModel {
  id: string;
  title: string;
  description: string;
  url: string;
  profile: string;
  price: number;
  paymentDay: number;
  type: string;
  featured: boolean;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating
export type AIModelInput = Omit<AIModel, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const iasCollectionRef = collection(db, 'ias');

/**
 * Saves a new IA model or updates an existing one.
 */
export async function saveAIModel(data: AIModelInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'ias', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(iasCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/ias');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving IA model:', error);
    return { success: false, error: 'La IA no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes an IA model by its ID.
 */
export async function deleteAIModel(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDoc(doc(db, 'ias', id));
    revalidatePath('/dashboard/ias');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting IA model:', error);
    return { success: false, error: 'No se pudo eliminar la IA. ' + error.message };
  }
}
