import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Code2,
  Layers3,
  Monitor,
  ShoppingBag,
  Sparkles,
  Database,
  Globe,
  Smartphone,
} from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: 'Business Websites',
    description:
      'Websites for businesses that need a clear, useful place to present their services online.',
  },
  {
    icon: ShoppingBag,
    title: 'E-Commerce',
    description:
      'Online shops where customers can browse products and place orders.',
  },
  {
    icon: BarChart3,
    title: 'Dashboards & Systems',
    description:
      'Dashboards and internal tools for tracking information and handling everyday tasks.',
  },
  {
    icon: Code2,
    title: 'Web Applications',
    description:
      'Web applications developed to handle the tasks and processes your business requires.',
  },
];

const projects = [
  {
    name: 'SAMFEM Cleaning Agency',
    category: 'Service business website',
    description:
      'A cleaning services website with an enquiry form, customer reviews and an admin dashboard.',
    icon: Layers3,
    url: 'https://samfemcleaningagency.com.ng',
  },
  {
    name: 'Femix Plumbing Services',
    category: 'Service business website',
    description:
      'A website presenting plumbing services and providing customers with contact options.',
    icon: Monitor,
    url: 'https://femixplumbing.name.ng',
  },
  {
    name: 'BPV Website',
    category: 'Website project',
    description:
      'A website project built to present its information in an organised and accessible way.',
    icon: Code2,
    url: 'https://femixdigital.github.io/bpv-website/',
  },
];

const capabilities = [
  { icon: Globe, label: 'Websites', detail: 'Websites for businesses and service providers', to: '/services/web-development' },
  { icon: Code2, label: 'Applications', detail: 'Interactive web applications', to: '/services/web-applications' },
  { icon: Database, label: 'Business systems', detail: 'Dashboards and business tools', to: '/services/business-systems' },
  { icon: ShoppingBag, label: 'E-Commerce', detail: 'Product catalogues and online ordering', to: '/services/ecommerce' },
];

export function Home() {
  return (
    <div className="w-full bg-[var(--app-bg)] px-3 py-5 sm:px-5 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
      {/* Hero */}
      <section className="overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] shadow-sm">
        <div className="grid items-center gap-10 px-5 py-8 sm:px-8 md:py-10 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--app-brand-soft)] px-3 py-1.5 text-xs font-bold tracking-wide text-[var(--app-primary)]">
              <Sparkles size={14} />
              FEMIX WEB DEVELOPMENT
            </div>

            <h1 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Websites and software
              <span className="block text-[var(--app-primary)]">
                For the work you do.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--app-muted)]">
              We design and develop modern websites, web applications and
              business systems that help organisations work better and serve
              their customers online.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/start-project"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--app-primary)] px-5 py-3 text-base font-bold text-white shadow-sm transition hover:opacity-90"
              >
                Start a Project <ArrowRight size={17} />
              </Link>

              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-5 py-3 text-base font-semibold text-[var(--app-text)] transition hover:border-[var(--app-primary)] hover:text-[var(--app-primary)]"
              >
                Explore Our Work <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-[var(--app-border)] pt-5">
              {[
                'Works on mobile and desktop',
                'Built for your requirements',
                'Features chosen for the project',
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--app-muted)]"
                >
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-[var(--app-primary)]"
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Development capabilities panel */}
          <div className="relative">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[var(--app-brand-soft)] opacity-70 blur-3xl" />

            <div className="relative rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] p-5 shadow-sm sm:p-7">
              <div className="flex items-center justify-between border-b border-[var(--app-border)] pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--app-primary)]">
                    What we build
                  </p>
                  <h2 className="mt-1 text-lg font-bold">What we build</h2>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--app-brand-soft)] text-[var(--app-primary)]">
                  <Code2 size={21} />
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {capabilities.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="group rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--app-primary)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--app-primary)] focus-visible:ring-offset-2"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--app-brand-soft)] text-[var(--app-primary)] transition-colors group-hover:bg-[var(--app-primary)] group-hover:text-white">
                        <Icon size={20} />
                      </span>
                      <h3 className="mt-4 text-base font-bold text-[var(--app-text)]">
                        {item.label}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--app-muted)]">
                        {item.detail}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--app-primary)]">
                        Explore <ArrowUpRight size={15} />
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-xl bg-[var(--app-brand-soft)] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--app-primary)] text-white">
                  <Smartphone size={19} />
                </span>
                <div>
                  <p className="text-base font-bold">Mobile-friendly layouts</p>
                  <p className="mt-0.5 text-sm text-[var(--app-muted)]">
                    Works on mobile and desktop across devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] px-5 py-8 shadow-sm sm:px-8 md:py-10 lg:px-10">
        <div className="mx-auto">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--app-primary)]">
                WHAT WE DO
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Web development services
              </h2>
              <p className="mt-2 max-w-xl text-base leading-7 text-[var(--app-muted)]">
                From a business website to a custom digital platform, explore
                solutions for your next step.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex shrink-0 items-center gap-1 text-base font-bold text-[var(--app-primary)] hover:gap-2"
            >
              All services <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.title}
                  to="/services"
                  className="group rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--app-primary)] hover:shadow-[var(--app-card-shadow-hover)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--app-brand-soft)] text-[var(--app-primary)] transition group-hover:bg-[var(--app-primary)] group-hover:text-white">
                      <Icon size={21} />
                    </span>
                    <span className="text-xs font-semibold text-[var(--app-muted-2)]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-bold">{service.title}</h3>
                  <p className="mt-2 min-h-12 text-base leading-7 text-[var(--app-muted)]">
                    {service.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-base font-bold text-[var(--app-primary)]">
                    Explore service
                    <ArrowRight
                      size={15}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selected projects */}
      <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] px-5 py-8 shadow-sm sm:px-8 md:py-10 lg:px-10">
        <div className="mx-auto">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--app-primary)]">
                SELECTED WORK
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Website projects
              </h2>
              <p className="mt-2 text-base text-[var(--app-muted)]">
                Visit the websites below to see examples of our work.
              </p>
            </div>

            <Link
              to="/portfolio"
              className="inline-flex shrink-0 items-center gap-1 text-base font-bold text-[var(--app-primary)] hover:gap-2"
            >
              View portfolio <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {projects.map((project) => {
              const Icon = project.icon;

              return (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--app-primary)] hover:shadow-[var(--app-card-shadow-hover)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--app-brand-soft)] text-[var(--app-primary)]">
                      <Icon size={21} />
                    </span>
                    <ArrowUpRight
                      size={19}
                      className="text-[var(--app-muted)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--app-primary)]"
                    />
                  </div>

                  <p className="mt-5 text-xs font-semibold text-[var(--app-muted)]">
                    {project.category}
                  </p>
                  <h3 className="mt-1 text-base font-bold">{project.name}</h3>
                  <p className="mt-2 text-base leading-7 text-[var(--app-muted)]">
                    {project.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-base font-bold text-[var(--app-primary)]">
                    Visit website <ArrowUpRight size={15} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Final call to action */}
      <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] px-5 py-8 shadow-sm sm:px-8 md:py-10 lg:px-10">
        <div className="mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-[var(--app-bg)] p-5 sm:p-7 md:p-8">
            <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[var(--app-brand-soft)] opacity-70 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--app-primary)]">
                  START A PROJECT
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  What would you like your website to do?
                </h2>
                <p className="mt-2 text-base leading-7 text-[var(--app-muted)]">
                  Tell us what you're planning. We'll help you identify the
                  right digital solution and the next steps.
                </p>
              </div>

              <div className="relative flex shrink-0 flex-wrap gap-3">
                <Link
                  to="/start-project"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--app-primary)] px-5 py-3 text-base font-bold text-white transition hover:opacity-90"
                >
                  Start a Project <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
