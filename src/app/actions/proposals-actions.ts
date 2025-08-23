
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

type ProposalsActionResult = {
  success: boolean;
  proposals?: Proposal[];
  error?: string;
};

// Collection reference
const proposalsCollection = db.collection('proposals');

/**
 * Gets a list of all proposals, ordered by creation date.
 */
export async function getProposalsList(): Promise<{ proposals: Proposal[], error: string | null }> {
  if (!isFirebaseAdminInitialized()) {
    return { proposals: [], error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }
  
  try {
    const snapshot = await proposalsCollection.orderBy('createdAt', 'desc').get();
    if (snapshot.empty) {
      return { proposals: [], error: null };
    }
    const proposals: Proposal[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        code: data.code,
        htmlText: data.htmlText,
        createdAt: new Date(data.createdAt.seconds * 1000).toISOString(),
        updatedAt: new Date(data.updatedAt.seconds * 1000).toISOString(),
      };
    });
    return { proposals, error: null };
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return { proposals: [], error: 'No se pudieron cargar las propuestas.' };
  }
}

/**
 * Saves a new proposal or updates an existing one.
 */
export async function saveProposal(data: ProposalInput): Promise<ProposalsActionResult> {
  if (!isFirebaseAdminInitialized()) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    const now = new Date();
    if (data.id) {
      // Update
      const docRef = proposalsCollection.doc(data.id);
      await docRef.update({
        ...data,
        updatedAt: now,
      });
    } else {
      // Create
      const docRef = proposalsCollection.doc();
      await docRef.set({
        ...data,
        createdAt: now,
        updatedAt: now,
      });
    }
    
    revalidatePath('/dashboard/proposals');
    const { proposals, error } = await getProposalsList();
    if(error) {
        return { success: false, error };
    }
    return { success: true, proposals };

  } catch (error: any) {
    console.error('Error saving proposal:', error);
    return { success: false, error: 'La propuesta no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a proposal by its ID.
 */
export async function deleteProposal(id: string): Promise<ActionResult<null>> {
  if (!isFirebaseAdminInitialized()) {
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
