
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export interface FeatureCard {
  icon?: string;
  title?: string;
  description?: string;
}

export interface MediaGridCard {
  title?: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface PricingCard {
    htmlContent: string;
}

// Main Presentation Type
export interface Presentation {
  id: string;
  title: string;
  code: string;
  createdAt: any;
  updatedAt: any;
  // Hero section fields
  heroEnabled?: boolean;
  heroTitle?: string;
  heroDescription?: string;
  heroCtaText?: string;
  heroCtaUrl?: string;
  heroImageUrl?: string;
  // Feature section fields
  featureSectionEnabled?: boolean;
  featureSectionTitle?: string;
  featureSectionDescription?: string;
  featureSectionCtaText?: string;
  featureSectionCtaUrl?: string;
  featureSectionCards?: FeatureCard[];
  // Media Grid Section
  mediaGridSectionEnabled?: boolean;
  mediaGridSectionCards?: MediaGridCard[];
  // Pricing Section
  pricingSectionEnabled?: boolean;
  pricingSectionCards?: PricingCard[];
  // Full Width Media Section
  fullWidthMediaSectionEnabled?: boolean;
  fullWidthMediaSectionTitle?: string;
  fullWidthMediaSectionDescription?: string;
  fullWidthMediaSectionImageUrl?: string;
  fullWidthMediaSectionVideoUrl?: string;
}

// Type for creating/updating a presentation
export type PresentationInput = Omit<Presentation, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Collection reference
const presentationsCollectionRef = collection(db, 'presentations');

/**
 * Saves a new presentation or updates an existing one.
 */
export async function savePresentation(data: PresentationInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      const docRef = doc(db, 'presentations', docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      const docRef = await addDoc(presentationsCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      docId = docRef.id;
    }
    
    revalidatePath('/dashboard/presentations');
    revalidatePath('/presentations');
    revalidatePath(`/view-presentation/${docId}`);

    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving presentation:', error);
    return { success: false, error: 'La presentación no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a presentation by its ID.
 */
export async function deletePresentation(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDoc(doc(db, 'presentations', id));
    revalidatePath('/dashboard/presentations');
     revalidatePath('/presentations');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting presentation:', error);
    return { success: false, error: 'No se pudo eliminar la presentación. ' + error.message };
  }
}
