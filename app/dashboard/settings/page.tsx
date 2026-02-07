'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Settings, Bell, MapPin, User, Shield, CreditCard } from 'lucide-react'

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        businessName: 'Mi Negocio',
        email: 'admin@demo.com',
        phone: '+1 234 567 8900',
        notificationsEnabled: true,
        geofenceRadius: 100,
    })

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
