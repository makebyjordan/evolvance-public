# 🔄 Guía de Migración de Código: Firebase → Prisma

## 📚 COMPARACIÓN RÁPIDA

| Operación | Firebase | Prisma |
|-----------|----------|--------|
| Obtener todos | `getDocs(collection())` | `prisma.model.findMany()` |
| Obtener uno | `getDoc(doc())` | `prisma.model.findUnique()` |
| Crear | `addDoc(collection())` | `prisma.model.create()` |
| Actualizar | `updateDoc(doc())` | `prisma.model.update()` |
| Eliminar | `deleteDoc(doc())` | `prisma.model.delete()` |
| Buscar | `where()` | `where: {}` |

---

## 🔧 CONFIGURACIÓN INICIAL

### Firebase (Antes)

```typescript
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
```

### Prisma (Ahora)

```typescript
import { PrismaClient } from '@/src/generated/prisma';

const prisma = new PrismaClient();

// O mejor aún, crear un singleton:
// lib/prisma.ts
import { PrismaClient } from '@/src/generated/prisma';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---

## 📖 OPERACIONES CRUD

### 1️⃣ LEER TODOS LOS DOCUMENTOS

#### Firebase (Antes)

```typescript
// Leer todos los clientes
const querySnapshot = await getDocs(collection(db, 'clients'));
const clients = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

#### Prisma (Ahora)

```typescript
// Leer todos los clientes
const clients = await prisma.client.findMany();

// Si quieres solo los datos sin el wrapper
const clientsData = clients.map(client => ({
  id: client.firebaseId,  // ID original de Firebase
  ...client.data          // Los datos están en el campo JSON
}));
```

---

### 2️⃣ LEER UN DOCUMENTO POR ID

#### Firebase (Antes)

```typescript
const docRef = doc(db, 'clients', clientId);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  const client = { id: docSnap.id, ...docSnap.data() };
} else {
  console.log('No existe');
}
```

#### Prisma (Ahora)

```typescript
const client = await prisma.client.findUnique({
  where: { firebaseId: clientId }
});

if (client) {
  const clientData = { id: client.firebaseId, ...client.data };
} else {
  console.log('No existe');
}
```

---

### 3️⃣ CREAR DOCUMENTO

#### Firebase (Antes)

```typescript
const docRef = await addDoc(collection(db, 'clients'), {
  name: 'Jordan',
  email: 'jordan@example.com',
  phone: '666666666',
  status: 'Primer Contacto',
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
});

console.log('Created with ID:', docRef.id);
```

#### Prisma (Ahora)

```typescript
const client = await prisma.client.create({
  data: {
    firebaseId: 'client-' + Date.now(), // O genera un ID único
    data: {
      name: 'Jordan',
      email: 'jordan@example.com',
      phone: '666666666',
      status: 'Primer Contacto'
    }
  }
});

console.log('Created with ID:', client.id);
```

---

### 4️⃣ ACTUALIZAR DOCUMENTO

#### Firebase (Antes)

```typescript
const docRef = doc(db, 'clients', clientId);
await updateDoc(docRef, {
  name: 'Jordan Updated',
  updatedAt: serverTimestamp()
});
```

#### Prisma (Ahora)

```typescript
const client = await prisma.client.update({
  where: { firebaseId: clientId },
  data: {
    data: {
      ...existingClient.data,  // Mantener datos existentes
      name: 'Jordan Updated'
    }
  }
});

// O si quieres reemplazar todo el objeto data:
await prisma.client.update({
  where: { firebaseId: clientId },
  data: {
    data: {
      name: 'Jordan Updated',
      email: 'newemail@example.com',
      // ... otros campos
    }
  }
});
```

---

### 5️⃣ ELIMINAR DOCUMENTO

#### Firebase (Antes)

```typescript
const docRef = doc(db, 'clients', clientId);
await deleteDoc(docRef);
```

#### Prisma (Ahora)

```typescript
await prisma.client.delete({
  where: { firebaseId: clientId }
});
```

---

## 🔍 CONSULTAS CON FILTROS

### WHERE (Filtrado)

#### Firebase (Antes)

```typescript
const q = query(
  collection(db, 'clients'),
  where('status', '==', 'Primer Contacto')
);
const querySnapshot = await getDocs(q);
const clients = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

#### Prisma (Ahora)

**Opción 1: Buscar en JSON (menos eficiente)**

```typescript
const clients = await prisma.client.findMany();
const filtered = clients.filter(c => 
  (c.data as any).status === 'Primer Contacto'
);
```

**Opción 2: Usar JSON path de PostgreSQL (más eficiente)**

```typescript
const clients = await prisma.$queryRaw`
  SELECT * FROM clients 
  WHERE data->>'status' = 'Primer Contacto'
`;
```

---

### ORDER BY (Ordenar)

#### Firebase (Antes)

```typescript
const q = query(
  collection(db, 'services'),
  orderBy('salePrice', 'desc')
);
```

#### Prisma (Ahora)

```typescript
// Ordenar por campos de Prisma
const services = await prisma.service.findMany({
  orderBy: { createdAt: 'desc' }
});

// Ordenar por campo en JSON
const services = await prisma.$queryRaw`
  SELECT * FROM services 
  ORDER BY CAST(data->>'salePrice' AS INTEGER) DESC
`;
```

---

### LIMIT (Limitar resultados)

#### Firebase (Antes)

```typescript
const q = query(
  collection(db, 'clients'),
  limit(10)
);
```

#### Prisma (Ahora)

```typescript
const clients = await prisma.client.findMany({
  take: 10
});
```

---

### BÚSQUEDA COMBINADA

#### Firebase (Antes)

```typescript
const q = query(
  collection(db, 'services'),
  where('type', '==', 'Desarrollo'),
  orderBy('salePrice', 'desc'),
  limit(5)
);
```

#### Prisma (Ahora)

```typescript
const services = await prisma.$queryRaw`
  SELECT * FROM services 
  WHERE data->>'type' = 'Desarrollo'
  ORDER BY CAST(data->>'salePrice' AS INTEGER) DESC
  LIMIT 5
`;
```

---

## 🔄 CONVERSIÓN DE TIMESTAMPS

Los timestamps de Firebase tienen formato especial:

```json
{
  "createdAt": {
    "_seconds": 1758660480,
    "_nanoseconds": 211000000
  }
}
```

### Función helper para convertir:

```typescript
// lib/utils.ts
export function firebaseTimestampToDate(timestamp: any): Date {
  if (!timestamp) return new Date();
  if (timestamp._seconds) {
    return new Date(timestamp._seconds * 1000);
  }
  return new Date(timestamp);
}

// Uso:
const client = await prisma.client.findUnique({
  where: { firebaseId: 'abc' }
});

const createdDate = firebaseTimestampToDate((client.data as any).createdAt);
```

---

## 🎯 EJEMPLO COMPLETO: API ROUTE

### Firebase (Antes)

```typescript
// app/api/clients/route.ts
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  const querySnapshot = await getDocs(collection(db, 'clients'));
  const clients = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  const body = await request.json();
  const docRef = await addDoc(collection(db, 'clients'), {
    ...body,
    createdAt: serverTimestamp()
  });
  return NextResponse.json({ id: docRef.id });
}
```

### Prisma (Ahora)

```typescript
// app/api/clients/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const clients = await prisma.client.findMany();
  
  // Transformar datos para mantener compatibilidad
  const formattedClients = clients.map(client => ({
    id: client.firebaseId,
    ...client.data
  }));
  
  return NextResponse.json(formattedClients);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const client = await prisma.client.create({
    data: {
      firebaseId: 'client-' + Date.now(),
      data: body
    }
  });
  
  return NextResponse.json({ 
    id: client.firebaseId,
    ...client.data 
  });
}
```

---

## 🚀 OPTIMIZACIÓN: Normalizar Schema (Opcional)

Para mejor rendimiento, considera normalizar los campos más usados:

```prisma
model Client {
  id         String   @id @default(cuid())
  firebaseId String   @unique
  
  // Campos normalizados para búsquedas rápidas
  name       String
  email      String   @unique
  phone      String?
  status     String
  
  // Resto de datos en JSON
  extraData  Json?
  
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("clients")
  @@index([status])
  @@index([email])
}
```

### Script de migración de JSON → Campos normalizados:

```typescript
// scripts/normalize-clients.ts
const clients = await prisma.client.findMany();

for (const client of clients) {
  const data = client.data as any;
  
  await prisma.client.update({
    where: { id: client.id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      status: data.status,
      extraData: {
        description: data.description,
        // ... otros campos menos usados
      }
    }
  });
}
```

---

## 📦 HELPER FUNCTIONS

Crea helpers para facilitar la transición:

```typescript
// lib/prisma-helpers.ts
import { prisma } from './prisma';

export async function getCollection<T>(model: keyof typeof prisma): Promise<T[]> {
  const items = await (prisma[model] as any).findMany();
  return items.map((item: any) => ({
    id: item.firebaseId,
    ...item.data
  }));
}

export async function getDocument<T>(
  model: keyof typeof prisma, 
  id: string
): Promise<T | null> {
  const item = await (prisma[model] as any).findUnique({
    where: { firebaseId: id }
  });
  
  if (!item) return null;
  
  return {
    id: item.firebaseId,
    ...item.data
  };
}

// Uso:
const clients = await getCollection<Client>('client');
const client = await getDocument<Client>('client', 'abc123');
```

---

## ✅ CHECKLIST DE MIGRACIÓN DE CÓDIGO

- [ ] Reemplazar imports de Firebase por Prisma
- [ ] Crear singleton de PrismaClient
- [ ] Actualizar funciones GET (findMany, findUnique)
- [ ] Actualizar funciones POST (create)
- [ ] Actualizar funciones PUT/PATCH (update)
- [ ] Actualizar funciones DELETE (delete)
- [ ] Convertir where() a objetos where
- [ ] Convertir orderBy() a objetos orderBy
- [ ] Manejar timestamps de Firebase
- [ ] Probar todas las rutas API
- [ ] Actualizar componentes cliente
- [ ] Verificar funcionalidad completa

---

## 🆘 PROBLEMAS COMUNES

### Error: "PrismaClient is unable to be run in the browser"

→ Asegúrate de usar Prisma solo en Server Components o API Routes

### Error: "Unique constraint failed"

→ Estás intentando crear un documento con un `firebaseId` que ya existe

### Campos undefined en client.data

→ Verifica la estructura del JSON en la base de datos con Prisma Studio

---

## 🎉 ¡LISTO!

Ahora tienes todos los ejemplos para migrar tu código de Firebase a Prisma.

**Siguiente:** Empieza migrando una ruta API simple, pruébala, y luego continúa con las demás.
