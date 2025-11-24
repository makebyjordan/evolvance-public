# 🔧 Configuración para Migración PostgreSQL

## 📝 Configuración del archivo .env

Agrega esta línea a tu archivo `.env`:

```bash
DATABASE_URL="postgresql://mac@localhost:5432/evolvance_local?schema=public"
```

## ✅ Estado de la Migración

- ✅ PostgreSQL instalado y funcionando
- ✅ Base de datos `evolvance_local` creada
- ⏳ Pendiente: Configurar DATABASE_URL en .env
- ⏳ Pendiente: Ejecutar `npx prisma migrate dev`
- ⏳ Pendiente: Importar datos desde backup/

## 🎯 Próximos Pasos

1. Abre tu archivo `.env` y agrega el DATABASE_URL de arriba
2. Ejecuta: `npm run db:migrate` (o el comando que crearé)
3. Ejecuta: `npm run db:import` para importar todos los datos
4. Ejecuta: `npx prisma studio` para verificar los datos

## 📊 Colecciones a Migrar (29 total, 157 documentos)

- clients
- collaborators
- company
- contracts
- facturas
- firebaseProjects
- geminiLinks
- htmls
- ias
- images
- invoicesIn
- landAdResponses
- landAds
- objectives
- officeSections
- portfolio
- presentations
- presupuestos
- proposals
- protocols
- servicePages
- services
- tools
- trainingItems
- trainingSubsections
- userStatus
- videos
- webContent
- workSessions
