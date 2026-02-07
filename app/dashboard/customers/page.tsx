'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Search, Download, Plus, Mail, Phone, MapPin, Calendar, TrendingUp } from 'lucide-react'
import { exportToCSV, formatDate, formatRelativeTime } from '@/lib/utils'

export default function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const filteredCustomers = mockCustomers.filter(customer =>
        customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleExportCSV = () => {
        exportToCSV(mockCustomers, 'clientes-radartracking.csv')
    }

    const openCustomerDetails = (customer: any) => {
        setSelectedCustomer(customer)
        setIsModalOpen(true)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Clientes
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Gestiona tu base de clientes y visualiza su historial
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="secondary" onClick={handleExportCSV}>
                        <Download className="w-4 h-4 mr-2" />
                        Exportar CSV
                    </Button>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Nuevo Cliente
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {customerStats.map((stat, index) => (
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

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Buscar por nombre o email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search className="w-5 h-5 text-gray-400" />}
                            />
                        </div>
                        <Button variant="ghost">Filtros</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Customers Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Clientes ({filteredCustomers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Cliente
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Contacto
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Visitas
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Puntos
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Última Visita
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                                        onClick={() => openCustomerDetails(customer)}
                                    >
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                                                    {customer.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {customer.full_name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">ID: {customer.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                    <Mail className="w-4 h-4 mr-2" />
                                                    {customer.email}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    {customer.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                                                {customer.total_visits} visitas
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                                                {customer.loyalty_points} pts
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatRelativeTime(customer.last_visit_at)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Button size="sm" variant="ghost">
                                                Ver Detalles
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Customer Details Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Detalles del Cliente"
                size="lg"
            >
                {selectedCustomer && (
                    <div className="space-y-6">
                        {/* Customer Info */}
                        <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-2xl font-bold">
                                {selectedCustomer.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {selectedCustomer.full_name}
                                </h3>
                                <div className="mt-2 space-y-1">
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <Mail className="w-4 h-4 mr-2" />
                                        {selectedCustomer.email}
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <Phone className="w-4 h-4 mr-2" />
                                        {selectedCustomer.phone}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Visitas</p>
                                <p className="text-2xl font-bold text-blue-600">{selectedCustomer.total_visits}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Puntos</p>
                                <p className="text-2xl font-bold text-purple-600">{selectedCustomer.loyalty_points}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Última Visita</p>
                                <p className="text-lg font-bold text-green-600">
                                    {formatRelativeTime(selectedCustomer.last_visit_at)}
                                </p>
                            </div>
                        </div>

                        {/* Visit History */}
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Historial de Visitas</h4>
                            <div className="space-y-3">
                                {selectedCustomer.visits.map((visit: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                        <div className="flex items-center space-x-3">
                                            <MapPin className="w-5 h-5 text-primary-600" />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{visit.location}</p>
                                                <p className="text-sm text-gray-500">{formatDate(visit.date)}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {visit.duration} min
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-3">
                            <Button className="flex-1">
                                <Mail className="w-4 h-4 mr-2" />
                                Enviar Notificación
                            </Button>
                            <Button variant="secondary" className="flex-1">
                                Editar Cliente
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

const customerStats = [
    {
        label: 'Total Clientes',
        value: '2,847',
        icon: <TrendingUp className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
        label: 'Nuevos Este Mes',
        value: '234',
        icon: <Plus className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
        label: 'Clientes Activos',
        value: '1,892',
        icon: <TrendingUp className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
        label: 'Promedio Visitas',
        value: '8.4',
        icon: <Calendar className="w-6 h-6 text-white" />,
        bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
]

const mockCustomers = [
    {
        id: 'CUS001',
        full_name: 'María González',
        email: 'maria.gonzalez@email.com',
        phone: '+34 612 345 678',
        total_visits: 15,
        loyalty_points: 680,
        last_visit_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        visits: [
            { location: 'Tienda Centro', date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), duration: 25 },
            { location: 'Tienda Norte', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), duration: 18 },
            { location: 'Tienda Centro', date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), duration: 32 },
        ],
    },
    {
        id: 'CUS002',
        full_name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@email.com',
        phone: '+34 623 456 789',
        total_visits: 8,
        loyalty_points: 320,
        last_visit_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        visits: [
            { location: 'Tienda Sur', date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), duration: 15 },
            { location: 'Tienda Centro', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), duration: 22 },
        ],
    },
    {
        id: 'CUS003',
        full_name: 'Ana Martínez',
        email: 'ana.martinez@email.com',
        phone: '+34 634 567 890',
        total_visits: 22,
        loyalty_points: 950,
        last_visit_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        visits: [
            { location: 'Tienda Norte', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), duration: 28 },
            { location: 'Tienda Centro', date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), duration: 35 },
        ],
    },
    {
        id: 'CUS004',
        full_name: 'Luis Fernández',
        email: 'luis.fernandez@email.com',
        phone: '+34 645 678 901',
        total_visits: 5,
        loyalty_points: 180,
        last_visit_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        visits: [
            { location: 'Tienda Sur', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), duration: 12 },
        ],
    },
    {
        id: 'CUS005',
        full_name: 'Isabel Torres',
        email: 'isabel.torres@email.com',
        phone: '+34 656 789 012',
        total_visits: 18,
        loyalty_points: 720,
        last_visit_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        visits: [
            { location: 'Tienda Centro', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), duration: 20 },
            { location: 'Tienda Norte', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), duration: 30 },
        ],
    },
]
