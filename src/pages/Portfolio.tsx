import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
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
      'Real-time product analytics, subscriptions and live reporting.',
    techStack: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    metrics: '+140% faster load times · 10k+ users',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'OmniFlow Admin Dashboard',
    category: 'Dashboard',
    description:
      'Role-based operations, reporting workflows and data exports.',
    techStack: ['React', 'Vite', 'PostgreSQL', 'Lucide'],
    metrics: '75% faster report generation',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Aura Headless E-Commerce SPA',
    category: 'SPA',
    description:
      'Fast product browsing, cart flows and secure payments.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    metrics: '99/100 Lighthouse Performance',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'DevSync Collaborative Workspace',
    category: 'SaaS',
    description:
      'Real-time collaboration, permissions and webhook integrations.',
    techStack: ['React', 'Supabase RLS', 'TypeScript', 'Tailwind CSS'],
    metrics: 'Built for multi-region operation',
    liveUrl: '#',
  },
];

const FILTERS = ['All', 'SaaS', 'SPA', 'Dashboard', 'E-Commerce'] as const;

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
    <main className="min-h-[calc(100vh-64px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="border-b border-[var(--app-border)]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                Work
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
                Built to work.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--app-muted)] sm:text-base">
                Websites, applications and business systems built around real
                requirements.
              </p>
            </div>

            <Link
              to="/start-project"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[var(--app-brand)] px-5 py-3.5 text-sm font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)]"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="flex flex-wrap gap-2 border-b border-[var(--app-border)] pb-6">
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
                  className="bg-[var(--app-surface)] p-5 transition hover:bg-[var(--app-surface-2)] sm:p-7"
                >
                  <div className="grid gap-6 lg:grid-cols-[52px_minmax(0,1fr)_220px] lg:items-start lg:gap-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[11px] text-[var(--app-muted-2)]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--app-brand)]">
                          {project.category}
                        </span>
                      </div>

                      <h2 className="mt-2 text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">
                        {project.title}
                      </h2>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--app-muted)]">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-[var(--app-border)] bg-[var(--app-surface-2)] px-2.5 py-1 text-[11px] font-medium text-[var(--app-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-[var(--app-border)] pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                        Outcome
                      </p>
                      <p className="mt-2 text-sm font-bold leading-5">
                        {project.metrics}
                      </p>

                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--app-brand)] transition hover:text-[var(--app-brand-hover)]"
                        >
                          View project
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-[var(--app-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--app-muted)]">
              Have a project in mind?
            </p>

            <div className="flex gap-5">
              <Link
                to="/contact"
                className="text-sm font-bold text-[var(--app-text)] transition hover:text-[var(--app-brand)]"
              >
                Contact
              </Link>
              <Link
                to="/start-project"
                className="text-sm font-bold text-[var(--app-brand)] transition hover:text-[var(--app-brand-hover)]"
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
