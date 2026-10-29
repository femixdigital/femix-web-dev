
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Code2,
  Layers3,
  Monitor,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

const services = [
  {
    icon: <Monitor size={21} />,
    title: 'Business Websites',
    description: 'Professional websites for your business.',
    price: 'From ₦80,000',
    link: '/services',
  },
  {
    icon: <ShoppingBag size={21} />,
    title: 'E-Commerce',
    description: 'Online stores with secure checkout.',
    price: 'From ₦250,000',
    link: '/services',
  },
  {
    icon: <BarChart3 size={21} />,
    title: 'Dashboards & Systems',
    description: 'Manage operations, data and reports.',
    price: 'From ₦300,000',
    link: '/services',
  },
  {
    icon: <Code2 size={21} />,
    title: 'Web Applications',
    description: 'Custom tools built around your needs.',
    price: 'From ₦300,000',
    link: '/services',
  },
];

const websitePackages = [
  { name: 'Starter Website', price: '₦80,000+' },
  { name: 'Business Website', price: '₦120,000+' },
  { name: 'Professional Website', price: '₦150,000+' },
  { name: 'Premium Website', price: '₦200,000+' },
  { name: 'Advanced Website', price: '₦250,000+' },
  { name: 'E-Commerce Website', price: '₦300,000+' },
];

const platformPackages = [
  { name: 'Custom Web Application', price: '₦400,000+' },
  { name: 'Business Management System', price: '₦500,000+' },
  { name: 'Advanced SaaS Platform', price: '₦800,000+' },
  { name: 'Enterprise Platform', price: '₦1,000,000+' },
];

const projects = [
  {
    name: 'PulseMetrics',
    category: 'SaaS Platform',
    description: 'Analytics, subscriptions and real-time reporting.',
    icon: <BarChart3 size={24} />,
  },
  {
    name: 'OmniFlow',
    category: 'Admin Dashboard',
    description: 'Business operations and reporting workflows.',
    icon: <Layers3 size={24} />,
  },
  {
    name: 'Aura',
    category: 'E-Commerce SPA',
    description: 'Product browsing, shopping cart and payments.',
    icon: <ShoppingBag size={24} />,
  },
];

function PackageGroup({
  title,
  description,
  packages,
}: {
  title: string;
  description: string;
  packages: { name: string; price: string }[];
}) {
  return (
    <details className="group rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <h3 className="font-semibold text-[var(--app-text)]">{title}</h3>
          <p className="mt-1 text-sm text-[var(--app-muted)]">
            {description}
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-[var(--app-bg)] px-3 py-2 text-sm font-semibold text-[var(--app-primary)]">
          {packages.length} plans
        </span>
      </summary>

      <div className="border-t border-[var(--app-border)] p-3">
        {packages.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between gap-3 rounded-lg px-3 py-3 hover:bg-[var(--app-bg)]"
          >
            <span className="text-sm font-medium text-[var(--app-text)]">
              {item.name}
            </span>
            <span className="shrink-0 text-sm font-semibold text-[var(--app-primary)]">
              {item.price}
            </span>
          </div>
        ))}

        <Link
          to="/estimator"
          className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[var(--app-bg)] px-4 py-3 text-sm font-semibold text-[var(--app-primary)] transition hover:opacity-80"
        >
          Estimate your project <ArrowRight size={16} />
        </Link>
      </div>
    </details>
  );
}

export function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-4 px-3 pb-6 pt-3 sm:px-5 lg:px-6">
      <section className="overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)]">
        <div className="p-5 sm:p-8 lg:p-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[var(--app-bg)] px-3 py-2 text-xs font-semibold text-[var(--app-primary)]">
            <Sparkles size={15} />
            FEMIX WEB DEV
          </div>

          <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-[var(--app-text)] sm:text-5xl">
            We build for the web.
            <span className="mt-1 block text-[var(--app-primary)]">
              Your vision, brought to life.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--app-muted)] sm:text-base">
            Modern websites and web applications that help businesses work
            smarter, serve customers better and grow online.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/start-project"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--app-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start a Project <ArrowRight size={17} />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-5 py-3 text-sm font-semibold text-[var(--app-text)] transition hover:bg-[var(--app-bg)]"
            >
              View Our Work
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-[var(--app-border)] pt-5">
            {[
              'Mobile-friendly',
              'Business-focused',
              'Custom-built',
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 text-xs font-medium text-[var(--app-muted)] sm:text-sm"
              >
                <CheckCircle2 size={16} className="text-[var(--app-primary)]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[var(--app-text)]">
              What We Build
            </h2>
            <p className="mt-1 text-sm text-[var(--app-muted)]">
              Digital solutions for your business.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--app-primary)]"
          >
            All services <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.link}
              className="group flex gap-4 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 transition hover:border-[var(--app-primary)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--app-bg)] text-[var(--app-primary)]">
                {service.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[var(--app-text)]">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm leading-5 text-[var(--app-muted)]">
                  {service.description}
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-[var(--app-primary)]">
                    {service.price}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-[var(--app-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--app-primary)]"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3">
          <h2 className="text-xl font-bold text-[var(--app-text)]">
            Website Packages
          </h2>
          <p className="mt-1 text-sm text-[var(--app-muted)]">
            Clear starting prices. Final costs depend on your requirements.
          </p>
        </div>

        <div className="space-y-3">
          <PackageGroup
            title="Websites & Online Stores"
            description="From simple business sites to full online shops."
            packages={websitePackages}
          />
          <PackageGroup
            title="Applications & Business Platforms"
            description="Custom systems, dashboards and scalable platforms."
            packages={platformPackages}
          />
        </div>

        <Link
          to="/estimator"
          className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 text-sm font-semibold text-[var(--app-primary)] transition hover:bg-[var(--app-bg)]"
        >
          Calculate Your Project Cost <ArrowRight size={17} />
        </Link>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[var(--app-text)]">
              Selected Work
            </h2>
            <p className="mt-1 text-sm text-[var(--app-muted)]">
              A look at what we create.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--app-primary)]"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.name}
              to="/portfolio"
              className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 transition hover:border-[var(--app-primary)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--app-bg)] text-[var(--app-primary)]">
                {project.icon}
              </div>
              <p className="text-xs font-medium text-[var(--app-muted)]">
                {project.category}
              </p>
              <h3 className="mt-1 font-semibold text-[var(--app-text)]">
                {project.name}
              </h3>
              <p className="mt-2 text-sm leading-5 text-[var(--app-muted)]">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      </section>


    </div>
  );
}

