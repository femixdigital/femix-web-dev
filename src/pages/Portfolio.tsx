import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Code2,
  Layers3,
  ShoppingBag,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'SaaS' | 'SPA' | 'Dashboard' | 'E-Commerce';
  description: string;
  techStack: string[];
  metrics: string;
  liveUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'PulseMetrics SaaS Platform',
    category: 'SaaS',
    description:
      'A real-time product analytics and user event tracking platform featuring PostgreSQL data systems, subscription billing and live reporting.',
    techStack: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Stripe API'],
    metrics: '+140% faster load times · 10k+ active users',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'OmniFlow Admin Dashboard',
    category: 'Dashboard',
    description:
      'An administrative workspace designed around role-based access, reporting workflows, CSV exports and operational visibility.',
    techStack: ['React', 'Vite', 'PostgreSQL', 'Lucide Icons'],
    metrics: '75% reduction in report generation time',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Aura Headless E-Commerce SPA',
    category: 'SPA',
    description:
      'A high-performance shopping experience with client-side navigation, responsive product browsing, optimistic cart updates and secure payments.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe Elements'],
    metrics: '99/100 Lighthouse Performance score',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'DevSync Collaborative Workspace',
    category: 'SaaS',
    description:
      'A collaborative productivity platform with real-time document synchronization, team permissions and custom webhook integrations.',
    techStack: ['React', 'Supabase RLS', 'TypeScript', 'Tailwind CSS'],
    metrics: 'Built for reliable multi-region operation',
    liveUrl: '#',
  },
];

const FILTERS = ['All', 'SaaS', 'SPA', 'Dashboard'] as const;

const categoryIcons = {
  SaaS: Layers3,
  SPA: Code2,
  Dashboard: BarChart3,
  'E-Commerce': ShoppingBag,
};

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="border-b border-[var(--app-border)] bg-[var(--app-surface)]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                <Layers3 className="h-3.5 w-3.5 text-[var(--app-brand)]" />
                Selected work
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Digital products built for real business use.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
                Explore examples of web platforms, dashboards, SaaS products
                and digital experiences built around clarity, performance and
                practical business requirements.
              </p>
            </div>

            <div className="border-t border-[var(--app-border)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-muted)]">
                Our approach
              </p>

              <div className="mt-5 space-y-4">
                {[
                  'Clear interfaces built around real users',
                  'Responsive experiences across devices',
                  'Modern and maintainable frontend systems',
                  'Technology selected around project requirements',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--app-brand)]" />
                    <p className="text-sm leading-6 text-[var(--app-text)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                Portfolio
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                Selected projects
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-[var(--app-muted)]">
              Filter the work by product type to see different examples of
              what we can build.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-[var(--app-border)] pb-5">
            {FILTERS.map((category) => {
              const isActive = activeFilter === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-bold transition ${
                    isActive
                      ? 'border-[var(--app-brand)] bg-[var(--app-brand)] text-[var(--app-brand-contrast)]'
                      : 'border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-muted)] hover:border-[var(--app-border-strong)] hover:text-[var(--app-text)]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-[var(--app-border)] bg-[var(--app-border)]">
            {filteredProjects.map((project, index) => {
              const Icon = categoryIcons[project.category];

              return (
                <article
                  key={project.id}
                  className="bg-[var(--app-surface)] p-6 transition hover:bg-[var(--app-surface-2)] sm:p-7 lg:p-8"
                >
                  <div className="grid gap-7 lg:grid-cols-[72px_minmax(0,1fr)_auto] lg:items-start lg:gap-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[11px] font-bold tracking-[0.16em] text-[var(--app-muted-2)]">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-[var(--app-muted-2)]" />

                        <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--app-brand)]">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="mt-3 text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">
                        {project.title}
                      </h3>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--app-muted)]">
                        {project.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-[var(--app-border)] bg-[var(--app-surface-2)] px-2.5 py-1.5 text-xs font-medium text-[var(--app-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-[var(--app-border)] pt-5 lg:w-64 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                        Project outcome
                      </p>

                      <p className="mt-2 text-sm font-bold leading-6 text-[var(--app-text)]">
                        {project.metrics}
                      </p>

                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--app-brand)] transition hover:text-[var(--app-brand-hover)]"
                        >
                          View live project
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--app-border)] bg-[var(--app-surface-2)]">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="flex flex-col gap-6 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                Your project
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                Have something worth building?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--app-muted)] sm:text-base">
                Tell us what you need and we&apos;ll help define the right
                scope, features and starting point for the project.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                to="/start-project"
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

export default Portfolio;
