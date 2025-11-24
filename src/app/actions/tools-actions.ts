
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

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
/**
 * Saves a new tool or updates an existing one.
 */
export async function saveTool(data: ToolInput): Promise<ActionResult<string>> {
  try {
    let docId: string;
    
    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('tool', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('tool', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
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
    await deleteDocument('tool', id);
    revalidatePath('/dashboard/herramientas');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting tool:', error);
    return { success: false, error: 'No se pudo eliminar la herramienta. ' + error.message };
  }
}

/**
 * Gets all tools.
 */
export async function getTools(): Promise<Tool[]> {
  try {
    return await getCollection<Tool>('tool');
  } catch (error: any) {
    console.error('Error getting tools:', error);
    return [];
  }
}
