# 🔄 Migración Firebase → PostgreSQL + Prisma

## 📊 RESUMEN EJECUTIVO

**Proyecto:** evolvance-public (Next.js 15)  
**De:** Firebase/Firestore  
**A:** PostgreSQL + Prisma ORM  
**Total de datos:** 157 documentos en 29 colecciones

---

## ✅ YA COMPLETADO AUTOMÁTICAMENTE

1. ✅ **PostgreSQL** instalado y funcionando en tu Mac
2. ✅ **Base de datos** `evolvance_local` creada
3. ✅ **Prisma Schema** configurado con 29 modelos
4. ✅ **Scripts de importación** creados
5. ✅ **Scripts npm** agregados al package.json
6. ✅ **Documentación completa** generada

---

## 🎯 PASOS QUE DEBES HACER AHORA

### ⚡ CONFIGURACIÓN RÁPIDA (5 minutos)

#### 1️⃣ Agregar DATABASE_URL a tu .env

```bash
DATABASE_URL="postgresql://mac@localhost:5432/evolvance_local?schema=public"
```

**Acción:** Abre `.env` y agrega la línea de arriba.

---

#### 2️⃣ Ejecutar migración

```bash
npm run db:migrate
```

Esto creará todas las tablas en PostgreSQL.

---

#### 3️⃣ Importar datos

```bash
npm run db:import
```

Esto importará los 157 documentos desde `backup/` a PostgreSQL.

---

#### 4️⃣ Verificar datos

```bash
npm run db:studio
```

Esto abrirá Prisma Studio en `http://localhost:5555` para ver tus datos.

---

## 📁 ESTRUCTURA DE DATOS

Cada tabla tiene esta estructura:

```typescript
{
  id: string;         // ID autogenerado de Prisma (cuid)
  firebaseId: string; // ID original de Firebase
  data: JSON;         // Todos los datos del documento
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🗂️ MODELOS CREADOS (29)

| Colección Firebase | Modelo Prisma | Tabla PostgreSQL |
|-------------------|---------------|------------------|
| clients | Client | clients |
| collaborators | Collaborator | collaborators |
| company | Company | company |
| contracts | Contract | contracts |
| facturas | Factura | facturas |
| firebaseProjects | FirebaseProject | firebase_projects |
| geminiLinks | GeminiLink | gemini_links |
| htmls | Html | htmls |
| ias | Ia | ias |
| images | Image | images |
| invoicesIn | InvoiceIn | invoices_in |
| landAdResponses | LandAdResponse | land_ad_responses |
| landAds | LandAd | land_ads |
| objectives | Objective | objectives |
| officeSections | OfficeSection | office_sections |
| portfolio | Portfolio | portfolio |
| presentations | Presentation | presentations |
| presupuestos | Presupuesto | presupuestos |
| proposals | Proposal | proposals |
| protocols | Protocol | protocols |
| servicePages | ServicePage | service_pages |
| services | Service | services |
| tools | Tool | tools |
| trainingItems | TrainingItem | training_items |
| trainingSubsections | TrainingSubsection | training_subsections |
| userStatus | UserStatus | user_status |
| videos | Video | videos |
| webContent | WebContent | web_content |
| workSessions | WorkSession | work_sessions |

---

## 🛠️ SCRIPTS NPM DISPONIBLES

```bash
npm run db:migrate    # Crear/actualizar tablas en PostgreSQL
npm run db:generate   # Regenerar Prisma Client
npm run db:import     # Importar datos desde backup/
npm run db:studio     # Abrir Prisma Studio (interfaz visual)
npm run db:reset      # Resetear BD e importar de nuevo
```

---

## 📚 ARCHIVOS DE DOCUMENTACIÓN

- **MIGRATION-STEPS.md** → Pasos detallados para completar la migración local
- **VPS-DEPLOYMENT.md** → Guía completa para deploy en VPS
- **MIGRATION-CONFIG.md** → Configuración de DATABASE_URL

---

## 🔍 CÓMO USAR PRISMA EN TU CÓDIGO

### Ejemplo: Leer datos

```typescript
import { PrismaClient } from './src/generated/prisma';

const prisma = new PrismaClient();

// Obtener todos los clientes
const clients = await prisma.client.findMany();

// Buscar por firebaseId original
const client = await prisma.client.findUnique({
  where: { firebaseId: 'abc123' }
});

// Los datos están en el campo 'data' (JSON)
console.log(client.data);
```

### Ejemplo: Crear datos

```typescript
await prisma.client.create({
  data: {
    firebaseId: 'nuevo-id',
    data: {
      name: 'Cliente Nuevo',
      email: 'cliente@example.com',
      // ... otros campos
    }
  }
});
```

### Ejemplo: Actualizar datos

```typescript
await prisma.client.update({
  where: { firebaseId: 'abc123' },
  data: {
    data: {
      ...client.data,
      name: 'Nombre Actualizado'
    }
  }
});
```

---

## 🚨 PRÓXIMOS PASOS DESPUÉS DE LA MIGRACIÓN

### Opción 1: Mantener estructura JSON (más rápido)

✅ Ya está listo, solo usa `data` como JSON  
✅ Fácil de migrar  
❌ Menos rendimiento en queries complejas  
❌ No puedes usar relaciones de Prisma

### Opción 2: Normalizar el schema (recomendado a largo plazo)

Convertir los campos JSON a columnas reales:

```prisma
model Client {
  id         String   @id @default(cuid())
  firebaseId String   @unique
  name       String
  email      String   @unique
  phone      String?
  status     String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  @@map("clients")
}
```

**Ventajas:**
- ✅ Mejor rendimiento
- ✅ Validación de tipos
- ✅ Relaciones entre modelos
- ✅ Búsquedas más rápidas

**Para hacer esto:**
1. Analiza la estructura de cada colección
2. Define los campos específicos en schema.prisma
3. Crea una migración
4. Script de transformación de JSON → campos normalizados

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "Environment variable not found: DATABASE_URL"

→ Asegúrate de que `.env` tiene la línea `DATABASE_URL`

### Error: "Can't reach database server"

```bash
# Verificar que PostgreSQL está corriendo
pg_isready

# Si no está corriendo, iniciarlo
brew services start postgresql@14
```

### Error al importar datos

```bash
# Limpiar y volver a empezar
npm run db:reset
```

### Ver logs de PostgreSQL

```bash
tail -f /usr/local/var/log/postgres.log
```

---

## 📞 SOPORTE

**Archivos importantes:**
- `prisma/schema.prisma` → Definición de modelos
- `scripts/import-to-prisma.ts` → Script de importación
- `backup/*.json` → Datos exportados de Firebase

**Comandos útiles:**

```bash
# Ver estado de PostgreSQL
pg_isready

# Conectar a la BD
psql -U mac evolvance_local

# Ver tablas
psql -U mac evolvance_local -c "\dt"

# Contar registros
psql -U mac evolvance_local -c "SELECT COUNT(*) FROM clients;"
```

---

## 🎉 ¡SIGUIENTE!

Después de completar la migración local:

1. **Adaptar queries de Firebase a Prisma** en tu código Next.js
2. **Probar la aplicación** en local
3. **Deploy en VPS** (usar VPS-DEPLOYMENT.md)
4. **(Opcional) Normalizar schema** para mejor rendimiento

---

**¿Preguntas?** Consulta los archivos de documentación o pregunta. 🚀
