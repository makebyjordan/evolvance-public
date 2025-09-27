
'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export type User = 'sandra' | 'julian' | 'jordan';

export interface UserStatus {
    isWorking: boolean;
    lastSeen?: any;
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
