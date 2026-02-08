'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Settings, Bell, MapPin, User, Shield, CreditCard, Zap, CheckCircle, AlertCircle } from 'lucide-react'

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        businessName: 'Mi Negocio',
        email: 'admin@demo.com',
        phone: '+1 234 567 8900',
        notificationsEnabled: true,
        geofenceRadius: 100,
        n8nWebhookUrl: '',
    })

    const [isTestingWebhook, setIsTestingWebhook] = useState(false)
    const [webhookStatus, setWebhookStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleTestWebhook = async () => {
        setIsTestingWebhook(true)
        setWebhookStatus('idle')
        try {
            const res = await fetch('/api/webhooks/trigger', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ webhookUrl: settings.n8nWebhookUrl }),
            })
            if (res.ok) {
                setWebhookStatus('success')
            } else {
                setWebhookStatus('error')
            }
        } catch (error) {
            setWebhookStatus('error')
        } finally {
            setIsTestingWebhook(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Configuración
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Administra la configuración de tu cuenta y negocio
                </p>
            </div>

            {/* Integrations Settings - n8n */}
            <Card className="border-orange-500/50 bg-orange-50/5 dark:bg-orange-900/10">
                <CardHeader>
                    <CardTitle className="flex items-center text-orange-600 dark:text-orange-400">
                        <Zap className="w-5 h-5 mr-2" />
                        Integraciones & Automatización (n8n)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Conecta RadarTracking con n8n para automatizar tus flujos de trabajo. Pega aquí tu URL de Webhook.
                    </p>
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <Input
                                label="n8n Webhook URL"
                                placeholder="https://tu-instancia-n8n.com/webhook/..."
                                value={settings.n8nWebhookUrl}
                                onChange={(e) => setSettings({ ...settings, n8nWebhookUrl: e.target.value })}
                            />
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleTestWebhook}
                            disabled={!settings.n8nWebhookUrl || isTestingWebhook}
                            className="mb-[2px]"
                        >
                            {isTestingWebhook ? 'Enviando...' : 'Probar Webhook'}
                        </Button>
                    </div>
                    {webhookStatus === 'success' && (
                        <div className="flex items-center text-green-600 text-sm bg-green-50 p-2 rounded border border-green-200">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Evento de prueba enviado correctamente a n8n.
                        </div>
                    )}
                    {webhookStatus === 'error' && (
                        <div className="flex items-center text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Error al enviar el evento. Verifica la URL.
                        </div>
                    )}
                    <Button variant="primary">
                        Guardar Configuración
                    </Button>
                </CardContent>
            </Card>

            {/* Business Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Información del Negocio
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        label="Nombre del Negocio"
                        value={settings.businessName}
                        onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    />
                    <Input
                        label="Teléfono"
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    />
                    <Button variant="primary">
                        Guardar Cambios
                    </Button>
                </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Bell className="w-5 h-5 mr-2" />
                        Notificaciones
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                                Notificaciones Push
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Recibe notificaciones sobre eventos importantes
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notificationsEnabled}
                                onChange={(e) => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                </CardContent>
            </Card>

            {/* Geofence Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Configuración de Geofence
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        label="Radio de Geofence por Defecto (metros)"
                        type="number"
                        value={settings.geofenceRadius}
                        onChange={(e) => setSettings({ ...settings, geofenceRadius: parseInt(e.target.value) })}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Este radio se aplicará a nuevas ubicaciones por defecto
                    </p>
                    <Button variant="primary">
                        Guardar Configuración
                    </Button>
                </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Seguridad
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline">
                        Cambiar Contraseña
                    </Button>
                    <Button variant="outline">
                        Autenticación de Dos Factores
                    </Button>
                </CardContent>
            </Card>

            {/* Billing Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Facturación
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="font-medium text-gray-900 dark:text-white mb-2">
                            Plan Actual: Gratis
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Actualiza a un plan premium para desbloquear más funciones
                        </p>
                    </div>
                    <Button variant="primary">
                        Ver Planes
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
