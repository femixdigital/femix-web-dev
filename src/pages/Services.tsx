import React from 'react';
import { ArrowRight, CheckCircle2, Code2, Globe2, LayoutDashboard, LockKeyhole, ShoppingCart, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Globe2,
    title: 'Business Websites',
    description: 'Professional websites that give your business a credible online presence and make it easier for customers to take action.',
    features: ['Mobile-first design', 'Business pages', 'Contact integration', 'Basic SEO setup'],
  },
  {
    icon: LayoutDashboard,
    title: 'Web Apps & Dashboards',
    description: 'Custom applications for workflows, records, dashboards and internal business operations.',
    features: ['Custom workflows', 'Interactive dashboards', 'Database integration', 'Responsive UI'],
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Online stores built around your products, customers, catalogue and payment workflow.',
    features: ['Product catalogue', 'Shopping cart', 'Payment integration', 'Order management'],
  },
  {
    icon: Code2,
    title: 'Custom Web Applications',
    description: 'Purpose-built software for unique business processes, SaaS ideas and digital products.',
    features: ['Custom architecture', 'Authentication', 'Database systems', 'Scalable foundation'],
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Interfaces designed to remain polished, accessible and practical across phones, tablets and desktop screens.',
    features: ['Responsive layouts', 'Touch-friendly UI', 'Mobile navigation', 'Cross-device testing'],
  },
  {
    icon: LockKeyhole,
    title: 'Authentication & Security',
    description: 'Secure account experiences and protected application areas for products that handle private information.',
    features: ['User authentication', 'Protected routes', 'Database policies', 'Secure data handling'],
  },
];

const principles = [
  {
    number: '01',
    title: 'Understand',
    description: 'We first define what the business needs, who will use it and what the product should achieve.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'We shape the structure, interface and user flow before turning the direction into a working product.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'We develop a responsive, maintainable system with the right technical foundation for the project.',
  },
];

const Services: React.FC = () => {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="border-b border-[var(--app-border)] bg-[var(--app-surface)]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                <Code2 className="h-3.5 w-3.5 text-[var(--app-brand)]" />
                What we build
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Digital products built around your business.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
                From professional websites to custom web applications, we build practical digital products that are responsive, maintainable and designed for real-world use.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/estimator"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--app-brand)] px-5 py-3.5 text-sm font-bold text-[var(--app-brand-contrast)] shadow-sm transition hover:bg-[var(--app-brand-hover)]"
                >
                  Estimate your project
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--app-border-strong)] bg-[var(--app-surface)] px-5 py-3.5 text-sm font-bold text-[var(--app-text)] transition hover:bg-[var(--app-surface-2)]"
                >
                  Talk about your project
                </Link>
              </div>
            </div>

            <div className="border-t border-[var(--app-border)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-muted)]">
                Built for real use
              </p>

              <div className="mt-5 space-y-4">
                {[
                  'Responsive across phones, tablets and desktop',
                  'Clean and maintainable frontend architecture',
                  'Business-focused user flows and interfaces',
                  'Reliable data and application foundations',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--app-brand)]" />
                    <p className="text-sm leading-6 text-[var(--app-text)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                Services
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                Choose what your business needs.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-[var(--app-muted)]">
              Every project can be shaped around your actual requirements rather than a fixed template.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--app-border)] bg-[var(--app-border)] md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="bg-[var(--app-surface)] p-6 transition hover:bg-[var(--app-surface-2)] sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--app-muted-2)]">
                      Femix
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-extrabold tracking-[-0.02em]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-[var(--app-text)]"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--app-brand)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--app-border)] bg-[var(--app-surface-2)]">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--app-border)] bg-[var(--app-border)] md:grid-cols-3">
            {principles.map((item) => (
              <div key={item.number} className="bg-[var(--app-surface)] p-6 sm:p-7">
                <span className="text-xs font-bold tracking-[0.16em] text-[var(--app-brand)]">
                  {item.number}
                </span>

                <h3 className="mt-5 text-lg font-extrabold">{item.title}</h3>

                <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="flex flex-col gap-6 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                Ready when you are
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                Have something worth building?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--app-muted)] sm:text-base">
                Tell us what you want to build and we&apos;ll help define the right scope for it.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                to="/estimator"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)]"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--app-border-strong)] px-5 py-3 text-sm font-bold text-[var(--app-text)] transition hover:bg-[var(--app-surface-2)]"
              >
                Contact Femix
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
