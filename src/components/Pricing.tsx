import React from 'react';
import { Check, Zap } from 'lucide-react';

interface PricingProps {
  onSelectPackage?: (packageName: string, price: number) => void;
}

const plans = [
  {
    name: 'Starter SPA',
    price: 1500,
    description: 'Perfect for startups and small businesses needing a high-performance web presence.',
    features: [
      'Single Page Application Architecture',
      'Responsive React + Tailwind CSS',
      'Supabase Database Integration',
      'Contact / Lead Capture Form',
      'Basic SEO & Meta Optimization',
    ],
    popular: false,
  },
  {
    name: 'Pro SaaS App',
    price: 3500,
    description: 'Full-featured web application with authentication, payment workflows, and live data.',
    features: [
      'Complete React / TypeScript SPA',
      'Supabase Auth & Row Level Security',
      'Live Order & Lead Management',
      'Stripe Payment Gateway Integration',
      'Custom Admin Dashboard',
      'Priority 24/7 Technical Support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise Custom',
    price: 7500,
    description: 'Tailored architecture with dedicated backend endpoints and custom web hooks.',
    features: [
      'Microservices / Custom API Backend',
      'Real-time Data Sync & WebSockets',
      'Advanced Security Audit & RLS Policies',
      'Performance Optimization & CDN Setup',
      'Dedicated Maintenance & SLAs',
    ],
    popular: false,
  },
];

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage }) => {
  return (
    <section id="pricing" className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Transparent, Scalable Pricing
        </h2>
        <p className="text-slate-400 text-lg">
          Choose the right tier for your application. No hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
              plan.popular
                ? 'bg-slate-900 border-2 border-cyan-500 shadow-2xl shadow-cyan-500/10 scale-105'
                : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Most Popular</span>
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-xs mb-6 min-h-[36px]">
                {plan.description}
              </p>

              <div className="flex items-baseline space-x-1 mb-6">
                <span className="text-4xl font-extrabold text-white">
                  ${plan.price.toLocaleString()}
                </span>
                <span className="text-slate-400 text-xs font-medium">/ project</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onSelectPackage?.(plan.name, plan.price)}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                plan.popular
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
