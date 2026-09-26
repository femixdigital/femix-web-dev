import { X, ExternalLink, ShieldCheck, Layers, Cpu } from 'lucide-react';

export interface ProjectDetail {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  image: string;
}

interface PortfolioModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const PortfolioModal = ({ project, onClose }: PortfolioModalProps) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              {project.category} // Case Study
            </span>
            <h2 className="text-2xl font-bold text-white mt-0.5">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-800/80 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <div className="text-xs text-slate-400">{metric.label}</div>
                <div className="text-lg font-extrabold text-cyan-400 font-mono mt-0.5">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Core Challenge & Solution */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" /> The Challenge
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{project.challenge}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" /> Technical Solution
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase font-mono tracking-wider mb-3">
              Technologies Employed
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Delivered in {project.year} for {project.client}</span>
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-md text-sm w-full sm:w-auto justify-center"
            >
              <span>Launch Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
