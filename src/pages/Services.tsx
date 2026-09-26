import React, { useState } from 'react';
import { OrderModal } from '../components/OrderModal';

interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

const packages: ServicePackage[] = [
  {
    id: 'starter',
    name: 'Starter Web App',
    price: 999,
    description: 'Perfect for landing pages, simple SaaS MVPs, and business showcases.',
    features: ['Responsive SPA Layout', 'Tailwind CSS Styling', 'Contact Form Integration', 'Basic SEO Setup'],
  },
  {
    id: 'pro',
    name: 'Full-Stack SaaS Platform',
    price: 2499,
    description: 'Complete scalable application with backend database, authentication, and payments.',
    features: ['Custom SPA Architecture', 'Supabase Auth & Database', 'Stripe Payment Gateway', 'Toast Notifications', 'Admin Dashboard'],
  },
  {
    id: 'enterprise',
    name: 'Custom Architecture',
    price: 4999,
    description: 'Enterprise-grade architecture tailored to heavy workload and custom workflows.',
    features: ['Dedicated Microservices', 'Custom API Integrations', '24/7 SLA Support', 'Performance Optimization'],
  },
];

export const Services: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Development Packages & Pricing
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Choose the right development scope for your modern Single Page Application (SPA).
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{pkg.name}</h2>
              <p className="text-slate-400 text-sm mb-6">{pkg.description}</p>
              <div className="text-3xl font-extrabold text-cyan-400 mb-6">
                ${pkg.price} <span className="text-xs font-normal text-slate-500">USD</span>
              </div>
              <ul className="space-y-3 mb-8 text-left text-sm text-slate-300">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="text-cyan-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleOpenModal(pkg)}
              className="w-full bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white font-semibold py-3 rounded-xl transition-all duration-300"
            >
              Select Package
            </button>
          </div>
        ))}
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageName={selectedPackage?.name}
        amount={selectedPackage?.price}
      />
    </div>
  );
};
