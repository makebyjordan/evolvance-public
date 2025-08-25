
'use server';

import { db, storage, isFirebaseAdminInitialized } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Main InvoiceOut Type
export interface InvoiceOut {
  id: string;
  companyName: string;
  phone: string;
  address: string;
  email: string;
  location: string;
  total: number;
  vatType: number;
  description: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const invoicesOutCollection = db?.collection('invoicesOut');

const formSchema = z.object({
  companyName: z.string().min(1, "Nombre de empresa requerido"),
  phone: z.string().min(1, "Teléfono requerido"),
  address: z.string().min(1, "Dirección requerida"),
  email: z.string().email("Email inválido"),
  location: z.string().min(1, "Localización requerida"),
  total: z.coerce.number(),
  vatType: z.coerce.number(),
  description: z.string().optional(),
  file: z.instanceof(File).optional(),
});


/**
 * Saves a new invoice or updates an existing one.
 */
export async function saveInvoiceOut(formData: FormData, id: string | null): Promise<ActionResult<string>> {
  if (!isFirebaseAdminInitialized() || !invoicesOutCollection || !storage) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  const validatedFields = formSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { success: false, error: 'Datos del formulario no válidos.' };
  }
  
  const { file, ...data } = validatedFields.data;

  try {
    const now = new Date();
    let docId: string;
    let fileUrl: string | undefined;

    if (file && file.size > 0) {
      const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
      const filePath = `invoices-out/${now.getTime()}-${file.name}`;
      const fileRef = bucket.file(filePath);
      
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      await fileRef.save(fileBuffer, {
        metadata: { contentType: file.type },
      });
      
      fileUrl = (await fileRef.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      }))[0];
    }
    
    const docData = { ...data, ...(fileUrl && { fileUrl }), updatedAt: now };

    if (id) {
      // Update
      docId = id;
      const docRef = invoicesOutCollection.doc(docId);
      await docRef.update(docData);
    } else {
      // Create
      const docRef = await invoicesOutCollection.add({ ...docData, createdAt: now });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/invoices-out');
    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving invoice:', error);
    return { success: false, error: 'La factura no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes an invoice by its ID.
 */
export async function deleteInvoiceOut(id: string): Promise<ActionResult<null>> {
  if (!isFirebaseAdminInitialized() || !invoicesOutCollection) {
    return { success: false, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    // TODO: Delete associated file from storage
    await invoicesOutCollection.doc(id).delete();
    revalidatePath('/dashboard/invoices-out');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting invoice:', error);
    return { success: false, error: 'No se pudo eliminar la factura. ' + error.message };
  }
}
