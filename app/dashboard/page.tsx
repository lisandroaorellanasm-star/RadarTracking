'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Users, Bell, TrendingUp, MapPin, ArrowUp, ArrowDown } from 'lucide-react'

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Bienvenido de vuelta. Aquí está el resumen de tu negocio.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {stat.label}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                                        {stat.value}
                                    </p>
                                    <div className="flex items-center mt-2">
                                        {stat.change > 0 ? (
                                            <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                                        ) : (
                                            <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                                        )}
                                        <span className={stat.change > 0 ? 'text-green-600' : 'text-red-600'}>
                                            {Math.abs(stat.change)}%
                                        </span>
                                        <span className="text-gray-500 text-sm ml-1">vs mes anterior</span>
                                    </div>
                                </div>
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visits Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Visitas de Clientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-end justify-between space-x-2">
                            {visitData.map((value, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div
                                        className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all hover:from-primary-600 hover:to-primary-500"
                                        style={{ height: `${(value / Math.max(...visitData)) * 100}%` }}
                                    />
                                    <span className="text-xs text-gray-500 mt-2">
                                        {['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notificaciones Enviadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-end justify-between space-x-2">
                            {notificationData.map((value, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div
                                        className="w-full bg-gradient-to-t from-secondary-500 to-secondary-400 rounded-t-lg transition-all hover:from-secondary-600 hover:to-secondary-500"
                                        style={{ height: `${(value / Math.max(...notificationData)) * 100}%` }}
                                    />
                                    <span className="text-xs text-gray-500 mt-2">
                                        {['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Customers */}
                <Card>
                    <CardHeader>
                        <CardTitle>Clientes Recientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentCustomers.map((customer, index) => (
                                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                                        {customer.initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white truncate">
                                            {customer.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {customer.visits} visitas • {customer.points} puntos
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {customer.lastVisit}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Active Campaigns */}
                <Card>
                    <CardHeader>
                        <CardTitle>Campañas Activas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activeCampaigns.map((campaign, index) => (
                                <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                            {campaign.name}
                                        </h4>
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                            Activa
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        {campaign.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">{campaign.sent} enviadas</span>
                                        <span className="text-primary-600 font-medium">{campaign.rate}% tasa de apertura</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const stats = [
    {
        label: 'Total Clientes',
        value: '2,847',
        change: 12.5,
        icon: <Users className="w-7 h-7 text-white" />,
        bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
        label: 'Notificaciones Enviadas',
        value: '18,234',
        change: 8.2,
        icon: <Bell className="w-7 h-7 text-white" />,
        bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
        label: 'Visitas Este Mes',
        value: '4,521',
        change: 15.3,
        icon: <TrendingUp className="w-7 h-7 text-white" />,
        bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
        label: 'Ubicaciones Activas',
        value: '12',
        change: 0,
        icon: <MapPin className="w-7 h-7 text-white" />,
        bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
]

const visitData = [245, 312, 289, 356, 401, 478, 423]
const notificationData = [1200, 1450, 1380, 1620, 1890, 2100, 1950]

const recentCustomers = [
    { name: 'María González', initials: 'MG', visits: 12, points: 450, lastVisit: 'Hoy' },
    { name: 'Carlos Rodríguez', initials: 'CR', visits: 8, points: 320, lastVisit: 'Ayer' },
    { name: 'Ana Martínez', initials: 'AM', visits: 15, points: 680, lastVisit: 'Hace 2d' },
    { name: 'Luis Fernández', initials: 'LF', visits: 5, points: 180, lastVisit: 'Hace 3d' },
]

const activeCampaigns = [
    {
        name: 'Bienvenida Nuevos Clientes',
        description: 'Mensaje automático al registrarse',
        sent: 234,
        rate: 68,
    },
    {
        name: 'Recuperación de Inactivos',
        description: 'Clientes sin visitas en 30 días',
        sent: 156,
        rate: 42,
    },
    {
        name: 'Promoción Fin de Semana',
        description: 'Descuento especial viernes-domingo',
        sent: 1847,
        rate: 55,
    },
]
