
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
