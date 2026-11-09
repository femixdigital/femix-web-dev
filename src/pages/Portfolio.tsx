import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Droplets,
  Globe2,
  Layers3,
} from 'lucide-react';

type Project = {
  id: string;
  title: string;
  category: 'Service website' | 'Website project';
  description: string;
  focus: string;
  url: string;
  icon: typeof Building2;
};

const projects: Project[] = [
  {
    id: 'samfem',
    title: 'SAMFEM Cleaning Agency',
    category: 'Service website',
    description:
      'A website for SAMFEM Cleaning Agency, with information about its cleaning services and a form for customer enquiries.',
    focus:
      'Cleaning service information, enquiry submissions, customer reviews and an admin dashboard.',
    url: 'https://samfemcleaningagency.com.ng',
    icon: Building2,
  },
  {
    id: 'plumbing',
    title: 'Femix Plumbing Services',
    category: 'Service website',
    description:
      'A website for Femix Plumbing Services, presenting its plumbing work and contact information.',
    focus: 'Plumbing service information and ways to contact the business.',
    url: 'https://femixplumbing.name.ng',
    icon: Droplets,
  },
  {
    id: 'bpv',
    title: 'BPV Website',
    category: 'Website project',
    description:
      'A website project for BPV, with its information arranged into clear sections.',
    focus: 'Page layout, content organisation and responsive display.',
    url: 'https://femixdigital.github.io/bpv-website/',
    icon: Globe2,
  },
];

const filters = ['All', 'Service website', 'Website project'] as const;

export const Portfolio = () => {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>('All');

  const visibleProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[var(--app-primary)]">
            <span className="h-2 w-2 rounded-full bg-[var(--app-primary)]" />
            FEMIX WEB DEV / OUR WORK
          </div>

          <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                A look at our
                <span className="block text-[var(--app-primary)]">
                  projects.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-[var(--app-muted)]">
                Explore selected websites and digital projects developed by
                Femix Web Dev. Every project starts with a real need and a
                practical solution.
              </p>
            </div>

            <Link
              to="/start-project"
              className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--app-primary)] px-5 py-3 text-base font-semibold text-white transition hover:opacity-90"
            >
              Start a Project <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2 border-t border-[var(--app-border)] pt-5">
            {[
              { value: '03', label: 'Listed projects' },
              { value: '02', label: 'Service websites' },
              { value: '01', label: 'Other project' },
            ].map((item) => (
              <div key={item.label} className="min-w-0">
                <p className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-base leading-7 text-[var(--app-muted)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                Our projects
              </h2>
              <p className="mt-1 text-base text-[var(--app-muted)]">
                A closer look at the websites listed here.
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={isActive}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'border-[var(--app-primary)] bg-[var(--app-primary)] text-white'
                        : 'border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-muted)] hover:border-[var(--app-primary)] hover:text-[var(--app-primary)]'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => {
              const Icon = project.icon;

              return (
                <article
                  key={project.id}
                  className="group flex flex-col rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 transition duration-200 hover:-translate-y-1 hover:border-[var(--app-primary)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--app-bg)] text-[var(--app-primary)]">
                      <Icon size={23} />
                    </span>
                    <span className="rounded-full bg-[var(--app-bg)] px-3 py-1.5 text-xs font-medium text-[var(--app-muted)]">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold leading-snug">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-base leading-7 text-[var(--app-muted)]">
                    {project.description}
                  </p>

                  <div className="mt-5 border-t border-[var(--app-border)] pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--app-muted)]">
                      Project focus
                    </p>
                    <p className="mt-2 text-base leading-7">
                      {project.focus}
                    </p>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-base font-semibold text-[var(--app-primary)]"
                  >
                    Visit live website
                    <ArrowUpRight
                      size={16}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col justify-between gap-4 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 sm:flex-row sm:items-center sm:p-7">
          <div>
            <div className="flex items-center gap-2 text-base font-semibold text-[var(--app-primary)]">
              <Layers3 size={17} />
              NEED A WEBSITE OR WEB APPLICATION?
            </div>
            <h2 className="mt-2 text-xl font-bold">
              Tell us what you want to build.
            </h2>
            <p className="mt-1 text-base text-[var(--app-muted)]">
              Share your requirements and we'll discuss the work involved.
            </p>
          </div>

          <Link
            to="/start-project"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--app-primary)] px-5 py-3 text-base font-semibold text-white transition hover:opacity-90"
          >
            Start a project <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Portfolio;
