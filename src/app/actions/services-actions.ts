
'use server';

import { db, isFirebaseAdminInitialized } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';

// Main Service Type
export interface Service {
  id: string;
  name: string;
  salePrice: number;
  costPrice: number;
  type: string;
  estimatedTime: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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

// Collection reference
const servicesCollection = db?.collection('services');

/**
 * Saves a new service or updates an existing one.
 */
export async function saveService(data: ServiceInput): Promise<ActionResult<string>> {
  if (!isFirebaseAdminInitialized() || !servicesCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    const now = new Date();
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = servicesCollection.doc(docId);
      await docRef.update({
        ...data,
        updatedAt: now,
      });
    } else {
      // Create
      const docRef = servicesCollection.doc();
      await docRef.set({
        ...data,
        createdAt: now,
        updatedAt: now,
      });
      docId = docRef.id;
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
  if (!isFirebaseAdminInitialized() || !servicesCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    await servicesCollection.doc(id).delete();
    revalidatePath('/dashboard/services');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return { success: false, error: 'No se pudo eliminar el servicio. ' + error.message };
  }
}
