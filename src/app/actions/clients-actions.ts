
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

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

// Collection reference
const clientsCollectionRef = collection(db, 'clients');

/**
 * Saves a new client or updates an existing one.
 */
export async function saveClient(data: ClientInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'clients', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(clientsCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
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
  try {
    await deleteDoc(doc(db, 'clients', id));
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting client:', error);
    return { success: false, error: 'No se pudo eliminar el cliente. ' + error.message };
  }
}
