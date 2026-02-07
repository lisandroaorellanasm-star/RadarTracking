'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

// Type declaration for google namespace
declare global {
    interface Window {
        google: any
    }
}

// Use window.google to avoid TypeScript errors
const google = typeof window !== 'undefined' ? window.google : undefined

interface MapComponentProps {
    center?: { lat: number; lng: number }
    zoom?: number
    locations?: Array<{
        id: string
        name: string
        latitude: number
        longitude: number
        geofence_radius: number
    }>
    onMapClick?: (lat: number, lng: number) => void
}

export function MapComponent({
    center = { lat: 40.7128, lng: -74.0060 }, // Default: New York
    zoom = 12,
    locations = [],
    onMapClick,
}: MapComponentProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<any>(null)
    const [markers, setMarkers] = useState<any[]>([])
    const [circles, setCircles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Initialize map
    useEffect(() => {
        const initMap = async () => {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

            if (!apiKey) {
                setError('API key de Google Maps no configurada')
                setLoading(false)
                return
            }

            const loader = new Loader({
                apiKey,
                version: 'weekly',
            })

            try {
                setLoading(true)
                const google = await loader.load()

                if (mapRef.current) {
                    const mapInstance = new google.maps.Map(mapRef.current, {
                        center,
                        zoom,
                        mapTypeControl: true,
                        streetViewControl: false,
                        fullscreenControl: true,
                        zoomControl: true,
                        styles: [
                            {
                                featureType: 'poi',
                                elementType: 'labels',
                                stylers: [{ visibility: 'off' }],
                            },
                        ],
                    })

                    setMap(mapInstance)
                    setLoading(false)

                    // Add click listener
                    if (onMapClick) {
                        mapInstance.addListener('click', (e: any) => {
                            if (e.latLng) {
                                onMapClick(e.latLng.lat(), e.latLng.lng())
                            }
                        })
                    }
                }
            } catch (err: any) {
                console.error('Error loading Google Maps:', err)
                setError(err.message || 'Error al cargar Google Maps')
                setLoading(false)
            }
        }

        initMap()
    }, [])

    // Update markers and circles when locations change
    useEffect(() => {
        if (!map) return

        // Clear existing markers and circles
        markers.forEach((marker) => marker.setMap(null))
        circles.forEach((circle) => circle.setMap(null))

        const newMarkers: any[] = []
        const newCircles: any[] = []

        locations.forEach((location) => {
            // Create marker
            const marker = new google.maps.Marker({
                position: { lat: location.latitude, lng: location.longitude },
                map,
                title: location.name,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: '#FF6B35',
                    fillOpacity: 1,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 2,
                },
            })

            // Create info window
            const infoWindow = new google.maps.InfoWindow({
                content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 4px 0; font-weight: bold; color: #1F2937;">${location.name}</h3>
            <p style="margin: 0; color: #6B7280; font-size: 14px;">Radio: ${location.geofence_radius}m</p>
          </div>
        `,
            })

            marker.addListener('click', () => {
                infoWindow.open(map, marker)
            })

            newMarkers.push(marker)

            // Create geofence circle
            const circle = new google.maps.Circle({
                strokeColor: '#FF6B35',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF6B35',
                fillOpacity: 0.15,
                map,
                center: { lat: location.latitude, lng: location.longitude },
                radius: location.geofence_radius,
            })

            newCircles.push(circle)
        })

        setMarkers(newMarkers)
        setCircles(newCircles)

        // Fit bounds to show all locations
        if (locations.length > 0) {
            const bounds = new google.maps.LatLngBounds()
            locations.forEach((location) => {
                bounds.extend({ lat: location.latitude, lng: location.longitude })
            })
            map.fitBounds(bounds)
        }
    }, [map, locations])

    return (
        <div className="relative w-full h-full" style={{ minHeight: '400px' }}>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando mapa...</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-xl">
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Error al cargar el mapa</h3>
                        <p className="text-sm text-gray-600 mb-4">{error}</p>
                        <div className="bg-white rounded-lg p-4 text-left">
                            <p className="text-xs text-gray-700 mb-2"><strong>Posibles soluciones:</strong></p>
                            <ul className="text-xs text-gray-600 space-y-1">
                                <li>• Verifica que la API key esté correcta en .env.local</li>
                                <li>• Habilita "Maps JavaScript API" en Google Cloud Console</li>
                                <li>• Agrega localhost:3000 a las restricciones de la API key</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div
                ref={mapRef}
                className="w-full h-full rounded-xl overflow-hidden shadow-lg"
                style={{ minHeight: '400px', display: loading || error ? 'none' : 'block' }}
            />
        </div>
    )
}
