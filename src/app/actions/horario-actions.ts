
'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export type User = 'sandra' | 'julian' | 'jordan';

export interface UserDisplayData {
    id?: User;
    imageUrl?: string;
    iconSvg?: string;
}

export interface UserStatus {
    isWorking: boolean;
    lastSeen?: any;
    imageUrl?: string;
    iconSvg?: string;
}

type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const getStatusRef = (userId: User) => doc(db, 'userStatus', userId);

/**
 * Sets the working status for a user.
 */
export async function setUserStatus(userId: User, isWorking: boolean): Promise<ActionResult<null>> {
  try {
    await setDoc(getStatusRef(userId), {
      isWorking: isWorking,
      lastSeen: serverTimestamp(),
    }, { merge: true });

    revalidatePath('/dashboard/horario');
    return { success: true };
  } catch (error: any) {
    console.error("Error setting user status:", error);
    return { success: false, error: "No se pudo actualizar el estado." };
  }
}

/**
 * Saves the display data (image or icon) for a user.
 */
export async function saveUserDisplay(data: UserDisplayData): Promise<ActionResult<null>> {
  if (!data.id) {
    return { success: false, error: "No se proporcionó un ID de usuario." };
  }

  try {
    await setDoc(getStatusRef(data.id), {
      imageUrl: data.imageUrl || null,
      iconSvg: data.iconSvg || null,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    revalidatePath('/dashboard/horario');
    return { success: true };
  } catch (error: any) {
    console.error("Error saving user display data:", error);
    return { success: false, error: "No se pudo guardar la apariencia del usuario." };
  }
}
