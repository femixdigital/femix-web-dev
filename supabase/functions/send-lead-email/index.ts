import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'admin@femixdigital.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const formatAmount = (amount: unknown, currency: unknown) => {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return `${escapeHtml(currency)} ${escapeHtml(amount)}`;
  }

  try {
    return new Intl.NumberFormat(
      currency === 'NGN' ? 'en-NG' : 'en-US',
      {
        style: 'currency',
        currency: currency === 'NGN' ? 'NGN' : 'USD',
      },
    ).format(numericAmount);
  } catch {
    return `${escapeHtml(currency)} ${numericAmount.toLocaleString()}`;
  }
};

const getPayloadTable = (payload: Record<string, unknown>) =>
  String(payload.table || payload.record_type || 'unknown');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured.');
    }

    const payload = await req.json();
    const record = (payload.record || payload.new_record || payload) as Record<
      string,
      unknown
    >;

    const oldRecord = (payload.old_record || {}) as Record<string, unknown>;
    const table = getPayloadTable(payload);

    let subject = '';
    let htmlContent = '';

    if (table === 'leads') {
      subject = `🚀 New Lead: ${escapeHtml(record.full_name)}`;

      htmlContent = `
        <h2>New Client Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(record.full_name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(record.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(record.phone || 'Not provided')}</p>
        <p><strong>Service:</strong> ${escapeHtml(record.service_type)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(record.budget || 'Not provided')}</p>
        <p><strong>Source:</strong> ${escapeHtml(record.source || 'Unknown')}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background:#f1f5f9;padding:12px;border-left:4px solid #ff5a36;">
          ${escapeHtml(record.notes || 'No message provided.')}
        </blockquote>
      `;
    } else if (table === 'orders') {
      const paymentStatus = String(record.payment_status || 'unpaid');
      const previousPaymentStatus = String(
        oldRecord.payment_status || '',
      );

      if (
        paymentStatus === 'proof_submitted' &&
        previousPaymentStatus !== 'proof_submitted'
      ) {
        subject = `💳 Payment Proof Submitted: ${escapeHtml(record.client_name)}`;

        htmlContent = `
          <h2>Payment Proof Submitted</h2>
          <p><strong>Client:</strong> ${escapeHtml(record.client_name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(record.client_email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(record.client_phone || 'Not provided')}</p>
          <p><strong>Package:</strong> ${escapeHtml(record.package_name)}</p>
          <p><strong>Amount:</strong> ${formatAmount(record.amount, record.currency)}</p>
          <p><strong>Order ID:</strong> ${escapeHtml(record.id)}</p>
          <p><strong>Submitted:</strong> ${escapeHtml(record.payment_submitted_at || 'Just now')}</p>
          <p><strong>Proof path:</strong> ${escapeHtml(record.payment_proof_path || 'Not available')}</p>
          <p style="margin-top:20px;">
            Review this payment from the Femix admin dashboard.
          </p>
        `;
      } else {
        subject = `💰 New Project Estimate: ${escapeHtml(record.client_name)}`;

        htmlContent = `
          <h2>New Project Estimate Submitted</h2>
          <p><strong>Client:</strong> ${escapeHtml(record.client_name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(record.client_email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(record.client_phone || 'Not provided')}</p>
          <p><strong>Package:</strong> ${escapeHtml(record.package_name)}</p>
          <p><strong>Amount:</strong> ${formatAmount(record.amount, record.currency)}</p>
          <p><strong>Status:</strong> ${escapeHtml(record.status)}</p>
          <p><strong>Requirements:</strong></p>
          <blockquote style="background:#f1f5f9;padding:12px;border-left:4px solid #1769ff;white-space:pre-wrap;">
            ${escapeHtml(record.requirements || 'No requirements provided.')}
          </blockquote>
        `;
      }
    } else {
      throw new Error(`Unsupported database event: ${table}`);
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Femix Digital Alerts <onboarding@resend.dev>',
        to: [ADMIN_EMAIL],
        subject,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        `Resend request failed: ${JSON.stringify(data)}`,
      );
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown email notification error.';

    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
