import { Check, Rocket, Building2, Code2, ArrowRight } from 'lucide-react';

const packages = [
  {
    name: 'Starter Website',
    price: '₦80,000',
    timeline: '1-2 Weeks',
    icon: Rocket,
    popular: false,
    description: 'Perfect for individuals, startups, and small businesses.',
    features: [
      '1 Page (Landing Page)',
      'Modern & Clean Design',
      'Mobile Responsive',
      'Contact / WhatsApp Integration',
      'Social Media Links',
      'Basic SEO Setup',
    ],
    waMessage: 'Hi Femix Web Dev, I would like to get started with the Starter Website package (₦80,000).',
  },
  {
    name: 'Business Website',
    price: '₦150,000',
    timeline: '2-4 Weeks',
    icon: Building2,
    popular: true,
    description: 'Ideal for growing businesses and professional brands.',
    features: [
      'Up to 5 Pages (Home, About, Services, Contact, etc.)',
      'Custom Design & Branding',
      'Contact Forms & Lead Capture',
      'WhatsApp Integration',
      'Google Maps Integration',
      'Basic SEO Optimization',
      'Mobile Responsive',
    ],
    waMessage: 'Hi Femix Web Dev, I would like to order the Business Website package (₦150,000).',
  },
  {
    name: 'Custom Web Solutions',
    price: '₦300,000+',
    timeline: 'Custom Quote',
    icon: Code2,
    popular: false,
    description: 'For complex needs, web applications, and advanced functionality.',
    features: [
      'E-commerce Websites',
      'Web Applications / Dashboards',
      'Payment Integration (Paystack, Flutterwave, etc.)',
      'User Authentication & Role Management',
      'Booking / Reservation Systems',
      'API Integrations',
      'SaaS Platforms & More',
    ],
    waMessage: 'Hi Femix Web Dev, I am interested in a Custom Web Solution (₦300,000+) for my project.',
  },
];

export default function Pricing() {
  const getWaLink = (message: string) => {
    return `https://wa.me/2349060708332?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold text-[#00e599] tracking-wider uppercase mb-2 block">
          /// Our Website Packages
        </span>
        <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          Flexible <span className="text-[#00e599]">Pricing</span> Tiers
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Choose the right package for your goals. Every project is quoted based on its features, pages, and functionality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {packages.map((pkg, idx) => {
          const Icon = pkg.icon;
          return (
            <div
              key={idx}
              className={`crypto-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative ${
                pkg.popular ? 'border-[#00e599] shadow-[0_0_30px_rgba(0,229,153,0.15)]' : 'border-[#1e2638]'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00e599] text-[#0b0e14] text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#181e2a] border border-[#273145] flex items-center justify-center text-[#00e599]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-[#12161f] border border-[#1e2638] px-2.5 py-1 rounded-md">
                    {pkg.timeline}
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase text-white mb-1">{pkg.name}</h3>
                <p className="text-slate-400 text-xs mb-6 min-h-[32px]">{pkg.description}</p>

                <div className="mb-6 pb-6 border-b border-[#1e2638]">
                  <span className="text-3xl sm:text-4xl font-black text-[#00e599] tracking-tight">{pkg.price}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-[#00e599] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getWaLink(pkg.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all ${
                  pkg.popular
                    ? 'glow-button'
                    : 'bg-[#181e2a] border border-[#273145] text-white hover:border-[#00e599] hover:text-[#00e599]'
                }`}
              >
                <span>Order via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
