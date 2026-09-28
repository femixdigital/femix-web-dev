import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Globe,
  LayoutDashboard,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

interface PricingProps {
  onSelectPackage?: (packageName: string, price: number) => void;
}

const categories = [
  {
    icon: Globe,
    label: 'Essential',
    name: 'Business Website',
    price: '₦80,000+',
    amount: 80000,
    accent: 'violet',
    description:
      'A clean, mobile-friendly website for businesses that need a credible presence online.',
    features: ['3–5 pages', 'Mobile responsive', 'WhatsApp / contact CTA', 'Basic SEO'],
  },
  {
    icon: BriefcaseBusiness,
    label: 'Professional',
    name: 'Professional Website',
    price: '₦150,000+',
    amount: 150000,
    accent: 'blue',
    description:
      'A more complete business website with stronger presentation and lead-generation features.',
    features: ['Custom design', 'Multiple business pages', 'Lead / contact forms', 'Gallery or portfolio'],
  },
  {
    icon: Sparkles,
    label: 'Advanced',
    name: 'Advanced Website',
    price: '₦200,000+',
    amount: 200000,
    accent: 'emerald',
    description:
      'For businesses that need more functionality than a standard company website.',
    features: ['Advanced sections', 'Custom forms', 'Bookings or enquiries', 'Third-party integrations'],
  },
  {
    icon: ShoppingBag,
    label: 'Commerce',
    name: 'E-commerce Website',
    price: '₦300,000+',
    amount: 300000,
    accent: 'amber',
    description:
      'A complete online storefront for displaying products, accepting orders and growing online sales.',
    features: ['Product catalogue', 'Cart & checkout', 'Payment integration', 'Order management'],
  },
  {
    icon: LayoutDashboard,
    label: 'Application',
    name: 'Web App / Dashboard',
    price: '₦450,000+',
    amount: 450000,
    accent: 'indigo',
    description:
      'Interactive systems for businesses that need accounts, data, dashboards and custom workflows.',
    features: ['User accounts', 'Database integration', 'Admin dashboard', 'Custom workflows'],
  },
  {
    icon: Building2,
    label: 'Custom',
    name: 'Custom Web Application',
    price: '₦500,000+',
    amount: 500000,
    accent: 'rose',
    description:
      'A tailored application built around a specific business process, platform or operational need.',
    features: ['Custom architecture', 'APIs & integrations', 'Advanced business logic', 'Scalable foundation'],
  },
];

const accentStyles: Record<
  string,
  { icon: string; label: string; dot: string; hover: string }
> = {
  violet: {
    icon: 'bg-violet-500/10 text-violet-600 dark:text-violet-300',
    label: 'text-violet-600 dark:text-violet-300',
    dot: 'bg-violet-500',
    hover: 'hover:border-violet-400/40',
  },
  blue: {
    icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-300',
    label: 'text-blue-600 dark:text-blue-300',
    dot: 'bg-blue-500',
    hover: 'hover:border-blue-400/40',
  },
  emerald: {
    icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
    label: 'text-emerald-600 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    hover: 'hover:border-emerald-400/40',
  },
  amber: {
    icon: 'bg-amber-500/10 text-amber-600 dark:text-amber-300',
    label: 'text-amber-600 dark:text-amber-300',
    dot: 'bg-amber-500',
    hover: 'hover:border-amber-400/40',
  },
  indigo: {
    icon: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300',
    label: 'text-indigo-600 dark:text-indigo-300',
    dot: 'bg-indigo-500',
    hover: 'hover:border-indigo-400/40',
  },
  rose: {
    icon: 'bg-rose-500/10 text-rose-600 dark:text-rose-300',
    label: 'text-rose-600 dark:text-rose-300',
    dot: 'bg-rose-500',
    hover: 'hover:border-rose-400/40',
  },
};

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage }) => {
  const navigate = useNavigate();

  const handleSelect = (name: string, amount: number) => {
    onSelectPackage?.(name, amount);

    if (!onSelectPackage) {
      const params = new URLSearchParams({
        package: name,
        price: String(amount),
      });

      navigate(`/contact?${params.toString()}`);
    }
  };

  return (
    <section
      id="pricing"
      className="scroll-mt-24 border-y border-[var(--app-border)] bg-[var(--app-surface-2)]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
              Investment
            </p>

            <h2 className="mt-5 max-w-md text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl">
              Choose a starting point for your next digital product.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-6 text-[var(--app-muted)] sm:text-base">
              Website development starts from ₦80,000. More advanced projects
              are priced according to the features, integrations and workflows
              your business actually needs.
            </p>

            <div className="mt-8 rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Check className="h-4 w-4" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                  Good to know
                </p>
              </div>

              <p className="mt-4 text-sm leading-6 text-[var(--app-muted)]">
                These are starting prices, not one-size-fits-all packages.
                You&apos;ll receive a clear quote before development begins.
              </p>

              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--app-text)] transition hover:text-violet-600 dark:hover:text-violet-300"
              >
                Need something different?
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map(
              ({
                icon: Icon,
                label,
                name,
                price,
                amount,
                accent,
                description,
                features,
              }) => {
                const styles = accentStyles[accent];

                return (
                  <article
                    key={name}
                    className={`group flex flex-col rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7 ${styles.hover}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${styles.icon}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${styles.label}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                        {label}
                      </span>
                    </div>

                    <div className="mt-7">
                      <h3 className="text-lg font-extrabold tracking-tight sm:text-xl">
                        {name}
                      </h3>

                      <p className="mt-3 min-h-[72px] text-sm leading-6 text-[var(--app-muted)]">
                        {description}
                      </p>

                      <p className="mt-6 text-2xl font-extrabold tracking-[-0.03em]">
                        {price}
                      </p>

                      <p className="mt-1 text-[11px] font-medium text-[var(--app-muted)]">
                        Starting investment
                      </p>
                    </div>

                    <ul className="mt-6 space-y-3 border-t border-[var(--app-border)] pt-5">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2.5 text-xs font-medium text-[var(--app-muted)]"
                        >
                          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => handleSelect(name, amount)}
                      className="mt-7 flex items-center justify-between border-t border-[var(--app-border)] pt-5 text-sm font-bold text-[var(--app-text)] transition hover:text-violet-600 dark:hover:text-violet-300"
                    >
                      <span>Discuss this project</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                  </article>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
