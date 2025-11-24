
'use server';

import { revalidatePath } from 'next/cache';
import { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp , getCollection } from '@/lib/firebase-adapter';

export interface FeatureCard {
  icon?: string;
  title?: string;
  description?: string;
}

export interface IconListItem {
  icon?: string;
  title?: string;
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

export interface FaqItem {
  question: string;
  answer: string;
}

// Main Presentation Type
export interface Presentation {
  id: string;
  title: string;
  code: string;
  createdAt: any;
  updatedAt: any;
  htmlText?: string;
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
  // Icon List Section
  iconListSectionEnabled?: boolean;
  iconListSectionDescription?: string;
  iconListSectionItems?: IconListItem[];
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
  // FAQ Section
  faqSectionEnabled?: boolean;
  faqSectionItems?: FaqItem[];
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
/**
 * Saves a new presentation or updates an existing one.
 */
export async function savePresentation(data: PresentationInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('presentation', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('presentation', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
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
    await deleteDocument('presentation', id);
    revalidatePath('/dashboard/presentations');
     revalidatePath('/presentations');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting presentation:', error);
    return { success: false, error: 'No se pudo eliminar la presentación. ' + error.message };
  }
}

/**
 * Gets all presentations.
 */
export async function getPresentations(): Promise<Presentation[]> {
  try {
    return await getCollection<Presentation>('presentation');
  } catch (error: any) {
    console.error('Error getting presentations:', error);
    return [];
  }
}
