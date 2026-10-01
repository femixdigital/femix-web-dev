import React from 'react';
import {
  ArrowRight,
  Boxes,
  Code2,
  Cpu,
  Layers3,
  MoveUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    number: '01',
    label: 'WEB',
    title: 'Web development',
    description: 'Professional websites built for business.',
    icon: Code2,
    to: '/services/web-development',
  },
  {
    number: '02',
    label: 'APPS',
    title: 'Web applications',
    description: 'Interactive products and custom workflows.',
    icon: Boxes,
    to: '/services/web-applications',
  },
  {
    number: '03',
    label: 'SYSTEMS',
    title: 'Business systems',
    description: 'Digital tools for operations and data.',
    icon: Cpu,
    to: '/services/business-systems',
  },
  {
    number: '04',
    label: 'LANDING',
    title: 'Landing pages',
    description: 'Focused pages built to drive action.',
    icon: Layers3,
    to: '/services/landing-pages',
  },
  {
    number: '05',
    label: 'COMMERCE',
    title: 'E-commerce',
    description: 'Online stores with products, checkout and payments.',
    icon: Boxes,
    to: '/services/ecommerce',
  },
  {
    number: '06',
    label: 'SAAS',
    title: 'SaaS platforms',
    description: 'Subscription-ready software products and workflows.',
    icon: Boxes,
    to: '/services/saas',
  },
  {
    number: '07',
    label: 'SPA',
    title: 'Single-page applications',
    description: 'Fast app-like experiences with smooth navigation.',
    icon: Layers3,
    to: '/services/spa',
  },
  {
    number: '08',
    label: 'DASHBOARDS',
    title: 'Dashboards & admin systems',
    description: 'Operational dashboards for data, teams and decisions.',
    icon: Cpu,
    to: '/services/dashboards',
  },
  {
    number: '09',
    label: 'CUSTOM APPS',
    title: 'Custom web applications',
    description: 'Purpose-built applications for specialized workflows.',
    icon: Code2,
    to: '/services/custom-web-applications',
  },
  {
    number: '10',
    label: 'PLATFORMS',
    title: 'Advanced business platforms',
    description: 'Connected platforms for customers, teams and operations.',
    icon: Cpu,
    to: '/services/business-platforms',
  },
];

const Services: React.FC = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="border-b border-[var(--app-border)]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                Services
              </p>

              <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Build what matters.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[var(--app-muted)]">
                Websites, apps and systems designed around your business.
              </p>
            </div>

            <Link
              to="/start-project"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[var(--app-brand)] transition hover:text-[var(--app-brand-hover)]"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-border)] md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.to}
                  to={service.to}
                  className="group relative min-h-64 bg-[var(--app-surface)] p-6 transition-colors hover:bg-[var(--app-surface-2)] sm:p-8 lg:min-h-72"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] text-[var(--app-brand)]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="font-mono text-xs text-[var(--app-muted-2)]">
                      {service.number}
                    </span>
                  </div>

                  <div className="mt-14 max-w-md">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                      {service.label}
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                      {service.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
                      {service.description}
                    </p>
                  </div>

                  <MoveUpRight className="absolute bottom-7 right-7 h-5 w-5 text-[var(--app-muted-2)] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--app-brand)]" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
