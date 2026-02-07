'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Plus, Play, Pause, Edit, TrendingUp, Users, Bell, Target } from 'lucide-react'

export default function CampaignsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [campaignName, setCampaignName] = useState('')
    const [campaignType, setCampaignType] = useState('automated')

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Campañas Automatizadas
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Configura campañas inteligentes que se activan automáticamente
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Campaña
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {campaignStats.map((stat, index) => (
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

            {/* Active Campaigns */}
            <Card>
                <CardHeader>
                    <CardTitle>Campañas Activas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {campaigns.map((campaign, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                {campaign.name}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${campaign.isActive
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {campaign.isActive ? 'Activa' : 'Pausada'}
                                            </span>
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                {campaign.type === 'automated' ? 'Automatizada' : 'Manual'}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                                            {campaign.description}
                                        </p>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Target className="w-4 h-4" />
                                            <span>Trigger: {campaign.trigger}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button size="sm" variant="ghost">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost">
                                            {campaign.isActive ? (
                                                <Pause className="w-4 h-4" />
                                            ) : (
                                                <Play className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {/* Campaign Stats */}
                                <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div>
                                        <p className="text-xs text-gray-500">Enviadas</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {campaign.stats.sent}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Entregadas</p>
                                        <p className="text-lg font-bold text-green-600">
                                            {campaign.stats.delivered}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Apertura</p>
                                        <p className="text-lg font-bold text-blue-600">
                                            {campaign.stats.openRate}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Conversión</p>
                                        <p className="text-lg font-bold text-purple-600">
                                            {campaign.stats.conversionRate}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Campaign Templates */}
            <Card>
                <CardHeader>
                    <CardTitle>Plantillas de Campañas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {campaignTemplates.map((template, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all cursor-pointer"
                            >
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${template.bgColor}`}>
                                    {template.icon}
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                    {template.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    {template.description}
                                </p>
                                <Button size="sm" variant="ghost" className="w-full">
                                    Usar Plantilla
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Create Campaign Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nueva Campaña"
                size="lg"
            >
                <div className="space-y-4">
                    <Input
                        label="Nombre de la Campaña"
                        placeholder="Ej: Recuperación de Clientes Inactivos"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                    />

                    <Select
                        label="Tipo de Campaña"
                        options={[
                            { value: 'automated', label: 'Automatizada' },
                            { value: 'manual', label: 'Manual' },
                        ]}
                        value={campaignType}
                        onChange={(e) => setCampaignType(e.target.value)}
                    />

                    <Select
                        label="Trigger"
                        options={[
                            { value: 'geofence_enter', label: 'Cliente entra en zona' },
                            { value: 'geofence_exit', label: 'Cliente sale de zona' },
                            { value: 'inactivity', label: 'Inactividad (días sin visitar)' },
                            { value: 'birthday', label: 'Cumpleaños' },
                            { value: 'points_milestone', label: 'Hito de puntos' },
                        ]}
                    />

                    <Input
                        label="Título del Mensaje"
                        placeholder="Ej: ¡Te extrañamos!"
                    />

                    <Textarea
                        label="Contenido del Mensaje"
                        placeholder="Escribe el mensaje que recibirán los clientes..."
                        rows={4}
                    />

                    <div className="flex space-x-3 pt-4">
                        <Button className="flex-1">
                            Crear Campaña
                        </Button>
                        <Button variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const campaignStats = [
    {
        label: 'Campañas Activas',
        value: '8',
        icon: <TrendingUp className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
        label: 'Alcance Total',
        value: '12.5K',
        icon: <Users className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
        label: 'Tasa Promedio',
        value: '58.2%',
        icon: <Target className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
        label: 'Conversiones',
        value: '2,847',
        icon: <Bell className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
]

const campaigns = [
    {
        name: 'Bienvenida Nuevos Clientes',
        description: 'Mensaje automático cuando un cliente se registra por primera vez',
        type: 'automated',
        trigger: 'Registro de nuevo cliente',
        isActive: true,
        stats: {
            sent: 234,
            delivered: 231,
            openRate: 68,
            conversionRate: 42,
        },
    },
    {
        name: 'Recuperación de Inactivos',
        description: 'Envía un mensaje a clientes que no han visitado en 30 días',
        type: 'automated',
        trigger: '30 días sin visitas',
        isActive: true,
        stats: {
            sent: 156,
            delivered: 152,
            openRate: 42,
            conversionRate: 28,
        },
    },
    {
        name: 'Promoción Fin de Semana',
        description: 'Descuento especial para viernes, sábado y domingo',
        type: 'automated',
        trigger: 'Viernes 10:00 AM',
        isActive: true,
        stats: {
            sent: 1847,
            delivered: 1820,
            openRate: 55,
            conversionRate: 38,
        },
    },
]

const campaignTemplates = [
    {
        name: 'Bienvenida',
        description: 'Saluda a nuevos clientes y ofrece un incentivo inicial',
        icon: <Users className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
        name: 'Geofencing',
        description: 'Notifica cuando clientes entran en tu zona',
        icon: <Target className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
        name: 'Reactivación',
        description: 'Recupera clientes que no han visitado recientemente',
        icon: <TrendingUp className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
]
