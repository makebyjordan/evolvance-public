
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

// Main FirebaseProject Type
export interface FirebaseProject {
  id: string;
  title: string;
  description: string;
  account: string;
  url: string;
  type: 'cliente' | 'interno' | 'startup' | 'test' | 'partner';
  deliveryDate?: any; // Firestore Timestamp, optional
  status: 'Desarrollando' | 'Testing' | 'Cambios' | 'Presentado' | 'Finalizando' | 'Acabado';
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating a project
export type FirebaseProjectInput = Omit<FirebaseProject, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
/**
 * Saves a new project or updates an existing one.
 */
export async function saveFirebaseProject(data: FirebaseProjectInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    // Convert date string to Date object if it exists
    const projectData: Partial<FirebaseProjectInput> = { ...data };
    if (projectData.deliveryDate) {
      projectData.deliveryDate = new Date(projectData.deliveryDate);
    } else {
      // Ensure optional field is not sent if empty
      delete projectData.deliveryDate;
    }


    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('firebaseProject', docId, {
        ...projectData,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('firebaseProject', docId, {
        ...projectData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    revalidatePath('/dashboard/firebase');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving firebase project:', error);
    return { success: false, error: 'El proyecto no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a project by its ID.
 */
export async function deleteFirebaseProject(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDocument('firebaseProject', id);
    revalidatePath('/dashboard/firebase');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting firebase project:', error);
    return { success: false, error: 'No se pudo eliminar el proyecto. ' + error.message };
  }
}

/**
 * Gets all firebaseprojects.
 */
export async function getFirebaseProjects(): Promise<FirebaseProject[]> {
  try {
    return await getCollection<FirebaseProject>('firebaseProject');
  } catch (error: any) {
    console.error('Error getting firebaseprojects:', error);
    return [];
  }
}
