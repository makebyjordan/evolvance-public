
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

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

// Collection reference
const contractsCollectionRef = collection(db, 'contracts');

/**
 * Saves a new contract or updates an existing one.
 */
export async function saveContract(data: ContractInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'contracts', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(contractsCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
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
    await deleteDoc(doc(db, 'contracts', id));
    revalidatePath('/dashboard/contracts');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting contract:', error);
    return { success: false, error: 'No se pudo eliminar el Contrato. ' + error.message };
  }
}
