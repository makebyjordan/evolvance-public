'use server';

import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';


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
  contractPdfUrl?: string; // URL del PDF del contrato
}

// Type for creating/updating a collaborator
export type CollaboratorInput = Omit<Collaborator, 'id' | 'createdAt' | 'updatedAt' | 'contractPdfUrl'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Saves a new collaborator or updates an existing one.
 */
export async function saveCollaborator(data: Partial<CollaboratorInput & { contractHtml?: string; contractPdfUrl?: string; contractStatus?: string; id: string }>): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('collaborator', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('collaborator', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    revalidatePath('/dashboard/collaborators');
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
    await deleteDocument('collaborator', id);
    revalidatePath('/dashboard/collaborators');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting collaborator:', error);
    return { success: false, error: 'No se pudo eliminar el colaborador. ' + error.message };
  }
}

/**
 * Uploads a contract PDF for a collaborator.
 * NOTE: Still using Firebase Storage for file uploads
 */
export async function uploadContractPdf(collaboratorId: string, formData: FormData): Promise<ActionResult<string>> {
  console.log("Intentando subir PDF para el collaboratorId:", collaboratorId);

  const file = formData.get('pdf-file') as File;

  if (!file) {
    return { success: false, error: 'No se ha seleccionado ningún archivo.' };
  }

  if (file.type !== 'application/pdf') {
    return { success: false, error: 'El archivo debe ser un PDF.' };
  }

  try {
    const storageRef = ref(storage, `contratos/${collaboratorId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    await updateDocument('collaborator', collaboratorId, {
      contractPdfUrl: downloadURL,
      updatedAt: serverTimestamp(),
    });

    revalidatePath('/dashboard/collaborators');

    return { success: true, data: downloadURL };
  } catch (error: any) {
    console.error('Error uploading PDF:', error);
    return { success: false, error: 'No se pudo subir el archivo. ' + error.message };
  }
}

/**
 * Gets all collaborators.
 */
export async function getCollaborators(): Promise<Collaborator[]> {
  try {
    return await getCollection<Collaborator>('collaborator');
  } catch (error: any) {
    console.error('Error getting collaborators:', error);
    return [];
  }
}
