-- Secure admin access and payment-proof foundation

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  );
$$;

-- Payment tracking fields

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid',
  ADD COLUMN IF NOT EXISTS payment_proof_path TEXT,
  ADD COLUMN IF NOT EXISTS payment_submitted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS payment_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS payment_verified_by UUID REFERENCES auth.users(id);

ALTER TABLE public.orders
  ADD CONSTRAINT orders_payment_status_check
  CHECK (payment_status IN ('unpaid', 'proof_submitted', 'verified', 'rejected'));

-- Replace insecure policies with admin-only access

DROP POLICY IF EXISTS "Allow admin full access to leads" ON public.leads;
DROP POLICY IF EXISTS "Allow admin full access to orders" ON public.orders;
DROP POLICY IF EXISTS "Allow admin full access to case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Allow service role full access on leads" ON public.leads;
DROP POLICY IF EXISTS "Allow service role full access on orders" ON public.orders;

DROP POLICY IF EXISTS "Allow public insert to leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public insert to orders" ON public.orders;
DROP POLICY IF EXISTS "Allow public insert for leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public insert for orders" ON public.orders;

CREATE POLICY "Public can submit leads"
  ON public.leads FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can manage leads"
  ON public.leads FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Public can submit orders"
  ON public.orders FOR INSERT TO anon, authenticated
  WITH CHECK (payment_status = 'unpaid');

CREATE POLICY "Admins can manage orders"
  ON public.orders FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Public can view published case studies"
  ON public.case_studies FOR SELECT TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins can manage case studies"
  ON public.case_studies FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can view admin users"
  ON public.admin_users FOR SELECT TO authenticated
  USING (public.is_admin());

-- Private payment-proof storage

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'payment-proofs',
  'payment-proofs',
  false,
  5242880,
  ARRAY['image/png', 'image/jpeg', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'application/pdf'];

DROP POLICY IF EXISTS "Public can upload payment proofs" ON storage.objects;
DROP POLICY IF EXISTS "Admins can view payment proofs" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete payment proofs" ON storage.objects;

CREATE POLICY "Public can upload payment proofs"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'payment-proofs');

CREATE POLICY "Admins can view payment proofs"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'payment-proofs' AND public.is_admin());

CREATE POLICY "Admins can delete payment proofs"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'payment-proofs' AND public.is_admin());
