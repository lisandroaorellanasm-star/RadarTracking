'use client'

import Link from 'next/link'
import { Bell, MapPin, Users, TrendingUp, Smartphone, Zap, Shield, Globe } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="min-h-screen bg-gray-900 text-white selection:bg-orange-500 selection:text-white overflow-x-hidden">
            {/* Navbar */}
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                    scrolled ? 'bg-gray-900/80 backdrop-blur-md border-gray-800 py-3' : 'bg-transparent py-6'
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 group cursor-pointer">
                            <div className="relative">
                                <div className="absolute inset-0 bg-orange-500 blur-lg opacity-50 group-hover:opacity-100 transition-opacity rounded-full"></div>
                                <div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-xl">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                RadarTracking
                            </span>
                        </div>
                        <nav className="hidden md:flex items-center space-x-8">
                            {['Características', 'Integraciones', 'Precios', 'FAQ'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-gray-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide"
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="text-gray-300 hover:text-white font-medium transition-colors hidden sm:block"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/register"
                                className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full font-bold hover:shadow-[0_0_20px_rgba(234,88,12,0.5)] transition-all transform hover:scale-105 active:scale-95"
                            >
                                Comenzar Gratis
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] animate-pulse-slow"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 backdrop-blur-sm mb-8 animate-fade-in-up">
                            <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                            <span className="text-sm text-gray-300 font-medium">Nueva Integración: n8n & Webhooks</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight animate-fade-in-up delay-100">
                            Geomarketing que <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 animate-gradient-x">
                                realmente convierte
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                            Detecta cuando tus clientes están cerca y envíales ofertas irresistibles automáticamente.
                            Sin apps complejas. Directo a su teléfono.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up delay-300">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105"
                            >
                                Probar Demo Gratis
                            </Link>
                            <Link
                                href="#demo"
                                className="w-full sm:w-auto px-8 py-4 bg-gray-800 text-white border border-gray-700 rounded-full font-bold text-lg hover:bg-gray-700 transition-all flex items-center justify-center space-x-2"
                            >
                                <Smartphone className="w-5 h-5 text-gray-400" />
                                <span>Ver cómo funciona</span>
                            </Link>
                        </div>
                    </div>

                    {/* Dashboard Preview / Mockup */}
                    <div className="mt-20 relative animate-fade-in-up delay-500">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl blur opacity-30"></div>
                        <div className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden aspect-video md:aspect-[21/9]">
                            {/* Mock UI */}
                            <div className="absolute inset-0 bg-gray-900 flex">
                                {/* Sidebar Mock */}
                                <div className="w-64 border-r border-gray-800 bg-gray-900/50 hidden md:block p-4 space-y-4">
                                    <div className="h-8 w-8 bg-orange-600 rounded-lg mb-8"></div>
                                    <div className="h-4 w-3/4 bg-gray-800 rounded"></div>
                                    <div className="h-4 w-1/2 bg-gray-800 rounded"></div>
                                    <div className="h-4 w-5/6 bg-gray-800 rounded"></div>
                                </div>
                                {/* Main Content Mock */}
                                <div className="flex-1 p-8 grid grid-cols-3 gap-6">
                                    <div className="col-span-2 space-y-6">
                                        <div className="h-32 bg-gray-800/50 rounded-xl border border-gray-700/50 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-shimmer"></div>
                                        </div>
                                        <div className="h-64 bg-gray-800/50 rounded-xl border border-gray-700/50 flex items-center justify-center">
                                            <div className="text-gray-600 text-sm">Mapa de calor en tiempo real</div>
                                        </div>
                                    </div>
                                    <div className="col-span-1 space-y-6">
                                        <div className="h-40 bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
                                            <div className="h-2 w-1/3 bg-green-500/20 rounded mb-2"></div>
                                            <div className="text-2xl font-bold text-white mb-1">1,240</div>
                                            <div className="text-xs text-gray-500">Visitantes hoy</div>
                                        </div>
                                        <div className="h-40 bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
                                            <div className="h-2 w-1/3 bg-orange-500/20 rounded mb-2"></div>
                                            <div className="text-2xl font-bold text-white mb-1">85%</div>
                                            <div className="text-xs text-gray-500">Conversión</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Overlay Text */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                                <div className="text-center p-8 bg-gray-900/90 border border-gray-700 rounded-2xl shadow-2xl max-w-md backdrop-blur-md">
                                    <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-2">Potencia Real</h3>
                                    <p className="text-gray-400">Dashboard intuitivo para gestionar todas tus campañas y ubicaciones en un solo lugar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="caracteristicas" className="py-24 bg-gray-900 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Todo lo que necesitas para crecer</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Herramientas profesionales simplificadas para dueños de negocios, no para ingenieros de la NASA.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <div key={i} className="group p-8 bg-gray-800/50 border border-gray-700/50 rounded-3xl hover:bg-gray-800 hover:border-orange-500/30 transition-all hover:-translate-y-1">
                                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integrations (n8n focus) */}
            <section id="integraciones" className="py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Potencia visual con <span className="text-orange-500">n8n</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8">
                                Conecta RadarTracking con más de 200 aplicaciones. Automatiza flujos de trabajo complejos visualmente sin escribir una sola línea de código.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center space-x-3 text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">✓</div>
                                    <span>Sincroniza contactos con CRM automáticamente</span>
                                </li>
                                <li className="flex items-center space-x-3 text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">✓</div>
                                    <span>Envía alertas a Slack o Telegram</span>
                                </li>
                                <li className="flex items-center space-x-3 text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">✓</div>
                                    <span>Dispara campañas de email marketing</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-full blur-[100px] opacity-20"></div>
                            <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl relative">
                                {/* Workflow Mock Visual */}
                                <div className="flex flex-col items-center space-y-6">
                                    <div className="flex items-center space-x-4 w-full">
                                        <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 flex-1 flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center"><MapPin className="text-white w-6" /></div>
                                            <div><div className="text-white font-bold">Cliente Entra</div><div className="text-xs text-gray-500">RadarTracking Trigger</div></div>
                                        </div>
                                    </div>
                                    <div className="h-8 w-0.5 bg-gray-700"></div>
                                    <div className="flex items-center space-x-4 w-full">
                                        <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 flex-1 flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"><Globe className="text-white w-6" /></div>
                                            <div><div className="text-white font-bold">Filtrar Datos</div><div className="text-xs text-gray-500">n8n Logic</div></div>
                                        </div>
                                    </div>
                                    <div className="h-8 w-0.5 bg-gray-700"></div>
                                    <div className="flex px-8 w-full justify-between">
                                        <div className="p-3 bg-gray-800 rounded-xl border border-gray-700 w-24 flex flex-col items-center text-center">
                                            <div className="w-8 h-8 bg-green-600 rounded-full mb-2"></div>
                                            <div className="text-xs text-gray-300">WhatsApp</div>
                                        </div>
                                        <div className="p-3 bg-gray-800 rounded-xl border border-gray-700 w-24 flex flex-col items-center text-center">
                                            <div className="w-8 h-8 bg-yellow-600 rounded-full mb-2"></div>
                                            <div className="text-xs text-gray-300">Email</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-32 bg-gray-900 border-t border-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-orange-600/5"></div>
                <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                        ¿Listo para dominar tu ubicación?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Únete a la revolución del geomarketing. Sin tarjetas de crédito requeridas para empezar.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105"
                    >
                        Crear Cuenta Gratis
                    </Link>
                </div>
            </section>

            {/* Footer simple */}
            <footer className="bg-black py-12 border-t border-gray-900">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
                    <p>&copy; {new Date().getFullYear()} RadarTracking. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    )
}

const features = [
    {
        icon: <Bell className="w-6 h-6 text-orange-500" />,
        title: "Notificaciones Push",
        desc: "Llega directo a la pantalla de bloqueo. Tasa de apertura 5x mayor que el email."
    },
    {
        icon: <Target className="w-6 h-6 text-blue-500" />,
        title: "Geofencing Preciso",
        desc: "Define perímetros virtuales desde 50 metros. Tu competencia no sabrá qué pasó."
    },
    {
        icon: <Shield className="w-6 h-6 text-green-500" />,
        title: "Privacidad Primero",
        desc: "Cumplimos con GDPR y normas locales. Tus datos y los de tus clientes están seguros."
    },
]

function Target(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    )
}
