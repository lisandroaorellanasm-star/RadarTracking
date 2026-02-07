// Database Types
export interface Profile {
    id: string;
    email: string;
    full_name: string;
    role: 'admin' | 'staff';
    business_id: string;
    avatar_url?: string;
    created_at: string;
}

export interface Business {
    id: string;
    name: string;
    description?: string;
    logo_url?: string;
    industry?: string;
    created_at: string;
}

export interface Location {
    id: string;
    business_id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    geofence_radius: number; // in meters
    geofence_polygon?: GeoJSON.Polygon;
    is_active: boolean;
    created_at: string;
}

export interface Customer {
    id: string;
    business_id: string;
    email?: string;
    phone?: string;
    full_name: string;
    avatar_url?: string;
    total_visits: number;
    last_visit_at?: string;
    loyalty_points: number;
    tags?: string[];
    created_at: string;
}

export interface Visit {
    id: string;
    customer_id: string;
    location_id: string;
    visited_at: string;
    duration_minutes?: number;
    notes?: string;
}

export interface Campaign {
    id: string;
    business_id: string;
    name: string;
    description?: string;
    type: 'manual' | 'automated';
    trigger_type?: 'geofence_enter' | 'geofence_exit' | 'inactivity' | 'birthday' | 'points_milestone';
    trigger_config?: Record<string, any>;
    message_title: string;
    message_body: string;
    is_active: boolean;
    scheduled_at?: string;
    created_at: string;
}

export interface Notification {
    id: string;
    campaign_id?: string;
    customer_id: string;
    title: string;
    body: string;
    sent_at: string;
    delivered_at?: string;
    clicked_at?: string;
    status: 'pending' | 'sent' | 'delivered' | 'failed';
}

export interface LoyaltyCard {
    id: string;
    business_id: string;
    customer_id: string;
    card_number: string;
    qr_code_url: string;
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    issued_at: string;
}

export interface LoyaltyPoints {
    id: string;
    customer_id: string;
    points: number;
    transaction_type: 'earn' | 'redeem';
    reason: string;
    created_at: string;
}

export interface Reward {
    id: string;
    business_id: string;
    name: string;
    description: string;
    points_required: number;
    image_url?: string;
    is_active: boolean;
    stock_quantity?: number;
    created_at: string;
}

export interface GeofenceEvent {
    id: string;
    customer_id: string;
    location_id: string;
    event_type: 'enter' | 'exit';
    latitude: number;
    longitude: number;
    triggered_at: string;
    campaign_triggered?: boolean;
}

// Dashboard Stats
export interface DashboardStats {
    totalCustomers: number;
    activeCustomers: number;
    totalVisits: number;
    notificationsSent: number;
    campaignsActive: number;
    averageVisitDuration: number;
    customerGrowth: number;
    visitGrowth: number;
}

// Chart Data
export interface ChartDataPoint {
    label: string;
    value: number;
}

export interface TimeSeriesData {
    date: string;
    value: number;
}
