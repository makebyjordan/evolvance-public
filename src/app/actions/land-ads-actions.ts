
'use server';

import { revalidatePath } from 'next/cache';
import { getDocument, updateDocument, createDocument, deleteDocument, generateFirebaseId, serverTimestamp, getCollection, queryCollection, firebaseTimestampToDate } from '@/lib/firebase-adapter';
import type { FeatureCard, IconListItem, MediaGridCard, PricingCard, FaqItem } from './presentations-actions';


// New interfaces for questionnaires
export interface OpenQuestionItem {
  question: string;
}

export interface CheckboxOption {
  label: string;
}

export interface CheckboxQuestionItem {
  question: string;
  options: CheckboxOption[];
}

// Main LandAd Type - Copied from Presentation
export interface LandAd {
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
  // New Questionnaire Sections
  openQuestionnaireEnabled?: boolean;
  openQuestionnaireTitle?: string;
  openQuestionnaireItems?: OpenQuestionItem[];
  checkboxQuestionnaireEnabled?: boolean;
  checkboxQuestionnaireTitle?: string;
  checkboxQuestionnaireItems?: CheckboxQuestionItem[];
  // New Contact Form section
  contactFormEnabled?: boolean;
  contactFormTitle?: string;
  contactFormShowName?: boolean;
  contactFormShowPhone?: boolean;
  contactFormShowEmail?: boolean;
  contactFormShowTextMessage?: boolean;
  contactFormShowInstagram?: boolean;
  contactFormShowFacebook?: boolean;
  contactFormShowLinkedIn?: boolean;
  contactFormShowTikTok?: boolean;
  // Final CTA section
  ctaSectionEnabled?: boolean;
  ctaSectionTitle?: string;
  ctaSectionDescription?: string;
  ctaSectionButtonText?: string;
  ctaSectionButtonUrl?: string;
}

// Type for creating/updating a LandAd
export type LandAdInput = Omit<LandAd, 'id' | 'createdAt' | 'updatedAt'> & {
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
 * Saves a new LandAd or updates an existing one.
 */
export async function saveLandAd(data: LandAdInput): Promise<ActionResult<string>> {
  try {
    let docId: string;

    if (data.id) {
      // Update
      docId = data.id;
      await updateDocument('landAd', docId, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create
      docId = generateFirebaseId();
      await createDocument('landAd', docId, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    revalidatePath('/dashboard/land-ads');
    revalidatePath(`/view-land-ad/${docId}`);

    return { success: true, data: docId };

  } catch (error: any) {
    console.error('Error saving LandAd:', error);
    return { success: false, error: 'El LandAD no se pudo guardar. ' + error.message };
  }
}

/**
 * Deletes a LandAd by its ID.
 */
export async function deleteLandAd(id: string): Promise<ActionResult<null>> {
  try {
    await deleteDocument('landAd', id);
    revalidatePath('/dashboard/land-ads');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting LandAd:', error);
    return { success: false, error: 'No se pudo eliminar el LandAD. ' + error.message };
  }
}

/**
 * Duplicates a LandAd by its ID.
 */
export async function duplicateLandAd(id: string): Promise<ActionResult<string>> {
  try {
    const originalData = await getDocument<any>('landAd', id);

    if (!originalData) {
      return { success: false, error: 'El LandAD original no existe.' };
    }

    const { id: _, createdAt, updatedAt, ...copyData } = originalData;

    const newId = generateFirebaseId();
    await createDocument('landAd', newId, {
      ...copyData,
      title: `Copia de ${originalData.title}`,
      code: `${originalData.code}-COPY-${Date.now()}`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    revalidatePath('/dashboard/land-ads');
    return { success: true, data: newId };

  } catch (error: any) {
    console.error('Error duplicating LandAd:', error);
    return { success: false, error: 'No se pudo duplicar el LandAD. ' + error.message };
  }
}

/**
 * Gets all landads.
 */
export async function getLandAds(): Promise<LandAd[]> {
  try {
    return await getCollection<LandAd>('landAd');
  } catch (error: any) {
    console.error('Error getting landads:', error);
    return [];
  }
}
