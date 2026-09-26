import React, { useState } from 'react';
import { ExternalLink, Layers, Cpu } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'SaaS' | 'SPA' | 'Dashboard' | 'E-Commerce';
  description: string;
  imageBg: string;
  techStack: string[];
  metrics: string;
  liveUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'PulseMetrics SaaS Platform',
    category: 'SaaS',
    description: 'A real-time product analytics and user event tracking platform featuring custom PostgreSQL indexing, subscription billing, and live data charts.',
    imageBg: 'from-cyan-950 via-slate-900 to-blue-950',
    techStack: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Stripe API'],
    metrics: '+140% faster load times, 10k+ active users',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'OmniFlow Admin Dashboard',
    category: 'Dashboard',
    description: 'Enterprise-grade administrative dashboard equipped with role-based access control, CSV export pipelines, and interactive toast feedback alerts.',
    imageBg: 'from-slate-900 via-indigo-950 to-slate-950',
    techStack: ['React', 'Vite', 'PostgreSQL', 'Lucide Icons'],
    metrics: 'Reduced report generation time by 75%',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Aura Headless E-Commerce SPA',
    category: 'SPA',
    description: 'High-performance single-page shopping application with instant client-side routing, optimistic cart updates, and secure payment processing.',
    imageBg: 'from-blue-950 via-slate-900 to-cyan-950',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe Elements'],
    metrics: '99/100 Lighthouse Performance score',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'DevSync Collaborative Workspace',
    category: 'SaaS',
    description: 'Developer productivity suite featuring real-time document synchronization, team permission management, and custom webhook integrations.',
    imageBg: 'from-slate-950 via-cyan-950 to-slate-900',
    techStack: ['React', 'Supabase RLS', 'TypeScript', 'Tailwind CSS'],
    metrics: 'Zero downtime across 3 server regions',
    liveUrl: '#',
  },
];

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-cyan-400 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Client Work & Case Studies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Engineered for Performance & Scale
        </h1>
        <p className="text-slate-400 text-sm">
          Explore our recent production-grade single-page applications, SaaS platforms, and enterprise dashboards.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {['All', 'SaaS', 'SPA', 'Dashboard'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
              activeFilter === category
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition group"
          >
            {/* Visual Header Banner */}
            <div className={`p-8 bg-gradient-to-br ${project.imageBg} border-b border-slate-800 relative overflow-hidden flex flex-col justify-between h-44`}>
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition">
                <Cpu className="w-32 h-32 text-cyan-400" />
              </div>
              <div className="flex justify-between items-start relative z-10">
                <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                  {project.category}
                </span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <div className="relative z-10">
                <span className="text-xs text-cyan-400 font-semibold">{project.metrics}</span>
                <h3 className="text-xl font-black text-white mt-1">{project.title}</h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-400 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack Chips */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tech Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-medium px-2.5 py-1 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
