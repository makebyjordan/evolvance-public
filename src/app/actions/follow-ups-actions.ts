
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// Main FollowUp Type
export interface FollowUp {
  id: string;
  clientId: string;
  clientName: string; // Denormalized for easier display
  date: any; // Firestore Timestamp for the follow-up date
  type: 'Llamada' | 'Email' | 'Reunión';
  outcome: 'Pendiente' | 'Contactado' | 'No contesta' | 'Rechazado' | 'Positivo';
  notes: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating a follow-up
export type FollowUpInput = Omit<FollowUp, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const followUpsCollectionRef = collection(db, 'followUps');

/**
 * Saves a new follow-up or updates an existing one.
 */
export async function saveFollowUp(data: FollowUpInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    const followUpData = {
      ...data,
      date: new Date(data.date), // Ensure date is a JS Date object before saving
    };

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'followUps', docId);
      await updateDoc(docRef, {
        ...followUpData,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(followUpsCollectionRef, {
        ...followUpData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/follow-ups');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving follow-up:', error);
    return { success: false, error: 'El seguimiento no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a follow-up by its ID.
 */
export async function deleteFollowUp(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDoc(doc(db, 'followUps', id));
    revalidatePath('/dashboard/follow-ups');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting follow-up:', error);
    return { success: false, error: 'No se pudo eliminar el seguimiento. ' + error.message };
  }
}
