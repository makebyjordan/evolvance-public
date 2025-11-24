
'use server';

import { revalidatePath } from 'next/cache';
import { getDocument, updateDocument, serverTimestamp, firebaseTimestampToDate } from '@/lib/firebase-adapter';

export interface CompanyInfo {
  name: string;
  phone: string;
  email: string;
  web: string;
  address: string;
  logoUrl: string;
  updatedAt?: string;
}

type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Gets the company information.
 */
export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  try {
    const data = await getDocument<any>('company', 'info');

    if (data) {
      // Convert Timestamp to a serializable format (ISO string)
      if (data.updatedAt) {
        data.updatedAt = firebaseTimestampToDate(data.updatedAt).toISOString();
      }
      return data as CompanyInfo;
    } else {
      console.log("No company info document found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching company info:", error);
    return null;
  }
}

/**
 * Saves company information.
 */
export async function saveCompanyInfo(data: CompanyInfo): Promise<ActionResult<null>> {
  try {
    // Omit updatedAt from the data being saved, as it's managed by serverTimestamp
    const { updatedAt, ...saveData } = data;
    await updateDocument('company', 'info', { ...saveData, updatedAt: serverTimestamp() });
    
    revalidatePath('/dashboard/empresa');
    
    return { success: true };
  } catch (error: any) {
    console.error(`Error saving company info:`, error);
    return { success: false, error: `La información de la empresa no se pudo guardar. ` + error.message };
  }
}

