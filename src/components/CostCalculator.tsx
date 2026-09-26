import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles } from 'lucide-react';

interface FeatureOption {
  id: string;
  label: string;
  description: string;
  price: number;
}

const BASE_PRICE = 499;

const FEATURES: FeatureOption[] = [
  { id: 'auth', label: 'User Authentication & RLS', description: 'Supabase Auth with role-based access control', price: 150 },
  { id: 'payments', label: 'Payment Integration', description: 'Stripe/Paystack webhook and subscription setup', price: 200 },
  { id: 'admin', label: 'Custom Admin Dashboard', description: 'Data management, status mutations, and metrics', price: 250 },
  { id: 'cms', label: 'Blog / Content System', description: 'Markdown or headless CMS integration', price: 180 },
  { id: 'analytics', label: 'Analytics & Event Tracking', description: 'PostHog / Google Analytics event tracking', price: 100 },
  { id: 'seo', label: 'Advanced SEO & Meta OpenGraph', description: 'Dynamic meta tags, sitemap, and robots.txt', price: 120 },
];

export const CostCalculator: React.FC = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['auth', 'admin']);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const featuresTotal = FEATURES.filter((f) => selectedFeatures.includes(f.id)).reduce(
      (sum, f) => sum + f.price,
      0
    );
    return BASE_PRICE + featuresTotal;
  };

  return (
    <section id="calculator" className="py-12 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-10 my-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs px-3 py-1 rounded-full">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Estimate Your Project Cost
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Select the capabilities your application requires for an instant transparent estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((feature) => {
            const isSelected = selectedFeatures.includes(feature.id);
            return (
              <div
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-start space-x-3.5 ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                      : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className={isSelected ? 'text-white' : 'text-slate-200'}>
                      {feature.label}
                    </span>
                    <span className="text-cyan-400 font-mono">+${feature.price}</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Summary */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">
              Estimated Total Investment
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
              ${calculateTotal()}{' '}
              <span className="text-xs text-slate-400 font-sans font-normal">USD</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Includes base architecture (${BASE_PRICE}) + {selectedFeatures.length} selected modules
            </p>
          </div>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all duration-200 text-xs sm:text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Lock In Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;
