import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'admin@femixdigital.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const record = payload.record || payload;
    const table = payload.table || 'unknown';

    let subject = '';
    let htmlContent = '';

    if (table === 'contacts') {
      subject = `🚀 New Contact Lead: ${record.name}`;
      htmlContent = `
        <h2>New Client Inquiry</h2>
        <p><strong>Name:</strong> ${record.name}</p>
        <p><strong>Email:</strong> ${record.email}</p>
        <p><strong>Project Type:</strong> ${record.project_type}</p>
        <p><strong>Budget:</strong> ${record.budget}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f1f5f9; padding: 10px; border-left: 4px solid #06b6d4;">${record.message}</blockquote>
      `;
    } else if (table === 'orders') {
      subject = `💰 New Estimator Quote: $${record.estimated_total}`;
      htmlContent = `
        <h2>New Project Cost Estimate Submitted</h2>
        <p><strong>Client Name:</strong> ${record.client_name}</p>
        <p><strong>Email:</strong> ${record.client_email}</p>
        <p><strong>Pages:</strong> ${record.pages}</p>
        <p><strong>Add-ons:</strong> Auth (${record.has_auth}), Database (${record.has_database}), Stripe (${record.has_payments})</p>
        <p><strong>Estimated Total:</strong> <span style="color: #10b981; font-weight: bold;">$${record.estimated_total}</span></p>
      `;
    } else {
      subject = `🔔 New Database Event on ${table}`;
      htmlContent = `<pre>${JSON.stringify(record, null, 2)}</pre>`;
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
        subject: subject,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
