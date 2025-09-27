
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, setDoc, updateDoc, serverTimestamp, query, where, getDocs, Timestamp, getDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export type User = 'sandra' | 'julian' | 'jordan';

export interface WorkSession {
  id: string;
  userId: User;
  startTime: any;
  endTime?: any;
  duration?: number; // duration in minutes
}

export interface UserStatus {
    isWorking: boolean;
    currentSessionId?: string;
    lastSeen?: any;
}


type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const getStatusRef = (userId: User) => doc(db, 'userStatus', userId);
const sessionsCollectionRef = collection(db, 'workSessions');

/**
 * Starts a new work session for a user.
 */
export async function startWorkSession(userId: User): Promise<ActionResult<string>> {
  try {
    // Create new session document
    const sessionRef = await addDoc(sessionsCollectionRef, {
      userId,
      startTime: serverTimestamp(),
      endTime: null,
      duration: 0,
    });

    // Update user status using setDoc with merge to create if it doesn't exist
    await setDoc(getStatusRef(userId), {
      isWorking: true,
      currentSessionId: sessionRef.id,
      lastSeen: serverTimestamp(),
    }, { merge: true });

    revalidatePath('/dashboard/horario');
    return { success: true, data: sessionRef.id };
  } catch (error: any) {
    console.error("Error starting work session:", error);
    return { success: false, error: "No se pudo iniciar la sesión de trabajo." };
  }
}

/**
 * Ends an active work session for a user.
 */
export async function endWorkSession(userId: User, sessionId: string): Promise<ActionResult<null>> {
   try {
    const sessionRef = doc(db, 'workSessions', sessionId);
    const sessionSnap = await getDoc(sessionRef);

    if (!sessionSnap.exists()) {
      throw new Error("La sesión de trabajo no existe.");
    }
    
    const sessionData = sessionSnap.data();
    
    // Fallback to current time if startTime is not yet available on the server
    const startTime = sessionData.startTime ? (sessionData.startTime as Timestamp).toDate() : new Date();
    const endTime = new Date();
    
    // Calculate duration in minutes, ensuring it's not negative
    const duration = Math.max(0, Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60)));

    // Update session document
    await updateDoc(sessionRef, {
      endTime: Timestamp.fromDate(endTime),
      duration: duration,
    });

    // Update user status
    await updateDoc(getStatusRef(userId), {
      isWorking: false,
      currentSessionId: null,
      lastSeen: serverTimestamp(),
    });

    revalidatePath('/dashboard/horario');
    return { success: true };
  } catch (error: any) {
    console.error("Error ending work session:", error);
     // If something fails, try to reset the user's status to avoid getting stuck
    try {
        await updateDoc(getStatusRef(userId), {
            isWorking: false,
            currentSessionId: null,
        });
    } catch (resetError) {
        console.error("Failed to reset user status after error:", resetError);
    }
    
    return { success: false, error: "No se pudo finalizar la sesión de trabajo. " + error.message };
  }
}
