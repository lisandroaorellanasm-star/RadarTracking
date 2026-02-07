'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { MapComponent } from '@/components/MapComponent'
import { MapPin, Plus, Edit, Trash, Navigation } from 'lucide-react'

export default function LocationsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState<any>(null)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Ubicaciones
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Gestiona tus ubicaciones y configura geofences
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Ubicación
                </Button>
            </div>

            {/* Interactive Map */}
            <Card>
                <CardContent className="pt-6">
                    <MapComponent
                        center={{ lat: 40.416775, lng: -3.703790 }}
                        zoom={12}
                        locations={locations.map(loc => ({
                            id: loc.name,
                            name: loc.name,
                            latitude: loc.latitude,
                            longitude: loc.longitude,
                            geofence_radius: loc.geofenceRadius,
                        }))}
                    />
                </CardContent>
            </Card>

            {/* Locations List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location, index) => (
                    <Card key={index} className="hover:shadow-xl transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                        {location.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        {location.address}
                                    </p>
                                </div>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${location.isActive ? 'bg-green-100' : 'bg-gray-100'
                                    }`}>
                                    <MapPin className={`w-5 h-5 ${location.isActive ? 'text-green-600' : 'text-gray-600'
                                        }`} />
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                    <Navigation className="w-4 h-4 mr-2" />
                                    Radio: {location.geofenceRadius}m
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Coordenadas: {location.latitude}, {location.longitude}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div>
                                    <p className="text-xs text-gray-500">Visitas Hoy</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {location.visitsToday}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Clientes Cerca</p>
                                    <p className="text-lg font-bold text-primary-600">
                                        {location.customersNearby}
                                    </p>
                                </div>
                            </div>

                            <div className="flex space-x-2 mt-4">
                                <Button size="sm" variant="ghost" className="flex-1">
                                    <Edit className="w-4 h-4 mr-1" />
                                    Editar
                                </Button>
                                <Button size="sm" variant="ghost" className="flex-1">
                                    <Trash className="w-4 h-4 mr-1" />
                                    Eliminar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Add Location Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nueva Ubicación"
                size="lg"
            >
                <div className="space-y-4">
                    <Input
                        label="Nombre de la Ubicación"
                        placeholder="Ej: Tienda Centro"
                    />

                    <Input
                        label="Dirección"
                        placeholder="Calle Principal 123, Ciudad"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Latitud"
                            type="number"
                            step="0.000001"
                            placeholder="40.416775"
                        />
                        <Input
                            label="Longitud"
                            type="number"
                            step="0.000001"
                            placeholder="-3.703790"
                        />
                    </div>

                    <Input
                        label="Radio del Geofence (metros)"
                        type="number"
                        placeholder="100"
                    />

                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            💡 <strong>Consejo:</strong> Puedes hacer clic en el mapa para seleccionar las coordenadas automáticamente.
                        </p>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Button className="flex-1">
                            Guardar Ubicación
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

const locations = [
    {
        name: 'Tienda Centro',
        address: 'Calle Mayor 45, Madrid',
        latitude: 40.416775,
        longitude: -3.703790,
        geofenceRadius: 100,
        isActive: true,
        visitsToday: 45,
        customersNearby: 12,
    },
    {
        name: 'Tienda Norte',
        address: 'Av. de la Castellana 120, Madrid',
        latitude: 40.465631,
        longitude: -3.688344,
        geofenceRadius: 150,
        isActive: true,
        visitsToday: 32,
        customersNearby: 8,
    },
    {
        name: 'Tienda Sur',
        address: 'Calle de Atocha 89, Madrid',
        latitude: 40.408566,
        longitude: -3.693514,
        geofenceRadius: 100,
        isActive: true,
        visitsToday: 28,
        customersNearby: 5,
    },
    {
        name: 'Tienda Este',
        address: 'Calle de Alcalá 200, Madrid',
        latitude: 40.426371,
        longitude: -3.668910,
        geofenceRadius: 120,
        isActive: false,
        visitsToday: 0,
        customersNearby: 0,
    },
]
