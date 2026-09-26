import { useState } from 'react';
import { PortfolioModal } from '../components/PortfolioModal';
import type { ProjectDetail } from '../components/PortfolioModal';
import { ExternalLink, Layers, Terminal } from 'lucide-react';

const PROJECTS: ProjectDetail[] = [
  {
    id: 'payflex',
    title: 'PayFlex SaaS Gateway',
    category: 'Fintech / SaaS',
    client: 'PayFlex Inc',
    year: '2026',
    description: 'A dual-currency payment gateway and deposit tracking terminal built for cross-border merchants.',
    challenge: 'The client needed automated NGN and USD ledger settlement with sub-second page loads on mobile networks in West Africa.',
    solution: 'Engineered a React SPA with Supabase PostgreSQL, automated Paystack webhooks, and manual code splitting achieving a 99/100 Lighthouse score.',
    techStack: ['React', 'Vite v8', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'Paystack API'],
    metrics: [
      { label: 'Conversion Boost', value: '+42%' },
      { label: 'Page Load Time', value: '380ms' },
      { label: 'Uptime', value: '99.98%' }
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nexus-crypto',
    title: 'Nexus Crypto Exchange',
    category: 'Web3 / Portal',
    client: 'Nexus Global',
    year: '2025',
    description: 'High-frequency OTC trading platform dark terminal with real-time rate tracking.',
    challenge: 'Needed dark-mode crypto aesthetics with instant rate updates and protected client authentication.',
    solution: 'Integrated real-time WebSocket feeds with custom Tailwind CSS v4 design primitives and PIN-protected admin controls.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS v4', 'WebSockets', 'Supabase Auth'],
    metrics: [
      { label: 'Active Users', value: '15,000+' },
      { label: 'Latency', value: '<100ms' },
      { label: 'Security Score', value: 'A+' }
    ],
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80'
  }
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Terminal className="w-3.5 h-3.5" />
          <span>Case Studies</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Delivered Client Work
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Click on any case study below to inspect technical architecture, metrics, and live demo links.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 cursor-pointer flex flex-col shadow-xl"
          >
            <div className="relative h-48 overflow-hidden bg-slate-950">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-slate-950/80 border border-slate-800 text-cyan-400 text-xs font-mono rounded-lg backdrop-blur-md">
                {project.category}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2 line-clamp-2">{project.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" /> Inspect Case Study
                </span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                  View Specs <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      <PortfolioModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
