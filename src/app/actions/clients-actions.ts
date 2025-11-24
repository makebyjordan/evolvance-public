
'use server';

import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp, getCollection } from '@/lib/firebase-adapter';

// Main Client Type
export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  description: string;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

// Type for creating/updating a client
export type ClientInput = Omit<Client, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Saves a new client or updates an existing one.
 */
export async function saveClient(data: ClientInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('client', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('client', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving client:', error);
    return { success: false, error: 'El cliente no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a client by its ID.
 */
export async function deleteClient(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDocument('client', id);
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting client:', error);
    return { success: false, error: 'No se pudo eliminar el cliente. ' + error.message };
  }
}

/**
 * Gets all clients.
 */
export async function getClients(): Promise<Client[]> {
  try {
    return await getCollection<Client>('client');
  } catch (error: any) {
    console.error('Error getting clients:', error);
    return [];
  }
}
