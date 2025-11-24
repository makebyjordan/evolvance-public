'use server';

import { revalidatePath } from 'next/cache';
import { getDocument, updateDocument, createDocument, serverTimestamp, firebaseTimestampToDate } from '@/lib/firebase-adapter';

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServicesContent {
  title: string;
  items: ServiceItem[];
  updatedAt?: string;
}

export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
}

export interface TimelineContent {
    title: string;
    events: TimelineEvent[];
    updatedAt?: string;
}

export interface PhilosophyPoint {
    icon: string;
    title: string;
    description: string;
}

export interface PhilosophyContent {
    title: string;
    points: PhilosophyPoint[];
    updatedAt?: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface FaqContent {
    title: string;
    items: FaqItem[];
    updatedAt?: string;
}

export interface PageContent {
    title: string;
    markdownContent: string;
    updatedAt?: string;
}

export interface SocialLink {
    url: string;
    iconSvg: string;
}

export interface SiteConfigContent {
    logoSvg: string;
    socialLinks: SocialLink[];
    updatedAt?: string;
}

export interface ServicePagesConfig {
    iaPageTitle: string;
    marketingPageTitle: string;
    softwarePageTitle: string;
    vrPageTitle: string;
    updatedAt?: string;
}

export interface OfferFeatureCard {
  icon: string;
  title: string;
}

export interface OfferContent {
  title: string;
  description: string;
  valueProposition: string;
  ctaButtonText: string;
  featureCards: OfferFeatureCard[];
  updatedAt?: string;
}


export type WebContentSection = 'services' | 'timeline' | 'philosophy' | 'faq' | 'terms' | 'privacy' | 'siteConfig' | 'servicePagesConfig' | 'offer';
export type WebContentData = ServicesContent | TimelineContent | PhilosophyContent | FaqContent | PageContent | SiteConfigContent | ServicePagesConfig | OfferContent;


// Return type for our server actions
type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Gets content for a specific section of the website.
 */
export async function getWebContent<T extends WebContentData>(section: WebContentSection): Promise<T | null> {
  try {
    const data = await getDocument<any>('webContent', section);

    if (data) {
      // Convert Timestamp to a serializable format (ISO string)
      if (data.updatedAt) {
        data.updatedAt = firebaseTimestampToDate(data.updatedAt).toISOString();
      }
      return data as T;
    } else {
      console.log(`No document found for section: ${section}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching web content for section ${section}:`, error);
    return null;
  }
}

/**
 * Saves content for a specific section of the website.
 */
export async function saveWebContent(section: WebContentSection, data: WebContentData): Promise<ActionResult<null>> {
  try {
    // Omit updatedAt from the data being saved, as it's managed by serverTimestamp
    const { updatedAt, ...saveData } = data;
    await updateDocument('webContent', section, { ...saveData, updatedAt: serverTimestamp() } as any);
    
    // Revalidate the home page to show the new content
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard/web');
    revalidatePath('/terms');
    revalidatePath('/privacy');
    
    return { success: true };
  } catch (error: any) {
    console.error(`Error saving web content for section ${section}:`, error);
    return { success: false, error: `El contenido de la sección "${section}" no se pudo guardar. ` + error.message };
  }
}
