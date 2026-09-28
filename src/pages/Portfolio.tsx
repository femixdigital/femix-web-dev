import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Code2,
  Layers3,
  ShoppingBag,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'SaaS' | 'SPA' | 'Dashboard' | 'E-Commerce';
  description: string;
  imageBg: string;
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
      'A real-time product analytics and user event tracking platform featuring custom PostgreSQL indexing, subscription billing, and live data charts.',
    imageBg: 'from-violet-500/20 via-blue-500/10 to-emerald-500/10',
    techStack: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Stripe API'],
    metrics: '+140% faster load times, 10k+ active users',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'OmniFlow Admin Dashboard',
    category: 'Dashboard',
    description:
      'Enterprise-grade administrative dashboard equipped with role-based access control, CSV export pipelines, and interactive toast feedback alerts.',
    imageBg: 'from-blue-500/20 via-indigo-500/10 to-violet-500/10',
    techStack: ['React', 'Vite', 'PostgreSQL', 'Lucide Icons'],
    metrics: 'Reduced report generation time by 75%',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Aura Headless E-Commerce SPA',
    category: 'SPA',
    description:
      'High-performance single-page shopping application with instant client-side routing, optimistic cart updates, and secure payment processing.',
    imageBg: 'from-emerald-500/20 via-teal-500/10 to-blue-500/10',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe Elements'],
    metrics: '99/100 Lighthouse Performance score',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'DevSync Collaborative Workspace',
    category: 'SaaS',
    description:
      'Developer productivity suite featuring real-time document synchronization, team permission management, and custom webhook integrations.',
    imageBg: 'from-amber-500/20 via-orange-500/10 to-rose-500/10',
    techStack: ['React', 'Supabase RLS', 'TypeScript', 'Tailwind CSS'],
    metrics: 'Zero downtime across 3 server regions',
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

const categoryStyles: Record<
  Project['category'],
  { icon: string; badge: string; accent: string }
> = {
  SaaS: {
    icon: 'bg-violet-500/10 text-violet-600 dark:text-violet-300',
    badge: 'text-violet-600 dark:text-violet-300',
    accent: 'from-violet-500/25 to-blue-500/10',
  },
  SPA: {
    icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-300',
    badge: 'text-blue-600 dark:text-blue-300',
    accent: 'from-blue-500/25 to-emerald-500/10',
  },
  Dashboard: {
    icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
    badge: 'text-emerald-600 dark:text-emerald-300',
    accent: 'from-emerald-500/25 to-teal-500/10',
  },
  'E-Commerce': {
    icon: 'bg-amber-500/10 text-amber-600 dark:text-amber-300',
    badge: 'text-amber-600 dark:text-amber-300',
    accent: 'from-amber-500/25 to-rose-500/10',
  },
};

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <main className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-14 sm:px-8 sm:pb-28 sm:pt-20 lg:pb-32">
        {/* Header */}
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-300">
            <Layers3 className="h-3.5 w-3.5" />
            Selected work
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Digital products designed to
            <span className="block bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent">
              work beautifully.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
            A selection of web platforms, dashboards, SaaS products and
            interactive experiences built with performance, clarity and
            real-world business needs in mind.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap gap-2 border-b border-[var(--app-border)] pb-5">
          {FILTERS.map((category) => {
            const isActive = activeFilter === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? 'border-[var(--app-brand)] bg-[var(--app-brand)] text-white shadow-sm'
                    : 'border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-muted)] hover:border-violet-400/40 hover:text-[var(--app-text)]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Project grid */}
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {filteredProjects.map((project, index) => {
            const Icon = categoryIcons[project.category];
            const styles = categoryStyles[project.category];

            return (
              <article
                key={project.id}
                className="group overflow-hidden rounded-[2rem] border border-[var(--app-border)] bg-[var(--app-surface)] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Project visual */}
                <div
                  className={`relative h-64 overflow-hidden bg-gradient-to-br ${project.imageBg} p-6 sm:h-72 sm:p-8`}
                >
                  <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)]/80 px-3 py-1.5 text-xs font-bold backdrop-blur-sm ${styles.badge}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {project.category}
                      </span>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title}`}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--app-border)] bg-[var(--app-surface)]/80 text-[var(--app-text)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-[var(--app-surface)]"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                        {String(index + 1).padStart(2, '0')} / Case study
                      </p>

                      <h2 className="max-w-xl text-2xl font-extrabold tracking-tight sm:text-3xl">
                        {project.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Project details */}
                <div className="p-6 sm:p-8">
                  <p className="text-sm leading-7 text-[var(--app-muted)]">
                    {project.description}
                  </p>

                  <div className="mt-7 flex items-start gap-3 border-t border-[var(--app-border)] pt-5">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>

                    <p className="pt-1 text-sm font-bold text-[var(--app-text)]">
                      {project.metrics}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-1.5 text-xs font-medium text-[var(--app-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing CTA */}
        <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-violet-500/20 bg-[var(--app-surface)] p-8 shadow-lg shadow-violet-500/5 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-blue-500/8 blur-3xl" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-violet-600 dark:text-violet-300">
                Have something in mind?
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Let&apos;s build your next digital product.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
                Tell us what you need and get an initial project estimate.
              </p>
            </div>

            <Link
              to="/estimator"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[var(--app-brand)] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/15 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Start with an estimate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
