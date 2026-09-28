import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Database,
  Globe2,
  Layers3,
  MessageCircle,
  MonitorSmartphone,
  ShieldCheck,
} from 'lucide-react';

const solutions = [
  {
    icon: Globe2,
    number: '01',
    title: 'Business websites',
    description:
      'Professional, responsive websites designed to present your business clearly and turn visitors into customers.',
  },
  {
    icon: Layers3,
    number: '02',
    title: 'Web applications',
    description:
      'Custom portals, dashboards and SaaS interfaces built around the way your users and business actually work.',
  },
  {
    icon: Database,
    number: '03',
    title: 'Business systems',
    description:
      'Connected digital tools that bring everyday operations, information and workflows into one practical system.',
  },
];

const principles = [
  'Responsive across phones, tablets and desktops',
  'Clear user flows built around real business goals',
  'Maintainable frontend and application foundations',
];

export const Home: React.FC = () => {
  return (
    <div className="bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="border-b border-[var(--app-border)]">
        <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1440px] items-center px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
              <MonitorSmartphone className="h-3.5 w-3.5 text-[var(--app-brand)]" />
              Femix Web Dev
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Digital products built for{' '}
              <span className="text-[var(--app-brand)]">real businesses.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
              Professional websites, web applications and business systems
              designed around what your business needs to do online.
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
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--app-border-strong)] bg-[var(--app-surface)] px-5 py-3.5 text-sm font-bold text-[var(--app-text)] transition hover:bg-[var(--app-surface-2)]"
              >
                View portfolio
                <BriefcaseBusiness className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between border-b border-[var(--app-border)] pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                    What we build
                  </p>
                  <p className="mt-1 text-sm font-extrabold">
                    Digital foundations for growth
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                  <Layers3 className="h-4 w-4" />
                </div>
              </div>

              <div className="divide-y divide-[var(--app-border)]">
                {solutions.map(({ number, title, description }) => (
                  <Link
                    key={number}
                    to="/services"
                    className="group block py-5 first:pt-5 last:pb-1"
                  >
                    <div className="flex items-start gap-4">
                      <span className="pt-0.5 text-[10px] font-bold tracking-[0.14em] text-[var(--app-muted-2)]">
                        {number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h2 className="text-sm font-extrabold">{title}</h2>
                          <ArrowRight className="h-4 w-4 shrink-0 text-[var(--app-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--app-brand)]" />
                        </div>
                        <p className="mt-2 text-xs leading-5 text-[var(--app-muted)]">
                          {description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] p-4">
                <Code2 className="h-4 w-4 text-[var(--app-brand)]" />
                <p className="mt-3 text-xs font-bold">Modern stack</p>
                <p className="mt-1 text-[11px] leading-5 text-[var(--app-muted)]">
                  React, TypeScript, Supabase & Tailwind CSS
                </p>
              </div>

              <div className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] p-4">
                <ShieldCheck className="h-4 w-4 text-[var(--app-brand)]" />
                <p className="mt-3 text-xs font-bold">Built with purpose</p>
                <p className="mt-1 text-[11px] leading-5 text-[var(--app-muted)]">
                  Practical interfaces and dependable foundations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--app-border)]">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-muted)]">
                How we approach projects
              </p>
              <h2 className="mt-3 max-w-md text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                Start with the business problem, then build the right solution.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['01', 'Understand', 'Clarify the goal, users and workflow.'],
                ['02', 'Build', 'Design and develop the experience around it.'],
                ['03', 'Evolve', 'Leave room for the product to grow.'],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-5"
                >
                  <span className="text-[10px] font-bold tracking-[0.16em] text-[var(--app-muted)]">
                    {number}
                  </span>
                  <h3 className="mt-4 text-sm font-extrabold">{title}</h3>
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
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-muted)]">
                The Femix standard
              </p>

              <h2 className="mt-3 max-w-2xl text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                Clean experiences. Clear purpose. Solid foundations.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--app-muted)]">
                Every project should make sense to the people using it and
                support the business behind it. That means thoughtful structure,
                responsive interfaces and technology chosen for the job.
              </p>

              <div className="mt-6 space-y-3">
                {principles.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--app-brand)]" />
                    <p className="text-sm text-[var(--app-text)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                Explore the platform
              </p>

              <div className="mt-5 divide-y divide-[var(--app-border)]">
                <Link
                  to="/services"
                  className="group flex items-center justify-between gap-4 py-4 first:pt-0"
                >
                  <span className="text-sm font-bold">Services</span>
                  <ArrowRight className="h-4 w-4 text-[var(--app-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--app-brand)]" />
                </Link>

                <Link
                  to="/estimator"
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="text-sm font-bold">Project estimator</span>
                  <ArrowRight className="h-4 w-4 text-[var(--app-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--app-brand)]" />
                </Link>

                <Link
                  to="/about"
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="text-sm font-bold">About Femix</span>
                  <ArrowRight className="h-4 w-4 text-[var(--app-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--app-brand)]" />
                </Link>

                <Link
                  to="/contact"
                  className="group flex items-center justify-between gap-4 py-4 last:pb-0"
                >
                  <span className="text-sm font-bold">Contact</span>
                  <ArrowRight className="h-4 w-4 text-[var(--app-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--app-brand)]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--app-border)] bg-[var(--app-surface-2)]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                <MessageCircle className="h-4 w-4 text-[var(--app-brand)]" />
                Ready to build
              </div>

              <h2 className="mt-4 max-w-2xl text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                Have an idea, business need or digital product in mind?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--app-muted)]">
                Tell Femix what you want to build and we can work from there.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row lg:mt-0 lg:shrink-0 lg:flex-col">
              <Link
                to="/start-project"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)]"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--app-border-strong)] bg-[var(--app-surface)] px-5 py-3 text-sm font-bold text-[var(--app-text)] transition hover:bg-[var(--app-surface-2)]"
              >
                Contact Femix
                <MessageCircle className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
