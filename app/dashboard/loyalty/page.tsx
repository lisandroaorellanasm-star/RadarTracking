'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Award, Gift, TrendingUp, Users, Star, QrCode } from 'lucide-react'

export default function LoyaltyPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Programa de Fidelización
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Gestiona tarjetas digitales, puntos y recompensas
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {loyaltyStats.map((stat, index) => (
                    <Card key={index}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Digital Card Preview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tarjeta Digital</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="relative h-48 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-xl p-6 text-white shadow-2xl">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-sm opacity-80">Programa de Fidelidad</p>
                                        <h3 className="text-2xl font-bold">RadarTracking</h3>
                                    </div>
                                    <Award className="w-8 h-8" />
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-sm opacity-80 mb-1">Nivel</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xl font-bold">Gold Member</p>
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                                            <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                                            <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-center">
                                <QrCode className="w-24 h-24 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Código QR para escanear en tienda
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Loyalty Tiers */}
                <Card>
                    <CardHeader>
                        <CardTitle>Niveles de Fidelidad</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {loyaltyTiers.map((tier, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tier.bgColor}`}>
                                                {tier.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">
                                                    {tier.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {tier.pointsRequired} puntos
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {tier.members} miembros
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {tier.benefits.map((benefit, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                                            >
                                                {benefit}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Available Rewards */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recompensas Disponibles</CardTitle>
                        <Button>
                            <Gift className="w-4 h-4 mr-2" />
                            Nueva Recompensa
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {rewards.map((reward, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${reward.bgColor}`}>
                                        <Gift className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">
                                        {reward.points} pts
                                    </span>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                    {reward.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    {reward.description}
                                </p>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        {reward.redeemed} canjeadas
                                    </span>
                                    <span className="text-green-600 font-medium">
                                        {reward.stock} disponibles
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Redemptions */}
            <Card>
                <CardHeader>
                    <CardTitle>Canjes Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {recentRedemptions.map((redemption, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                                        {redemption.customerInitials}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {redemption.customerName}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {redemption.reward}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-purple-600">-{redemption.points} pts</p>
                                    <p className="text-sm text-gray-500">{redemption.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const loyaltyStats = [
    {
        label: 'Miembros Activos',
        value: '2,847',
        icon: <Users className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
        label: 'Puntos Otorgados',
        value: '125K',
        icon: <Star className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    },
    {
        label: 'Recompensas Canjeadas',
        value: '1,234',
        icon: <Gift className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
        label: 'Tasa de Retención',
        value: '87%',
        icon: <TrendingUp className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
    },
]

const loyaltyTiers = [
    {
        name: 'Bronze',
        pointsRequired: 0,
        members: 1245,
        icon: <Award className="w-5 h-5 text-white" />,
        bgColor: 'bg-gradient-to-br from-orange-400 to-orange-500',
        benefits: ['5% descuento', 'Ofertas exclusivas'],
    },
    {
        name: 'Silver',
        pointsRequired: 500,
        members: 892,
        icon: <Award className="w-5 h-5 text-white" />,
        bgColor: 'bg-gradient-to-br from-gray-400 to-gray-500',
        benefits: ['10% descuento', 'Envío gratis', 'Acceso anticipado'],
    },
    {
        name: 'Gold',
        pointsRequired: 1000,
        members: 456,
        icon: <Award className="w-5 h-5 text-white" />,
        bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
        benefits: ['15% descuento', 'Eventos VIP', 'Regalos especiales'],
    },
    {
        name: 'Platinum',
        pointsRequired: 2000,
        members: 254,
        icon: <Award className="w-5 h-5 text-white" />,
        bgColor: 'bg-gradient-to-br from-purple-400 to-purple-500',
        benefits: ['20% descuento', 'Concierge', 'Experiencias únicas'],
    },
]

const rewards = [
    {
        name: 'Café Gratis',
        description: 'Un café de cualquier tamaño',
        points: 100,
        redeemed: 456,
        stock: 1000,
        bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
    {
        name: '10% Descuento',
        description: 'En tu próxima compra',
        points: 200,
        redeemed: 234,
        stock: 500,
        bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
        name: 'Producto Gratis',
        description: 'Cualquier producto hasta $20',
        points: 500,
        redeemed: 89,
        stock: 200,
        bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
]

const recentRedemptions = [
    {
        customerName: 'María González',
        customerInitials: 'MG',
        reward: 'Café Gratis',
        points: 100,
        date: 'Hace 2h',
    },
    {
        customerName: 'Carlos Rodríguez',
        customerInitials: 'CR',
        reward: '10% Descuento',
        points: 200,
        date: 'Hace 5h',
    },
    {
        customerName: 'Ana Martínez',
        customerInitials: 'AM',
        reward: 'Producto Gratis',
        points: 500,
        date: 'Ayer',
    },
]
