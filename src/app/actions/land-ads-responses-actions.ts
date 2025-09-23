
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export interface LandAdResponse {
  id?: string;
  landAdId: string;
  responses: { question: string; answer: string }[];
  createdAt: any;
}

type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const responsesCollectionRef = collection(db, 'landAdResponses');

export async function saveLandAdResponse(
  landAdId: string, 
  responses: { question: string; answer: string }[]
): Promise<ActionResult<string>> {
  try {
    const docRef = await addDoc(responsesCollectionRef, {
      landAdId,
      responses,
      createdAt: serverTimestamp(),
    });
    return { success: true, data: docRef.id };
  } catch (error: any) {
    console.error('Error saving LandAd response:', error);
    return { success: false, error: 'Las respuestas no se pudieron guardar. ' + error.message };
  }
}

/**
 * Deletes a LandAd response by its ID.
 */
export async function deleteLandAdResponse(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDoc(doc(db, 'landAdResponses', id));
    revalidatePath('/dashboard/land-ads-responses');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting LandAd response:', error);
    return { success: false, error: 'No se pudo eliminar la respuesta. ' + error.message };
  }
}
