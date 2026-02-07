# Guía de Configuración - RadarTracking

Esta guía te ayudará a configurar Supabase, GitHub y Vercel para tu aplicación RadarTracking.

---

## 📋 Checklist de Configuración

- [ ] Crear proyecto en Supabase
- [ ] Ejecutar schema.sql en Supabase
- [ ] Configurar variables de entorno
- [ ] Crear repositorio en GitHub
- [ ] Conectar con Vercel
- [ ] Configurar Google Maps API

---

## 1️⃣ Configuración de Supabase

### Paso 1: Crear Proyecto
1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Crea una nueva organización (si no tienes una)
4. Crea un nuevo proyecto:
   - **Name**: `radartracking` (o el nombre que prefieras)
   - **Database Password**: Guarda esta contraseña de forma segura
   - **Region**: Selecciona la región más cercana a tus usuarios
5. Espera 2-3 minutos mientras se crea el proyecto

### Paso 2: Ejecutar el Schema
1. En tu proyecto de Supabase, ve a **SQL Editor** (icono de base de datos en el menú lateral)
2. Haz clic en "+ New query"
3. Copia todo el contenido del archivo `supabase/schema.sql`
4. Pégalo en el editor SQL
5. Haz clic en "Run" para ejecutar el script
6. Verifica que todas las tablas se crearon correctamente en **Table Editor**

### Paso 3: Obtener las Credenciales
1. Ve a **Project Settings** (icono de engranaje)
2. Selecciona **API** en el menú lateral
3. Copia los siguientes valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Paso 4: Configurar Row Level Security (RLS)
1. Ve a **Authentication** → **Policies**
2. Para cada tabla, habilita RLS
3. Crea políticas básicas (o usa las del archivo `supabase/rls_policies.sql` si lo creamos)

---

## 2️⃣ Configuración de Variables de Entorno

### Crear archivo .env.local
En la raíz del proyecto, crea un archivo `.env.local` con:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Maps (obtener después)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
```

**⚠️ IMPORTANTE**: Nunca subas el archivo `.env.local` a GitHub. Ya está incluido en `.gitignore`.

---

## 3️⃣ Configuración de GitHub

### Paso 1: Crear Repositorio
1. Ve a [https://github.com/new](https://github.com/new)
2. Configura el repositorio:
   - **Repository name**: `radar-enterprise` (o el nombre que prefieras)
   - **Description**: "Plataforma SaaS de engagement con geolocalización"
   - **Visibility**: Private (recomendado) o Public
3. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
4. Haz clic en "Create repository"

### Paso 2: Subir el Código
Ejecuta estos comandos en la terminal (desde la carpeta del proyecto):

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: RadarTracking application"

# Agregar el repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/radar-enterprise.git

# Subir el código
git branch -M main
git push -u origin main
```

---

## 4️⃣ Configuración de Vercel

### Paso 1: Importar Proyecto
1. Ve a [https://vercel.com](https://vercel.com)
2. Haz clic en "Add New..." → "Project"
3. Importa tu repositorio de GitHub:
   - Autoriza a Vercel a acceder a tu GitHub si es necesario
   - Selecciona el repositorio `radar-enterprise`

### Paso 2: Configurar el Proyecto
1. **Framework Preset**: Next.js (se detecta automáticamente)
2. **Root Directory**: `./` (dejar por defecto)
3. **Build Command**: `npm run build` (por defecto)
4. **Output Directory**: `.next` (por defecto)

### Paso 3: Agregar Variables de Entorno
En la sección "Environment Variables", agrega:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Tu URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu anon key de Supabase |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Tu API key de Google Maps |

### Paso 4: Deploy
1. Haz clic en "Deploy"
2. Espera 2-3 minutos mientras se construye y despliega
3. Una vez completado, obtendrás una URL como: `https://radar-enterprise.vercel.app`

---

## 5️⃣ Configuración de Google Maps API

### Paso 1: Crear Proyecto en Google Cloud
1. Ve a [https://console.cloud.google.com](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombre del proyecto: "RadarTracking"

### Paso 2: Habilitar APIs
1. Ve a **APIs & Services** → **Library**
2. Busca y habilita las siguientes APIs:
   - **Maps JavaScript API**
   - **Geocoding API**
   - **Geolocation API**

### Paso 3: Crear API Key
1. Ve a **APIs & Services** → **Credentials**
2. Haz clic en "+ CREATE CREDENTIALS" → "API key"
3. Copia la API key generada

### Paso 4: Restringir la API Key (Recomendado)
1. Haz clic en la API key recién creada
2. En "Application restrictions":
   - Selecciona "HTTP referrers (web sites)"
   - Agrega: `localhost:3000/*` (para desarrollo)
   - Agrega: `*.vercel.app/*` (para producción)
3. En "API restrictions":
   - Selecciona "Restrict key"
   - Marca: Maps JavaScript API, Geocoding API, Geolocation API
4. Guarda los cambios

### Paso 5: Agregar a Variables de Entorno
1. Agrega la API key a tu archivo `.env.local`
2. Actualiza las variables de entorno en Vercel
3. Redeploy la aplicación en Vercel si es necesario

---

## 6️⃣ Verificación Final

### Checklist de Verificación
- [ ] Supabase: Proyecto creado y schema ejecutado
- [ ] Supabase: Credenciales copiadas
- [ ] Variables de entorno configuradas localmente
- [ ] GitHub: Repositorio creado y código subido
- [ ] Vercel: Proyecto importado y desplegado
- [ ] Vercel: Variables de entorno configuradas
- [ ] Google Maps: API key creada y configurada
- [ ] Aplicación funcionando en local (`npm run dev`)
- [ ] Aplicación funcionando en producción (Vercel URL)

### Probar la Aplicación

#### Localmente:
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000)

#### En Producción:
Visita tu URL de Vercel: `https://tu-proyecto.vercel.app`

---

## 🚀 Próximos Pasos

1. **Configurar Autenticación**: Habilita proveedores de auth en Supabase (Email, Google, etc.)
2. **Crear Usuario Admin**: Registra el primer usuario desde la aplicación
3. **Configurar Notificaciones**: Integra Firebase Cloud Messaging para push notifications
4. **Personalizar Diseño**: Ajusta colores y logos según tu marca
5. **Agregar Datos de Prueba**: Crea clientes, ubicaciones y campañas de ejemplo

---

## 📞 Soporte

Si encuentras problemas:
- **Supabase**: [docs.supabase.com](https://docs.supabase.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Google Maps**: [developers.google.com/maps](https://developers.google.com/maps)

---

## 🔐 Seguridad

**IMPORTANTE**:
- Nunca compartas tus API keys públicamente
- Usa variables de entorno para credenciales
- Habilita RLS en todas las tablas de Supabase
- Restringe las API keys de Google Maps por dominio
- Mantén actualizado el archivo `.gitignore`
