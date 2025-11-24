# 🚀 Pasos para Completar la Migración

## ✅ YA COMPLETADO

1. ✅ PostgreSQL instalado y funcionando en Mac
2. ✅ Base de datos `evolvance_local` creada
3. ✅ Schema de Prisma con 29 modelos configurado
4. ✅ Scripts de importación creados
5. ✅ Scripts npm agregados al package.json

## 📋 PASOS SIGUIENTES (Debes hacer esto)

### PASO 1: Configurar el archivo .env

Abre tu archivo `.env` (ya lo tienes abierto en Windsurf) y agrega esta línea:

```bash
DATABASE_URL="postgresql://mac@localhost:5432/evolvance_local?schema=public"
```

**Guarda el archivo** después de agregar esta línea.

---

### PASO 2: Ejecutar la migración de Prisma

Una vez configurado el `.env`, ejecuta en tu terminal:

```bash
npm run db:migrate
```

Este comando:
- Creará todas las tablas en PostgreSQL
- Generará el Prisma Client
- Creará la carpeta de migraciones

---

### PASO 3: Importar todos los datos

Ejecuta:

```bash
npm run db:import
```

Este comando importará los 157 documentos desde la carpeta `backup/` a PostgreSQL.

---

### PASO 4: Verificar los datos

Abre Prisma Studio para ver tus datos:

```bash
npm run db:studio
```

Esto abrirá una interfaz visual en `http://localhost:5555` donde podrás ver todas tus tablas y datos.

---

## 🎯 SCRIPTS NPM DISPONIBLES

```bash
npm run db:migrate    # Crear/actualizar tablas en PostgreSQL
npm run db:generate   # Regenerar Prisma Client
npm run db:import     # Importar datos desde backup/
npm run db:studio     # Abrir Prisma Studio (interfaz visual)
npm run db:reset      # Resetear BD e importar de nuevo
```

---

## 🔍 VERIFICACIÓN

Después de importar, deberías tener en PostgreSQL:

- **29 tablas** creadas
- **157 documentos** importados
- Cada documento con su `firebaseId` original
- Todos los datos en el campo `data` (tipo JSON)

---

## 🚨 SI HAY PROBLEMAS

### Error: "Environment variable not found"
→ Asegúrate de que el `.env` tiene la línea `DATABASE_URL` correcta

### Error: "Can't reach database server"
→ Verifica que PostgreSQL está corriendo: `pg_isready`

### Error al importar
→ Ejecuta `npm run db:reset` para limpiar y volver a empezar

---

## 📱 ¿LISTO PARA SEGUIR?

Una vez que hayas completado estos 4 pasos, tendré que ayudarte con:

1. Adaptar tus queries de Firebase a Prisma
2. Configurar el deploy en tu VPS
3. Migrar de PostgreSQL local a PostgreSQL en producción

**¡Avísame cuando hayas completado los pasos 1-4!**
