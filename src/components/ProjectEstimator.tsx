import React, { useState } from 'react';
import { Calculator, CheckCircle2, DollarSign, Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface FeatureOption {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  priceNGN: number;
  days: number;
  category: 'core' | 'backend' | 'features' | 'growth';
}

const FEATURE_OPTIONS: FeatureOption[] = [
  { id: 'landing', name: 'Landing Page & Design System', description: 'Custom responsive UI with Tailwind CSS & Framer animations', priceUSD: 300, priceNGN: 450000, days: 3, category: 'core' },
  { id: 'spa-routing', name: 'Multi-Page SPA Architecture', description: 'React Router, client-side state management & deep linking', priceUSD: 200, priceNGN: 300000, days: 2, category: 'core' },
  { id: 'auth-rbac', name: 'User Auth & Role Management', description: 'Supabase/JWT auth with row-level security & user profiles', priceUSD: 250, priceNGN: 375000, days: 3, category: 'backend' },
  { id: 'database-api', name: 'Custom Database & REST/GraphQL API', description: 'PostgreSQL schema design, indexing, and API endpoints', priceUSD: 400, priceNGN: 600000, days: 5, category: 'backend' },
  { id: 'payments', name: 'Dual Payment Gateway (Paystack/Stripe)', description: 'Card, bank transfer, and automated webhook verification', priceUSD: 300, priceNGN: 450000, days: 3, category: 'features' },
  { id: 'admin-dashboard', name: 'Admin Operations Dashboard', description: 'Protected management terminal, lead tracking & data export', priceUSD: 350, priceNGN: 525000, days: 4, category: 'features' },
  { id: 'analytics-seo', name: 'Enterprise SEO & OpenGraph Data', description: 'JSON-LD schema, Twitter/WhatsApp preview cards & sitemaps', priceUSD: 150, priceNGN: 225000, days: 2, category: 'growth' },
  { id: 'speed-optimization', name: 'Performance & Bundle Optimization', description: 'Sub-second loading speed, manual chunking & zero-layout shift', priceUSD: 150, priceNGN: 225000, days: 2, category: 'growth' }
];

interface ProjectEstimatorProps {
  onSelectPackage?: (packageName: string, amount: number) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onSelectPackage }) => {
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'landing',
    'auth-rbac',
    'payments'
  ]);

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      if (selectedFeatures.length === 1) return; // Prevent empty selection
      setSelectedFeatures(selectedFeatures.filter((item) => item !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const totalUSD = selectedFeatures.reduce((sum, id) => {
    const item = FEATURE_OPTIONS.find((f) => f.id === id);
    return sum + (item ? item.priceUSD : 0);
  }, 0);

  const totalNGN = selectedFeatures.reduce((sum, id) => {
    const item = FEATURE_OPTIONS.find((f) => f.id === id);
    return sum + (item ? item.priceNGN : 0);
  }, 0);

  const totalDays = selectedFeatures.reduce((sum, id) => {
    const item = FEATURE_OPTIONS.find((f) => f.id === id);
    return sum + (item ? item.days : 0);
  }, 0);

  const handleBookEstimate = () => {
    if (onSelectPackage) {
      const amount = currency === 'USD' ? totalUSD : totalNGN;
      onSelectPackage(`Custom Build (${selectedFeatures.length} Modules)`, amount);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4" />
            <span>Interactive Scope Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Build Your Custom Tech Stack
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Select required modules to dynamically generate direct costs and delivery timelines.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 w-fit self-start lg:self-center">
          <button
            onClick={() => setCurrency('USD')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              currency === 'USD'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            USD ($)
          </button>
          <button
            onClick={() => setCurrency('NGN')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              currency === 'NGN'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            NGN (₦)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Modules Selection List */}
        <div className="lg:col-span-7 space-y-3">
          {FEATURE_OPTIONS.map((feature) => {
            const isSelected = selectedFeatures.includes(feature.id);
            return (
              <div
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-md shadow-cyan-500/5'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`mt-0.5 p-1 rounded-lg border ${
                      isSelected
                        ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                        : 'border-slate-800 text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">{feature.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{feature.description}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-semibold text-cyan-400">
                    {currency === 'USD' ? `$${feature.priceUSD}` : `₦${feature.priceNGN.toLocaleString()}`}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    +{feature.days} {feature.days === 1 ? 'day' : 'days'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Estimate Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>Project Overview</span>
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm text-slate-400">
                <span>Selected Modules:</span>
                <span className="font-mono text-white font-semibold">{selectedFeatures.length}</span>
              </div>

              <div className="flex justify-between items-center text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" /> Est. Timeline:
                </span>
                <span className="font-mono text-emerald-400 font-semibold">
                  ~{totalDays} Working Days
                </span>
              </div>

              <div className="border-t border-slate-800/80 pt-4">
                <div className="text-xs text-slate-400 mb-1">Estimated Direct Budget</div>
                <div className="text-3xl font-extrabold text-white font-mono tracking-tight flex items-baseline gap-1">
                  {currency === 'USD' ? (
                    <>
                      <DollarSign className="w-6 h-6 text-cyan-400 -mr-1" />
                      <span>{totalUSD.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 font-normal ml-1">USD</span>
                    </>
                  ) : (
                    <>
                      <span className="text-cyan-400">₦</span>
                      <span>{totalNGN.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 font-normal ml-1">NGN</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleBookEstimate}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 text-sm"
              >
                <span>Lock In Scope & Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>50% Deposit via Paystack or Wire to Start</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
