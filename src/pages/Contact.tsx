import { Mail, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8 text-center">
        <span className="text-xs font-semibold text-[#00e599] tracking-wider uppercase mb-2 block">
          /// Direct Channel
        </span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
          Initialize <span className="text-[#00e599]">Contact</span>
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Connect with us to start building your high-speed SPA platform.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 crypto-card p-6 sm:p-8 rounded-xl">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Name</label>
          <input 
            type="text" 
            placeholder="Enter your name" 
            className="w-full bg-[#0b0e14] border border-[#1e2638] rounded-lg px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00e599] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input 
              type="email" 
              placeholder="you@domain.com" 
              className="w-full bg-[#0b0e14] border border-[#1e2638] rounded-lg pl-10 pr-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00e599] text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Message</label>
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <textarea 
              rows={4}
              placeholder="Project details..." 
              className="w-full bg-[#0b0e14] border border-[#1e2638] rounded-lg pl-10 pr-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00e599] text-sm resize-none"
            ></textarea>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full glow-button py-3.5 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Transmit Message</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
