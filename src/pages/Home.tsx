import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Code2,
  Layers3,
  Monitor,
  ShoppingBag,
} from 'lucide-react';

const services = [
  {
    title: 'Web Development',
    description: 'Professional websites for businesses and service brands.',
    icon: Code2,
    to: '/services/web-development',
  },
  {
    title: 'Web Applications',
    description: 'Interactive applications built around your workflow.',
    icon: Layers3,
    to: '/services/web-applications',
  },
  {
    title: 'Business Systems',
    description: 'Custom systems for operations, customers and data.',
    icon: BarChart3,
    to: '/services/business-systems',
  },
  {
    title: 'Landing Pages',
    description: 'Focused pages for products, services and campaigns.',
    icon: ShoppingBag,
    to: '/services/landing-pages',
  },
];

const packages = [
  {
    price: '₦80k+',
    title: 'Starter Website',
    scope: '3–4 pages, responsive design, contact/WhatsApp CTA.',
    group: 'Websites',
  },
  {
    price: '₦120k+',
    title: 'Business Website',
    scope: '5–7 pages, business sections, forms and basic SEO.',
    group: 'Websites',
  },
  {
    price: '₦150k+',
    title: 'Professional Website',
    scope: 'Custom UI, more pages, lead flows and responsive design.',
    group: 'Websites',
  },
  {
    price: '₦200k+',
    title: 'Business Plus',
    scope: 'Expanded pages, integrations and tailored features.',
    group: 'Websites',
  },
  {
    price: '₦250k+',
    title: 'Advanced Business Website',
    scope: 'Advanced sections, integrations and custom interactions.',
    group: 'Websites',
  },
  {
    price: '₦300k+',
    title: 'Premium Website',
    scope: 'Premium UI, custom components and integrations.',
    group: 'Websites',
  },
  {
    price: '₦400k+',
    title: 'Custom Web Application',
    scope: 'Custom features, accounts, dashboards and integrations.',
    group: 'Web Apps & Platforms',
  },
  {
    price: '₦500k+',
    title: 'SaaS / SPA / Dashboard',
    scope: 'Accounts, dashboards, data workflows and integrations.',
    group: 'Web Apps & Platforms',
  },
  {
    price: '₦800k+',
    title: 'Advanced Business Platform',
    scope: 'Multi-role workflows, dashboards and connected systems.',
    group: 'Web Apps & Platforms',
  },
  {
    price: '₦1m+',
    title: 'Full Custom Digital System',
    scope: 'Multiple modules, integrations and scalable architecture.',
    group: 'Web Apps & Platforms',
  },
];

const projects = [
  {
    title: 'PulseMetrics',
    category: 'Analytics Platform',
    description: 'Analytics and reporting experience.',
    icon: BarChart3,
  },
  {
    title: 'OmniFlow',
    category: 'Business Dashboard',
    description: 'Operations and reporting workspace.',
    icon: Layers3,
  },
  {
    title: 'Aura',
    category: 'E-commerce',
    description: 'Fast and focused commerce experience.',
    icon: ShoppingBag,
  },
];

export const Home: React.FC = () => {
  const websitePackages = packages.filter((item) => item.group === 'Websites');
  const platformPackages = packages.filter(
    (item) => item.group === 'Web Apps & Platforms',
  );

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="bg-[var(--app-brand-soft)]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              <Monitor className="h-4 w-4" />
              Femix Web Dev
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Websites, web apps
              <br />
              <span className="text-[var(--app-brand)]">
                and business systems.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Professional digital products built around what your business
              needs.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/start-project"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--app-brand)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--app-brand-hover)]"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--app-brand)]">
              What we build
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Choose what you need
            </h2>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--app-brand)]"
          >
            All services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, description, icon: Icon, to }) => (
            <Link
              key={title}
              to={to}
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>

              <p className="mt-1.5 text-sm leading-5 text-gray-600">
                {description}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--app-brand)]">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--app-brand)]">
                Starting prices
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Website and project packages
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                Prices are starting points. Final cost depends on pages,
                features, integrations and complexity.
              </p>
            </div>

            <Link
              to="/estimator"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Get an estimate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-7 space-y-3">
            {[
              { group: 'Websites', items: websitePackages },
              { group: 'Web Apps & Platforms', items: platformPackages },
            ].map(({ group, items }) => (
                <details
                  key={group}
                  open={group === 'Websites'}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-gray-900">
                    <div className="flex items-center justify-between gap-4">
                      <span>{group}</span>
                      <span className="text-sm font-normal text-gray-500">
                        {items.length} packages
                      </span>
                    </div>
                  </summary>

                  <div className="border-t border-gray-100">
                    {items.map(({ price, title, scope }) => (
                      <Link
                        key={title}
                        to="/start-project"
                        className="group flex items-center gap-4 border-b border-gray-100 px-5 py-4 last:border-b-0 hover:bg-gray-50"
                      >
                        <div className="w-24 shrink-0">
                          <p className="text-lg font-extrabold text-[var(--app-brand)]">
                            {price}
                          </p>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {title}
                          </h3>
                          <p className="mt-0.5 text-sm text-gray-600">
                            {scope}
                          </p>
                        </div>

                        <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-[var(--app-brand)]" />
                      </Link>
                    ))}
                  </div>
                </details>
              ),
            )}
          </div>

          <p className="mt-5 text-center text-xs text-gray-500">
            Hosting, domain, premium third-party services and unusually complex
            integrations may be quoted separately.
          </p>
        </div>
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--app-brand)]">
              Selected work
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Recent examples
            </h2>
          </div>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--app-brand)]"
          >
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {projects.map(({ title, category, description, icon: Icon }) => (
            <Link
              key={title}
              to="/portfolio"
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                <Icon className="h-5 w-5" />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                {category}
              </p>

              <h3 className="mt-1.5 font-semibold text-gray-900">{title}</h3>

              <p className="mt-1 text-sm text-gray-600">{description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--app-brand)]">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center sm:px-8 lg:px-12">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Tell us what you want to build.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Get a starting estimate or discuss your project with Femix.
          </p>

          <Link
            to="/start-project"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[var(--app-brand)] shadow-sm transition hover:bg-blue-50"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
