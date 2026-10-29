
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
    description: 'Real-time product analytics, subscriptions and live reporting.',
    techStack: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    metrics: '+140% faster load times · 10k+ users',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'OmniFlow Admin Dashboard',
    category: 'Dashboard',
    description: 'Role-based operations, reporting workflows and data exports.',
    techStack: ['React', 'Vite', 'PostgreSQL', 'Lucide'],
    metrics: '75% faster report generation',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Aura Headless E-Commerce SPA',
    category: 'SPA',
    description: 'Fast product browsing, cart flows and secure payments.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    metrics: '99/100 Lighthouse Performance',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'DevSync Collaborative Workspace',
    category: 'SaaS',
    description: 'Real-time collaboration, permissions and webhook integrations.',
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
      <div className="mx-auto max-w-5xl space-y-4 px-3 pb-6 pt-3 sm:px-5 lg:px-6">
        <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--app-primary)]">
            <span className="h-2 w-2 rounded-full bg-[var(--app-primary)]" />
            FEMIX WEB DEV
          </div>

          <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Portfolio
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--app-muted)] sm:text-base">
                Websites, applications and digital systems designed to solve real business problems.
              </p>
            </div>

            <Link
              to="/start-project"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[var(--app-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--app-border)] pt-3">
            {[
              { label: 'Projects', value: '04' },
              { label: 'Categories', value: '04' },
              { label: 'Built for', value: 'Business' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-[var(--app-bg)] p-3"
              >
                <p className="text-xs text-[var(--app-muted)]">{item.label}</p>
                <p className="mt-1 text-base font-bold text-[var(--app-text)] sm:text-lg">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3">
            <h2 className="text-xl font-bold">Selected Projects</h2>
            <p className="mt-1 text-sm text-[var(--app-muted)]">
              Explore our work by category.
            </p>
          </div>

          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map((category) => {
              const isActive = activeFilter === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  aria-pressed={isActive}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'border-[var(--app-primary)] bg-[var(--app-primary)] text-white'
                      : 'border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-muted)] hover:border-[var(--app-primary)] hover:text-[var(--app-primary)]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>



          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {filteredProjects.map((project) => {
              const Icon = categoryIcons[project.category];

              return (
                <article
                  key={project.id}
                  className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-3 transition hover:border-[var(--app-primary)] sm:p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--app-bg)] text-[var(--app-primary)]">
                      <Icon size={22} />
                    </span>
                    <span className="rounded-full bg-[var(--app-bg)] px-3 py-1.5 text-xs font-medium text-[var(--app-muted)]">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-5 text-[var(--app-muted)]">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[var(--app-border)] bg-[var(--app-bg)] px-2 py-1 text-xs text-[var(--app-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-[var(--app-border)] pt-4">
                    <p className="text-xs font-medium text-[var(--app-muted)]">
                      Outcome
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-[var(--app-text)]">
                      {project.metrics}
                    </p>
                  </div>

                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--app-primary)]"
                    >
                      View Project <ArrowUpRight size={16} />
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </section>


      </div>
    </main>
  );
};

export default Portfolio;
