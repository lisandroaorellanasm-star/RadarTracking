-- RadarTracking Database Schema for Supabase
-- PostgreSQL with PostGIS extension

-- Enable PostGIS extension for geolocation features
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'staff')),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BUSINESSES TABLE
-- ============================================
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    logo_url TEXT,
    industry TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- LOCATIONS TABLE
-- ============================================
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    geofence_radius INTEGER DEFAULT 100, -- in meters
    geofence_polygon GEOMETRY(POLYGON, 4326), -- Optional polygon geofence
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spatial index for geolocation queries
CREATE INDEX idx_locations_geofence ON locations USING GIST(ST_MakePoint(longitude, latitude)::geography);

-- ============================================
-- CUSTOMERS TABLE
-- ============================================
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
    email TEXT,
    phone TEXT,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    total_visits INTEGER DEFAULT 0,
    last_visit_at TIMESTAMP WITH TIME ZONE,
    loyalty_points INTEGER DEFAULT 0,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_customers_business ON customers(business_id);
CREATE INDEX idx_customers_email ON customers(email);

-- ============================================
-- VISITS TABLE
-- ============================================
CREATE TABLE visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    duration_minutes INTEGER,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_visits_customer ON visits(customer_id);
CREATE INDEX idx_visits_location ON visits(location_id);
CREATE INDEX idx_visits_date ON visits(visited_at);

-- ============================================
-- CAMPAIGNS TABLE
-- ============================================
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN ('manual', 'automated')),
    trigger_type TEXT CHECK (trigger_type IN ('geofence_enter', 'geofence_exit', 'inactivity', 'birthday', 'points_milestone')),
    trigger_config JSONB, -- Stores configuration like days of inactivity, point threshold, etc.
    message_title TEXT NOT NULL,
    message_body TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_campaigns_business ON campaigns(business_id);
CREATE INDEX idx_campaigns_active ON campaigns(is_active);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivered_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_customer ON notifications(customer_id);
CREATE INDEX idx_notifications_campaign ON notifications(campaign_id);
CREATE INDEX idx_notifications_status ON notifications(status);

-- ============================================
-- LOYALTY CARDS TABLE
-- ============================================
CREATE TABLE loyalty_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
    card_number TEXT UNIQUE NOT NULL,
    qr_code_url TEXT,
    tier TEXT NOT NULL DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_loyalty_cards_customer ON loyalty_cards(customer_id);
CREATE INDEX idx_loyalty_cards_business ON loyalty_cards(business_id);

-- ============================================
-- LOYALTY POINTS TABLE
-- ============================================
CREATE TABLE loyalty_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
    points INTEGER NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('earn', 'redeem')),
    reason TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_loyalty_points_customer ON loyalty_points(customer_id);

-- ============================================
-- REWARDS TABLE
-- ============================================
CREATE TABLE rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    points_required INTEGER NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    stock_quantity INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_rewards_business ON rewards(business_id);

-- ============================================
-- GEOFENCE EVENTS TABLE
-- ============================================
CREATE TABLE geofence_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('enter', 'exit')),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    campaign_triggered BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_geofence_events_customer ON geofence_events(customer_id);
CREATE INDEX idx_geofence_events_location ON geofence_events(location_id);
CREATE INDEX idx_geofence_events_date ON geofence_events(triggered_at);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to check if a point is within a geofence
CREATE OR REPLACE FUNCTION is_point_in_geofence(
    p_latitude DECIMAL,
    p_longitude DECIMAL,
    p_location_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    v_location RECORD;
    v_point GEOGRAPHY;
    v_geofence_center GEOGRAPHY;
    v_distance DECIMAL;
BEGIN
    -- Get location details
    SELECT latitude, longitude, geofence_radius, geofence_polygon
    INTO v_location
    FROM locations
    WHERE id = p_location_id AND is_active = true;
    
    IF NOT FOUND THEN
        RETURN false;
    END IF;
    
    -- Create point from coordinates
    v_point := ST_MakePoint(p_longitude, p_latitude)::geography;
    
    -- Check polygon geofence if exists
    IF v_location.geofence_polygon IS NOT NULL THEN
        RETURN ST_Contains(v_location.geofence_polygon, ST_MakePoint(p_longitude, p_latitude));
    END IF;
    
    -- Check circular geofence
    v_geofence_center := ST_MakePoint(v_location.longitude, v_location.latitude)::geography;
    v_distance := ST_Distance(v_point, v_geofence_center);
    
    RETURN v_distance <= v_location.geofence_radius;
END;
$$ LANGUAGE plpgsql;

-- Function to update customer visit count
CREATE OR REPLACE FUNCTION update_customer_visit_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE customers
    SET total_visits = total_visits + 1,
        last_visit_at = NEW.visited_at
    WHERE id = NEW.customer_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update visit count
CREATE TRIGGER trigger_update_visit_count
AFTER INSERT ON visits
FOR EACH ROW
EXECUTE FUNCTION update_customer_visit_count();

-- Function to update customer loyalty points
CREATE OR REPLACE FUNCTION update_customer_loyalty_points()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.transaction_type = 'earn' THEN
        UPDATE customers
        SET loyalty_points = loyalty_points + NEW.points
        WHERE id = NEW.customer_id;
    ELSIF NEW.transaction_type = 'redeem' THEN
        UPDATE customers
        SET loyalty_points = loyalty_points - NEW.points
        WHERE id = NEW.customer_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update loyalty points
CREATE TRIGGER trigger_update_loyalty_points
AFTER INSERT ON loyalty_points
FOR EACH ROW
EXECUTE FUNCTION update_customer_loyalty_points();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample business
INSERT INTO businesses (name, description, industry)
VALUES ('Demo Business', 'Negocio de demostración', 'Retail');

-- Note: Additional sample data can be added after business_id is known
