import { Mail, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Get in Touch</h1>
        <p className="text-slate-400">
          Have a project in mind or want to learn more about our services? Let's talk.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
          <input 
            type="text" 
            placeholder="Your name" 
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
          <div className="relative">
            <Mail className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
            <input 
              type="email" 
              placeholder="you@example.com" 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
            <textarea 
              rows={4}
              placeholder="Tell us about your project..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition-colors cursor-pointer"
        >
          <span>Send Message</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
