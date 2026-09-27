import React, { useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Toast';
import {
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  CreditCard,
  Database,
  Info,
  Layers3,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

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

const ADDONS = [
  {
    key: 'auth',
    title: 'Authentication & Roles',
    description: 'User sign-up, JWT authentication and role-based permissions.',
    price: PRICING.authPrice,
    icon: ShieldCheck,
  },
  {
    key: 'database',
    title: 'Database & Storage',
    description: 'PostgreSQL architecture, tables and custom data queries.',
    price: PRICING.databasePrice,
    icon: Database,
  },
  {
    key: 'payments',
    title: 'Payment Gateway',
    description: 'Checkout flows, subscriptions and payment integrations.',
    price: PRICING.paymentsPrice,
    icon: CreditCard,
  },
  {
    key: 'cms',
    title: 'Headless CMS',
    description: 'Content management tools for easier client editing.',
    price: PRICING.cmsPrice,
    icon: Zap,
  },
  {
    key: 'seo',
    title: 'Technical SEO',
    description: 'Metadata, sitemap setup and performance-focused optimization.',
    price: PRICING.seoPrice,
    icon: CheckCircle2,
  },
] as const;

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

  const lineItems = useMemo(() => {
    const items = [
      { label: 'Base Project Setup', cost: PRICING.basePrice },
      {
        label: `${pages} Custom Pages`,
        cost: pages * PRICING.perPagePrice,
      },
    ];

    if (hasAuth) {
      items.push({
        label: 'User Auth & Role Security',
        cost: PRICING.authPrice,
      });
    }

    if (hasDatabase) {
      items.push({
        label: 'PostgreSQL Database Integration',
        cost: PRICING.databasePrice,
      });
    }

    if (hasPayments) {
      items.push({
        label: 'Stripe Payment Gateway',
        cost: PRICING.paymentsPrice,
      });
    }

    if (hasCMS) {
      items.push({
        label: 'Headless CMS Integration',
        cost: PRICING.cmsPrice,
      });
    }

    if (hasSEO) {
      items.push({
        label: 'Technical SEO & Metadata Optimization',
        cost: PRICING.seoPrice,
      });
    }

    return items;
  }, [pages, hasAuth, hasDatabase, hasPayments, hasCMS, hasSEO]);

  const totalEstimate = useMemo(
    () => lineItems.reduce((acc, item) => acc + item.cost, 0),
    [lineItems],
  );

  const selectedAddons = [hasAuth, hasDatabase, hasPayments, hasCMS, hasSEO].filter(
    Boolean,
  ).length;

  const toggleAddon = (key: (typeof ADDONS)[number]['key']) => {
    if (key === 'auth') setHasAuth((value) => !value);
    if (key === 'database') setHasDatabase((value) => !value);
    if (key === 'payments') setHasPayments((value) => !value);
    if (key === 'cms') setHasCMS((value) => !value);
    if (key === 'seo') setHasSEO((value) => !value);
  };

  const isAddonSelected = (key: (typeof ADDONS)[number]['key']) => {
    if (key === 'auth') return hasAuth;
    if (key === 'database') return hasDatabase;
    if (key === 'payments') return hasPayments;
    if (key === 'cms') return hasCMS;
    return hasSEO;
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !clientEmail) {
      showToast(
        'Validation Error',
        'Please fill out your name and email.',
        'error',
      );
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

      showToast(
        'Quote Request Submitted!',
        'We have received your estimate request and will be in touch shortly.',
        'success',
      );

      setClientName('');
      setClientEmail('');
    } catch (err: any) {
      showToast(
        'Submission Failed',
        err.message || 'Could not submit your quote.',
        'error',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0c0c0b] text-white">
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-neutral-300">
            <Calculator className="h-3.5 w-3.5" />
            Project estimator
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
            Build a project around what you actually need.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
            Choose your pages and features to get a live starting estimate.
            Your final quote can be adjusted for the exact scope of your
            project.
          </p>
        </div>

        {/* Estimator */}
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1fr_390px]">
          {/* Controls */}
          <div className="space-y-6">
            {/* Page count */}
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Layers3 className="h-4 w-4 text-neutral-300" />
                    Number of pages
                  </div>
                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    Start with the core pages your website or application
                    needs.
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-3xl font-semibold tracking-tight text-white">
                    {pages}
                  </div>
                  <div className="text-xs text-neutral-500">
                    ${pages * PRICING.perPagePrice}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={pages}
                  onChange={(e) => setPages(parseInt(e.target.value, 10))}
                  aria-label="Number of pages"
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-800 accent-white"
                />

                <div className="mt-3 flex justify-between text-[11px] text-neutral-600">
                  <span>1 page</span>
                  <span>10 pages</span>
                  <span>20 pages</span>
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Additional features
                  </p>
                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    Add functionality when your project calls for it.
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-neutral-400">
                  {selectedAddons} selected
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {ADDONS.map((addon) => {
                  const selected = isAddonSelected(addon.key);
                  const Icon = addon.icon;

                  return (
                    <button
                      key={addon.key}
                      type="button"
                      onClick={() => toggleAddon(addon.key)}
                      aria-pressed={selected}
                      className={`flex w-full items-center justify-between gap-5 rounded-2xl border p-4 text-left transition sm:p-5 ${
                        selected
                          ? 'border-white/25 bg-white/[0.08]'
                          : 'border-white/10 bg-black/10 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        <div
                          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                            selected
                              ? 'border-white/20 bg-white text-neutral-950'
                              : 'border-white/10 bg-white/[0.04] text-neutral-500'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <div className="font-medium text-white">
                            {addon.title}
                          </div>
                          <div className="mt-1 text-xs leading-5 text-neutral-500">
                            {addon.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <span className="text-sm font-medium text-neutral-300">
                          +${addon.price}
                        </span>

                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                            selected
                              ? 'border-white bg-white text-neutral-950'
                              : 'border-white/15 text-transparent'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045]">
              <div className="border-b border-white/10 p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-neutral-400">
                    Estimated project
                  </span>
                  <Sparkles className="h-4 w-4 text-neutral-500" />
                </div>

                <div className="mt-4 flex items-end gap-2">
                  <span className="text-5xl font-semibold tracking-[-0.05em] text-white">
                    ${totalEstimate}
                  </span>
                  <span className="pb-1 text-xs text-neutral-500">
                    starting estimate
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Cost breakdown
                </p>

                <div className="mt-5 space-y-3">
                  {lineItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between gap-4 text-sm"
                    >
                      <span className="text-neutral-400">{item.label}</span>
                      <span className="shrink-0 font-medium text-neutral-200">
                        ${item.cost}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="my-6 border-t border-white/10" />

                <form onSubmit={handleSubmitQuote} className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Ready for an official quote?
                    </p>
                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                      Send us your estimate and we&apos;ll follow up with the
                      next steps.
                    </p>
                  </div>

                  <input
                    type="text"
                    placeholder="Your full name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-white/30"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Your email address"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-white/30"
                    required
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Request official quote'}
                    {!submitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-black/10 p-3.5 text-xs leading-5 text-neutral-500">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                  <span>
                    This is a starting estimate. Final pricing can vary with
                    custom requirements and third-party service costs.
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="h-4 w-4 text-neutral-400" />
            <p className="text-sm text-neutral-400">
              Every project is scoped around its actual requirements.
            </p>
          </div>

          <span className="text-xs text-neutral-600">
            Base setup ${PRICING.basePrice} + ${PRICING.perPagePrice}/page
          </span>
        </div>
      </section>
    </main>
  );
};
