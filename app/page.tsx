'use client'

import Link from 'next/link'
import { Bell, MapPin, Users, TrendingUp, Smartphone, Target, Gift } from 'lucide-react'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">radartracking</span>
                        </div>
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#caracteristicas" className="text-gray-700 hover:text-orange-600 font-medium transition-colors border-b-2 border-orange-600 pb-1">
                                Características
                            </a>
                            <a href="#clientes" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                                Clientes
                            </a>
                            <a href="#planes" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                                Planes
                            </a>
                            <a href="#preguntas" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                                Preguntas frecuentes
                            </a>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="px-4 py-2 text-orange-600 font-medium hover:text-orange-700 transition-colors flex items-center space-x-2"
                            >
                                <Bell className="w-4 h-4" />
                                <span>Ingresar</span>
                            </Link>
                            <Link
                                href="/login"
                                className="px-6 py-2.5 bg-orange-600 text-white rounded-full font-medium hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                                <Smartphone className="w-4 h-4" />
                                <span>Contáctanos</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in">
                            <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6">
                                Gratis
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Sin límites, sin costos ocultos
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Notificaciones ilimitadas, geolocalización y automatización incluidas desde el primer día
                            </p>
                            <Link
                                href="/login"
                                className="inline-block px-8 py-4 bg-orange-600 text-white rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                            >
                                Comenzar gratis →
                            </Link>
                        </div>
                        <div className="relative animate-slide-up">
                            <div className="relative z-10 mx-auto w-80">
                                {/* Phone mockup */}
                                <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
                                    <div className="bg-white rounded-[2.5rem] overflow-hidden">
                                        {/* Phone screen */}
                                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 pt-12">
                                            <div className="bg-white rounded-2xl p-4 shadow-lg">
                                                <div className="flex items-center space-x-3 mb-3">
                                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                                        <MapPin className="w-5 h-5 text-orange-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm">radartracking</p>
                                                        <p className="text-xs text-gray-500">Ahora</p>
                                                    </div>
                                                </div>
                                                <h3 className="font-bold text-gray-900 mb-1 text-sm">¡Oferta Especial!</h3>
                                                <p className="text-gray-600 text-xs mb-3">
                                                    Estás cerca. Ven hoy y obtén 20% de descuento.
                                                </p>
                                                <div className="bg-gray-50 rounded-xl p-3">
                                                    <div className="w-full aspect-square bg-white rounded-lg flex items-center justify-center mb-2">
                                                        <div className="grid grid-cols-8 gap-1">
                                                            {Array.from({ length: 64 }).map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-600 text-center font-mono">1122334455667</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="caracteristicas" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6">
                                Gratis
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Notificaciones directo al teléfono
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Envía mensajes personalizados que llegan directo al teléfono de tus clientes. No es spam, no SMS o emails - es más efectivo porque aparece como notificación de app.
                            </p>
                            <ul className="space-y-4">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-orange-600"></div>
                                        </div>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl transform rotate-3"></div>
                                <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 shadow-2xl">
                                    <div className="bg-white rounded-2xl p-6">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                                <Bell className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">radartracking</p>
                                                <p className="text-sm text-gray-500">Ahora</p>
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">¡Bienvenido de vuelta!</h3>
                                        <p className="text-gray-600 mb-4">
                                            Tienes 150 puntos disponibles. Canjéalos por recompensas exclusivas.
                                        </p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-orange-50 rounded-xl p-3 text-center">
                                                <Gift className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                                                <p className="text-xs font-semibold text-gray-900">Café gratis</p>
                                                <p className="text-xs text-gray-500">100 pts</p>
                                            </div>
                                            <div className="bg-orange-50 rounded-xl p-3 text-center">
                                                <Target className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                                                <p className="text-xs font-semibold text-gray-900">10% OFF</p>
                                                <p className="text-xs text-gray-500">50 pts</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
                                    {stat.icon}
                                </div>
                                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-orange-600 to-orange-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Comienza a aumentar tus ventas hoy
                    </h2>
                    <p className="text-xl text-orange-100 mb-8">
                        Únete a cientos de negocios que ya están usando RadarTracking
                    </p>
                    <Link
                        href="/login"
                        className="inline-block px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:scale-105"
                    >
                        Comenzar gratis →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold">radartracking</span>
                            </div>
                            <p className="text-gray-400">
                                Plataforma de engagement con geolocalización
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Producto</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Casos de uso</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Empresa</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 RadarTracking. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

const features = [
    'Mensajes gratuitos e ilimitados, sin restricciones',
    'No es spam - aparece como notificación de app, no SMS',
    'Mayor efectividad que emails o mensajes de texto',
    'Activa la geolocalización para avisar a clientes cercanos',
    'Programa los mensajes cuando quieras',
    'Automatiza las notificaciones como prefieras',
]

const stats = [
    {
        icon: <Users className="w-8 h-8 text-orange-600" />,
        value: '10K+',
        label: 'Clientes activos',
    },
    {
        icon: <Bell className="w-8 h-8 text-orange-600" />,
        value: '1M+',
        label: 'Notificaciones enviadas',
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
        value: '85%',
        label: 'Tasa de apertura',
    },
]
