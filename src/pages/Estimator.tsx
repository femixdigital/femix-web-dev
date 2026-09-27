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

const USD_TO_NGN = 1500;

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
    description: 'User sign-up, authentication and role-based permissions.',
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

const formatUSD = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

const formatNGN = (amount: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);

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
  const [clientPhone, setClientPhone] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const lineItems = useMemo(() => {
    const items = [
      {
        label: 'Base Project Setup',
        cost: PRICING.basePrice,
      },
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
        label: 'Payment Gateway Integration',
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

  const totalUSD = useMemo(
    () => lineItems.reduce((acc, item) => acc + item.cost, 0),
    [lineItems],
  );

  const totalNGN = totalUSD * USD_TO_NGN;

  const selectedAddons = [
    hasAuth,
    hasDatabase,
    hasPayments,
    hasCMS,
    hasSEO,
  ].filter(Boolean).length;

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

    if (!clientName.trim() || !clientEmail.trim()) {
      showToast(
        'Validation Error',
        'Please fill out your name and email.',
        'error',
      );
      return;
    }

    setSubmitting(true);

    const selectedFeatures = ADDONS.filter((addon) =>
      isAddonSelected(addon.key),
    ).map((addon) => addon.title);

    const requirements = [
      `Estimated pages: ${pages}`,
      `Selected features: ${
        selectedFeatures.length > 0
          ? selectedFeatures.join(', ')
          : 'No additional features'
      }`,
      `Estimated total: ${formatNGN(totalNGN)} (${formatUSD(totalUSD)})`,
      `Reference conversion used: ₦${USD_TO_NGN.toLocaleString('en-NG')} per $1`,
      'This is a starting estimate and not a final invoice.',
    ].join('\n');

    try {
      const { error } = await supabase.from('orders').insert([
        {
          package_name: 'Custom Project Estimate',
          amount: totalNGN,
          currency: 'NGN',
          client_name: clientName.trim(),
          client_email: clientEmail.trim(),
          client_phone: clientPhone.trim() || null,
          status: 'pending',
          requirements,
        },
      ]);

      if (error) throw error;

      showToast(
        'Quote Request Submitted!',
        'We received your estimate request and will contact you with the next steps.',
        'success',
      );

      setClientName('');
      setClientEmail('');
      setClientPhone('');
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Could not submit your quote request.';

      showToast('Submission Failed', message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
            <Calculator className="h-3.5 w-3.5" />
            Project estimator
          </div>

          <h1 className="text-4xl font-bold tracking-[-0.045em] sm:text-6xl">
            Build a project around what you actually need.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
            Select your pages and features to get a live starting estimate in
            both Nigerian Naira and US Dollars.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-sm sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Layers3 className="h-4 w-4 text-violet-500" />
                    Number of pages
                  </div>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-[var(--app-muted)]">
                    Start with the core pages your website or application
                    needs.
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-3xl font-bold tracking-tight">
                    {pages}
                  </div>

                  <div className="text-xs text-[var(--app-muted)]">
                    {formatUSD(pages * PRICING.perPagePrice)}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={pages}
                  onChange={(e) =>
                    setPages(parseInt(e.target.value, 10))
                  }
                  aria-label="Number of pages"
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-violet-600 dark:bg-slate-700"
                />

                <div className="mt-3 flex justify-between text-[11px] text-[var(--app-muted)]">
                  <span>1 page</span>
                  <span>10 pages</span>
                  <span>20 pages</span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-sm sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">Additional features</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">
                    Add functionality when your project calls for it.
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-1.5 text-xs font-semibold text-[var(--app-muted)]">
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
                          ? 'border-violet-300 bg-violet-50 dark:border-violet-500/40 dark:bg-violet-500/10'
                          : 'border-[var(--app-border)] bg-[var(--app-surface-2)] hover:border-violet-300 dark:hover:border-violet-500/40'
                      }`}
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        <div
                          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                            selected
                              ? 'border-violet-200 bg-violet-600 text-white dark:border-violet-400/30'
                              : 'border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-muted)]'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <div className="font-semibold">{addon.title}</div>
                          <div className="mt-1 text-xs leading-5 text-[var(--app-muted)]">
                            {addon.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-bold">
                            {formatUSD(addon.price)}
                          </div>
                          <div className="text-[10px] text-[var(--app-muted)]">
                            {formatNGN(addon.price * USD_TO_NGN)}
                          </div>
                        </div>

                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                            selected
                              ? 'border-violet-600 bg-violet-600 text-white'
                              : 'border-[var(--app-border)] text-transparent'
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

          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[1.75rem] border border-[var(--app-border)] bg-[var(--app-surface)] shadow-lg">
              <div className="border-b border-[var(--app-border)] p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-[var(--app-muted)]">
                    Estimated project
                  </span>

                  <Sparkles className="h-4 w-4 text-amber-500" />
                </div>

                <div className="mt-5">
                  <div className="text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
                    {formatNGN(totalNGN)}
                  </div>

                  <div className="mt-2 text-sm font-medium text-[var(--app-muted)]">
                    ≈ {formatUSD(totalUSD)}
                  </div>

                  <div className="mt-3 inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                    Starting estimate
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                  Cost breakdown
                </p>

                <div className="mt-5 space-y-3">
                  {lineItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between gap-4 text-sm"
                    >
                      <span className="text-[var(--app-muted)]">
                        {item.label}
                      </span>

                      <span className="shrink-0 text-right font-semibold">
                        <span className="block">
                          {formatNGN(item.cost * USD_TO_NGN)}
                        </span>
                        <span className="block text-[11px] font-normal text-[var(--app-muted)]">
                          {formatUSD(item.cost)}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="my-6 border-t border-[var(--app-border)]" />

                <form onSubmit={handleSubmitQuote} className="space-y-3">
                  <div>
                    <p className="text-sm font-bold">
                      Ready for an official quote?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[var(--app-muted)]">
                      Send your estimate and we&apos;ll follow up with the
                      exact project scope.
                    </p>
                  </div>

                  <input
                    type="text"
                    placeholder="Your full name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="mt-3 w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--app-muted)] focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Your email address"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--app-muted)] focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp (optional)"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--app-muted)] focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Request official quote'}
                    {!submitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-3.5 text-xs leading-5 text-[var(--app-muted)]">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />

                  <span>
                    USD/NGN figures are display estimates using a ₦
                    {USD_TO_NGN.toLocaleString('en-NG')}/$1 reference rate.
                    Final pricing depends on the confirmed project scope.
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="h-4 w-4 text-violet-500" />
            <p className="text-sm text-[var(--app-muted)]">
              Every project is scoped around its actual requirements.
            </p>
          </div>

          <span className="text-xs text-[var(--app-muted)]">
            Base {formatUSD(PRICING.basePrice)} +{' '}
            {formatUSD(PRICING.perPagePrice)}/page
          </span>
        </div>
      </section>
    </main>
  );
};
