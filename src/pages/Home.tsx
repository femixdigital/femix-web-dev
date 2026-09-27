import React from 'react';
import { Link } from 'react-router-dom';
import Pricing from '../components/Pricing';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Database,
  Globe,
  Layers3,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

const services = [
  {
    number: '01',
    icon: Globe,
    accent: 'violet',
    title: 'Business Websites',
    description:
      'Professional websites designed to make your business look credible, communicate clearly, and turn visitors into enquiries.',
    features: ['Mobile-first design', 'Fast performance', 'WhatsApp & contact CTAs'],
  },
  {
    number: '02',
    icon: Layers3,
    accent: 'blue',
    title: 'Web Apps & SaaS',
    description:
      'Custom web applications built around the way your business actually works, from internal tools to complete SaaS products.',
    features: ['Custom workflows', 'Scalable architecture', 'User accounts'],
  },
  {
    number: '03',
    icon: Database,
    accent: 'emerald',
    title: 'Dashboards & Systems',
    description:
      'Clean, practical dashboards that connect your data, simplify operations, and give you a clearer view of your business.',
    features: ['Secure data systems', 'Admin dashboards', 'Real-time interfaces'],
  },
];

const process = [
  {
    number: '01',
    title: 'Understand',
    description: 'We learn what your business needs and what the product must achieve.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'We shape the structure, interface and experience before development.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'We turn the approved direction into a responsive working product.',
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
    <div className="overflow-hidden bg-[var(--app-bg)] text-[var(--app-text)]">
      {/* Hero */}
      <section className="relative border-b border-[var(--app-border)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:pb-32 lg:pt-28">
          <div className="max-w-6xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-300">
              <Sparkles className="h-3.5 w-3.5" />
              Web design · Development · Digital products
            </div>

            <h1 className="max-w-6xl text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[88px]">
              We build digital products
              <span className="block bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent">
                that move businesses forward.
              </span>
            </h1>

            <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="max-w-2xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
                Femix Web Dev creates polished websites, web applications,
                dashboards and digital systems for businesses that want to
                look professional and work smarter online.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/estimator"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--app-brand)] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/15 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] px-6 py-3.5 text-sm font-semibold text-[var(--app-text)] transition hover:border-violet-400/40 hover:bg-[var(--app-surface-2)]"
                >
                  Explore services
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 grid overflow-hidden rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] shadow-sm sm:grid-cols-3">
            {process.map(({ number, title, description }, index) => (
              <div
                key={number}
                className={`p-6 sm:p-7 ${
                  index < process.length - 1
                    ? 'border-b border-[var(--app-border)] sm:border-b-0 sm:border-r'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.16em] text-[var(--app-muted)]">
                    {number}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--app-surface-2)]">
                    {number === '01' && <MonitorSmartphone className="h-4 w-4 text-violet-500" />}
                    {number === '02' && <Palette className="h-4 w-4 text-blue-500" />}
                    {number === '03' && <Zap className="h-4 w-4 text-emerald-500" />}
                  </div>
                </div>
                <h2 className="mt-7 text-lg font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
                What we build
              </p>

              <h2 className="mt-5 max-w-md text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl">
                From your first idea to a working digital product.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-[var(--app-muted)] sm:text-base">
                Whether you need a website that represents your business or a
                system that runs part of it, we focus on useful design and
                dependable technology.
              </p>

              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--app-text)] transition hover:text-violet-600 dark:hover:text-violet-300"
              >
                Tell us about your project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {services.map(({ number, icon: Icon, accent, title, description, features }) => {
                const accentClass =
                  accent === 'violet'
                    ? 'bg-violet-500/10 text-violet-600 dark:text-violet-300'
                    : accent === 'blue'
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-300'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300';

                return (
                  <article
                    key={number}
                    className="group rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accentClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-xs font-bold tracking-[0.16em] text-[var(--app-muted)]">
                        {number}
                      </span>
                    </div>

                    <div className="mt-7 flex items-start justify-between gap-5">
                      <div>
                        <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                          {title}
                        </h3>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--app-muted)] sm:text-base">
                          {description}
                        </p>
                      </div>

                      <ArrowUpRight className="hidden h-5 w-5 text-[var(--app-muted)] transition group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-1.5 text-xs font-medium text-[var(--app-muted)]"
                        >
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <Pricing />

      {/* Portfolio preview */}
      <section id="portfolio" className="scroll-mt-24 border-y border-[var(--app-border)] bg-[var(--app-surface-2)]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:py-32">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
                Selected work
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
                Built for real businesses.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--app-muted)] sm:text-base">
                Explore websites, interfaces and digital products created by
                Femix Web Dev.
              </p>
            </div>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--app-text)] hover:text-blue-600 dark:hover:text-blue-300"
            >
              View full portfolio
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Business websites',
                text: 'Professional digital presence designed around your brand.',
                icon: Globe,
                accent: 'violet',
              },
              {
                title: 'Web applications',
                text: 'Interactive products with accounts, workflows and data.',
                icon: Layers3,
                accent: 'blue',
              },
              {
                title: 'Business systems',
                text: 'Dashboards and tools that make everyday operations clearer.',
                icon: Database,
                accent: 'emerald',
              },
            ].map(({ title, text, icon: Icon, accent }) => (
              <Link
                key={title}
                to="/portfolio"
                className="group rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    accent === 'violet'
                      ? 'bg-violet-500/10 text-violet-600 dark:text-violet-300'
                      : accent === 'blue'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-300'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-8 text-lg font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">{text}</p>

                <span className="mt-7 inline-flex items-center gap-2 text-xs font-bold">
                  Explore work
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="border-b border-[var(--app-border)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--app-muted)]">
                Modern technology
              </p>
              <p className="mt-2 text-sm text-[var(--app-muted)]">
                A dependable stack for fast, maintainable digital products.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {technologies.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex min-w-[130px] items-center gap-2.5 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3 text-xs font-bold text-[var(--app-muted)]"
                >
                  <Icon className="h-4 w-4 text-violet-500" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:py-32">
          <div className="relative overflow-hidden rounded-[2rem] border border-violet-500/20 bg-[var(--app-surface)] p-8 shadow-xl shadow-violet-500/5 sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-emerald-500/8 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl">
                  Have a project in mind?
                  <span className="block bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                    Let's turn it into something real.
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--app-muted)] sm:text-base">
                  Get an initial estimate, tell us what you need, and we'll
                  help work out the right way to build it.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  to="/estimator"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--app-brand)] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/15 transition hover:-translate-y-0.5"
                >
                  Get an estimate
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-2)] px-6 py-3.5 text-sm font-bold text-[var(--app-text)] transition hover:border-violet-400/40"
                >
                  Contact Femix
                  <MessageCircle className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
