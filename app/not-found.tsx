import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                404
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Página no encontrada
            </p>
            <Link href="/">
                <Button>
                    Volver al Inicio
                </Button>
            </Link>
        </div>
    )
}
