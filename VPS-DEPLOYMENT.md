# 🚀 Guía de Deploy en VPS (Producción)

## 📦 ARCHIVOS NECESARIOS PARA SUBIR AL VPS

### Estructura del proyecto a subir:

```
evolvance-public/
├── prisma/
│   ├── schema.prisma          ✅ Necesario
│   └── migrations/             ✅ Necesario (se crea con db:migrate)
├── src/                        ✅ Todo tu código Next.js
├── public/                     ✅ Archivos estáticos
├── package.json                ✅ Necesario
├── package-lock.json           ✅ Necesario
├── tsconfig.json               ✅ Necesario
├── next.config.js              ✅ Necesario
├── tailwind.config.ts          ✅ Si usas Tailwind
├── .env.production             ✅ Variables de producción (crear nuevo)
└── backup/                     ⚠️  Solo si necesitas importar en VPS
```

### Archivos que NO debes subir:

```
❌ node_modules/          (se instala en el VPS)
❌ .next/                  (se genera con build)
❌ .env                    (usar .env.production en su lugar)
❌ config/firebase-admin-key.json
❌ src/generated/prisma/   (se genera automáticamente)
```

---

## 🗄️ INSTALACIÓN DE POSTGRESQL EN VPS

### Opción 1: Ubuntu/Debian

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Iniciar servicio
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verificar instalación
sudo systemctl status postgresql
```

### Opción 2: CentOS/RHEL

```bash
# Instalar PostgreSQL
sudo yum install postgresql-server postgresql-contrib -y

# Inicializar BD
sudo postgresql-setup initdb

# Iniciar servicio
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

---

## 👤 CONFIGURAR USUARIO Y BASE DE DATOS

```bash
# Cambiar a usuario postgres
sudo -u postgres psql

# Dentro de psql, ejecutar:
CREATE DATABASE evolvance_production;
CREATE USER evolvance_user WITH PASSWORD 'TU_CONTRASEÑA_SEGURA_AQUI';
GRANT ALL PRIVILEGES ON DATABASE evolvance_production TO evolvance_user;
\q
```

---

## 🔐 CONFIGURAR ARCHIVO .env.production

Crear en el VPS el archivo `.env.production`:

```bash
# Base de datos
DATABASE_URL="postgresql://evolvance_user:TU_CONTRASEÑA@localhost:5432/evolvance_production?schema=public"

# Next.js
NODE_ENV=production
PORT=3000

# Otras variables de tu proyecto
# (copia las que necesites de tu .env local)
```

---

## 📥 SUBIR PROYECTO AL VPS

### Opción 1: Git (Recomendado)

```bash
# En tu VPS
cd /var/www/
git clone https://github.com/TU_USUARIO/TU_REPO.git evolvance
cd evolvance

# Copiar variables de entorno
cp .env.production .env
```

### Opción 2: SCP/SFTP

```bash
# Desde tu Mac, comprimir proyecto
cd /Users/mac/Desktop/SaJor/evolweb-from-firebase
tar -czf evolvance.tar.gz evolvance-public/ --exclude=node_modules --exclude=.next

# Subir al VPS
scp evolvance.tar.gz usuario@tu-vps-ip:/var/www/

# En el VPS, descomprimir
cd /var/www
tar -xzf evolvance.tar.gz
mv evolvance-public evolvance
```

---

## 🔧 INSTALAR DEPENDENCIAS EN VPS

```bash
cd /var/www/evolvance

# Instalar Node.js (si no está instalado)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar versión
node -v
npm -v

# Instalar dependencias
npm install

# Generar Prisma Client
npm run db:generate
```

---

## 🗃️ EJECUTAR MIGRACIONES EN PRODUCCIÓN

```bash
# Aplicar migraciones a la BD de producción
npx prisma migrate deploy

# Si es la primera vez, importar datos
npm run db:import

# Verificar datos (opcional)
npx prisma studio
```

---

## 🏗️ BUILD DEL PROYECTO

```bash
# Compilar Next.js para producción
npm run build

# Verificar que el build fue exitoso
ls -la .next/
```

---

## 🚀 INICIAR APLICACIÓN EN PRODUCCIÓN

### Opción 1: PM2 (Recomendado)

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Iniciar aplicación
pm2 start npm --name "evolvance" -- start

# Configurar inicio automático
pm2 startup
pm2 save

# Ver logs
pm2 logs evolvance

# Ver estado
pm2 status
```

### Opción 2: systemd Service

Crear archivo `/etc/systemd/system/evolvance.service`:

```ini
[Unit]
Description=Evolvance Next.js App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/evolvance
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Luego:

```bash
sudo systemctl daemon-reload
sudo systemctl start evolvance
sudo systemctl enable evolvance
sudo systemctl status evolvance
```

---

## 🌐 CONFIGURAR NGINX (REVERSE PROXY)

Crear archivo `/etc/nginx/sites-available/evolvance`:

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Activar configuración:

```bash
sudo ln -s /etc/nginx/sites-available/evolvance /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 CONFIGURAR SSL (HTTPS)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado SSL
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Renovación automática (ya configurada por certbot)
sudo certbot renew --dry-run
```

---

## 🔄 ACTUALIZAR LA APLICACIÓN

```bash
# Ir al directorio del proyecto
cd /var/www/evolvance

# Pull últimos cambios (si usas Git)
git pull origin main

# Reinstalar dependencias (si cambió package.json)
npm install

# Aplicar nuevas migraciones de BD
npx prisma migrate deploy

# Regenerar Prisma Client
npm run db:generate

# Rebuild
npm run build

# Reiniciar aplicación
pm2 restart evolvance
# O si usas systemd:
sudo systemctl restart evolvance
```

---

## 📊 MONITOREO

```bash
# Ver logs de PM2
pm2 logs evolvance --lines 100

# Ver logs de systemd
sudo journalctl -u evolvance -f

# Ver logs de Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Ver estado de PostgreSQL
sudo systemctl status postgresql
```

---

## 🆘 TROUBLESHOOTING

### Error: "Can't reach database server"

```bash
# Verificar que PostgreSQL está corriendo
sudo systemctl status postgresql

# Verificar conexión
psql -U evolvance_user -d evolvance_production -h localhost
```

### Error: "Port 3000 already in use"

```bash
# Ver qué proceso usa el puerto
sudo lsof -i :3000

# Matar proceso
sudo kill -9 PID
```

### Error de permisos

```bash
# Dar permisos correctos
sudo chown -R www-data:www-data /var/www/evolvance
sudo chmod -R 755 /var/www/evolvance
```

---

## ✅ CHECKLIST PRE-DEPLOY

- [ ] PostgreSQL instalado y corriendo
- [ ] Usuario y base de datos creados
- [ ] Proyecto subido al VPS
- [ ] `.env.production` configurado correctamente
- [ ] `npm install` completado
- [ ] `npx prisma migrate deploy` ejecutado
- [ ] `npm run build` exitoso
- [ ] PM2 o systemd configurado
- [ ] Nginx configurado
- [ ] SSL/HTTPS configurado
- [ ] Aplicación accesible desde el navegador

---

## 🎉 ¡LISTO!

Tu aplicación debería estar corriendo en:
- HTTP: `http://tu-dominio.com`
- HTTPS: `https://tu-dominio.com`

**Comandos útiles:**

```bash
pm2 status              # Ver estado
pm2 logs evolvance      # Ver logs
pm2 restart evolvance   # Reiniciar
pm2 stop evolvance      # Detener
pm2 start evolvance     # Iniciar
```
