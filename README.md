<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1msWiDWCGQ_PXhQLpYYcFuJwdchh6Dprz
# RadarTracking

Plataforma SaaS de engagement con geolocalización, notificaciones push y programa de fidelización.

## 🚀 Características

- **GeoPush**: Notificaciones basadas en geolocalización
- **CRM Completo**: Gestión de clientes y historial de visitas
- **Campañas Automatizadas**: Triggers inteligentes
- **Programa de Fidelización**: Tarjetas digitales, puntos y recompensas
- **Analytics en Tiempo Real**: Dashboard con métricas clave
- **Multi-ubicación**: Gestión de múltiples tiendas

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14+ (App Router), TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL + PostGIS, Auth, Realtime, Storage)
- **Mapas**: Google Maps JavaScript API
- **Despliegue**: Vercel

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/radar-enterprise.git
cd radar-enterprise

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Edita .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev
```

## ⚙️ Configuración

Sigue la guía completa en [SETUP_GUIDE.md](./SETUP_GUIDE.md) para configurar:

1. **Supabase**: Base de datos y autenticación
2. **GitHub**: Control de versiones
3. **Vercel**: Despliegue automático
4. **Google Maps**: API de mapas y geolocalización

## 🔑 Variables de Entorno

Crea un archivo `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_google_maps_key
```

## 📁 Estructura del Proyecto

```
radar-enterprise/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Páginas del dashboard
│   ├── login/            # Autenticación
│   └── page.tsx          # Landing page
├── components/            # Componentes reutilizables
│   └── ui/               # Componentes UI
├── lib/                   # Utilidades y configuración
│   ├── supabase/         # Clientes de Supabase
│   ├── types.ts          # Tipos TypeScript
│   └── utils.ts          # Funciones auxiliares
├── supabase/             # Schema y migraciones
│   └── schema.sql        # Esquema de base de datos
└── public/               # Archivos estáticos
```

## 🚦 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## 📊 Base de Datos

El esquema completo está en `supabase/schema.sql` e incluye:

- **profiles**: Usuarios y roles
- **businesses**: Negocios
- **locations**: Ubicaciones con geofences
- **customers**: Base de clientes
- **visits**: Historial de visitas
- **campaigns**: Campañas automatizadas
- **notifications**: Notificaciones enviadas
- **loyalty_cards**: Tarjetas de fidelidad
- **loyalty_points**: Sistema de puntos
- **rewards**: Recompensas disponibles
- **geofence_events**: Eventos de geolocalización

## 🎨 Diseño

- **Glassmorphism**: Efectos de vidrio esmerilado
- **Gradientes Vibrantes**: Paleta azul-púrpura
- **Animaciones**: Transiciones suaves
- **Responsive**: Optimizado para móvil y desktop

## 🔒 Seguridad

- Row Level Security (RLS) en Supabase
- Autenticación JWT
- Variables de entorno para credenciales
- API keys restringidas por dominio

## 📝 Licencia

MIT

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Para soporte o consultas, contacta a: tu@email.com

---

Hecho con ❤️ usando Next.js y Supabase
