
'use server';

import { revalidatePath } from 'next/cache';
import { getDocument, updateDocument, createDocument, deleteDocument, generateFirebaseId, serverTimestamp, getCollection, queryCollection, firebaseTimestampToDate } from '@/lib/firebase-adapter';

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

export async function saveLandAdResponse(
  landAdId: string, 
  responses: { question: string; answer: string }[]
): Promise<ActionResult<string>> {
  try {
    const docId = generateFirebaseId();
    await createDocument('landAdResponse', docId, {
      landAdId,
      responses,
      createdAt: serverTimestamp(),
    });
    return { success: true, data: docId };
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
    await deleteDocument('landAdResponse', id);
    revalidatePath('/dashboard/land-ads-responses');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting LandAd response:', error);
    return { success: false, error: 'No se pudo eliminar la respuesta. ' + error.message };
  }
}

/**
 * Gets all landadresponses.
 */
export async function getLandAdResponses(): Promise<LandAdResponse[]> {
  try {
    return await getCollection<LandAdResponse>('landAdResponse');
  } catch (error: any) {
    console.error('Error getting landadresponses:', error);
    return [];
  }
}
