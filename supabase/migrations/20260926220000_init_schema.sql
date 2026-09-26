-- ==========================================
-- 1. ENUMS & EXTENSIONS
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'converted', 'archived');
CREATE TYPE order_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE currency_code AS ENUM ('USD', 'NGN');

-- ==========================================
-- 2. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 3. LEADS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  service_type VARCHAR(100) NOT NULL,
  budget VARCHAR(100),
  notes TEXT,
  status lead_status DEFAULT 'new' NOT NULL,
  source VARCHAR(100) DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Trigger for leads
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes for fast lookup
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);

-- ==========================================
-- 4. ORDERS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  package_name VARCHAR(150) NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  currency currency_code DEFAULT 'USD' NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  status order_status DEFAULT 'pending' NOT NULL,
  payment_reference VARCHAR(255),
  requirements TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Trigger for orders
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes for fast lookup
CREATE INDEX idx_orders_lead_id ON public.orders(lead_id);
CREATE INDEX idx_orders_client_email ON public.orders(client_email);
CREATE INDEX idx_orders_status ON public.orders(status);

-- ==========================================
-- 5. CASE STUDIES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
  featured_image VARCHAR(500),
  demo_url VARCHAR(500),
  is_published BOOLEAN DEFAULT false NOT NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Trigger for case studies
CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON public.case_studies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes for case studies
CREATE INDEX idx_case_studies_slug ON public.case_studies(slug);
CREATE INDEX idx_case_studies_is_published ON public.case_studies(is_published);

-- ==========================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------
-- LEADS POLICIES:
-- Anonymous / Unauthenticated users can submit leads (INSERT).
-- Only authenticated admin users can view, update, or delete.
-- ------------------------------------------
CREATE POLICY "Allow public insert to leads"
  ON public.leads
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow admin full access to leads"
  ON public.leads
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.role() = 'authenticated')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role' OR auth.role() = 'authenticated');

-- ------------------------------------------
-- ORDERS POLICIES:
-- Public can place orders (INSERT).
-- Only authenticated admins can read, update, or delete orders.
-- ------------------------------------------
CREATE POLICY "Allow public insert to orders"
  ON public.orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow admin full access to orders"
  ON public.orders
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.role() = 'authenticated')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role' OR auth.role() = 'authenticated');

-- ------------------------------------------
-- CASE STUDIES POLICIES:
-- Anyone (anon + public) can read published case studies (SELECT).
-- Authenticated admins can perform full CRUD operations.
-- ------------------------------------------
CREATE POLICY "Allow public read access to published case studies"
  ON public.case_studies
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Allow admin full access to case studies"
  ON public.case_studies
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.role() = 'authenticated')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role' OR auth.role() = 'authenticated');
