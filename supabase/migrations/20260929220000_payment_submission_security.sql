ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_submission_token UUID NOT NULL DEFAULT uuid_generate_v4();

CREATE OR REPLACE FUNCTION public.submit_payment_proof(
  p_order_id UUID,
  p_token UUID,
  p_proof_path TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.orders
  SET payment_status = 'proof_submitted',
      payment_proof_path = p_proof_path,
      payment_submitted_at = now()
  WHERE id = p_order_id
    AND payment_submission_token = p_token
    AND payment_status = 'unpaid';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid order or payment submission token';
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_payment_proof(UUID, UUID, TEXT) TO anon, authenticated;
