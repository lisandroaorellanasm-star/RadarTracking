'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { BusinessInfoStep } from '@/components/onboarding/BusinessInfoStep'
import { ProgramSelectionStep } from '@/components/onboarding/ProgramSelectionStep'
import { CardPreviewStep } from '@/components/onboarding/CardPreviewStep'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'

export default function OnboardingPage() {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        industry: '',
        country: 'US',
        average_ticket: '',
        phone: '',
        instagram: '',
        loyalty_program_type: 'stamps'
    })

    const router = useRouter()
    const supabase = createClientComponentClient()

    const updateData = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    const handleFinish = async () => {
        setLoading(true)
        try {
            // 1. Get current user
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('No user found')

            // 2. Create Business
            const { data: business, error: businessError } = await supabase
                .from('businesses')
                .insert({
                    name: formData.name,
                    industry: formData.industry,
                    country: formData.country,
                    average_ticket: parseFloat(formData.average_ticket) || 0,
                    phone: formData.phone,
                    instagram: formData.instagram,
                    loyalty_program_type: formData.loyalty_program_type
                })
                .select()
                .single()

            if (businessError) throw businessError

            // 3. Create or Update Profile with business_id
            // Check if profile exists first
            const { data: existingProfile } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .single()

            if (existingProfile) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({
                        business_id: business.id,
                        role: 'admin'
                    })
                    .eq('id', user.id)
                if (profileError) throw profileError
            } else {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: user.id,
                        email: user.email,
                        full_name: user.user_metadata.full_name || 'Admin',
                        role: 'admin',
                        business_id: business.id
                    })
                if (profileError) throw profileError
            }

            // Success! Redirect to dashboard
            router.push('/dashboard')
            router.refresh()

        } catch (error) {
            console.error('Error completing onboarding:', error)
            alert('Hubo un error al guardar los datos. Por favor intenta de nuevo.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="flex justify-center mb-4">
                        <span className="text-4xl">🚀</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        ¡Bienvenido a RadarTracking!
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Configura tu negocio en 3 simples pasos.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-8 max-w-md mx-auto">
                    <div
                        className="bg-primary-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
                    <div className="p-8 flex-grow">
                        {step === 1 && <BusinessInfoStep data={formData} updateData={updateData} />}
                        {step === 2 && <ProgramSelectionStep data={formData} updateData={updateData} />}
                        {step === 3 && <CardPreviewStep data={formData} />}
                    </div>

                    {/* Footer / Controls */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            disabled={step === 1}
                            className={step === 1 ? 'invisible' : ''}
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Atrás
                        </Button>

                        {step < 3 ? (
                            <Button onClick={nextStep} disabled={step === 1 && !formData.name}>
                                Siguiente
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button onClick={handleFinish} isLoading={loading}>
                                🎉 Finalizar y Crear Club
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
