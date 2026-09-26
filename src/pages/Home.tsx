import { Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="flex items-center gap-2 mb-4 text-indigo-400 bg-indigo-950/50 px-4 py-2 rounded-full border border-indigo-800/50">
        <Sparkles className="w-5 h-5" />
        <span className="text-sm font-medium">Femix Web Dev</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl mb-6">
        Building Modern Single Page Applications
      </h1>
      <p className="text-slate-400 text-lg max-w-xl mb-8">
        Premium web development platform focused on fast, responsive, and scalable digital solutions.
      </p>
      <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer">
        Explore Services <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
