
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

// Main Proposal Type (For HTML Proposals)
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
/**
 * Saves a new proposal or updates an existing one.
 */
export async function saveProposal(data: ProposalInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('proposal', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('proposal', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
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
  try {
    await deleteDocument('proposal', id);
    revalidatePath('/dashboard/proposals');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting proposal:', error);
    return { success: false, error: 'No se pudo eliminar la propuesta. ' + error.message };
  }
}

/**
 * Gets all proposals.
 */
export async function getProposals(): Promise<Proposal[]> {
  try {
    return await getCollection<Proposal>('proposal');
  } catch (error: any) {
    console.error('Error getting proposals:', error);
    return [];
  }
}
