import React, { useState } from 'react';
import { useToast } from '../components/Toast';
import { supabase } from '../lib/supabase';
import { Calculator, Send, Code, Sparkles, Server, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  const { showToast } = useToast();

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  // Estimator Form State
  const [pages, setPages] = useState(5);
  const [hasAuth, setHasAuth] = useState(false);
  const [hasDatabase, setHasDatabase] = useState(true);
  const [hasPayments, setHasPayments] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // Calculate estimated total
  const basePrice = 500;
  const pageCost = pages * 100;
  const authCost = hasAuth ? 300 : 0;
  const dbCost = hasDatabase ? 400 : 0;
  const paymentCost = hasPayments ? 350 : 0;
  const estimatedTotal = basePrice + pageCost + authCost + dbCost + paymentCost;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      showToast('Validation Error', 'Please fill in all fields before submitting.', 'error');
      return;
    }

    setIsSubmittingContact(true);
    try {
      const { error } = await supabase.from('leads').insert([
        { name: contactName, email: contactEmail, message: contactMessage }
      ]);

      if (error) throw error;

      showToast('Inquiry Received!', 'Thank you for reaching out. We will respond shortly.', 'success');
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    } catch (err: any) {
      showToast('Submission Failed', err.message || 'Could not send inquiry. Try again.', 'error');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      showToast('Validation Error', 'Please enter your name and email to submit the order.', 'error');
      return;
    }

    setIsSubmittingOrder(true);
    try {
      const { error } = await supabase.from('orders').insert([
        {
          client_name: clientName,
          client_email: clientEmail,
          pages,
          has_auth: hasAuth,
          has_database: hasDatabase,
          has_payments: hasPayments,
          estimated_total: estimatedTotal,
          status: 'pending'
        }
      ]);

      if (error) throw error;

      showToast('Order Submitted!', `Estimate total $${estimatedTotal}. We will review your request and reach out.`, 'success');
      setClientName('');
      setClientEmail('');
    } catch (err: any) {
      showToast('Order Failed', err.message || 'Could not place order. Please try again.', 'error');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center space-y-6 max-w-4xl">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Web & Application Engineering</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Modern Web Development <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Engineered for Scale
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto">
          We build high-performance single page applications, SaaS platforms, and modern backends tailored to grow your business.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="#calculator"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20 text-sm"
          >
            Estimate Project Cost
          </a>
          <a
            href="#contact"
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold px-6 py-3 rounded-xl transition text-sm"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Engineering Stack</h2>
          <p className="text-xs sm:text-sm text-slate-400">Built using battle-tested modern web technologies</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-3">
            <Code className="w-8 h-8 text-cyan-400" />
            <h3 className="font-bold text-white text-lg">Single Page Apps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fast, reactive frontend architectures powered by React, TypeScript, and modern bundlers.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-3">
            <Server className="w-8 h-8 text-cyan-400" />
            <h3 className="font-bold text-white text-lg">Cloud Infrastructure</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scalable real-time backends with Supabase, PostgreSQL, and serverless edge functions.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-3">
            <Zap className="w-8 h-8 text-cyan-400" />
            <h3 className="font-bold text-white text-lg">API Integrations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seamless third-party services, Stripe payment flows, and automated data pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Calculator Section */}
      <section id="calculator" className="container mx-auto px-4 max-w-4xl scroll-mt-24">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Instant Project Estimator</h2>
              <p className="text-xs text-slate-400">Customize features to estimate software scope and budget</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Options */}
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-2 block">
                  Estimated Pages / Screens: <span className="text-cyan-400 font-bold">{pages}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">Add-On Capabilities</label>
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition">
                  <span className="text-xs text-slate-300">User Auth & Accounts (+$300)</span>
                  <input
                    type="checkbox"
                    checked={hasAuth}
                    onChange={(e) => setHasAuth(e.target.checked)}
                    className="accent-cyan-500 w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition">
                  <span className="text-xs text-slate-300">Database & Backend Storage (+$400)</span>
                  <input
                    type="checkbox"
                    checked={hasDatabase}
                    onChange={(e) => setHasDatabase(e.target.checked)}
                    className="accent-cyan-500 w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition">
                  <span className="text-xs text-slate-300">Stripe Payment Gateway (+$350)</span>
                  <input
                    type="checkbox"
                    checked={hasPayments}
                    onChange={(e) => setHasPayments(e.target.checked)}
                    className="accent-cyan-500 w-4 h-4"
                  />
                </label>
              </div>
            </div>

            {/* Summary & Submission */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Estimated Total
                </span>
                <div className="text-4xl font-black text-cyan-400">${estimatedTotal}</div>
                <p className="text-xs text-slate-400 mt-2">
                  Includes base setup, responsive UI design, and production deployment pipeline.
                </p>
              </div>

              <form onSubmit={handleOrderSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmittingOrder}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  {isSubmittingOrder ? 'Submitting Order...' : 'Request Project Quote'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 max-w-2xl scroll-mt-24">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Start Your Project</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Have questions or custom requirements? Send us a direct message.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your project or inquiry..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingContact}
              className="w-full bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs py-3 rounded-xl transition shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmittingContact ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
