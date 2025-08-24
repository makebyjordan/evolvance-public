
'use server';

import { db, storage, isFirebaseAdminInitialized } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Main Service Type
export interface Service {
  id: string;
  name: string;
  salePrice: number;
  costPrice: number;
  type: string;
  estimatedTime: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const serviceSchema = z.object({
  name: z.string().min(2, { message: "El nombre es requerido." }),
  salePrice: z.coerce.number().min(0, { message: "El precio de venta debe ser positivo." }),
  costPrice: z.coerce.number().min(0, { message: "El precio de costo debe ser positivo." }),
  type: z.enum([ "Consultoría", "Desarrollo", "Marketing", "Mantenimiento", "Diseño", "Formación" ]),
  estimatedTime: z.string().min(2, { message: "El tiempo estimado es requerido." }),
  description: z.string().optional(),
  id: z.string().optional(),
  currentImageUrl: z.string().optional(),
});

type FormState = {
  success: boolean;
  message: string;
  error?: string;
};


async function uploadImage(file: File): Promise<string> {
    if (!isFirebaseAdminInitialized() || !storage) {
        throw new Error('El servicio de Firebase Storage no está inicializado.');
    }
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
    const fileName = `services/${Date.now()}-${file.name}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const fileUpload = bucket.file(fileName);

    await fileUpload.save(fileBuffer, {
        metadata: {
        contentType: file.type,
        },
    });

    // Make the file public
    await fileUpload.makePublic();

    // Return public URL
    return fileUpload.publicUrl();
}

/**
 * Saves a new service or updates an existing one.
 */
export async function saveService(prevState: FormState, formData: FormData): Promise<FormState> {
  if (!isFirebaseAdminInitialized() || !db) {
    return { success: false, message: 'Error', error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  const validatedFields = serviceSchema.safeParse({
    name: formData.get('name'),
    salePrice: formData.get('salePrice'),
    costPrice: formData.get('costPrice'),
    type: formData.get('type'),
    estimatedTime: formData.get('estimatedTime'),
    description: formData.get('description'),
    id: formData.get('id'),
    currentImageUrl: formData.get('currentImageUrl'),
  });

  if (!validatedFields.success) {
    return { 
        success: false, 
        message: 'Error de validación', 
        error: validatedFields.error.flatten().fieldErrors.toString()
    };
  }
  
  const { id, currentImageUrl, ...serviceData } = validatedFields.data;
  const imageFile = formData.get('image') as File | null;
  let imageUrl = currentImageUrl;

  try {
    if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile);
    }
    
    const now = new Date();
    const servicesCollection = db.collection('services');

    if (id) {
      // Update
      const docRef = servicesCollection.doc(id);
      await docRef.update({
        ...serviceData,
        imageUrl,
        updatedAt: now,
      });
    } else {
      // Create
      const docRef = servicesCollection.doc();
      await docRef.set({
        ...serviceData,
        imageUrl,
        createdAt: now,
        updatedAt: now,
      });
    }
    
    revalidatePath('/dashboard/services');
    return { success: true, message: `Servicio "${serviceData.name}" guardado.` };

  } catch (error: any) {
    console.error('Error saving service:', error);
    return { success: false, message: 'Error al guardar', error: 'El servicio no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a service by its ID.
 */
export async function deleteService(id: string): Promise<{success: boolean, error?: string}> {
  if (!isFirebaseAdminInitialized() || !db) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    await db.collection('services').doc(id).delete();
    revalidatePath('/dashboard/services');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return { success: false, error: 'No se pudo eliminar el servicio. ' + error.message };
  }
}
