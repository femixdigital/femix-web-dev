import { ExternalLink, FolderGit2 } from 'lucide-react';

export default function Portfolio() {
  const projects = [
    {
      title: 'Femix Web Dev',
      category: 'SPA Platform',
      description: 'Modern Single Page Application built on Android using React, Vite, and Tailwind CSS.',
      status: 'In Development',
    },
    {
      title: 'Client Showcase Portal',
      category: 'Web Application',
      description: 'Interactive dashboard for business clients to track development milestones.',
      status: 'Planned',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Featured Projects</h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Explore recent web applications and platforms built with precision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <div key={idx} className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/50">
                  {project.category}
                </span>
                <span className="text-xs text-slate-400">{project.status}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-slate-400 text-sm mb-4">{project.description}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer pt-2">
              <FolderGit2 className="w-4 h-4" />
              <span>View Details</span>
              <ExternalLink className="w-3.5 h-3.5 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
