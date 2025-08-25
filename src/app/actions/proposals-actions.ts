
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// Main Proposal Type
export interface Proposal {
  id: string;
  title: string;
  code: string;
  htmlText: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating a proposal
export type ProposalInput = Omit<Proposal, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const proposalsCollectionRef = collection(db, 'proposals');

/**
 * Saves a new proposal or updates an existing one.
 */
export async function saveProposal(data: ProposalInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'proposals', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(proposalsCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/proposals');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving proposal:', error);
    return { success: false, error: 'La propuesta no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a proposal by its ID.
 */
export async function deleteProposal(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDoc(doc(db, 'proposals', id));
    revalidatePath('/dashboard/proposals');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting proposal:', error);
    return { success: false, error: 'No se pudo eliminar la propuesta. ' + error.message };
  }
}
