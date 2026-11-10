import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const USD_TO_NGN = 1380;

const PRICING: PricingTier = {
  basePrice: 149,
  perPagePrice: 30,
  authPrice: 150,
  databasePrice: 200,
  paymentsPrice: 150,
  cmsPrice: 100,
  seoPrice: 75,
};

const ADDONS = [
  {
    key: 'auth',
    title: 'Authentication & Roles',
    description: 'User accounts and access permissions.',
    price: PRICING.authPrice,
    icon: ShieldCheck,
  },
  {
    key: 'database',
    title: 'Database & Storage',
    description: 'Store and manage website data.',
    price: PRICING.databasePrice,
    icon: Database,
  },
  {
    key: 'payments',
    title: 'Payment Gateway',
    description: 'Accept online payments from customers.',
    price: PRICING.paymentsPrice,
    icon: CreditCard,
  },
  {
    key: 'cms',
    title: 'Headless CMS',
    description: 'Update website content without coding.',
    price: PRICING.cmsPrice,
    icon: Zap,
  },
  {
    key: 'seo',
    title: 'Technical SEO',
    description:
      'Improve search engine setup and visibility.',
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
  const navigate = useNavigate();

  const [pages, setPages] = useState<number>(0);
  const [hasAuth, setHasAuth] = useState<boolean>(false);
  const [hasDatabase, setHasDatabase] = useState<boolean>(false);
  const [hasPayments, setHasPayments] = useState<boolean>(false);
  const [hasCMS, setHasCMS] = useState<boolean>(false);
  const [hasSEO, setHasSEO] = useState<boolean>(false);

  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const hasSelection =
    pages > 0 ||
    hasAuth ||
    hasDatabase ||
    hasPayments ||
    hasCMS ||
    hasSEO;

  const lineItems = useMemo(() => {
    const items: { label: string; cost: number }[] = [];

    if (pages > 0 || hasAuth || hasDatabase || hasPayments || hasCMS || hasSEO) {
      items.push({
        label: 'Base Project Setup',
        cost: PRICING.basePrice,
      });
    }

    if (pages > 0) {
      items.push({
        label: `${pages} ${pages === 1 ? 'Custom Page' : 'Custom Pages'}`,
        cost: pages * PRICING.perPagePrice,
      });
    }

    if (hasAuth) {
      items.push({
        label: 'Authentication & Roles',
        cost: PRICING.authPrice,
      });
    }

    if (hasDatabase) {
      items.push({
        label: 'Database & Storage',
        cost: PRICING.databasePrice,
      });
    }

    if (hasPayments) {
      items.push({
        label: 'Payment Gateway',
        cost: PRICING.paymentsPrice,
      });
    }

    if (hasCMS) {
      items.push({
        label: 'Content Management System',
        cost: PRICING.cmsPrice,
      });
    }

    if (hasSEO) {
      items.push({
        label: 'Technical SEO',
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

    if (!hasSelection) {
      showToast(
        'Select your project requirements',
        'Choose at least one page or feature before requesting a quote.',
        'error',
      );
      return;
    }

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
      pages > 0
        ? `Custom pages: ${pages}`
        : 'Custom pages: Not selected',
      `Selected features: ${
        selectedFeatures.length > 0
          ? selectedFeatures.join(', ')
          : 'None'
      }`,
      `Base setup fee: ${formatUSD(PRICING.basePrice)}`,
      `Estimated total: ${formatNGN(totalNGN)} (${formatUSD(totalUSD)})`,
      `Reference exchange rate: ₦${USD_TO_NGN.toLocaleString('en-NG')} per $1`,
      'Estimate only. Final pricing is confirmed after project review.',
    ].join('\n');

    try {
      const orderId = crypto.randomUUID();
      const paymentSubmissionToken = crypto.randomUUID();

      const { error } = await supabase.from('orders').insert([
        {
          id: orderId,
          payment_submission_token: paymentSubmissionToken,
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

      sessionStorage.setItem(
        'femix_payment_order',
        JSON.stringify({
          orderId,
          paymentSubmissionToken,
          amount: totalNGN,
          packageName: 'Custom Project Estimate',
        }),
      );

      setClientName('');
      setClientEmail('');
      setClientPhone('');

      navigate('/payment');
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
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="border-b border-[var(--app-border)] bg-[var(--app-surface)]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                <Calculator className="h-3.5 w-3.5 text-[var(--app-brand)]" />
                Project estimator
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Get an estimate for your website or application.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
                Select your pages and features to create a live starting
                estimate in Nigerian Naira and US Dollars.
              </p>
            </div>

            <div className="border-t border-[var(--app-border)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-base font-bold uppercase tracking-[0.18em] text-[var(--app-muted)]">
                How to get your estimate
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  'Select the number of pages',
                  'Choose the features you need',
                  'View your estimated cost',
                  'Request a final quote',
                ].map((item, index) => (
                  <div key={item} className="flex min-h-16 items-center gap-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--app-brand)] hover:shadow-md">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--app-brand-soft)] text-base font-extrabold text-[var(--app-brand)]">
                      {index + 1}
                    </span>
                    <p className="text-base font-semibold leading-6 text-[var(--app-text)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
            <div className="space-y-6">
              <section className="overflow-hidden rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)]">
                <div className="border-b border-[var(--app-border)] p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2 text-base font-bold">
                        <Layers3 className="h-4 w-4 text-[var(--app-brand)]" />
                        Number of pages
                      </div>

                      <p className="mt-2 max-w-lg text-base leading-6 text-[var(--app-muted)]">
                        Your base setup includes responsive design, navigation, standard content sections, contact details and social links, plus deployment. Choose the number of pages your website needs below.
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-3xl font-extrabold tracking-tight">
                        {pages}
                      </div>

                      <div className="text-base text-[var(--app-muted)]">
                        {formatUSD(pages * PRICING.perPagePrice)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={pages}
                      onChange={(e) =>
                        setPages(parseInt(e.target.value, 10))
                      }
                      aria-label="Number of pages"
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--app-surface-3)] accent-[var(--app-brand)]"
                    />

                    <div className="mt-3 flex justify-between text-xs text-[var(--app-muted)]">
                      <span className="font-semibold">0 pages</span>
                      <span className="font-semibold">10 pages</span>
                      <span className="font-semibold">20 pages</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)]">
                <div className="flex items-end justify-between gap-4 border-b border-[var(--app-border)] p-6 sm:p-7">
                  <div>
                    <p className="text-lg font-bold">Additional features (optional)</p>
                    <p className="mt-2 text-base leading-6 text-[var(--app-muted)]">
                      Only choose these if your project needs them. A standard website does not require these add-ons.
                    </p>
                  </div>

                  <span className="shrink-0 rounded-md border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-1.5 text-base font-bold text-[var(--app-muted)]">
                    {selectedAddons} selected
                  </span>
                </div>

                <div className="divide-y divide-[var(--app-border)]">
                  {ADDONS.map((addon) => {
                    const selected = isAddonSelected(addon.key);
                    const Icon = addon.icon;

                    return (
                      <button
                        key={addon.key}
                        type="button"
                        onClick={() => toggleAddon(addon.key)}
                        aria-pressed={selected}
                        className={`flex w-full items-center justify-between gap-5 p-5 text-left transition sm:p-6 ${
                          selected
                            ? 'bg-[var(--app-brand-soft)]'
                            : 'bg-[var(--app-surface)] hover:bg-[var(--app-surface-2)]'
                        }`}
                      >
                        <div className="flex min-w-0 items-start gap-4">
                          <div
                            className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                              selected
                                ? 'border-[var(--app-brand)] bg-[var(--app-brand)] text-[var(--app-brand-contrast)]'
                                : 'border-[var(--app-border)] bg-[var(--app-surface-2)] text-[var(--app-muted)]'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>

                          <div className="min-w-0">
                            <div className="text-lg font-bold">{addon.title}</div>

                            <div className="mt-1 text-base leading-5 text-[var(--app-muted)]">
                              {addon.description}
                            </div>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <div className="text-right">
                            <div className="text-base font-bold">
                              {formatUSD(addon.price)}
                            </div>

                            <div className="text-sm font-semibold text-[var(--app-muted)]">
                              {formatNGN(addon.price * USD_TO_NGN)}
                            </div>
                          </div>

                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                              selected
                                ? 'border-[var(--app-brand)] bg-[var(--app-brand)] text-[var(--app-brand-contrast)]'
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
              </section>
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)]">
                <div className="border-b border-[var(--app-border)] p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-bold text-[var(--app-muted)]">
                      Your estimate
                    </span>


                  </div>

                  <div className="mt-5">
                    <div className="text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">
                      {formatNGN(totalNGN)}
                    </div>

                    <div className="mt-2 text-base font-medium text-[var(--app-muted)]">
                      ≈ {formatUSD(totalUSD)}
                    </div>

                    <div className="mt-3 inline-flex rounded-md border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-1.5 text-xs font-bold text-[var(--app-muted)]">
                      Live estimate
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-base font-bold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                    Cost breakdown
                  </p>

                  {hasSelection ? (
        <div className="mt-5 space-y-3">
          {lineItems.map((item) => (
            <div
              key={item.label}
              className="flex items-start justify-between gap-4 text-base"
            >
              <span className="text-[var(--app-muted)]">
                {item.label}
              </span>
              <span className="shrink-0 text-right font-bold">
                <span className="block">
                  {formatNGN(item.cost * USD_TO_NGN)}
                </span>
                <span className="block text-xs font-normal text-[var(--app-muted)]">
                  {formatUSD(item.cost)}
                </span>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-dashed border-[var(--app-border)] bg-[var(--app-surface-2)] px-4 py-6 text-center">
          <Calculator className="mx-auto h-6 w-6 text-[var(--app-muted)]" />
          <p className="mt-3 text-base font-semibold">
            Your estimate starts at ₦0
          </p>
          <p className="mt-1 text-base leading-5 text-[var(--app-muted)]">
            Select pages or features to calculate your project cost.
          </p>
        </div>
      )}
      <div className="my-6 border-t border-[var(--app-border)]" />

                  <form onSubmit={handleSubmitQuote} className="space-y-3">
                    <div>
                      <p className="text-base font-bold">
                        Ready to get started?
                      </p>

                      <p className="mt-1 text-base leading-5 text-[var(--app-muted)]">
                        Send your estimate and we&apos;ll follow up with the
                        exact project scope.
                      </p>
                    </div>

                    <input
                      type="text"
                      placeholder="Your full name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="mt-3 w-full rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] px-4 py-3 text-base outline-none transition placeholder:text-[var(--app-muted)] focus:border-[var(--app-brand)] focus:ring-2 focus:ring-[var(--app-brand)]/10"
                      required
                    />

                    <input
                      type="email"
                      placeholder="Your email address"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] px-4 py-3 text-base outline-none transition placeholder:text-[var(--app-muted)] focus:border-[var(--app-brand)] focus:ring-2 focus:ring-[var(--app-brand)]/10"
                      required
                    />

                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp (optional)"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] px-4 py-3 text-base outline-none transition placeholder:text-[var(--app-muted)] focus:border-[var(--app-brand)] focus:ring-2 focus:ring-[var(--app-brand)]/10"
                    />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--app-brand)] px-4 py-3.5 text-base font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting
                        ? 'Submitting...'
                        : 'Request a quote'}

                      {!submitting && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </form>

                                    <div className="mt-5 flex items-start gap-3 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] p-3.5 text-base leading-5 text-[var(--app-muted)]">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--app-brand)]" />

                    <span>
                      USD/NGN figures are display estimates using a ₦
                      {USD_TO_NGN.toLocaleString('en-NG')}/$1 reference rate.
                      Final pricing depends on the confirmed project scope. Hosting, domain renewals, paid third-party services and ongoing maintenance may cost extra.
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="h-4 w-4 text-[var(--app-brand)]" />

              <p className="text-base text-[var(--app-muted)]">
                Final pricing is confirmed after reviewing your requirements.
              </p>
            </div>

            <span className="text-base font-medium text-[var(--app-muted)]">
              Base {formatUSD(PRICING.basePrice)} +{' '}
              {formatUSD(PRICING.perPagePrice)}/page
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Estimator;
