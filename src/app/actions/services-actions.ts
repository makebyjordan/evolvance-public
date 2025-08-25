
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
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

// Collection reference
const servicesCollectionRef = collection(db, 'services');

/**
 * Saves a new service or updates an existing one.
 */
export async function saveService(data: ServiceInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'services', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(servicesCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
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
  try {
    await deleteDoc(doc(db, 'services', id));
    revalidatePath('/dashboard/services');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return { success: false, error: 'No se pudo eliminar el servicio. ' + error.message };
  }
}
