import { QrCode } from 'lucide-react'

interface CardPreviewStepProps {
    data: any
}

export function CardPreviewStep({ data }: CardPreviewStepProps) {
    const isStamps = data.loyalty_program_type === 'stamps'
    const businessName = data.name || 'Tu Negocio'
    const color = isStamps ? 'bg-orange-500' : 'bg-purple-600'
    const textColor = 'text-white'

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    ¡Así se verá tu tarjeta! 🎨
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Tus clientes la agregarán a su Apple Wallet o Google Wallet.
                </p>
            </div>

            <div className="flex justify-center">
                {/* Digital Card Simulation */}
                <div className={`w-80 h-[480px] rounded-3xl shadow-2xl relative overflow-hidden ${color} transition-colors duration-500`}>

                    {/* Top Header */}
                    <div className="p-6 flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            {/* Logo Placeholder */}
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <span className="text-lg">📍</span>
                            </div>
                            <span className={`font-bold text-lg ${textColor} opacity-90`}>
                                {businessName.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="px-6 mt-4">
                        <div className="flex justify-between items-end mb-2">
                            <span className={`text-xs font-medium uppercase tracking-wider ${textColor} opacity-80`}>
                                {isStamps ? 'Tus Estampillas' : 'Nivel Actual'}
                            </span>
                            <span className={`text-2xl font-bold ${textColor}`}>
                                {isStamps ? '2 / 10' : 'PLATA'}
                            </span>
                        </div>

                        {/* Visualization */}
                        {isStamps ? (
                            <div className="grid grid-cols-5 gap-3 mt-4">
                                {[...Array(10)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`aspect-square rounded-full flex items-center justify-center ${i < 2 ? 'bg-white text-orange-500' : 'bg-white/20'
                                            }`}
                                    >
                                        {i < 2 ? '★' : ''}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4">
                                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-2/3 rounded-full"></div>
                                </div>
                                <div className="flex justify-between text-xs text-white/80 mt-2">
                                    <span>0 pts</span>
                                    <span>500 pts (Oro)</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* QR Code Section (Bottom) */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg">
                        <QrCode className="w-32 h-32 text-gray-900" />
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Escanea para sumar {isStamps ? 'estampillas' : 'puntos'}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
