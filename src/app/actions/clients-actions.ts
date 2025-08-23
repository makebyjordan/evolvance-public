
'use server';

import { db, isFirebaseAdminInitialized } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';

// Main Client Type
export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  source: string;
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

/**
 * Gets a list of all clients, ordered by creation date.
 * This function is kept for potential server-side rendering needs but is not used by the real-time client page.
 */
export async function getClientsList(): Promise<{ clients: Client[], error: string | null }> {
  if (!isFirebaseAdminInitialized() || !clientsCollection) {
    return { clients: [], error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }
  
  try {
    const snapshot = await clientsCollection.orderBy('createdAt', 'desc').get();
    if (snapshot.empty) {
      return { clients: [], error: null };
    }
    const clients: Client[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        description: data.description,
        source: data.source,
        createdAt: new Date(data.createdAt.seconds * 1000).toISOString(),
        updatedAt: new Date(data.updatedAt.seconds * 1000).toISOString(),
      };
    });
    return { clients, error: null };
  } catch (error) {
    console.error('Error fetching clients:', error);
    return { clients: [], error: 'No se pudieron cargar los clientes.' };
  }
}

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
    
    // No longer need to revalidate path, client will update in real-time
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
    // No longer need to revalidate path, client will update in real-time
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting client:', error);
    return { success: false, error: 'No se pudo eliminar el cliente. ' + error.message };
  }
}
