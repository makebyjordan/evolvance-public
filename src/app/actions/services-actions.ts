
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

// Main Service Type
export interface Service {
  id: string;
  name: string;
  salePrice: number;
  costPrice: number;
  type: string;
  estimatedTime: string;
  description: string;
  createdAt: any;
  updatedAt: any;
}

// Type for creating/updating a service
export type ServiceInput = Omit<Service, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Saves a new service or updates an existing one.
 */
export async function saveService(data: ServiceInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('service', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('service', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    revalidatePath('/dashboard/services');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving service:', error);
    return { success: false, error: 'El servicio no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a service by its ID.
 */
export async function deleteService(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDocument('service', id);
    revalidatePath('/dashboard/services');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return { success: false, error: 'No se pudo eliminar el servicio. ' + error.message };
  }
}

/**
 * Gets all services.
 */
export async function getServices(): Promise<Service[]> {
  try {
    return await getCollection<Service>('service');
  } catch (error: any) {
    console.error('Error getting services:', error);
    return [];
  }
}
