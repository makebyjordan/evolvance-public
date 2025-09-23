
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// Main Protocol Types
export interface ProtocolStep {
  title: string;
  description: string;
}

export interface Protocol {
  id: string;
  title: string;
  steps: ProtocolStep[];
  createdAt: any;
  updatedAt: any;
}

export type ProtocolInput = Omit<Protocol, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const protocolsCollectionRef = collection(db, 'protocols');

/**
 * Saves a new protocol or updates an existing one.
 */
export async function saveProtocol(data: ProtocolInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'protocols', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(protocolsCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/protocolos');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving protocol:', error);
    return { success: false, error: 'El protocolo no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a protocol by its ID.
 */
export async function deleteProtocol(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDoc(doc(db, 'protocols', id));
    revalidatePath('/dashboard/protocolos');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting protocol:', error);
    return { success: false, error: 'No se pudo eliminar el protocolo. ' + error.message };
  }
}
