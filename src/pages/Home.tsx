import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BarChart3,
  Code2,
  Layers3,
  ShoppingBag,
} from 'lucide-react';

const services = [
  {
    label: '01',
    title: 'Web Development',
    description: 'Business websites built to perform.',
    icon: Code2,
    to: '/services/web-development',
    accent: 'text-[var(--app-brand)]',
    surface: 'bg-[var(--app-brand-soft)]',
  },
  {
    label: '02',
    title: 'Web Applications',
    description: 'Interactive products and platforms.',
    icon: Layers3,
    to: '/services/web-applications',
    accent: 'text-[var(--app-accent)]',
    surface: 'bg-[var(--app-accent-soft)]',
  },
  {
    label: '03',
    title: 'Business Systems',
    description: 'Digital tools for everyday operations.',
    icon: BarChart3,
    to: '/services/business-systems',
    accent: 'text-[var(--app-success)]',
    surface: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    label: '04',
    title: 'Landing Pages',
    description: 'Focused pages for products and campaigns.',
    icon: ShoppingBag,
    to: '/services/landing-pages',
    accent: 'text-amber-600 dark:text-amber-400',
    surface: 'bg-amber-50 dark:bg-amber-950/30',
  },
];

const projects = [
  {
    number: '01',
    category: 'SAAS',
    title: 'PulseMetrics',
    description: 'Analytics and reporting platform.',
    icon: BarChart3,
    accent: 'bg-orange-500',
  },
  {
    number: '02',
    category: 'DASHBOARD',
    title: 'OmniFlow',
    description: 'Operations and reporting workspace.',
    icon: Layers3,
    accent: 'bg-blue-600',
  },
  {
    number: '03',
    category: 'E-COMMERCE',
    title: 'Aura',
    description: 'Fast commerce experience.',
    icon: ShoppingBag,
    accent: 'bg-emerald-600',
  },
];

export const Home: React.FC = () => {
  return (
    <main className="bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="mx-auto max-w-[1440px] px-4 pb-8 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">
        <div className="grid overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative flex min-h-[430px] flex-col justify-between overflow-hidden p-6 sm:p-8 lg:min-h-[500px] lg:p-12">
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--app-muted)]">
                FEMIX / WEB DEV
              </span>

              <span className="rounded-full border border-[var(--app-border)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                Digital Studio
              </span>
            </div>

            <div className="relative z-10 mt-16 max-w-2xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                Websites · Apps · Systems
              </p>

              <h1 className="max-w-[780px] text-[clamp(3rem,7vw,6.8rem)] font-black leading-[0.88] tracking-[-0.075em] text-[var(--app-text-strong)]">
                Digital work
                <br />
                <span className="text-[var(--app-brand)]">that moves.</span>
              </h1>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/start-project"
                  className="group inline-flex items-center gap-2 rounded-lg bg-[var(--app-text-strong)] px-5 py-3.5 text-sm font-bold text-[var(--app-bg)] transition hover:opacity-85"
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] px-5 py-3.5 text-sm font-bold text-[var(--app-text)] transition hover:bg-[var(--app-surface-2)]"
                >
                  View Work
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative z-10 mt-12 flex items-center gap-3 text-[11px] font-semibold text-[var(--app-muted)]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Building for web & mobile
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-[var(--app-border)] lg:border-l lg:border-t-0">
            <div className="flex min-h-[170px] flex-col justify-between border-b border-r border-[var(--app-border)] bg-[#fff1eb] p-5 dark:bg-[#2a1711] sm:min-h-[220px] sm:p-7">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">
                Build
              </span>
              <Code2 className="h-9 w-9 text-orange-600 dark:text-orange-300" />
            </div>

            <div className="flex min-h-[170px] flex-col justify-between border-b border-[var(--app-border)] bg-[#edf3ff] p-5 dark:bg-[#111f35] sm:min-h-[220px] sm:p-7">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
                Connect
              </span>
              <Layers3 className="h-9 w-9 text-blue-600 dark:text-blue-300" />
            </div>

            <div className="flex min-h-[170px] flex-col justify-between border-r border-[var(--app-border)] bg-[#edf8f1] p-5 dark:bg-[#11271b] sm:min-h-[220px] sm:p-7">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                Scale
              </span>
              <BarChart3 className="h-9 w-9 text-emerald-600 dark:text-emerald-300" />
            </div>

            <div className="flex min-h-[170px] flex-col justify-between bg-[#fff8df] p-5 dark:bg-[#29230e] sm:min-h-[220px] sm:p-7">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                Launch
              </span>
              <ShoppingBag className="h-9 w-9 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b border-[var(--app-border)] pb-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-muted)]">
              Selected work
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.045em] sm:text-3xl">
              Recent builds
            </h2>
          </div>

          <Link
            to="/portfolio"
            className="hidden items-center gap-1 text-xs font-bold text-[var(--app-text)] sm:flex"
          >
            All work
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-3 py-4 md:grid-cols-3">
          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <Link
                key={project.number}
                to="/portfolio"
                className="group overflow-hidden rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] transition hover:-translate-y-0.5 hover:border-[var(--app-border-strong)]"
              >
                <div className={`h-1.5 ${project.accent}`} />

                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] text-[var(--app-muted-2)]">
                      {project.number}
                    </span>
                    <Icon className="h-5 w-5 text-[var(--app-muted)] transition group-hover:text-[var(--app-text)]" />
                  </div>

                  <p className="mt-8 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--app-muted)]">
                    {project.category}
                  </p>

                  <h3 className="mt-1 text-xl font-black tracking-[-0.04em]">
                    {project.title}
                  </h3>

                  <p className="mt-1 text-xs text-[var(--app-muted)]">
                    {project.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <div className="border-y border-[var(--app-border)]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ label, title, description, icon: Icon, to, accent, surface }) => (
              <Link
                key={label}
                to={to}
                className="group flex min-h-[145px] flex-col justify-between border-b border-[var(--app-border)] p-5 transition hover:bg-[var(--app-surface)] sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${surface}`}>
                    <Icon className={`h-4 w-4 ${accent}`} />
                  </span>

                  <span className="font-mono text-[10px] text-[var(--app-muted-2)]">
                    {label}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-black">{title}</h3>
                  <p className="mt-1 max-w-[220px] text-[11px] leading-5 text-[var(--app-muted)]">
                    {description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
