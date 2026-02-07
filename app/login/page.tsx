'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { MapPin, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate login - in production, this would use Supabase auth
        setTimeout(() => {
            router.push('/dashboard')
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2">
                        <MapPin className="w-10 h-10 text-primary-600" />
                        <span className="text-3xl font-bold text-gradient">RadarTracking</span>
                    </Link>
                </div>

                {/* Login Card */}
                <div className="glass rounded-2xl p-8 shadow-2xl">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                        Iniciar Sesión
                    </h1>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="email"
                            label="Correo Electrónico"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<Mail className="w-5 h-5 text-gray-400" />}
                            required
                        />

                        <Input
                            type="password"
                            label="Contraseña"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<Lock className="w-5 h-5 text-gray-400" />}
                            required
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2 rounded" />
                                <span className="text-gray-600 dark:text-gray-400">Recordarme</span>
                            </label>
                            <Link href="/forgot-password" className="text-primary-600 hover:text-primary-700">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Iniciar Sesión
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        ¿No tienes una cuenta?{' '}
                        <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                            Regístrate gratis
                        </Link>
                    </div>
                </div>

                {/* Demo Access */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Acceso de demostración:
                    </p>
                    <div className="glass rounded-lg p-4 text-sm">
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Admin:</strong> admin@demo.com / demo123
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Staff:</strong> staff@demo.com / demo123
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
