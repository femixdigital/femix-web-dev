import React from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
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
    description:
      'A tailored application built around a specific business process, platform or operational need.',
    features: ['Custom architecture', 'APIs & integrations', 'Advanced business logic', 'Scalable foundation'],
  },
];

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage }) => {
  const handleSelect = (name: string, amount: number) => {
    onSelectPackage?.(name, amount);
  };

  return (
    <section
      id="pricing"
      className="border-y border-white/10 bg-white/[0.015]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              Investment
            </p>

            <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
              The right build for what your business needs.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/45 sm:text-base">
              Website development starts from ₦80,000. More advanced projects
              are priced according to the features, integrations and workflows
              your business actually needs.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/35">
                Good to know
              </p>
              <p className="mt-3 text-sm leading-6 text-white/55">
                These are starting prices, not one-size-fits-all packages.
                You'll receive a clear quote before development begins.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map(
              ({ icon: Icon, label, name, price, amount, description, features }) => (
                <article
                  key={name}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-[#111110] p-6 transition-colors hover:border-white/20 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] text-white/65">
                      <Icon className="h-4 w-4" />
                    </div>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                      {label}
                    </span>
                  </div>

                  <div className="mt-7">
                    <h3 className="text-lg font-semibold tracking-tight text-white">
                      {name}
                    </h3>

                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/45">
                      {description}
                    </p>

                    <p className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-white">
                      {price}
                    </p>

                    <p className="mt-1 text-[11px] text-white/30">
                      Starting investment
                    </p>
                  </div>

                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-xs text-white/50"
                      >
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => handleSelect(name, amount)}
                    className="mt-7 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-medium text-white/65 transition-colors hover:text-white"
                  >
                    <span>Discuss this project</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
