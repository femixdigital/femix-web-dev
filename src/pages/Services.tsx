import React from 'react';
import {
  ArrowRight,
  Boxes,
  Code2,
  Cpu,
  CreditCard,
  Layers3,
  ShoppingBag,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    number: '01',
    title: 'Web development',
    description: 'Professional websites for businesses that need a strong online presence.',
    price: '₦120k',
    icon: Code2,
    to: '/services/web-development',
  },
  {
    number: '02',
    title: 'Web applications',
    description: 'Interactive tools that turn business processes into web products.',
    price: '₦300k',
    icon: Boxes,
    to: '/services/web-applications',
  },
  {
    number: '03',
    title: 'Business systems',
    description: 'Connected systems for managing operations, teams and business data.',
    price: '₦500k',
    icon: Cpu,
    to: '/services/business-systems',
  },
  {
    number: '04',
    title: 'Landing pages',
    description: 'Focused pages built to promote a service, product or campaign.',
    price: '₦80k',
    icon: Layers3,
    to: '/services/landing-pages',
  },
  {
    number: '05',
    title: 'E-commerce',
    description: 'Online stores with products, checkout and customer payments.',
    price: '₦250k',
    icon: ShoppingBag,
    to: '/services/ecommerce',
  },
  {
    number: '06',
    title: 'SaaS platforms',
    description: 'Scalable software products with accounts, workflows and subscriptions.',
    price: '₦800k',
    icon: Boxes,
    to: '/services/saas',
  },
  {
    number: '07',
    title: 'Single-page applications',
    description: 'Fast app-like products with smooth navigation and dynamic interfaces.',
    price: '₦400k',
    icon: Layers3,
    to: '/services/spa',
  },
  {
    number: '08',
    title: 'Dashboards & admin systems',
    description: 'Secure dashboards for monitoring data, users, teams and operations.',
    price: '₦500k',
    icon: Cpu,
    to: '/services/dashboards',
  },
  {
    number: '09',
    title: 'Custom web applications',
    description: 'Purpose-built software for specialized business workflows.',
    price: '₦300k',
    icon: Code2,
    to: '/services/custom-web-applications',
  },
  {
    number: '10',
    title: 'Advanced business platforms',
    description: 'Large-scale platforms connecting customers, teams and business operations.',
    price: '₦1m+',
    icon: Cpu,
    to: '/services/business-platforms',
  },
  {
    number: '11',
    title: 'Payment integration',
    description: 'Secure checkout and payment flows connected to your website or app.',
    price: '₦150k',
    icon: CreditCard,
    to: '/services/payment-integration',
  },
];

const Services: React.FC = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <div className="mx-auto max-w-5xl space-y-4 px-3 pb-6 pt-3 sm:px-5 lg:px-6">
        <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--app-primary)]">
            <span className="h-2 w-2 rounded-full bg-[var(--app-primary)]" />
            FEMIX WEB DEV
          </div>

          <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Services
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--app-muted)] sm:text-base">
                Websites, applications and business systems built around your goals.
              </p>
            </div>

            <Link
              to="/start-project"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[var(--app-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--app-border)] pt-3">
            {['Websites', 'Web apps', 'Business systems', 'Integrations'].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full bg-[var(--app-bg)] px-3 py-1.5 text-xs font-medium text-[var(--app-muted)]"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Services & Pricing</h2>
              <p className="mt-1 text-sm text-[var(--app-muted)]">
                {services.length} services · Starting prices
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.to}
                  to={service.to}
                  className="group rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-3 transition hover:border-[var(--app-primary)] sm:p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--app-bg)] text-[var(--app-primary)]">
                      <Icon size={20} />
                    </span>
                    <span className="text-xs font-medium text-[var(--app-muted)]">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-3 font-semibold">{service.title}</h3>
                  <p className="mt-1 min-h-10 text-sm leading-5 text-[var(--app-muted)]">
                    {service.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-[var(--app-border)] pt-3">
                    <div>
                      <p className="text-xs text-[var(--app-muted)]">
                        Starting from
                      </p>
                      <p className="mt-0.5 font-bold text-[var(--app-primary)]">
                        {service.price}
                      </p>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--app-bg)] text-[var(--app-primary)] transition group-hover:translate-x-0.5">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>


      </div>
    </main>
  );
};

export default Services;
