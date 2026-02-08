'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CheckCircle, AlertCircle, Lock } from 'lucide-react'

export default function UpdatePassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClientComponentClient()

    useEffect(() => {
        // Verify we have a session (meaning the link worked)
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                setError('Enlace inválido o expirado. Por favor solicita uno nuevo.')
            }
        }
        checkSession()
    }, [supabase.auth])

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            setLoading(false)
            return
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) throw error

            setMessage('¡Contraseña actualizada exitosamente!')

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                router.push('/dashboard')
            }, 2000)

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
                        <span className="text-primary-500">🔐</span>
                        Nueva Contraseña
                    </span>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    Establece tu nueva clave
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-gray-700">
                    {message ? (
                        <div className="text-center animate-fade-in">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{message}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Redirigiendo al Dashboard...
                            </p>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleUpdatePassword}>
                            <Input
                                label="Nueva Contraseña"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                icon={<Lock className="w-5 h-5 text-gray-400" />}
                            />

                            <Input
                                label="Confirmar Contraseña"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                icon={<Lock className="w-5 h-5 text-gray-400" />}
                            />

                            {error && (
                                <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 border border-red-200 dark:border-red-800">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                                                Error
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
                                    className="w-full"
                                    isLoading={loading}
                                >
                                    Actualizar Contraseña
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
