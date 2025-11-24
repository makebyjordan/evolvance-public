/**
 * Firebase Adapter - Helpers para convertir entre Firebase y Prisma
 * Mantiene compatibilidad con el código existente
 */

import { prisma } from './prisma';
import { Prisma } from '@/generated/prisma';

// ============================================
// TIPOS GENÉRICOS
// ============================================

export type FirebaseTimestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export type FirebaseDocument = {
  id: string;
  [key: string]: any;
};

// ============================================
// CONVERSIONES DE TIMESTAMP
// ============================================

export function firebaseTimestampToDate(timestamp: any): Date {
  if (!timestamp) return new Date();
  if (timestamp._seconds) {
    return new Date(timestamp._seconds * 1000);
  }
  if (timestamp instanceof Date) return timestamp;
  return new Date(timestamp);
}

export function dateToFirebaseTimestamp(date: Date): FirebaseTimestamp {
  const seconds = Math.floor(date.getTime() / 1000);
  const nanoseconds = (date.getTime() % 1000) * 1000000;
  return {
    _seconds: seconds,
    _nanoseconds: nanoseconds,
  };
}

// ============================================
// HELPERS GENÉRICOS PARA COLECCIONES
// ============================================

/**
 * Obtiene todos los documentos de una colección
 * Simula la estructura de Firebase
 */
export async function getCollection<T = any>(
  model: keyof typeof prisma,
  orderBy?: { field: string; direction: 'asc' | 'desc' }
): Promise<T[]> {
  const items = await (prisma[model] as any).findMany({
    orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
  });

  return items.map((item: any) => ({
    id: item.firebaseId,
    ...item.data,
  }));
}

/**
 * Obtiene un documento por ID
 */
export async function getDocument<T = any>(
  model: keyof typeof prisma,
  id: string
): Promise<T | null> {
  const item = await (prisma[model] as any).findUnique({
    where: { firebaseId: id },
  });

  if (!item) return null;

  return {
    id: item.firebaseId,
    ...item.data,
  };
}

/**
 * Crea un documento nuevo
 */
export async function createDocument<T = any>(
  model: keyof typeof prisma,
  id: string,
  data: Omit<T, 'id'>
): Promise<T> {
  const created = await (prisma[model] as any).create({
    data: {
      firebaseId: id,
      data: data as Prisma.InputJsonValue,
    },
  });

  return {
    id: created.firebaseId,
    ...created.data,
  };
}

/**
 * Actualiza un documento
 */
export async function updateDocument<T = any>(
  model: keyof typeof prisma,
  id: string,
  data: Partial<T>
): Promise<T> {
  // Primero obtenemos el documento actual
  const current = await (prisma[model] as any).findUnique({
    where: { firebaseId: id },
  });

  if (!current) {
    throw new Error(`Document ${id} not found in ${String(model)}`);
  }

  // Mezclamos los datos actuales con los nuevos
  const mergedData = {
    ...current.data,
    ...data,
  };

  const updated = await (prisma[model] as any).update({
    where: { firebaseId: id },
    data: {
      data: mergedData as Prisma.InputJsonValue,
    },
  });

  return {
    id: updated.firebaseId,
    ...updated.data,
  };
}

/**
 * Elimina un documento
 */
export async function deleteDocument(
  model: keyof typeof prisma,
  id: string
): Promise<void> {
  await (prisma[model] as any).delete({
    where: { firebaseId: id },
  });
}

/**
 * Busca documentos con filtro (búsqueda básica en JSON)
 */
export async function queryCollection<T = any>(
  model: keyof typeof prisma,
  filter: (item: T) => boolean
): Promise<T[]> {
  const items = await (prisma[model] as any).findMany();
  
  const documents = items.map((item: any) => ({
    id: item.firebaseId,
    ...item.data,
  }));

  return documents.filter(filter);
}

// ============================================
// FUNCIONES ESPECÍFICAS POR MODELO
// ============================================

/**
 * Genera un ID único similar a Firebase
 */
export function generateFirebaseId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 20; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

/**
 * Simula serverTimestamp() de Firebase
 */
export function serverTimestamp(): FirebaseTimestamp {
  return dateToFirebaseTimestamp(new Date());
}

/**
 * Simula onSnapshot para real-time updates (versión simplificada sin real-time)
 * Retorna una función unsubscribe
 */
export function onSnapshot(
  model: keyof typeof prisma,
  callback: (data: any[]) => void
): () => void {
  // Obtener datos iniciales
  getCollection(model).then(callback);
  
  // Retornar función unsubscribe (no hace nada en esta versión)
  return () => {};
}

/**
 * Obtiene una colección completa con orden
 */
export async function getCollectionOrdered<T = any>(
  model: keyof typeof prisma,
  orderField: string = 'createdAt',
  direction: 'asc' | 'desc' = 'desc'
): Promise<T[]> {
  const items = await (prisma[model] as any).findMany({
    orderBy: { [orderField]: direction },
  });

  return items.map((item: any) => ({
    id: item.firebaseId,
    ...item.data,
  }));
}
