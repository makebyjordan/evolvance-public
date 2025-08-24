
'use server';

import { db, isFirebaseAdminInitialized } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';

// Main Proposal Type
export interface Proposal {
  id: string;
  title: string;
  code: string;
  htmlText: string;
  createdAt: string;
  updatedAt: string;
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
const proposalsCollection = db?.collection('proposals');

/**
 * Saves a new proposal or updates an existing one.
 */
export async function saveProposal(data: ProposalInput): Promise<ActionResult<string>> {
  if (!isFirebaseAdminInitialized() || !proposalsCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    const now = new Date();
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = proposalsCollection.doc(docId);
      await docRef.update({
        ...data,
        updatedAt: now,
      });
    } else {
      // Create
      const docRef = proposalsCollection.doc();
      docId = docRef.id;
      await docRef.set({
        ...data,
        createdAt: now,
        updatedAt: now,
      });
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
  if (!isFirebaseAdminInitialized() || !proposalsCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    await proposalsCollection.doc(id).delete();
    revalidatePath('/dashboard/proposals');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting proposal:', error);
    return { success: false, error: 'No se pudo eliminar la propuesta. ' + error.message };
  }
}
