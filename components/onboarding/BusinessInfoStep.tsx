import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select' // We might need to create this or use standard select
import { Building2, Globe, DollarSign, Phone, Instagram } from 'lucide-react'

interface BusinessInfoStepProps {
    data: any
    updateData: (key: string, value: any) => void
}

export function BusinessInfoStep({ data, updateData }: BusinessInfoStepProps) {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Cuéntanos sobre tu negocio
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Con esta información crearemos una experiencia personalizada para ti. ✨
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Input
                    label="Nombre del Negocio"
                    value={data.name || ''}
                    onChange={(e) => updateData('name', e.target.value)}
                    placeholder="Ej. Cafetería Los Aromas"
                    icon={<Building2 className="w-5 h-5 text-gray-400" />}
                    required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Rubro / Industria
                        </label>
                        <select
                            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={data.industry || ''}
                            onChange={(e) => updateData('industry', e.target.value)}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="restaurante">Restaurante / Café</option>
                            <option value="retail">Tienda / Retail</option>
                            <option value="salud">Salud / Belleza</option>
                            <option value="servicios">Servicios</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            País
                        </label>
                        <select
                            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={data.country || 'US'}
                            onChange={(e) => updateData('country', e.target.value)}
                        >
                            <option value="US">🇺🇸 Estados Unidos</option>
                            <option value="MX">🇲🇽 México</option>
                            <option value="ES">🇪🇸 España</option>
                            <option value="CO">🇨🇴 Colombia</option>
                            <option value="AR">🇦🇷 Argentina</option>
                            <option value="CL">🇨🇱 Chile</option>
                            <option value="PE">🇵🇪 Perú</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Ticket Promedio (USD)"
                        type="number"
                        value={data.average_ticket || ''}
                        onChange={(e) => updateData('average_ticket', e.target.value)}
                        placeholder="0.00"
                        icon={<DollarSign className="w-5 h-5 text-gray-400" />}
                    />

                    <Input
                        label="Teléfono / WhatsApp"
                        value={data.phone || ''}
                        onChange={(e) => updateData('phone', e.target.value)}
                        placeholder="+52 555..."
                        icon={<Phone className="w-5 h-5 text-gray-400" />}
                    />
                </div>

                <Input
                    label="Instagram (Opcional)"
                    value={data.instagram || ''}
                    onChange={(e) => updateData('instagram', e.target.value)}
                    placeholder="@tu_negocio"
                    icon={<Instagram className="w-5 h-5 text-gray-400" />}
                />
            </div>
        </div>
    )
}
