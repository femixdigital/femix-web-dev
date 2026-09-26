import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from './Toast';
import { supabase } from '../lib/supabase';

export const ContactForm: React.FC = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    service_type: 'Full-Stack Web Development',
    budget: '$2,500 - $5,000',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name.trim() || !formData.email.trim()) {
      showToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('leads').insert([
        {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone || null,
          service_type: formData.service_type,
          budget: formData.budget,
          notes: formData.notes || null,
          status: 'new',
          source: 'website_contact_form',
        },
      ]);

      if (error) throw error;

      showToast(
        'Inquiry Sent!',
        'Thank you for reaching out. We will review your project scope and get back to you shortly.',
        'success'
      );

      setFormData({
        full_name: '',
        email: '',
        phone: '',
        service_type: 'Full-Stack Web Development',
        budget: '$2,500 - $5,000',
        notes: '',
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to submit inquiry.';
      showToast('Submission Failed', message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Start Your Project
        </h2>
        <p className="text-slate-400 text-sm">
          Tell us about your requirements and we will craft a tailored proposal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              disabled={loading}
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              disabled={loading}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
              placeholder="jane@company.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              disabled={loading}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Service Required
            </label>
            <select
              disabled={loading}
              value={formData.service_type}
              onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
            >
              <option value="Full-Stack Web Development">Full-Stack Web Development</option>
              <option value="SPA Frontend Architecture">SPA Frontend Architecture</option>
              <option value="Custom Backend & API Integration">Custom Backend & API Integration</option>
              <option value="UI/UX & Performance Optimization">UI/UX & Performance Optimization</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Estimated Budget
          </label>
          <select
            disabled={loading}
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
          >
            <option value="< $1,000">Under $1,000</option>
            <option value="$1,000 - $2,500">$1,000 - $2,500</option>
            <option value="$2,500 - $5,000">$2,500 - $5,000</option>
            <option value="$5,000+">$5,000+</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Project Overview & Notes
          </label>
          <textarea
            rows={4}
            disabled={loading}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none disabled:opacity-50"
            placeholder="Describe your project goals, timelines, or key features..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending Lead Inquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Project Inquiry</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
};
