import React from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  Code2,
  Database,
  Globe2,
  LayoutDashboard,
  LockKeyhole,
  Smartphone,
  ShoppingCart,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Globe2,
    title: 'Business Websites',
    description:
      'Professional, responsive websites that give your business a credible online presence and make it easy for customers to contact you.',
    features: ['Mobile-first design', 'Business pages', 'Contact integration', 'Basic SEO setup'],
  },
  {
    icon: LayoutDashboard,
    title: 'Web Apps & Dashboards',
    description:
      'Custom web applications for businesses that need more than a brochure website — dashboards, workflows, records, and internal systems.',
    features: ['Custom workflows', 'Interactive dashboards', 'Database integration', 'Responsive UI'],
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description:
      'Online stores designed around your products, customers, catalogue and payment workflow.',
    features: ['Product catalogue', 'Shopping cart', 'Payment integration', 'Order management'],
  },
  {
    icon: Code2,
    title: 'Custom Web Applications',
    description:
      'Purpose-built software for unique business processes, SaaS ideas and digital products.',
    features: ['Custom architecture', 'Authentication', 'Database systems', 'Scalable foundation'],
  },
  {
    icon: Smartphone,
    title: 'Mobile-Responsive Design',
    description:
      'Interfaces that remain polished and usable across phones, tablets and desktop screens.',
    features: ['Responsive layouts', 'Touch-friendly UI', 'Mobile navigation', 'Cross-device testing'],
  },
  {
    icon: LockKeyhole,
    title: 'Authentication & Security',
    description:
      'Secure account experiences and protected application areas for products that handle private information.',
    features: ['User authentication', 'Protected routes', 'Database policies', 'Secure data handling'],
  },
];

const highlights = [
  {
    icon: BarChart3,
    title: 'Business-focused',
    description: 'Every feature should have a clear purpose for the business using it.',
  },
  {
    icon: Database,
    title: 'Real data systems',
    description: 'When your project needs data, we build around reliable database workflows.',
  },
  {
    icon: Sparkles,
    title: 'Premium interface',
    description: 'Clean, responsive interfaces designed to feel professional from the first interaction.',
  },
];

const Services: React.FC = () => {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="border-b border-[var(--app-border)] bg-[var(--app-surface)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-1.5 text-xs font-semibold text-[var(--app-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              Services
            </div>

            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Digital products built around your business.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
              From professional business websites to custom web applications,
              we build practical digital products that are responsive, maintainable
              and designed for real-world use.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/estimator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Estimate your project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-5 py-3 text-sm font-bold text-[var(--app-text)] transition hover:border-[var(--app-brand)] hover:text-[var(--app-brand)]"
              >
                Talk about your project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg dark:hover:border-violet-500/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--app-soft)] text-[var(--app-brand)]">
                  <Icon className="h-5 w-5" />
                </div>

                <h2 className="mt-6 text-xl font-extrabold tracking-[-0.02em]">
                  {service.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm font-medium text-[var(--app-text)]"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <Check className="h-3 w-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[var(--app-border)] bg-[var(--app-surface-2)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
              How we build
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
              More than a pretty interface.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[var(--app-muted)] sm:text-base">
              The goal is to give your business a digital product that is useful,
              understandable and ready to grow.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6"
                >
                  <Icon className="h-5 w-5 text-[var(--app-brand)]" />
                  <h3 className="mt-5 text-base font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="overflow-hidden rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)]">
          <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="p-7 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                Ready when you are
              </p>

              <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                Have an idea? Let&apos;s turn it into something people can use.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--app-muted)] sm:text-base">
                Start with an estimate or tell us what you are trying to build.
                We&apos;ll help define the right scope before development begins.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-[var(--app-border)] p-7 sm:p-10 lg:border-l lg:border-t-0">
              <Link
                to="/estimator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
              >
                Start an estimate
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--app-border)] px-5 py-3 text-sm font-bold text-[var(--app-text)] transition hover:border-[var(--app-brand)] hover:text-[var(--app-brand)]"
              >
                Contact Femix Web Dev
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
