
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

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
const officeSectionsCollectionRef = collection(db, 'officeSections');

/**
 * Saves a new office section or updates an existing one.
 */
export async function saveOfficeSection(data: OfficeSectionInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'officeSections', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(officeSectionsCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
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
    await deleteDoc(doc(db, 'officeSections', id));
    revalidatePath('/dashboard/office-config');
    revalidatePath('/office');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting office section:', error);
    return { success: false, error: 'No se pudo eliminar la sección. ' + error.message };
  }
}
