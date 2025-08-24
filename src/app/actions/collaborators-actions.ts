
'use server';

import { db, isFirebaseAdminInitialized } from '@/lib/firebase-admin';

// Main Collaborator Type
export interface Collaborator {
  id: string;
  name: string;
  phone: string;
  email: string;
  contractStatus: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Type for creating/updating a collaborator
export type CollaboratorInput = Omit<Collaborator, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const collaboratorsCollection = db?.collection('collaborators');

/**
 * Saves a new collaborator or updates an existing one.
 */
export async function saveCollaborator(data: CollaboratorInput): Promise<ActionResult<string>> {
  if (!isFirebaseAdminInitialized() || !collaboratorsCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    const now = new Date();
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = collaboratorsCollection.doc(docId);
      await docRef.update({
        ...data,
        updatedAt: now,
      });
    } else {
      // Create
      const docRef = collaboratorsCollection.doc();
      await docRef.set({
        ...data,
        createdAt: now,
        updatedAt: now,
      });
      docId = docRef.id;
    }
    
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving collaborator:', error);
    return { success: false, error: 'El colaborador no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a collaborator by its ID.
 */
export async function deleteCollaborator(id: string): Promise<ActionResult<null>> {
  if (!isFirebaseAdminInitialized() || !collaboratorsCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    await collaboratorsCollection.doc(id).delete();
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting collaborator:', error);
    return { success: false, error: 'No se pudo eliminar el colaborador. ' + error.message };
  }
}
