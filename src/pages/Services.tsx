import React from 'react';
import {
  ArrowRight,
  Boxes,
  Code2,
  Cpu,
  CreditCard,
  Layers3,
  ShoppingBag,
  Workflow,
  LayoutDashboard,
  Globe,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    number: '01',
    title: 'Web development',
    description: 'Company websites, service websites and multi-page business sites.',
    price: '₦80k',
    icon: Code2,
    to: '/services/web-development',
  },
  {
    number: '02',
    title: 'Web applications',
    description: 'Web applications with features such as user accounts, forms and data management.',
    price: '₦200k',
    icon: Boxes,
    to: '/services/web-applications',
  },
  {
    number: '03',
    title: 'Business systems',
    description: 'Custom tools for handling business records, tasks and internal processes.',
    price: '₦350k',
    icon: Cpu,
    to: '/services/business-systems',
  },
  {
    number: '04',
    title: 'Landing pages',
    description: 'Single-page websites for promoting a product, service, event or campaign.',
    price: '₦50k',
    icon: Layers3,
    to: '/services/landing-pages',
  },
  {
    number: '05',
    title: 'E-commerce',
    description: 'Online shops with product listings, shopping carts and payment options.',
    price: '₦180k',
    icon: ShoppingBag,
    to: '/services/ecommerce',
  },
  {
    number: '06',
    title: 'SaaS platforms',
    description: 'Web-based software with user accounts, subscription plans and access controls.',
    price: '₦500k',
    icon: Boxes,
    to: '/services/saas',
  },
  {
    number: '07',
    title: 'Single-page applications',
    description: 'Browser-based applications that update content without reloading every page.',
    price: '₦250k',
    icon: Workflow,
    to: '/services/spa',
  },
  {
    number: '08',
    title: 'Dashboards & admin systems',
    description: 'Admin panels for viewing records, managing users and handling business data.',
    price: '₦300k',
    icon: LayoutDashboard,
    to: '/services/dashboards',
  },
  {
    number: '09',
    title: 'Custom web applications',
    description: 'Custom-built applications with features and workflows defined by your project.',
    price: '₦200k',
    icon: Code2,
    to: '/services/custom-web-applications',
  },
  {
    number: '10',
    title: 'Advanced business platforms',
    description: 'Larger web platforms that bring multiple business functions into one system.',
    price: '₦700k+',
    icon: Globe,
    to: '/services/business-platforms',
  },
  {
    number: '11',
    title: 'Payment integration',
    description: 'Integration of online payment providers into websites and applications.',
    price: '₦80k',
    icon: CreditCard,
    to: '/services/payment-integration',
  },
];

const Services: React.FC = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--app-bg)] px-3 py-5 text-[var(--app-text)] sm:px-5 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Hero */}
        <section className="overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--app-muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--app-primary)]" />
                Femix Web Dev
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Our Services
              </h1>

              <p className="mt-2 max-w-xl text-base leading-7 text-[var(--app-muted)]">
                Website development, web applications, online stores and business software.
              </p>
            </div>

            <Link
              to="/start-project"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-[var(--app-primary)] px-5 py-3 text-base font-bold text-white transition hover:opacity-90"
            >
              Start a Project
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--app-border)] pt-4">
            {['Websites', 'Web applications', 'Business systems', 'Integrations'].map((item) => (
              <span
                key={item}
                className="rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] px-3 py-2 text-xs font-semibold text-[var(--app-muted)]"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Services */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--app-primary)]">
                What we do
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Services & Pricing
              </h2>
              <p className="mt-1 text-base text-[var(--app-muted)]">
                {services.length} services · Listed starting prices
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.to}
                  to={service.to}
                  className="group flex min-h-[220px] flex-col rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[var(--app-primary)] hover:shadow-md sm:p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--app-bg)] text-[var(--app-primary)] transition group-hover:bg-[var(--app-primary)] group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <span className="text-xs font-bold tracking-widest text-[var(--app-muted)]">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-extrabold leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-2 flex-1 text-base leading-7 text-[var(--app-muted)]">
                    {service.description}
                  </p>

                  <div className="mt-4 flex items-end justify-between gap-2 border-t border-[var(--app-border)] pt-3">
                    <div>
                      <p className="text-sm font-medium text-[var(--app-muted)]">
                        Starting from
                      </p>
                      <p className="mt-0.5 text-xl font-extrabold tracking-tight text-[var(--app-primary)]">
                        {service.price}
                      </p>
                    </div>

                    <span className="mb-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--app-bg)] text-[var(--app-primary)] transition group-hover:translate-x-1">
                      <ArrowRight size={17} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Pricing note */}
        <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-extrabold">Have a project outside these services?</h3>
              <p className="mt-1 text-base leading-7 text-[var(--app-muted)]">
                The final cost depends on the features, integrations and amount of work involved.
              </p>
            </div>

            <Link
              to="/start-project"
              className="inline-flex w-fit items-center gap-2 text-base font-bold text-[var(--app-primary)] hover:opacity-80"
            >
              Request a quote
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
};

export default Services;
