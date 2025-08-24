
'use server';

import { db, isFirebaseAdminInitialized } from '@/lib/firebase-admin';

// Main Client Type
export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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

// Collection reference
const clientsCollection = db?.collection('clients');

/**
 * Saves a new client or updates an existing one.
 */
export async function saveClient(data: ClientInput): Promise<ActionResult<string>> {
  if (!isFirebaseAdminInitialized() || !clientsCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    const now = new Date();
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = clientsCollection.doc(docId);
      await docRef.update({
        ...data,
        updatedAt: now,
      });
    } else {
      // Create
      const docRef = clientsCollection.doc();
      await docRef.set({
        ...data,
        createdAt: now,
        updatedAt: now,
      });
      docId = docRef.id;
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
  if (!isFirebaseAdminInitialized() || !clientsCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    await clientsCollection.doc(id).delete();
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting client:', error);
    return { success: false, error: 'No se pudo eliminar el cliente. ' + error.message };
  }
}
