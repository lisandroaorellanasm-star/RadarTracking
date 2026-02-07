import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
    children: React.ReactNode
    className?: string
    glass?: boolean
}

export function Card({ children, className, glass = false }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-xl p-6 shadow-lg',
                glass ? 'glass' : 'bg-white dark:bg-gray-800',
                className
            )}
        >
            {children}
        </div>
    )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('mb-4', className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return <h3 className={cn('text-xl font-bold text-gray-900 dark:text-white', className)}>{children}</h3>
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={cn('text-sm text-gray-600 dark:text-gray-400', className)}>{children}</p>
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn(className)}>{children}</div>
}
