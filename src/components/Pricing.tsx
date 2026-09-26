import { useState } from 'react';
import { Check, Rocket, Building2, ShoppingBag, Cpu, ArrowRight, CreditCard, Info, X } from 'lucide-react';
import PaymentModal from './PaymentModal';

interface PackageDetail {
  name: string;
  ngnPrice: string;
  usdPrice: string;
  amount: number;
  timeline: string;
  icon: typeof Rocket;
  popular: boolean;
  tagline: string;
  description: string;
  features: string[];
  deliverables: string[];
  bestFor: string;
  waMessage: string;
}

const packages: PackageDetail[] = [
  {
    name: 'Starter Landing',
    ngnPrice: '₦80,000',
    usdPrice: '$100',
    amount: 80000,
    timeline: '3 - 5 Days',
    icon: Rocket,
    popular: false,
    tagline: 'High-Impact Single Page',
    description: 'Designed for quick launch, high conversion rates, and immediate lead generation.',
    features: [
      '1 Page High-Converting Landing Page',
      'Mobile-First Responsive Layout',
      'Direct WhatsApp & Call Action Buttons',
      'Contact Lead Form & Social Links',
      'Fast Image & Asset Optimization',
      'Basic On-Page SEO Setup',
    ],
    deliverables: [
      'Source Code / GitHub Repository',
      'Free Vercel Deployment Setup',
      'SSL Security Certificate',
      '1 Month Post-Launch Support',
    ],
    bestFor: 'Small businesses, personal portfolios, product waitlists, and targeted ad campaigns.',
    waMessage: 'Hi Femix Web Dev, I want to order the Starter Landing package (₦80,000 / $100).',
  },
  {
    name: 'Business Corporate',
    ngnPrice: '₦150,000',
    usdPrice: '$200',
    amount: 150000,
    timeline: '1 - 2 Weeks',
    icon: Building2,
    popular: true,
    tagline: 'Full Multi-Page Platform',
    description: 'Complete corporate website to establish international authority and streamline lead acquisition.',
    features: [
      'Up to 5 Pages (Home, About, Services, Contact, Blog/FAQ)',
      'Custom Brand-Aligned Design',
      'Interactive Contact Forms & Google Maps',
      'WhatsApp & Email Automation Setup',
      'Advanced SEO & Speed Optimization',
      'Dynamic Content Management',
    ],
    deliverables: [
      'Complete Web Assets & Codebase',
      'Custom Domain & DNS Setup Assistance',
      'Google Search Console Indexing',
      '2 Months Maintenance & Technical Support',
    ],
    bestFor: 'Established companies, consultancies, agencies, and international service providers.',
    waMessage: 'Hi Femix Web Dev, I want to order the Business Corporate package (₦150,000 / $200).',
  },
  {
    name: 'E-Commerce Pro',
    ngnPrice: '₦300,000',
    usdPrice: '$400',
    amount: 300000,
    timeline: '2 - 3 Weeks',
    icon: ShoppingBag,
    popular: false,
    tagline: 'Global Sales Engine',
    description: 'Feature-packed online store equipped with multi-currency payment checkout and product management.',
    features: [
      'Product Catalog & Inventory Management',
      'Paystack, Flutterwave & Stripe Gateways',
      'Multi-Currency Support (NGN / USD)',
      'Customer Cart & Checkout Pipeline',
      'Automated Order Notifications via Email/WhatsApp',
      'Discount Coupons & Sales Analytics',
    ],
    deliverables: [
      'Admin Dashboard Access',
      'Payment Gateway API Setup',
      'Security & Anti-Fraud Config',
      'Product Upload Walkthrough Session',
    ],
    bestFor: 'Fashion brands, retail stores, digital product sellers, and global merchants.',
    waMessage: 'Hi Femix Web Dev, I am interested in the E-Commerce Pro package (₦300,000 / $400).',
  },
  {
    name: 'Enterprise / Web App',
    ngnPrice: '₦600,000+',
    usdPrice: '$800+',
    amount: 600000,
    timeline: 'Custom Timeline',
    icon: Cpu,
    popular: false,
    tagline: 'Custom SaaS & Systems',
    description: 'Tailor-made web applications, SaaS products, and custom portals built for scale and security.',
    features: [
      'Custom React/Next.js/TypeScript Stack',
      'User Authentication & Role Management',
      'Supabase/PostgreSQL Database Architecture',
      'REST & GraphQL API Integrations',
      'Client Dashboard & Portal Infrastructure',
      'High-Grade Security & Rate Limiting',
    ],
    deliverables: [
      'Full End-to-End System Architecture',
      'CI/CD Automated Deployment Pipeline',
      'Developer API Documentation',
      'Dedicated SLA Technical Support',
    ],
    bestFor: 'Fintechs, SaaS platforms, reservation engines, portals, and custom web applications.',
    waMessage: 'Hi Femix Web Dev, I want to request a custom quote for an Enterprise / Web App solution.',
  },
];

export default function Pricing() {
  const [selectedPayPkg, setSelectedPayPkg] = useState<{ name: string; amount: number } | null>(null);
  const [infoModalPkg, setInfoModalPkg] = useState<PackageDetail | null>(null);

  const getWaLink = (message: string) => {
    return `https://wa.me/2349060708332?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold text-[#00e599] tracking-wider uppercase mb-2 block">
          /// Global Web Engineering Packages
        </span>
        <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          Competitive <span className="text-[#00e599]">Pricing</span> Tiers
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Transparent rates for Nigerian and international clients. Click any card to inspect full deliverables and technical specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {packages.map((pkg, idx) => {
          const Icon = pkg.icon;
          return (
            <div
              key={idx}
              className={`crypto-card p-6 rounded-2xl flex flex-col justify-between relative cursor-pointer transition-all hover:scale-[1.02] ${
                pkg.popular
                  ? 'border-[#00e599] shadow-[0_0_30px_rgba(0,229,153,0.15)]'
                  : 'border-[#1e2638] hover:border-slate-500'
              }`}
              onClick={() => setInfoModalPkg(pkg)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00e599] text-[#0b0e14] text-[10px] font-black tracking-widest uppercase px-3 py-0.5 rounded-full">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#181e2a] border border-[#273145] flex items-center justify-center text-[#00e599]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 bg-[#12161f] border border-[#1e2638] px-2 py-0.5 rounded">
                    {pkg.timeline}
                  </span>
                </div>

                <h3 className="text-lg font-bold uppercase text-white mb-0.5">{pkg.name}</h3>
                <p className="text-[#00e599] text-[11px] font-semibold mb-3">{pkg.tagline}</p>

                <div className="mb-4 pb-4 border-b border-[#1e2638] flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">{pkg.ngnPrice}</span>
                  <span className="text-xs text-slate-400 font-semibold">({pkg.usdPrice})</span>
                </div>

                <p className="text-slate-400 text-xs mb-4 min-h-[36px]">{pkg.description}</p>

                <ul className="space-y-2 mb-6">
                  {pkg.features.slice(0, 4).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#00e599] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedPayPkg({ name: pkg.name, amount: pkg.amount })}
                  className="w-full glow-button py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay Online</span>
                </button>

                <a
                  href={getWaLink(pkg.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 bg-[#181e2a] border border-[#273145] text-white hover:border-[#00e599] hover:text-[#00e599]"
                >
                  <span>Order WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setInfoModalPkg(pkg)}
                  className="w-full text-center text-[11px] text-slate-400 hover:text-[#00e599] flex items-center justify-center gap-1 py-1"
                >
                  <Info className="w-3 h-3" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Package Information Modal */}
      {infoModalPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="crypto-card w-full max-w-2xl p-6 sm:p-8 rounded-2xl relative border border-[#00e599]/40 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInfoModalPkg(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#00e599] text-xs font-bold uppercase mb-2">
              <Info className="w-4 h-4" />
              <span>Full Specifications</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-1">
              {infoModalPkg.name}
            </h3>
            <p className="text-slate-400 text-xs mb-4">{infoModalPkg.description}</p>

            <div className="flex items-center gap-4 bg-[#0b0e14] p-4 rounded-xl border border-[#1e2638] mb-6">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-bold">Investment</span>
                <span className="text-2xl font-black text-[#00e599]">
                  {infoModalPkg.ngnPrice} <span className="text-xs text-slate-300">({infoModalPkg.usdPrice})</span>
                </span>
              </div>
              <div className="border-l border-[#1e2638] pl-4">
                <span className="text-[10px] uppercase text-slate-400 block font-bold">Estimated Delivery</span>
                <span className="text-sm font-bold text-white">{infoModalPkg.timeline}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase text-[#00e599] tracking-wider mb-3">Included Features</h4>
                <ul className="space-y-2">
                  {infoModalPkg.features.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <Check className="w-3.5 h-3.5 text-[#00e599] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-[#00e599] tracking-wider mb-3">Key Deliverables</h4>
                <ul className="space-y-2">
                  {infoModalPkg.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <Check className="w-3.5 h-3.5 text-[#00e599] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-[#0b0e14]/60 p-3 rounded-lg border border-[#1e2638] mb-6">
              <span className="text-[11px] font-bold text-slate-300 uppercase block mb-1">Target Audience / Best For:</span>
              <p className="text-xs text-slate-400">{infoModalPkg.bestFor}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setSelectedPayPkg({ name: infoModalPkg.name, amount: infoModalPkg.amount });
                  setInfoModalPkg(null);
                }}
                className="w-full glow-button py-3 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Online ({infoModalPkg.ngnPrice})</span>
              </button>

              <a
                href={getWaLink(infoModalPkg.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 bg-[#181e2a] border border-[#273145] text-white hover:border-[#00e599] hover:text-[#00e599]"
              >
                <span>Order via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      <PaymentModal
        isOpen={!!selectedPayPkg}
        onClose={() => setSelectedPayPkg(null)}
        packageName={selectedPayPkg?.name || ''}
        amount={selectedPayPkg?.amount || 0}
      />
    </section>
  );
}
