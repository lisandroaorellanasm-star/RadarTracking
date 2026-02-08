'use client'

import React from 'react'
import { AlertCircle } from 'lucide-react'

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-red-50 rounded-xl border border-red-200">
                    <div className="text-center p-6">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Algo salió mal
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 max-w-xs mx-auto">
                            No se pudo cargar este componente. Por favor intenta recargar la página.
                        </p>
                        {this.state.error && (
                            <div className="text-xs text-left bg-white p-2 rounded border border-gray-200 overflow-auto max-h-32 w-full max-w-xs mx-auto">
                                <code className="text-red-800 break-words">
                                    {this.state.error.message}
                                </code>
                            </div>
                        )}
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
