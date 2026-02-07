'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Users,
    Bell,
    MapPin,
    Award,
    TrendingUp,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Clientes', href: '/dashboard/customers', icon: Users },
    { name: 'Notificaciones', href: '/dashboard/notifications', icon: Bell },
    { name: 'Campañas', href: '/dashboard/campaigns', icon: TrendingUp },
    { name: 'Ubicaciones', href: '/dashboard/locations', icon: MapPin },
    { name: 'Fidelización', href: '/dashboard/loyalty', icon: Award },
    { name: 'Configuración', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <Link href="/dashboard" className="flex items-center space-x-2">
                            <MapPin className="w-8 h-8 text-primary-600" />
                            <span className="text-xl font-bold text-gradient">RadarTracking</span>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                                        isActive
                                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User section */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 mb-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                                AD
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    Admin Demo
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    admin@demo.com
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/login"
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Cerrar Sesión</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex-1" />
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-primary-600 transition-colors" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                    3
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
