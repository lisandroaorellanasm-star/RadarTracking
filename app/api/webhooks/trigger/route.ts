import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { webhookUrl } = await req.json()

        if (!webhookUrl) {
            return NextResponse.json(
                { error: 'Webhook URL is required' },
                { status: 400 }
            )
        }

        // Validate URL format
        try {
            new URL(webhookUrl)
        } catch (e) {
            return NextResponse.json(
                { error: 'Invalid Webhook URL' },
                { status: 400 }
            )
        }

        const samplePayload = {
            event: 'test_event',
            timestamp: new Date().toISOString(),
            data: {
                message: 'Hello from RadarTracking!',
                user: 'Test User',
                location: {
                    lat: 40.7128,
                    lng: -74.0060,
                    name: 'New York City'
                }
            }
        }

        // Send request to n8n
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'RadarTracking-Webhook-Tester'
            },
            body: JSON.stringify(samplePayload)
        })

        if (!response.ok) {
            throw new Error(`n8n responded with status: ${response.status}`)
        }

        return NextResponse.json({ success: true, message: 'Webhook triggered successfully' })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to trigger webhook' },
            { status: 500 }
        )
    }
}
