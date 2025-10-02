
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// Main PortfolioProject Type
export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  url: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating a project
export type PortfolioProjectInput = Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt'> & { id?: string };


// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const portfolioCollectionRef = collection(db, 'portfolio');

/**
 * Saves a new project or updates an existing one.
 */
export async function savePortfolioProject(data: PortfolioProjectInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'portfolio', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(portfolioCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/portfolio');
    revalidatePath('/'); // Revalidate home page to show new project
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving portfolio project:', error);
    return { success: false, error: 'El proyecto no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a project by its ID.
 */
export async function deletePortfolioProject(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDoc(doc(db, 'portfolio', id));
    revalidatePath('/dashboard/portfolio');
    revalidatePath('/'); // Revalidate home page
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting portfolio project:', error);
    return { success: false, error: 'No se pudo eliminar el proyecto. ' + error.message };
  }
}
