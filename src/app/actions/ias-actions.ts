
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

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
  featured: string;
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
/**
 * Saves a new IA model or updates an existing one.
 */
export async function saveAIModel(data: AIModelInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('ia', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('ia', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
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
    await deleteDocument('ia', id);
    revalidatePath('/dashboard/ias');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting IA model:', error);
    return { success: false, error: 'No se pudo eliminar la IA. ' + error.message };
  }
}

/**
 * Gets all ias.
 */
export async function getIas(): Promise<Ia[]> {
  try {
    return await getCollection<Ia>('ia');
  } catch (error: any) {
    console.error('Error getting ias:', error);
    return [];
  }
}
