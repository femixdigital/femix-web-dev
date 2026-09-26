import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Save contact inquiry to Supabase
      if (import.meta.env.VITE_SUPABASE_URL) {
        await supabase.from('leads').insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            package_name: 'General Contact Inquiry',
            status: 'new',
          },
        ]);
      }
    } catch (err) {
      console.error('Error saving lead to Supabase:', err);
    } finally {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

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

      {isSent ? (
        <div className="crypto-card p-8 rounded-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#00e599]/10 border border-[#00e599] flex items-center justify-center text-[#00e599] mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold uppercase text-white">Payload Transmitted</h2>
          <p className="text-sm text-slate-400">
            Thank you for reaching out. Your message has been logged to our database, and we will get back to you shortly.
          </p>
          <button
            onClick={() => setIsSent(false)}
            className="glow-button px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider mt-4 cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 crypto-card p-6 sm:p-8 rounded-xl">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name" 
              className={`w-full bg-[#0b0e14] border ${errors.name ? 'border-red-500' : 'border-[#1e2638]'} rounded-lg px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00e599] text-sm`}
            />
            {errors.name && (
              <span className="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input 
                type="text" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@domain.com" 
                className={`w-full bg-[#0b0e14] border ${errors.email ? 'border-red-500' : 'border-[#1e2638]'} rounded-lg pl-10 pr-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00e599] text-sm`}
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Message</label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <textarea 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Project details..." 
                className={`w-full bg-[#0b0e14] border ${errors.message ? 'border-red-500' : 'border-[#1e2638]'} rounded-lg pl-10 pr-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00e599] text-sm resize-none`}
              ></textarea>
            </div>
            {errors.message && (
              <span className="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.message}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full glow-button py-3.5 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Transmitting...' : 'Transmit Message'}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
