-- Add new columns for Business Onboarding Wizard
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS currency TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS average_ticket DECIMAL(10, 2);
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS instagram TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS loyalty_program_type TEXT CHECK (loyalty_program_type IN ('stamps', 'points', 'levels'));

-- Optional: Update existing rows to have default values if needed
-- UPDATE businesses SET loyalty_program_type = 'stamps' WHERE loyalty_program_type IS NULL;
