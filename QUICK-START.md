# ⚡ INICIO RÁPIDO - Migración Firebase → PostgreSQL

## 🎯 3 PASOS PARA COMPLETAR LA MIGRACIÓN

---

### PASO 1: Configurar .env (30 segundos)

1. Abre el archivo `.env` en Windsurf (ya lo tienes abierto)
2. Agrega esta línea:

```bash
DATABASE_URL="postgresql://mac@localhost:5432/evolvance_local?schema=public"
```

3. Guarda el archivo (`Cmd + S`)

---

### PASO 2: Ejecutar migración (1 minuto)

Abre la terminal en Windsurf y ejecuta:

```bash
npm run db:migrate
```

**Qué hace:**
- ✅ Crea 29 tablas en PostgreSQL
- ✅ Genera el Prisma Client
- ✅ Guarda la migración en `prisma/migrations/`

**Resultado esperado:**
```
Your database is now in sync with your schema.
✔ Generated Prisma Client
```

---

### PASO 3: Importar datos (1-2 minutos)

```bash
npm run db:import
```

**Qué hace:**
- ✅ Lee los 29 archivos JSON de `backup/`
- ✅ Importa 157 documentos a PostgreSQL
- ✅ Muestra un resumen al final

**Resultado esperado:**
```
🎉 IMPORTACIÓN COMPLETADA
📊 Total de documentos importados: 157
```

---

## ✅ VERIFICAR QUE TODO FUNCIONÓ

Ejecuta:

```bash
npm run db:studio
```

Esto abrirá `http://localhost:5555` en tu navegador donde podrás ver:
- Las 29 tablas creadas
- Todos los datos importados
- Interfaz visual para explorar

---

## 📊 LO QUE SE CREÓ AUTOMÁTICAMENTE

### ✅ Base de Datos
- **Nombre:** `evolvance_local`
- **Ubicación:** PostgreSQL local en tu Mac
- **Tablas:** 29 (una por cada colección de Firebase)

### ✅ Archivos Creados

| Archivo | Descripción |
|---------|-------------|
| `prisma/schema.prisma` | Schema con 29 modelos |
| `scripts/import-to-prisma.ts` | Script de importación |
| `package.json` | Scripts npm agregados |
| `README-MIGRATION.md` | Documentación completa |
| `MIGRATION-STEPS.md` | Pasos detallados |
| `VPS-DEPLOYMENT.md` | Guía de deploy en VPS |
| `FIREBASE-TO-PRISMA-CODE.md` | Migración de código |
| `MIGRATION-CONFIG.md` | Configuración |
| `QUICK-START.md` | Este archivo |

### ✅ Scripts NPM

```bash
npm run db:migrate    # Crear/actualizar tablas
npm run db:generate   # Regenerar Prisma Client
npm run db:import     # Importar datos
npm run db:studio     # Abrir interfaz visual
npm run db:reset      # Resetear e importar de nuevo
```

---

## 🗂️ ESTRUCTURA DE DATOS

Cada tabla tiene:

```typescript
{
  id: "ckl123..."          // ID autogenerado de Prisma
  firebaseId: "abc123"     // ID original de Firebase
  data: {                  // Todos los datos del documento
    name: "...",
    email: "...",
    // ... resto de campos
  }
  createdAt: "2025-11-10"  // Timestamp de Prisma
  updatedAt: "2025-11-10"  // Timestamp de Prisma
}
```

---

## 🚀 PRÓXIMOS PASOS DESPUÉS DE IMPORTAR

1. **Verificar datos** con Prisma Studio
2. **Leer** `FIREBASE-TO-PRISMA-CODE.md` para adaptar tu código
3. **Probar** la aplicación en local
4. **Leer** `VPS-DEPLOYMENT.md` cuando estés listo para producción

---

## 🆘 SI ALGO FALLA

### ❌ Error: "Environment variable not found"
```bash
# Solución: Verifica que .env tiene DATABASE_URL
cat .env | grep DATABASE_URL
```

### ❌ Error: "Can't reach database server"
```bash
# Solución: Verifica que PostgreSQL está corriendo
pg_isready

# Si no está corriendo:
brew services start postgresql
```

### ❌ Error: "Table already exists"
```bash
# Solución: Resetear y volver a empezar
npm run db:reset
```

### ❌ Quiero empezar de cero
```bash
# Eliminar todo y volver a empezar
rm -rf prisma/migrations
dropdb evolvance_local
createdb evolvance_local
npm run db:migrate
npm run db:import
```

---

## 📞 AYUDA

- **Documentación completa:** `README-MIGRATION.md`
- **Pasos detallados:** `MIGRATION-STEPS.md`
- **Código Firebase → Prisma:** `FIREBASE-TO-PRISMA-CODE.md`
- **Deploy en VPS:** `VPS-DEPLOYMENT.md`

---

## ✨ COMANDOS EN ORDEN

```bash
# 1. Configurar .env (manual)
# Agregar: DATABASE_URL="postgresql://mac@localhost:5432/evolvance_local?schema=public"

# 2. Migrar
npm run db:migrate

# 3. Importar
npm run db:import

# 4. Verificar
npm run db:studio
```

---

## 🎉 ¡LISTO!

Después de ejecutar estos 3 pasos, tendrás:
- ✅ PostgreSQL configurado
- ✅ 29 tablas creadas
- ✅ 157 documentos importados
- ✅ Prisma funcionando
- ✅ Listo para desarrollar

**¡Avísame cuando hayas completado estos pasos!** 🚀
