
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// Main Tool Type
export interface Tool {
  id: string;
  title: string;
  description: string;
  url: string;
  usage: string;
  notes: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating
export type ToolInput = Omit<Tool, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const toolsCollectionRef = collection(db, 'tools');

/**
 * Saves a new tool or updates an existing one.
 */
export async function saveTool(data: ToolInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'tools', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(toolsCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/herramientas');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving tool:', error);
    return { success: false, error: 'La herramienta no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a tool by its ID.
 */
export async function deleteTool(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDoc(doc(db, 'tools', id));
    revalidatePath('/dashboard/herramientas');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting tool:', error);
    return { success: false, error: 'No se pudo eliminar la herramienta. ' + error.message };
  }
}
