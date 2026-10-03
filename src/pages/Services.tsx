import React from 'react';
import {
  ArrowUpRight,
  Boxes,
  Code2,
  Cpu,
  CreditCard,
  Layers3,
  MoveUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    number: '01',
    label: 'WEB',
    title: 'Web development',
    description: 'Professional websites for businesses that need a strong online presence.',
    price: '₦120k',
    icon: Code2,
    to: '/services/web-development',
    accent: 'text-orange-600 dark:text-orange-300',
    surface: 'bg-orange-50 dark:bg-orange-950/30',
  },
  {
    number: '02',
    label: 'APPS',
    title: 'Web applications',
    description: 'Interactive tools that turn business processes into web products.',
    price: '₦300k',
    icon: Boxes,
    to: '/services/web-applications',
    accent: 'text-blue-600 dark:text-blue-300',
    surface: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    number: '03',
    label: 'SYSTEMS',
    title: 'Business systems',
    description: 'Connected systems for managing operations, teams and business data.',
    price: '₦500k',
    icon: Cpu,
    to: '/services/business-systems',
    accent: 'text-emerald-600 dark:text-emerald-300',
    surface: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    number: '04',
    label: 'LANDING',
    title: 'Landing pages',
    description: 'Focused pages built to promote a service, product or campaign.',
    price: '₦80k',
    icon: Layers3,
    to: '/services/landing-pages',
    accent: 'text-amber-600 dark:text-amber-300',
    surface: 'bg-amber-50 dark:bg-amber-950/30',
  },
  {
    number: '05',
    label: 'COMMERCE',
    title: 'E-commerce',
    description: 'Online stores with products, checkout and customer payments.',
    price: '₦250k',
    icon: Boxes,
    to: '/services/ecommerce',
    accent: 'text-pink-600 dark:text-pink-300',
    surface: 'bg-pink-50 dark:bg-pink-950/30',
  },
  {
    number: '06',
    label: 'SAAS',
    title: 'SaaS platforms',
    description: 'Scalable software products with accounts, workflows and subscriptions.',
    price: '₦800k',
    icon: Boxes,
    to: '/services/saas',
    accent: 'text-violet-600 dark:text-violet-300',
    surface: 'bg-violet-50 dark:bg-violet-950/30',
  },
  {
    number: '07',
    label: 'SPA',
    title: 'Single-page applications',
    description: 'Fast app-like products with smooth navigation and dynamic interfaces.',
    price: '₦400k',
    icon: Layers3,
    to: '/services/spa',
    accent: 'text-cyan-600 dark:text-cyan-300',
    surface: 'bg-cyan-50 dark:bg-cyan-950/30',
  },
  {
    number: '08',
    label: 'DASHBOARDS',
    title: 'Dashboards & admin systems',
    description: 'Secure dashboards for monitoring data, users, teams and operations.',
    price: '₦500k',
    icon: Cpu,
    to: '/services/dashboards',
    accent: 'text-indigo-600 dark:text-indigo-300',
    surface: 'bg-indigo-50 dark:bg-indigo-950/30',
  },
  {
    number: '09',
    label: 'CUSTOM APPS',
    title: 'Custom web applications',
    description: 'Purpose-built software for specialized business workflows.',
    price: '₦300k',
    icon: Code2,
    to: '/services/custom-web-applications',
    accent: 'text-rose-600 dark:text-rose-300',
    surface: 'bg-rose-50 dark:bg-rose-950/30',
  },
  {
    number: '10',
    label: 'PLATFORMS',
    title: 'Advanced business platforms',
    description: 'Large-scale platforms connecting customers, teams and business operations.',
    price: '₦1m+',
    icon: Cpu,
    to: '/services/business-platforms',
    accent: 'text-teal-600 dark:text-teal-300',
    surface: 'bg-teal-50 dark:bg-teal-950/30',
  },
  {
    number: '11',
    label: 'PAYMENTS',
    title: 'Payment integration',
    description: 'Secure checkout and payment flows connected to your website or app.',
    price: '₦150k',
    icon: CreditCard,
    to: '/services/payment-integration',
    accent: 'text-sky-600 dark:text-sky-300',
    surface: 'bg-sky-50 dark:bg-sky-950/30',
  },
];

const Services: React.FC = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="mx-auto max-w-[1440px] px-4 pb-6 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] lg:grid-cols-[1fr_auto]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[var(--app-brand)]" />
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--app-muted)]">
                FEMIX / SERVICES
              </p>
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.94] tracking-[-0.065em] sm:text-5xl lg:text-6xl">
              Digital services
              <br />
              <span className="text-[var(--app-brand)]">built to work.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--app-muted)]">
              Websites, applications and business systems shaped around what you need to build.
            </p>
          </div>

          <div className="grid grid-cols-2 border-t border-[var(--app-border)] lg:w-[330px] lg:border-l lg:border-t-0">
            <div className="flex min-h-[100px] flex-col justify-between border-r border-[var(--app-border)] bg-orange-50 p-4 dark:bg-orange-950/30">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">
                Build
              </span>
              <Code2 className="h-5 w-5 text-orange-600 dark:text-orange-300" />
            </div>
            <div className="flex min-h-[100px] flex-col justify-between bg-blue-50 p-4 dark:bg-blue-950/30">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
                Connect
              </span>
              <Layers3 className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="flex min-h-[100px] flex-col justify-between border-r border-t border-[var(--app-border)] bg-emerald-50 p-4 dark:bg-emerald-950/30">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                Operate
              </span>
              <Cpu className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div className="flex min-h-[100px] flex-col justify-between border-t border-[var(--app-border)] bg-amber-50 p-4 dark:bg-amber-950/30">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                Launch
              </span>
              <ArrowUpRight className="h-5 w-5 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-end justify-between border-b border-[var(--app-border)] pb-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-muted)]">
              What I build
            </p>
            <h2 className="mt-1 text-xl font-black tracking-[-0.04em] sm:text-2xl">
              Services & capabilities
            </h2>
          </div>

          <Link
            to="/start-project"
            className="hidden items-center gap-1.5 text-xs font-bold text-[var(--app-text)] sm:flex"
          >
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-border)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.to}
                to={service.to}
                className="group relative min-h-[190px] bg-[var(--app-surface)] p-5 transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--app-surface-2)] sm:min-h-[205px] sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${service.surface}`}
                  >
                    <Icon className={`h-[18px] w-[18px] ${service.accent}`} />
                  </span>

                  <span className="font-mono text-[10px] text-[var(--app-muted-2)]">
                    {service.number}
                  </span>
                </div>

                <div className="mt-9 pr-7">
                  <p className={`text-[9px] font-black uppercase tracking-[0.18em] ${service.accent}`}>
                    {service.label}
                  </p>

                  <h3 className="mt-1.5 text-lg font-black tracking-[-0.035em] sm:text-xl">
                    {service.title}
                  </h3>

                  <p className="mt-1.5 max-w-sm text-xs leading-5 text-[var(--app-muted)]">
                    {service.description}
                  </p>

                  <div className="mt-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--app-muted-2)]">
                      Starting from
                    </span>
                    <div className="mt-0.5 text-base font-black tracking-[-0.025em] text-[var(--app-text)]">
                      {service.price}
                    </div>
                  </div>
                </div>

                <MoveUpRight className="absolute bottom-5 right-5 h-4 w-4 text-[var(--app-muted-2)] transition duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--app-brand)]" />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Services;
