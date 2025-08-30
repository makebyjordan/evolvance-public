
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServicesContent {
  title: string;
  items: ServiceItem[];
}

export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
}

export interface TimelineContent {
    title: string;
    events: TimelineEvent[];
}

export interface PhilosophyPoint {
    icon: string;
    title: string;
    description: string;
}

export interface PhilosophyContent {
    title: string;
    points: PhilosophyPoint[];
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface FaqContent {
    title: string;
    items: FaqItem[];
}


export type WebContentSection = 'services' | 'timeline' | 'philosophy' | 'faq';
export type WebContentData = ServicesContent | TimelineContent | PhilosophyContent | FaqContent;


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
    const docRef = doc(db, 'webContent', section);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
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
    const docRef = doc(db, 'webContent', section);
    await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
    
    // Revalidate the home page to show the new content
    revalidatePath('/');
    
    return { success: true };
  } catch (error: any) {
    console.error(`Error saving web content for section ${section}:`, error);
    return { success: false, error: `El contenido de la sección "${section}" no se pudo guardar. ` + error.message };
  }
}
