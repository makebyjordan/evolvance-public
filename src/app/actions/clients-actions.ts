
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

type ClientsActionResult = {
  success: boolean;
  clients?: Client[];
  error?: string;
};

// Collection reference
const clientsCollection = db?.collection('clients');

/**
 * Gets a list of all clients, ordered by creation date.
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

/**
 * Saves a new client or updates an existing one.
 */
export async function saveClient(data: ClientInput): Promise<ClientsActionResult> {
  if (!isFirebaseAdminInitialized() || !clientsCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    const now = new Date();
    if (data.id) {
      // Update
      const docRef = clientsCollection.doc(data.id);
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
    }
    
    revalidatePath('/dashboard/clients');
    const { clients, error } = await getClientsList();
    if(error) {
        return { success: false, error };
    }
    return { success: true, clients };

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
    revalidatePath('/dashboard/clients');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting client:', error);
    return { success: false, error: 'No se pudo eliminar el cliente. ' + error.message };
  }
}
