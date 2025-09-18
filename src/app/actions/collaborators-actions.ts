'use server';

import { db, storage } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { revalidatePath } from 'next/cache';


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

// Collection reference
const collaboratorsCollectionRef = collection(db, 'collaborators');

/**
 * Saves a new collaborator or updates an existing one.
 */
export async function saveCollaborator(data: Partial<CollaboratorInput & { contractHtml?: string; contractPdfUrl?: string; contractStatus?: string; id: string }>): Promise<ActionResult<string>> {
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
    await deleteDoc(doc(db, 'collaborators', id));
    revalidatePath('/dashboard/collaborators');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting collaborator:', error);
    return { success: false, error: 'No se pudo eliminar el colaborador. ' + error.message };
  }
}

/**
 * Uploads a contract PDF for a collaborator.
 */
export async function uploadContractPdf(collaboratorId: string, formData: FormData): Promise<ActionResult<string>> {
  // --- LÍNEA DE DEPURACIÓN AÑADIDA AQUÍ ---
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

    const collaboratorRef = doc(db, 'collaborators', collaboratorId);
    await updateDoc(collaboratorRef, {
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
