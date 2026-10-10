-- =====================================================================
-- Artixain Luxury Gemstone Jewelry Ecosystem: Supabase PostgreSQL Schema
-- Strict Zero-Emoji & Authentic Multi-Tenant Architecture
-- Database Project: artixain (edkzukrfzubfuzsejmvr)
-- =====================================================================

-- 1. PROFILES TABLE (Customer & Artisan Scholar Identity)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  preferred_wrist_size_cm NUMERIC(4,1) DEFAULT 16.5,
  is_admin BOOLEAN DEFAULT FALSE,
  loyalty_tier TEXT DEFAULT 'Artisan_Member',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by owner"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. CUSTOM DESIGNS TABLE (Saved Bracelet Formulas & URL-Safe Tokens)
CREATE TABLE IF NOT EXISTS public.custom_designs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Bracelet',
  design_token TEXT NOT NULL,
  wrist_size_cm NUMERIC(4,1) NOT NULL,
  cord_type TEXT NOT NULL,
  bead_recipe JSONB NOT NULL,
  calculated_price_cents INTEGER NOT NULL,
  thumbnail_svg TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.custom_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own or public designs"
  ON public.custom_designs FOR SELECT
  USING (auth.uid() = user_id OR is_public = TRUE);

CREATE POLICY "Users can create own custom designs"
  ON public.custom_designs FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- 3. ORDERS TABLE (5-Stage Fulfillment State Machine)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_info JSONB NOT NULL,
  items JSONB NOT NULL,
  pricing JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'Placed' CHECK (status IN ('Placed', 'Assembling', 'QC Passed', 'Shipped', 'Delivered')),
  cord_cut_length_cm NUMERIC(4,1) NOT NULL,
  tracking_number TEXT,
  is_made_to_order BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view and update all orders"
  ON public.orders FOR ALL
  USING (
    COALESCE((auth.jwt() -> 'app_metadata' ->> 'role'), '') = 'admin'
    OR auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = TRUE)
  );

-- 4. GEM INVENTORY TABLE (Real-Time 32 Crystal Stock Ledger)
CREATE TABLE IF NOT EXISTS public.gem_inventory (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 500,
  low_stock_threshold INTEGER DEFAULT 20,
  prices_by_diameter JSONB NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.gem_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read gemstone inventory"
  ON public.gem_inventory FOR SELECT
  USING (TRUE);

CREATE POLICY "Only admins can modify gemstone inventory"
  ON public.gem_inventory FOR ALL
  USING (
    COALESCE((auth.jwt() -> 'app_metadata' ->> 'role'), '') = 'admin'
  );

-- 5. AUTOMATED NEW USER TRIGGER (Profiles & SuperAdmin Role Elevation)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  is_admin_user BOOLEAN := FALSE;
BEGIN
  -- Automatically assign admin role if email matches administrative domain or owner address
  IF NEW.email IN ('admin@artixain.com', 'superadmin@artixain.com', 'zainulabedin.remote@gmail.com') THEN
    is_admin_user := TRUE;
  END IF;

  INSERT INTO public.profiles (id, full_name, email, is_admin)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    is_admin_user
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
