import { useSearchParams } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
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
      newErrors.message = 'Project details are required';
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

  const inputClass =
    'w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] px-4 py-3.5 text-base text-[var(--app-text)] outline-none placeholder:text-[var(--app-muted)] transition focus:border-[var(--app-brand)] focus:ring-4 focus:ring-[var(--app-brand)]/10';

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">

          {/* Introduction and contact details */}
          <div className="lg:sticky lg:top-28">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] px-3.5 py-2 text-xs font-bold text-[var(--app-brand)]">
              <MessageSquare className="h-3.5 w-3.5" />
              PROJECT ENQUIRY
            </div>

            <h1 className="max-w-lg text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Tell us about your
              <span className="block text-[var(--app-brand)]">
                project.
              </span>
            </h1>

            <p className="mt-4 max-w-md text-base leading-7 text-[var(--app-muted)]">
              Use the form to describe the website or application you need. You can also call us directly.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">Project details</h2>
                    <p className="mt-1 text-base leading-7 text-[var(--app-muted)]">
                      Describe the website, application or service you need.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">What happens next</h2>
                    <p className="mt-1 text-base leading-7 text-[var(--app-muted)]">
                      We'll review your message and contact you about your request.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone contact */}
            <a
              href="tel:+2349057108822"
              className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[var(--app-brand)]/20 bg-[var(--app-brand-soft)] p-4 transition hover:border-[var(--app-brand)]/50"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--app-surface)] text-[var(--app-brand)]">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-[var(--app-muted)]">
                    Prefer to call?
                  </span>
                  <span className="mt-0.5 block text-base font-extrabold tracking-tight">
                    09057108822
                  </span>
                </span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-[var(--app-brand)]" />
            </a>
          </div>

          {/* Inquiry form */}
          <div>
            {isSent ? (
              <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-7 shadow-sm sm:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <h2 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Your enquiry has been sent.
                </h2>

                <p className="mt-3 max-w-md text-base leading-7 text-[var(--app-muted)]">
                  Thank you for contacting Femix Web Dev. We'll review your details and get in touch.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3 text-base font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)]"
                >
                  Send another enquiry
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-sm sm:p-7 lg:p-8"
              >
                <div className="mb-7 border-b border-[var(--app-border)] pb-5">
                  <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                    Project information
                  </h2>
                  <p className="mt-2 text-base leading-7 text-[var(--app-muted)]">
                    Enter your contact details and describe the work you need.
                  </p>

                  {selectedPackage && (
                    <div className="mt-4 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--app-muted)]">
                        Selected package
                      </p>
                      <p className="mt-1 text-base font-extrabold">
                        {selectedPackage}
                        {selectedPrice && (
                          <span className="ml-2 font-semibold text-[var(--app-muted)]">
                            from ₦{Number(selectedPrice).toLocaleString()}
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-base font-bold"
                    >
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Enter your name"
                      className={`${inputClass} ${
                        errors.name ? 'border-rose-400/70' : ''
                      }`}
                    />
                    {errors.name && (
                      <span className="mt-2 flex items-center gap-1.5 text-sm font-medium text-rose-500">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-base font-bold"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--app-muted)]" />
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@example.com"
                        className={`w-full rounded-xl border ${
                          errors.email ? 'border-rose-400/70' : 'border-[var(--app-border)]'
                        } bg-[var(--app-surface-2)] py-3.5 pl-11 pr-4 text-base text-[var(--app-text)] outline-none placeholder:text-[var(--app-muted)] transition focus:border-[var(--app-brand)] focus:ring-4 focus:ring-[var(--app-brand)]/10`}
                      />
                    </div>
                    {errors.email && (
                      <span className="mt-2 flex items-center gap-1.5 text-sm font-medium text-rose-500">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-base font-bold"
                    >
                      Project details
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="Describe the website or application you need, including any features you have in mind."
                      className={`w-full resize-y rounded-xl border ${
                        errors.message ? 'border-rose-400/70' : 'border-[var(--app-border)]'
                      } bg-[var(--app-surface-2)] px-4 py-3.5 text-base leading-7 text-[var(--app-text)] outline-none placeholder:text-[var(--app-muted)] transition focus:border-[var(--app-brand)] focus:ring-4 focus:ring-[var(--app-brand)]/10`}
                    />
                    {errors.message && (
                      <span className="mt-2 flex items-center gap-1.5 text-sm font-medium text-rose-500">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3 text-base font-bold text-[var(--app-brand-contrast)] shadow-sm transition hover:bg-[var(--app-brand-hover)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Submit enquiry'}
                  <Send className="h-4 w-4" />
                </button>

                <div className="mt-5 flex items-start gap-2.5 border-t border-[var(--app-border)] pt-4">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--app-brand)]" />
                  <p className="text-base leading-7 text-[var(--app-muted)]">
                    Your contact details will be used to respond to this enquiry.
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
