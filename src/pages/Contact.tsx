import { Link, useSearchParams } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const selectedPackage = searchParams.get('package')?.trim() || '';
  const selectedPrice = searchParams.get('price')?.trim() || '';

  const initialMessage = selectedPackage
    ? `I'm interested in the ${selectedPackage}${
        selectedPrice
          ? ` (starting from ₦${Number(selectedPrice).toLocaleString()})`
          : ''
      }.\n\nProject details:\n`
    : '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: initialMessage,
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
        const { error } = await supabase.from('leads').insert([
          {
            full_name: formData.name.trim(),
            email: formData.email.trim(),
            notes: formData.message.trim(),
            service_type: selectedPackage || 'General Contact Inquiry',
            status: 'new',
            source: 'website-contact-form',
          },
        ]);

        if (error) {
          throw error;
        }
      }

      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (err) {
      console.error('Error saving lead to Supabase:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (
    field: 'name' | 'email' | 'message',
    value: string,
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: '' }));
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-brand)]">
              <MessageSquare className="h-3.5 w-3.5" />
              Start a conversation
            </div>

            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Tell us what you&apos;re building.
              <span className="mt-2 block text-[var(--app-brand)]">
                We&apos;ll help shape the next step.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[var(--app-muted)] sm:text-lg">
              Have a website, web app, dashboard, or digital product in mind?
              Share the details and we&apos;ll help turn the idea into a clear
              next step.
            </p>

            <div className="mt-10 border-t border-[var(--app-border)] pt-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-brand)]">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold">Project details</p>
                    <p className="mt-1 max-w-sm text-sm leading-6 text-[var(--app-muted)]">
                      Tell us what you need, what you already have, and what
                      you want the finished product to achieve.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-brand)]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold">Direct response</p>
                    <p className="mt-1 max-w-sm text-sm leading-6 text-[var(--app-muted)]">
                      We&apos;ll review your message and get back to you with
                      the next steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-[var(--app-border)] pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                Prefer an estimate?
              </p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--app-muted)]">
                Get a starting project estimate before sending your enquiry.
              </p>

              <Link
                to="/estimator"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--app-text)] transition-colors hover:text-[var(--app-brand)]"
              >
                Open project estimator
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            {isSent ? (
              <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-7 sm:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <h2 className="mt-7 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Message received.
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-[var(--app-muted)]">
                  Thanks for reaching out. Your project details have been
                  received and we&apos;ll get back to you shortly.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)]"
                >
                  Send another message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 sm:p-8 lg:p-10"
              >
                <div className="mb-8 border-b border-[var(--app-border)] pb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                    Project inquiry
                  </p>

                  {selectedPackage && (
                    <div className="mt-4 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] px-4 py-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                        Selected package
                      </p>
                      <p className="mt-1 text-sm font-extrabold text-[var(--app-text)]">
                        {selectedPackage}
                        {selectedPrice && (
                          <span className="ml-2 font-semibold text-[var(--app-muted)]">
                            from ₦{Number(selectedPrice).toLocaleString()}
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                    Let&apos;s discuss your project.
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">
                    Give us enough detail to understand what you&apos;re trying
                    to build.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-bold"
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
                        errors.name
                          ? 'border-rose-400/70'
                          : 'border-[var(--app-border)]'
                      } bg-[var(--app-surface-2)] px-4 py-3.5 text-sm text-[var(--app-text)] outline-none placeholder:text-[var(--app-muted)] transition focus:border-[var(--app-brand)] focus:ring-4 focus:ring-[var(--app-brand)]/10`}
                    />

                    {errors.name && (
                      <span className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-bold"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--app-muted)]" />

                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@domain.com"
                        className={`w-full rounded-xl border ${
                          errors.email
                            ? 'border-rose-400/70'
                            : 'border-[var(--app-border)]'
                        } bg-[var(--app-surface-2)] py-3.5 pl-11 pr-4 text-sm text-[var(--app-text)] outline-none placeholder:text-[var(--app-muted)] transition focus:border-[var(--app-brand)] focus:ring-4 focus:ring-[var(--app-brand)]/10`}
                      />
                    </div>

                    {errors.email && (
                      <span className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-sm font-bold"
                    >
                      Project details
                    </label>

                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-[var(--app-muted)]" />

                      <textarea
                        id="contact-message"
                        rows={7}
                        value={formData.message}
                        onChange={(e) =>
                          updateField('message', e.target.value)
                        }
                        placeholder="Tell us about your project, goals, features, or timeline..."
                        className={`w-full resize-none rounded-xl border ${
                          errors.message
                            ? 'border-rose-400/70'
                            : 'border-[var(--app-border)]'
                        } bg-[var(--app-surface-2)] py-3.5 pl-11 pr-4 text-sm leading-6 text-[var(--app-text)] outline-none placeholder:text-[var(--app-muted)] transition focus:border-[var(--app-brand)] focus:ring-4 focus:ring-[var(--app-brand)]/10`}
                      />
                    </div>

                    {errors.message && (
                      <span className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3.5 text-sm font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send project inquiry'}
                  <Send className="h-4 w-4" />
                </button>

                <div className="mt-5 flex items-start gap-3 border-t border-[var(--app-border)] pt-5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--app-brand)]" />
                  <p className="text-xs leading-5 text-[var(--app-muted)]">
                    Your message is securely submitted for review. We only use
                    the information you provide to respond to your enquiry.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
