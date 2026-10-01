import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Code2,
  Layers3,
  Monitor,
  ShoppingBag,
} from 'lucide-react';

const services = [
  {
    title: 'Web Development',
    description:
      'Professional business websites designed to build trust and turn visitors into customers.',
    icon: Code2,
    to: '/services/web-development',
  },
  {
    title: 'Web Applications',
    description:
      'Interactive web applications and platforms built around your business workflow.',
    icon: Layers3,
    to: '/services/web-applications',
  },
  {
    title: 'Business Systems',
    description:
      'Practical digital systems that help businesses organize operations and work more efficiently.',
    icon: BarChart3,
    to: '/services/business-systems',
  },
  {
    title: 'Landing Pages',
    description:
      'Focused, conversion-ready pages for products, services, campaigns and launches.',
    icon: ShoppingBag,
    to: '/services/landing-pages',
  },
];


const packages = [
  {
    price: '₦80k+',
    title: 'Starter Website',
    description: 'A clean, responsive website for individuals, small businesses and simple service brands.',
    scope: 'Up to 3–4 pages, responsive design, contact/WhatsApp CTA.',
  },
  {
    price: '₦120k+',
    title: 'Business Website',
    description: 'A professional multi-page website built to establish trust and generate enquiries.',
    scope: 'Up to 5–7 pages, business sections, contact forms and basic SEO setup.',
  },
  {
    price: '₦150k+',
    title: 'Professional Website',
    description: 'A more polished business presence with stronger content structure and conversion focus.',
    scope: 'Custom UI, more sections/pages, lead flows and enhanced responsive experience.',
  },
  {
    price: '₦200k+',
    title: 'Business Plus',
    description: 'A larger business website with richer functionality and stronger customer journeys.',
    scope: 'Expanded pages, advanced forms, integrations and tailored business features.',
  },
  {
    price: '₦250k+',
    title: 'Advanced Business Website',
    description: 'A feature-rich website for established businesses with more complex requirements.',
    scope: 'Advanced sections, integrations, custom interactions and enhanced SEO foundations.',
  },
  {
    price: '₦300k+',
    title: 'Premium Website',
    description: 'A high-end digital presence with a more custom interface and deeper functionality.',
    scope: 'Premium UI, custom components, integrations and performance-focused development.',
  },
  {
    price: '₦400k+',
    title: 'Custom Web Application',
    description: 'A purpose-built application designed around a specific business workflow.',
    scope: 'Custom features, authentication or database options, dashboards and integrations.',
  },
  {
    price: '₦500k+',
    title: 'SaaS / SPA / Dashboard',
    description: 'An app-style digital product for customers, teams, data or recurring workflows.',
    scope: 'Interactive SPA, dashboard architecture, accounts, data workflows and integrations.',
  },
  {
    price: '₦800k+',
    title: 'Advanced Business Platform',
    description: 'A larger platform connecting customers, staff, operations and business data.',
    scope: 'Multi-role workflows, advanced dashboards, automation and connected systems.',
  },
  {
    price: '₦1m+',
    title: 'Full Custom Digital System',
    description: 'A fully tailored digital system for complex business or organizational requirements.',
    scope: 'Custom architecture, multiple modules, integrations and scalable system design.',
  },
];

const projects = [
  {
    title: 'PulseMetrics',
    category: 'Analytics Platform',
    description: 'A focused analytics and reporting experience.',
    icon: BarChart3,
  },
  {
    title: 'OmniFlow',
    category: 'Business Dashboard',
    description: 'An operations and reporting workspace.',
    icon: Layers3,
  },
  {
    title: 'Aura',
    category: 'E-commerce',
    description: 'A fast and focused commerce experience.',
    icon: ShoppingBag,
  },
];

const deliverySteps = [
  {
    number: '1',
    title: 'Plan the project',
    description:
      'We understand your business, goals, audience and the digital solution you need.',
  },
  {
    number: '2',
    title: 'Build the solution',
    description:
      'We design and develop the website, application or system around the agreed requirements.',
  },
  {
    number: '3',
    title: 'Launch and grow',
    description:
      'We test, deliver and help you move from a completed project to a working digital presence.',
  },
];

const benefits = [
  'Responsive websites that work across phones, tablets and computers',
  'Modern interfaces built around your business and customers',
  'Web applications and internal business systems',
  'Clear project communication and structured delivery',
  'Performance, usability and maintainability considered from the start',
  'Support for improving and extending your digital product',
];

export const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="bg-[var(--app-brand-soft)]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              <Monitor className="h-4 w-4" />
              Web Development &amp; Digital Solutions
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Build a stronger
              <br />
              <span className="text-[var(--app-brand)]">
                digital presence.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Femix builds professional websites, web applications and
              business systems that help organizations present their work,
              serve customers and operate more effectively.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/start-project"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--app-brand)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--app-brand-hover)]"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Explore Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core services */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--app-brand)]">
            What we build
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Digital solutions for real business needs
          </h2>

          <p className="mt-4 text-gray-600">
            From a professional company website to a custom business
            application, Femix builds digital products around what your
            organization actually needs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, description, icon: Icon, to }) => (
            <Link
              key={title}
              to={to}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {description}
              </p>

              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--app-brand)]">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Web development packages */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--app-brand)]">
                Web development packages
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Choose a starting point for your project
              </h2>

              <p className="mt-4 text-gray-600">
                Starting prices give you a clear idea of where your project can
                begin. Final pricing depends on the pages, features,
                integrations and complexity you need.
              </p>
            </div>

            <Link
              to="/estimator"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Get a custom estimate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {packages.map(({ price, title, description, scope }) => (
              <Link
                key={title}
                to="/start-project"
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Starting from
                    </p>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--app-brand)]">
                      {price}
                    </p>
                  </div>

                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-[var(--app-brand)]" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {description}
                </p>

                <div className="mt-5 border-t border-gray-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Typical scope
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {scope}
                  </p>
                </div>

                <span className="mt-auto pt-6 text-sm font-semibold text-[var(--app-brand)]">
                  Discuss this package
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-center text-xs leading-5 text-gray-500">
            All prices are starting prices. Hosting, domain, premium third-party
            services and unusually complex integrations may be quoted separately.
          </p>
        </div>
      </section>

      {/* Selected work */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--app-brand)]">
              Selected work
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Projects built with purpose
            </h2>

            <p className="mt-4 text-gray-600">
              Explore examples of the digital experiences and systems we can
              create.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.map(({ title, category, description, icon: Icon }) => (
              <Link
                key={title}
                to="/portfolio"
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                  <Icon className="h-5 w-5" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {category}
                </p>

                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {description}
                </p>

                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--app-brand)]">
                  View project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              View all work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery workflow */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--app-brand)]">
            How we work
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            A clear path from idea to launch
          </h2>

          <p className="mt-4 text-gray-600">
            We keep the process straightforward so you know what happens at
            every stage of your project.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          {deliverySteps.map(({ number, title, description }) => (
            <div key={number} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--app-brand)] text-lg font-bold text-white">
                {number}
              </div>

              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Business benefits */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--app-brand)]">
                Your digital partner
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Everything your digital project needs, in one place.
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                Whether you are launching a new business, improving an
                existing website or building a custom system, Femix brings
                design, development and practical business thinking together.
              </p>

              <div className="mt-8 space-y-4">
                {benefits.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--app-success)]" />
                    <span className="text-sm leading-6 text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                  Example project
                </p>

                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  Business Website
                </h3>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Responsive
                    </p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      100%
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Pages
                    </p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      5+
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Delivery
                    </p>
                    <p className="mt-1 text-2xl font-bold text-[var(--app-brand)]">
                      Structured
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Status
                    </p>
                    <p className="mt-1 inline-flex items-center gap-2 text-2xl font-bold text-[var(--app-success)]">
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--app-success)]" />
                      Ready
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--app-brand)]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center sm:px-8 lg:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to build your next digital project?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Tell us what you want to build and let&apos;s turn the idea into a
            practical digital solution.
          </p>

          <Link
            to="/start-project"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[var(--app-brand)] shadow-sm transition hover:bg-blue-50"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
