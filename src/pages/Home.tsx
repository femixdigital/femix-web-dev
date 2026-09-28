import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  Code2,
  Database,
  Globe2,
  Layers3,
  MessageCircle,
  MonitorSmartphone,
  ShieldCheck,
} from 'lucide-react';

const capabilities = [
  {
    icon: Globe2,
    title: 'Business websites',
    description: 'Professional websites that give your business a credible digital presence and make it easier for customers to take action.',
  },
  {
    icon: Layers3,
    title: 'Web applications',
    description: 'Custom interfaces, portals and SaaS products built around your workflows, users and business requirements.',
  },
  {
    icon: Database,
    title: 'Business systems',
    description: 'Dashboards and connected tools that bring data, operations and everyday business tasks into one practical system.',
  },
];

const technologies = [
  { label: 'React', icon: Code2 },
  { label: 'TypeScript', icon: Code2 },
  { label: 'Supabase', icon: Database },
  { label: 'Tailwind CSS', icon: Layers3 },
];

export const Home: React.FC = () => {
  return (
    <div className="bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="border-b border-[var(--app-border)]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                <MonitorSmartphone className="h-3.5 w-3.5 text-[var(--app-brand)]" />
                Web development & digital products
              </div>

              <h1 className="mt-7 max-w-5xl text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                We build digital products that help businesses{' '}
                <span className="text-[var(--app-brand)]">work better online.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
                Femix Web Dev designs and develops professional websites,
                web applications, dashboards and business systems around what
                your business actually needs.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/start-project"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--app-brand)] px-5 py-3.5 text-sm font-bold text-[var(--app-brand-contrast)] shadow-sm transition hover:bg-[var(--app-brand-hover)]"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--app-border-strong)] bg-[var(--app-surface)] px-5 py-3.5 text-sm font-bold text-[var(--app-text)] transition hover:bg-[var(--app-surface-2)]"
                >
                  Explore services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="border-t border-[var(--app-border)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-muted)]">
                What you can expect
              </p>

              <div className="mt-5 space-y-4">
                {[
                  'Responsive experiences across devices',
                  'Clean, maintainable frontend architecture',
                  'Business-focused design and user flows',
                  'Secure data and application foundations',
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

      <section className="border-b border-[var(--app-border)]">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-muted)]">
                Built around your business
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                From digital presence to business systems.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['01', 'Represent', 'Give your business a professional online presence.'],
                ['02', 'Operate', 'Simplify workflows with useful digital tools.'],
                ['03', 'Grow', 'Create systems that can evolve with the business.'],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-5"
                >
                  <span className="text-[11px] font-bold tracking-[0.16em] text-[var(--app-muted)]">
                    {number}
                  </span>
                  <h3 className="mt-5 text-sm font-extrabold">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--app-muted)]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-muted)]">
                Core capabilities
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                What we build
              </h2>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--app-text)] hover:text-[var(--app-brand)]"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <Link
                key={title}
                to="/services"
                className="group rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 transition hover:-translate-y-0.5 hover:border-[var(--app-border-strong)] hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[var(--app-muted)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>

                <h3 className="mt-6 text-lg font-extrabold tracking-[-0.02em]">{title}</h3>

                <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--app-border)] bg-[var(--app-surface-2)]">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-brand)]">
                <Code2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-extrabold">Modern technology</p>
                <p className="mt-1 text-xs leading-5 text-[var(--app-muted)]">
                  Responsive interfaces, maintainable code and dependable application foundations.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {technologies.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 rounded-md border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2 text-xs font-bold text-[var(--app-muted)]"
                >
                  <Icon className="h-3.5 w-3.5 text-[var(--app-brand)]" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--app-border)]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                <ShieldCheck className="h-4 w-4 text-[var(--app-brand)]" />
                Ready when you are
              </div>

              <h2 className="mt-4 max-w-2xl text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                Have a website, web app or business system in mind?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--app-muted)]">
                Tell us what you want to build. Start with an estimate or speak directly with Femix about your project.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
              <Link
                to="/start-project"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)]"
              >
                Start a project
                <Calculator className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--app-border-strong)] bg-[var(--app-surface)] px-5 py-3 text-sm font-bold text-[var(--app-text)] transition hover:bg-[var(--app-surface-2)]"
              >
                Contact Femix
                <MessageCircle className="h-4 w-4" />
              </Link>

              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold text-[var(--app-muted)] transition hover:text-[var(--app-text)]"
              >
                View portfolio
                <BriefcaseBusiness className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
