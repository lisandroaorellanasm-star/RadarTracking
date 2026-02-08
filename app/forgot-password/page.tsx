'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClientComponentClient()

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${location.origin}/auth/update-password`,
            })

            if (error) throw error
            setSuccess(true)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="text-primary-500">📍</span>
                        RadarTracking
                    </span>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    Recuperar Contraseña
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    Ingresa tu correo para recibir un enlace de recuperación
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-gray-700">
                    {success ? (
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">¡Correo enviado!</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                Revisa tu bandeja de entrada (y spam). Hemos enviado un enlace para restablecer tu contraseña.
                            </p>
                            <Link href="/login">
                                <Button variant="outline" className="w-full">
                                    Volver al inicio de sesión
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleReset}>
                            <Input
                                label="Correo Electrónico"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                            />

                            {error && (
                                <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 border border-red-200 dark:border-red-800">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                                                Error al enviar correo
                                            </h3>
                                            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                                                <p>{error}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <Button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                    isLoading={loading}
                                >
                                    Enviar enlace de recuperación
                                </Button>
                            </div>
                        </form>
                    )}

                    {!success && (
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                                        ¿Te acordaste?
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <Link
                                    href="/login"
                                    className="font-medium text-primary-600 hover:text-primary-500 flex items-center justify-center gap-2 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Volver al inicio de sesión
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
