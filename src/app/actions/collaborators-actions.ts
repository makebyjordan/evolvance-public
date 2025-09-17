
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

// Main Collaborator Type
export interface Collaborator {
  id: string;
  name: string;
  phone: string;
  email: string;
  contractStatus: 'A Presentar' | 'Presentado' | 'Firmado' | 'Cancelado' | 'Contrato Generado';
  description: string;
  createdAt: any;
  updatedAt: any;
  contractHtml?: string; // HTML del contrato
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
const collaboratorsCollectionRef = collection(db, 'collaborators');

/**
 * Saves a new collaborator or updates an existing one.
 */
export async function saveCollaborator(data: Partial<CollaboratorInput>): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'collaborators', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(collaboratorsCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
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
  try {
    await deleteDoc(doc(db, 'collaborators', id));
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting collaborator:', error);
    return { success: false, error: 'No se pudo eliminar el colaborador. ' + error.message };
  }
}
