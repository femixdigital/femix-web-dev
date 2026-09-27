import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
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

  const updateField = (field: 'name' | 'email' | 'message', value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: '' }));
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#0c0c0b] text-white">
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60">
              <Sparkles className="h-3.5 w-3.5" />
              Start a conversation
            </div>

            <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Tell us what you&apos;re building.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/55 sm:text-lg">
              Have a website, web app, dashboard, or digital product in mind?
              Share the details and we&apos;ll help turn the idea into a clear
              next step.
            </p>

            <div className="mt-10 space-y-5 border-t border-white/10 pt-8">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <MessageSquare className="h-4 w-4 text-white/70" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Project details</p>
                  <p className="mt-1 text-sm leading-6 text-white/45">
                    Tell us what you need, what you already have, and what you
                    want the finished product to achieve.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Mail className="h-4 w-4 text-white/70" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Direct response</p>
                  <p className="mt-1 text-sm leading-6 text-white/45">
                    We&apos;ll review your message and get back to you with the
                    next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {isSent ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                  Message received.
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
                  Thanks for reaching out. Your project details have been
                  received and we&apos;ll get back to you shortly.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Send another message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
              >
                <div className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                    Project inquiry
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    Let&apos;s discuss your project.
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-medium text-white/75"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Your name"
                      className={`w-full rounded-xl border ${
                        errors.name ? 'border-red-400/60' : 'border-white/10'
                      } bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-white/30`}
                    />
                    {errors.name && (
                      <span className="mt-2 flex items-center gap-1.5 text-xs text-red-300">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-medium text-white/75"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@domain.com"
                        className={`w-full rounded-xl border ${
                          errors.email ? 'border-red-400/60' : 'border-white/10'
                        } bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-white/30`}
                      />
                    </div>
                    {errors.email && (
                      <span className="mt-2 flex items-center gap-1.5 text-xs text-red-300">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-sm font-medium text-white/75"
                    >
                      Project details
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-white/30" />
                      <textarea
                        id="contact-message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder="Tell us about your project, goals, features, or timeline..."
                        className={`w-full resize-none rounded-xl border ${
                          errors.message
                            ? 'border-red-400/60'
                            : 'border-white/10'
                        } bg-black/20 py-3.5 pl-11 pr-4 text-sm leading-6 text-white outline-none placeholder:text-white/25 transition focus:border-white/30`}
                      />
                    </div>
                    {errors.message && (
                      <span className="mt-2 flex items-center gap-1.5 text-xs text-red-300">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send project inquiry'}
                  <Send className="h-4 w-4" />
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-white/30">
                  Your message is securely submitted for review.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
