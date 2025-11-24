
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

// Main Contract Type
export interface Contract {
  id: string;
  title: string;
  section: string;
  htmlText: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating a contract
export type ContractInput = Omit<Contract, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Saves a new contract or updates an existing one.
 */
export async function saveContract(data: ContractInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('contract', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('contract', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    revalidatePath('/dashboard/contracts');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving contract:', error);
    return { success: false, error: 'El Contrato no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a contract by its ID.
 */
export async function deleteContract(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDocument('contract', id);
    revalidatePath('/dashboard/contracts');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting contract:', error);
    return { success: false, error: 'No se pudo eliminar el Contrato. ' + error.message };
  }
}

/**
 * Gets all contracts.
 */
export async function getContracts(): Promise<Contract[]> {
  try {
    return await getCollection<Contract>('contract');
  } catch (error: any) {
    console.error('Error getting contracts:', error);
    return [];
  }
}
