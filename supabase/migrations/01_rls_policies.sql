-- Enable RLS on leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert new leads (Lead Capture Form)
CREATE POLICY "Allow public insert for leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Restrict SELECT, UPDATE, DELETE on leads to authenticated service/admin roles only
CREATE POLICY "Allow service role full access on leads"
ON public.leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Enable RLS on orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to submit new orders (OrderModal Form)
CREATE POLICY "Allow public insert for orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Restrict SELECT, UPDATE, DELETE on orders to authenticated service/admin roles only
CREATE POLICY "Allow service role full access on orders"
ON public.orders
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
