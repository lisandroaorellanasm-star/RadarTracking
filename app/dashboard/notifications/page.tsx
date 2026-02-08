'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Bell, Send, Clock, CheckCircle, XCircle, MapPin, Users } from 'lucide-react'

export default function NotificationsPage() {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [targetType, setTargetType] = useState('all')

    const [isLoading, setIsLoading] = useState(false)

    const handleSendNotification = async () => {
        setIsLoading(true)
        // Simulate API call to avoid blocking main thread immediately
        await new Promise(resolve => setTimeout(resolve, 1000))

        // In production, this would call Supabase Edge Function
        // const { data, error } = await supabase.functions.invoke('send-push', { body: { title, message, targetType } })

        setIsLoading(false)
        alert('Notificación enviada!')
        setTitle('')
        setMessage('')
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Notificaciones Push
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Envía mensajes personalizados a tus clientes
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {notificationStats.map((stat, index) => (
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
                {/* Send Notification Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Enviar Notificación</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Input
                                label="Título"
                                placeholder="Ej: ¡Oferta Especial!"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <Textarea
                                label="Mensaje"
                                placeholder="Escribe tu mensaje aquí..."
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <Select
                                label="Destinatarios"
                                options={[
                                    { value: 'all', label: 'Todos los clientes' },
                                    { value: 'active', label: 'Clientes activos' },
                                    { value: 'inactive', label: 'Clientes inactivos' },
                                    { value: 'vip', label: 'Clientes VIP' },
                                    { value: 'location', label: 'Por ubicación' },
                                ]}
                                value={targetType}
                                onChange={(e) => setTargetType(e.target.value)}
                            />

                            <div className="flex items-center space-x-3 pt-4">
                                <Button className="flex-1" onClick={handleSendNotification} isLoading={isLoading}>
                                    <Send className="w-4 h-4 mr-2" />
                                    {isLoading ? 'Enviando...' : 'Enviar Ahora'}
                                </Button>
                                <Button variant="secondary" className="flex-1">
                                    <Clock className="w-4 h-4 mr-2" />
                                    Programar
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Preview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Vista Previa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                <p className="text-xs text-gray-500 mb-2">Así se verá en el dispositivo:</p>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-600">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 rounded bg-primary-500 flex items-center justify-center">
                                            <Bell className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-900 dark:text-white">
                                                {title || 'Título de la notificación'}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {message || 'El mensaje aparecerá aquí...'}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2">Ahora</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                                    💡 Consejos para mejores resultados
                                </h4>
                                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                    <li>• Mantén el título corto y llamativo</li>
                                    <li>• Personaliza el mensaje cuando sea posible</li>
                                    <li>• Incluye una llamada a la acción clara</li>
                                    <li>• Envía en horarios óptimos (10am-8pm)</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Notification History */}
            <Card>
                <CardHeader>
                    <CardTitle>Historial de Notificaciones</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {notificationHistory.map((notification, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors"
                            >
                                <div className="flex items-start space-x-4 flex-1">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.status === 'delivered' ? 'bg-green-100' :
                                        notification.status === 'sent' ? 'bg-blue-100' :
                                            'bg-red-100'
                                        }`}>
                                        {notification.status === 'delivered' ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : notification.status === 'sent' ? (
                                            <Send className="w-5 h-5 text-blue-600" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                            {notification.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {notification.message}
                                        </p>
                                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                            <span className="flex items-center">
                                                <Users className="w-3 h-3 mr-1" />
                                                {notification.recipients} destinatarios
                                            </span>
                                            <span>•</span>
                                            <span>{notification.delivered} entregadas</span>
                                            <span>•</span>
                                            <span>{notification.clicked} clics</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {notification.sentAt}
                                    </p>
                                    <p className={`text-xs font-medium mt-1 ${notification.status === 'delivered' ? 'text-green-600' :
                                        notification.status === 'sent' ? 'text-blue-600' :
                                            'text-red-600'
                                        }`}>
                                        {notification.status === 'delivered' ? 'Entregada' :
                                            notification.status === 'sent' ? 'Enviada' : 'Fallida'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const notificationStats = [
    {
        label: 'Enviadas Hoy',
        value: '1,234',
        icon: <Send className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
        label: 'Tasa de Entrega',
        value: '98.5%',
        icon: <CheckCircle className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
        label: 'Tasa de Apertura',
        value: '62.3%',
        icon: <Bell className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
        label: 'Total Este Mes',
        value: '18,234',
        icon: <Clock className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
]

const notificationHistory = [
    {
        title: 'Promoción Fin de Semana',
        message: '¡20% de descuento este sábado y domingo!',
        recipients: 2847,
        delivered: 2801,
        clicked: 1542,
        sentAt: 'Hace 2 horas',
        status: 'delivered',
    },
    {
        title: 'Nuevos Productos Disponibles',
        message: 'Descubre nuestra nueva colección de primavera',
        recipients: 1892,
        delivered: 1856,
        clicked: 892,
        sentAt: 'Ayer',
        status: 'delivered',
    },
    {
        title: 'Te extrañamos',
        message: 'Hace tiempo que no te vemos. ¡Vuelve y obtén un regalo!',
        recipients: 456,
        delivered: 448,
        clicked: 156,
        sentAt: 'Hace 3 días',
        status: 'delivered',
    },
    {
        title: 'Bienvenida',
        message: 'Gracias por registrarte. Aquí tienes 100 puntos de bienvenida',
        recipients: 89,
        delivered: 87,
        clicked: 45,
        sentAt: 'Hace 5 días',
        status: 'delivered',
    },
]
