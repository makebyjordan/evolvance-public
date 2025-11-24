
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

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

/**
 * Saves a new protocol or updates an existing one.
 */
export async function saveProtocol(data: ProtocolInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('protocol', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('protocol', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
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
    await deleteDocument('protocol', id);
    revalidatePath('/dashboard/protocolos');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting protocol:', error);
    return { success: false, error: 'No se pudo eliminar el protocolo. ' + error.message };
  }
}

/**
 * Gets all protocols.
 */
export async function getProtocols(): Promise<Protocol[]> {
  try {
    return await getCollection<Protocol>('protocol');
  } catch (error: any) {
    console.error('Error getting protocols:', error);
    return [];
  }
}
