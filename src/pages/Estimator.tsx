import React, { useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Toast';
import { Calculator, CheckCircle2, ShieldCheck, Database, CreditCard, Layers, Zap, Info } from 'lucide-react';

interface PricingTier {
  basePrice: number;
  perPagePrice: number;
  authPrice: number;
  databasePrice: number;
  paymentsPrice: number;
  cmsPrice: number;
  seoPrice: number;
}

const PRICING: PricingTier = {
  basePrice: 299,
  perPagePrice: 75,
  authPrice: 250,
  databasePrice: 350,
  paymentsPrice: 300,
  cmsPrice: 200,
  seoPrice: 150,
};

export const Estimator: React.FC = () => {
  const { showToast } = useToast();
  const [pages, setPages] = useState<number>(3);
  const [hasAuth, setHasAuth] = useState<boolean>(false);
  const [hasDatabase, setHasDatabase] = useState<boolean>(false);
  const [hasPayments, setHasPayments] = useState<boolean>(false);
  const [hasCMS, setHasCMS] = useState<boolean>(false);
  const [hasSEO, setHasSEO] = useState<boolean>(false);

  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Live itemized calculation breakdown
  const lineItems = useMemo(() => {
    const items = [
      { label: 'Base Project Setup', cost: PRICING.basePrice },
      { label: `${pages} Custom Pages ($${PRICING.perPagePrice}/ea)`, cost: pages * PRICING.perPagePrice },
    ];

    if (hasAuth) items.push({ label: 'User Auth & Role Security', cost: PRICING.authPrice });
    if (hasDatabase) items.push({ label: 'PostgreSQL Database Integration', cost: PRICING.databasePrice });
    if (hasPayments) items.push({ label: 'Stripe Payment Gateway', cost: PRICING.paymentsPrice });
    if (hasCMS) items.push({ label: 'Headless CMS Integration', cost: PRICING.cmsPrice });
    if (hasSEO) items.push({ label: 'Technical SEO & Metadata Optimization', cost: PRICING.seoPrice });

    return items;
  }, [pages, hasAuth, hasDatabase, hasPayments, hasCMS, hasSEO]);

  const totalEstimate = useMemo(() => {
    return lineItems.reduce((acc, item) => acc + item.cost, 0);
  }, [lineItems]);

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      showToast('Validation Error', 'Please fill out your name and email.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from('orders').insert([
        {
          client_name: clientName,
          client_email: clientEmail,
          pages,
          has_auth: hasAuth,
          has_database: hasDatabase,
          has_payments: hasPayments,
          estimated_total: totalEstimate,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      showToast('Quote Request Submitted!', 'We have received your estimate request and will be in touch shortly.', 'success');
      setClientName('');
      setClientEmail('');
    } catch (err: any) {
      showToast('Submission Failed', err.message || 'Could not submit your quote.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-cyan-400 text-xs font-semibold">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Cost Estimator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Calculate Your Custom Web Build
        </h1>
        <p className="text-slate-400 text-sm">
          Select features and options below to get an instant real-time price estimate for your application.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Page Slider */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Page Count ({pages})</span>
              </label>
              <span className="text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-2.5 py-1 rounded-lg">
                +${pages * PRICING.perPagePrice}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={pages}
              onChange={(e) => setPages(parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-medium">
              <span>1 Page (Landing)</span>
              <span>10 Pages</span>
              <span>20 Pages (Multi-page App)</span>
            </div>
          </div>

          {/* Add-on Toggles */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Technical Add-ons & Integrations
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {/* Auth Toggle */}
              <label
                onClick={() => setHasAuth(!hasAuth)}
                className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer select-none ${
                  hasAuth
                    ? 'bg-cyan-950/30 border-cyan-500/50 text-white'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <ShieldCheck className={`w-5 h-5 ${hasAuth ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-sm font-semibold text-white">Authentication & Roles</div>
                    <div className="text-xs text-slate-500">User sign-up, JWT auth, RBAC permissions</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-cyan-400">+${PRICING.authPrice}</span>
                </div>
              </label>

              {/* Database Toggle */}
              <label
                onClick={() => setHasDatabase(!hasDatabase)}
                className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer select-none ${
                  hasDatabase
                    ? 'bg-cyan-950/30 border-cyan-500/50 text-white'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Database className={`w-5 h-5 ${hasDatabase ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-sm font-semibold text-white">Database & Relational Storage</div>
                    <div className="text-xs text-slate-500">PostgreSQL table architecture & custom queries</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-cyan-400">+${PRICING.databasePrice}</span>
                </div>
              </label>

              {/* Payments Toggle */}
              <label
                onClick={() => setHasPayments(!hasPayments)}
                className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer select-none ${
                  hasPayments
                    ? 'bg-cyan-950/30 border-cyan-500/50 text-white'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className={`w-5 h-5 ${hasPayments ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-sm font-semibold text-white">Stripe Payment Gateway</div>
                    <div className="text-xs text-slate-500">Checkout flows, subscriptions & webhook listener</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-cyan-400">+${PRICING.paymentsPrice}</span>
                </div>
              </label>

              {/* CMS Toggle */}
              <label
                onClick={() => setHasCMS(!hasCMS)}
                className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer select-none ${
                  hasCMS
                    ? 'bg-cyan-950/30 border-cyan-500/50 text-white'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Zap className={`w-5 h-5 ${hasCMS ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-sm font-semibold text-white">Headless CMS Setup</div>
                    <div className="text-xs text-slate-500">Client content editing dashboard integration</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-cyan-400">+${PRICING.cmsPrice}</span>
                </div>
              </label>

              {/* SEO Toggle */}
              <label
                onClick={() => setHasSEO(!hasSEO)}
                className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer select-none ${
                  hasSEO
                    ? 'bg-cyan-950/30 border-cyan-500/50 text-white'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className={`w-5 h-5 ${hasSEO ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-sm font-semibold text-white">Advanced Technical SEO</div>
                    <div className="text-xs text-slate-500">Sitemap generation, OpenGraph metadata & speed tuning</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-cyan-400">+${PRICING.seoPrice}</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Real-Time Price Breakdown Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl sticky top-20 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Itemized Cost Summary
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-black text-white">${totalEstimate}</span>
                <span className="text-xs text-slate-400">Estimated Total</span>
              </div>
            </div>

            {/* Line items list */}
            <div className="space-y-3 text-xs">
              {lineItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-slate-300">
                  <span className="truncate pr-2">{item.label}</span>
                  <span className="font-mono font-semibold text-slate-200">${item.cost}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800">
              <form onSubmit={handleSubmitQuote} className="space-y-3">
                <div className="text-xs font-bold text-white mb-2">Request Official Quote</div>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center space-x-1.5"
                >
                  {submitting ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </form>
            </div>

            <div className="flex items-start space-x-2 text-[10px] text-slate-500 bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Final price may vary based on specific custom requirements or third-party API licensing costs.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
