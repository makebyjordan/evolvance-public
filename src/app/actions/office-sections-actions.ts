
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp, getCollection } from '@/lib/firebase-adapter';

// Main OfficeSection Type
export interface OfficeSection {
  id: string;
  title: string;
  type: 'link' | 'title';
  path?: string;
  icon?: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating
export type OfficeSectionInput = Omit<OfficeSection, 'id' | 'createdAt' | 'updatedAt'> & { id?: string };


// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
/**
 * Saves a new office section or updates an existing one.
 */
export async function saveOfficeSection(data: OfficeSectionInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('officeSection', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('officeSection', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    revalidatePath('/dashboard/office-config');
    revalidatePath('/office');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving office section:', error);
    return { success: false, error: 'La sección no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes an office section by its ID.
 */
export async function deleteOfficeSection(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDocument('officeSection', id);
    revalidatePath('/dashboard/office-config');
    revalidatePath('/office');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting office section:', error);
    return { success: false, error: 'No se pudo eliminar la sección. ' + error.message };
  }
}

/**
 * Gets all officesections.
 */
export async function getOfficeSections(): Promise<OfficeSection[]> {
  try {
    return await getCollection<OfficeSection>('officeSection');
  } catch (error: any) {
    console.error('Error getting officesections:', error);
    return [];
  }
}
