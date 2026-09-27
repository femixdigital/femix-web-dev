import React from 'react';
import { Link } from 'react-router-dom';
import Pricing from '../components/Pricing';
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Check,
  Code2,
  Database,
  Globe,
  Layers3,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const services = [
  {
    number: '01',
    icon: Globe,
    title: 'Business Websites',
    description:
      'Professional websites designed to make your business look credible, communicate clearly, and turn visitors into enquiries.',
    features: ['Mobile-first design', 'Fast performance'],
  },
  {
    number: '02',
    icon: Layers3,
    title: 'Web Apps & SaaS',
    description:
      'Custom web applications built around the way your business actually works, from internal tools to complete SaaS products.',
    features: ['Custom workflows', 'Scalable architecture'],
  },
  {
    number: '03',
    icon: Database,
    title: 'Dashboards & Systems',
    description:
      'Clean, practical dashboards that connect your data, simplify operations, and give you a clearer view of your business.',
    features: ['Secure data systems', 'Real-time interfaces'],
  },
];

const technologies = [
  { label: 'React', icon: Code2 },
  { label: 'TypeScript', icon: Globe },
  { label: 'Supabase', icon: Database },
  { label: 'Tailwind CSS', icon: Layers3 },
];

export const Home: React.FC = () => {
  return (
    <div className="overflow-hidden bg-[#0c0c0b] text-white">
      {/* Hero */}
      <section className="relative border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-3xl" />
          <div className="absolute -right-40 top-32 h-80 w-80 rounded-full bg-amber-100/[0.025] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-32">
          <div className="max-w-5xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
              <Sparkles className="h-3.5 w-3.5 text-white/80" />
              Web design & development studio
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-7xl lg:text-[88px]">
              Digital products
              <span className="block text-white/40">built to move</span>
              your business forward.
            </h1>

            <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-base leading-7 text-white/50 sm:text-lg">
                Femix Web Dev creates polished websites, web applications, dashboards,
                and digital systems for businesses that want to work smarter and look
                professional online.
              </p>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Link
                  to="/estimator"
                  className="group flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0c0c0b] transition-transform hover:scale-[1.02]"
                >
                  Calculate your project
                  <Calculator className="h-4 w-4" />
                </Link>

                <Link
                  to="/portfolio"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/5"
                >
                  View our work
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20 grid border-y border-white/10 sm:grid-cols-3">
            <div className="border-b border-white/10 py-6 sm:border-b-0 sm:border-r sm:pr-8">
              <p className="text-2xl font-semibold tracking-tight">01</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/35">
                Understand
              </p>
            </div>
            <div className="border-b border-white/10 py-6 sm:border-b-0 sm:px-8 sm:border-r">
              <p className="text-2xl font-semibold tracking-tight">02</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/35">
                Design
              </p>
            </div>
            <div className="py-6 sm:pl-8">
              <p className="text-2xl font-semibold tracking-tight">03</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/35">
                Build
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              What we build
            </p>
            <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
              From your first idea to a working digital product.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/45">
              Whether you need a website that represents your business or a system
              that runs part of it, we focus on useful design and dependable
              technology.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/65"
            >
              Tell us about your project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {services.map(({ number, icon: Icon, title, description, features }) => (
              <div
                key={number}
                className="group grid gap-6 py-8 sm:grid-cols-[52px_1fr_auto] sm:items-start sm:gap-6"
              >
                <span className="text-xs font-medium text-white/25">{number}</span>

                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/70">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                  </div>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
                    {description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {features.map((feature) => (
                      <span
                        key={feature}
                        className="flex items-center gap-1.5 text-xs text-white/45"
                      >
                        <Check className="h-3.5 w-3.5 text-white/60" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <ArrowUpRight className="hidden h-5 w-5 text-white/20 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white sm:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      {/* Technology */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                Built with modern technology
              </p>
              <p className="mt-2 text-sm text-white/45">
                A dependable stack for fast, maintainable digital products.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {technologies.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex min-w-[130px] items-center gap-2.5 rounded-xl border border-white/10 bg-[#0c0c0b] px-4 py-3 text-xs font-medium text-white/55"
                >
                  <Icon className="h-4 w-4 text-white/65" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust / CTA */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:py-32">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#151514] p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/[0.035] blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <ShieldCheck className="h-5 w-5 text-white/70" />
              </div>

              <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                Have a project in mind?
                <span className="block text-white/40">Let's turn it into something real.</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
                Get an initial estimate, show us what you need, and we'll help you
                work out the right way to build it.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/estimator"
                className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0c0c0b] transition-transform hover:scale-[1.02]"
              >
                Start with an estimate
                <Calculator className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/5"
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
