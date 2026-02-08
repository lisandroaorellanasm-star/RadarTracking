import { Zap, Award, Check } from 'lucide-react'

interface ProgramSelectionStepProps {
    data: any
    updateData: (key: string, value: any) => void
}

export function ProgramSelectionStep({ data, updateData }: ProgramSelectionStepProps) {
    const selectedProgram = data.loyalty_program_type || 'stamps'

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Elige tu Programa de Fidelización
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    ¿Cómo quieres premiar a tus clientes? Puedes cambiarlo después.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stamps Card */}
                <div
                    className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${selectedProgram === 'stamps'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                        }`}
                    onClick={() => updateData('loyalty_program_type', 'stamps')}
                >
                    {selectedProgram === 'stamps' && (
                        <div className="absolute top-4 right-4 bg-primary-500 text-white p-1 rounded-full">
                            <Check className="w-4 h-4" />
                        </div>
                    )}
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Estampillas</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        El clásico "compra 10, llevate 1 gratis". Simple y efectivo.
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <li className="flex items-center">✅ Ideal para cafeterías y comida rápida</li>
                        <li className="flex items-center">✅ Muy fácil de entender</li>
                        <li className="flex items-center">✅ Alta conversión inicial</li>
                    </ul>
                </div>

                {/* Levels Card */}
                <div
                    className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${selectedProgram === 'levels'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                        }`}
                    onClick={() => updateData('loyalty_program_type', 'levels')}
                >
                    {selectedProgram === 'levels' && (
                        <div className="absolute top-4 right-4 bg-primary-500 text-white p-1 rounded-full">
                            <Check className="w-4 h-4" />
                        </div>
                    )}
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600">
                        <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Niveles / Puntos</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Acumula puntos por cada dólar gastado. Sube de nivel (Bronce, Plata, Oro).
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <li className="flex items-center">✅ Ideal para retail y servicios</li>
                        <li className="flex items-center">✅ Fomenta tiques más altos</li>
                        <li className="flex items-center">✅ Gamificación (Status)</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
