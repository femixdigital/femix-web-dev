import React from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Code2, Boxes, Cpu, Layers3, type LucideIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

type ServiceData = {
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  capabilities: string[];
  panel: string;
};

const serviceData: Record<string, ServiceData> = {
  'web-development': {
    label: 'WEB',
    title: 'Web development',
    description: 'Fast, responsive websites built around your business and your customers.',
    icon: Code2,
    capabilities: ['Business websites', 'Responsive interfaces', 'SEO foundations', 'Contact & lead flows'],
    panel: 'WEB / FRONTEND',
  },
  'web-applications': {
    label: 'APPS',
    title: 'Web applications',
    description: 'Interactive applications that turn business processes into simple digital workflows.',
    icon: Boxes,
    capabilities: ['Dashboards', 'Custom workflows', 'Authentication', 'Database integration'],
    panel: 'APP / PRODUCT',
  },
  'business-systems': {
    label: 'SYSTEMS',
    title: 'Business systems',
    description: 'Connected digital systems for managing operations, records and business data.',
    icon: Cpu,
    capabilities: ['Business portals', 'Data management', 'User roles', 'Operational dashboards'],
    panel: 'SYSTEM / DATA',
  },
  'landing-pages': {
    label: 'LANDING',
    title: 'Landing pages',
    description: 'Focused pages designed to present an offer clearly and drive action.',
    icon: Layers3,
    capabilities: ['Campaign pages', 'Product launches', 'Lead generation', 'Mobile-first design'],
    panel: 'LANDING / CONVERSION',
  },
};

const ServiceDetail: React.FC = () => {
  const { service } = useParams<{ service: string }>();
  const data = service ? serviceData[service] : undefined;

  if (!data) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-[var(--app-bg)] px-4 py-16 text-[var(--app-text)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
            Service
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">
            Service not found.
          </h1>
          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--app-brand)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to services
          </Link>
        </div>
      </main>
    );
  }

  const Icon = data.icon;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="border-b border-[var(--app-border)]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)] transition hover:text-[var(--app-text)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Services
            </Link>

            <div className="mt-10 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-brand)]">
              <Icon className="h-5 w-5" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
              {data.label}
            </p>

            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {data.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
              {data.description}
            </p>

            <Link
              to="/start-project"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--app-brand)] px-5 py-3.5 text-sm font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)]"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 sm:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[var(--app-brand-glow)] blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between border-b border-[var(--app-border)] pb-4">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                  Femix
                </span>
                <span className="text-xs font-mono text-[var(--app-muted-2)]">
                  {data.panel}
                </span>
              </div>

              <div className="mt-8 space-y-4">
                {data.capabilities.map((capability, index) => (
                  <div
                    key={capability}
                    className="flex items-center justify-between border-b border-[var(--app-border)] pb-4"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[var(--app-brand)]" />
                      <span className="text-sm font-semibold">{capability}</span>
                    </div>
                    <span className="font-mono text-xs text-[var(--app-muted-2)]">
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-t border-[var(--app-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--app-muted)]">
            Need something different?
          </p>

          <div className="flex gap-5">
            <Link
              to="/services"
              className="text-sm font-bold text-[var(--app-text)] transition hover:text-[var(--app-brand)]"
            >
              All services
            </Link>
            <Link
              to="/estimator"
              className="text-sm font-bold text-[var(--app-brand)] transition hover:text-[var(--app-brand-hover)]"
            >
              Estimate
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetail;
