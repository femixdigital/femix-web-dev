import React, { useEffect, useState } from 'react';
import { Star, Quote, Send, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  rating: number;
  content: string;
  created_at: string;
}

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    role: '',
    company: '',
    rating: 5,
    content: '',
  });

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, name, role, company, rating, content, created_at')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Unable to load customer reviews:', error);
        setLoadError('Customer reviews are temporarily unavailable. Please try again later.');
      } else {
        setReviews((data || []) as Testimonial[]);
        setLoadError('');
      }

      setLoading(false);
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) return;

    setError('');
    setMessage('');

    const name = form.name.trim();
    const role = form.role.trim();
    const company = form.company.trim();
    const content = form.content.trim();

    if (name.length < 2 || name.length > 80) {
      setError('Your name must contain between 2 and 80 characters.');
      return;
    }

    if (role.length > 100) {
      setError('Your role cannot exceed 100 characters.');
      return;
    }

    if (company.length > 120) {
      setError('Your company name cannot exceed 120 characters.');
      return;
    }

    if (!Number.isInteger(form.rating) || form.rating < 1 || form.rating > 5) {
      setError('Please select a valid star rating.');
      return;
    }

    if (content.length < 15 || content.length > 1200) {
      setError('Your feedback must contain between 15 and 1,200 characters.');
      return;
    }

    setSubmitting(true);

    try {
      const { error: submitError } = await supabase
        .from('testimonials')
        .insert({
          name,
          role: role || null,
          company: company || null,
          rating: form.rating,
          content,
        });

      if (submitError) {
        console.error('Review submission failed:', submitError);
        setError('Your review could not be submitted. Please try again.');
        return;
      }

      setMessage(
        'Thank you! Your review has been submitted and is awaiting approval.',
      );

      setForm({
        name: '',
        role: '',
        company: '',
        rating: 5,
        content: '',
      });
    } catch (submitError) {
      console.error('Unexpected review submission error:', submitError);
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-text)] outline-none transition placeholder:text-[var(--app-muted)] focus:border-[var(--app-primary)] focus:ring-2 focus:ring-[var(--app-primary)]/15';

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-primary)]">
          CUSTOMER FEEDBACK
        </p>

        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--app-text)] sm:text-4xl">
          What Clients Say
        </h2>

        <p className="mt-4 text-base leading-7 text-[var(--app-muted)]">
          Honest feedback from people who have worked with Femix Web Dev.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-7 w-7 animate-spin text-[var(--app-primary)]" />
        </div>
      ) : loadError ? (
        <div
          role="alert"
          className="mx-auto max-w-2xl rounded-xl border border-rose-400/30 bg-rose-500/5 px-6 py-5 text-center text-sm text-rose-600 dark:text-rose-300"
        >
          {loadError}
        </div>
      ) : reviews.length > 0 ? (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="relative flex flex-col rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <Quote className="absolute right-5 top-5 h-7 w-7 text-[var(--app-brand-soft)]" />

              <div className="mb-4 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < review.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-[var(--app-border)]'
                    }`}
                  />
                ))}
              </div>

              <p className="flex-1 text-sm leading-7 text-[var(--app-text)]">
                "{review.content}"
              </p>

              <div className="mt-6 border-t border-[var(--app-border)] pt-4">
                <h3 className="text-sm font-bold text-[var(--app-text)]">
                  {review.name}
                </h3>

                {(review.role || review.company) && (
                  <p className="mt-1 text-xs text-[var(--app-muted)]">
                    {[review.role, review.company].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-[var(--app-border)] bg-[var(--app-surface)] px-6 py-10 text-center">
          <MessageSquare className="mx-auto h-8 w-8 text-[var(--app-muted)]" />
          <h3 className="mt-4 text-lg font-bold text-[var(--app-text)]">
            Be the first to share your experience
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">
            Customer reviews will appear here after they have been approved.
          </p>
        </div>
      )}

      <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-sm sm:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-extrabold text-[var(--app-text)]">
            Share Your Experience
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">
            Have you worked with Femix Web Dev? We'd appreciate your honest feedback.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="review-name" className="mb-2 block text-sm font-semibold text-[var(--app-text)]">
              Your name *
            </label>
            <input
              id="review-name"
              required
              minLength={2}
              maxLength={80}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="review-role" className="mb-2 block text-sm font-semibold text-[var(--app-text)]">
                Your role (optional)
              </label>
              <input
                id="review-role"
                maxLength={100}
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Business owner"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="review-company" className="mb-2 block text-sm font-semibold text-[var(--app-text)]">
                Business / company (optional)
              </label>
              <input
                id="review-company"
                maxLength={120}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Your business name"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <span className="mb-2 block text-sm font-semibold text-[var(--app-text)]">
              Your rating *
            </span>
            <div className="flex gap-2" role="group" aria-label="Choose a rating">
              {Array.from({ length: 5 }, (_, index) => {
                const rating = index + 1;
                return (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setForm({ ...form, rating })}
                    aria-label={`${rating} star${rating === 1 ? '' : 's'}`}
                    aria-pressed={form.rating === rating}
                    className="rounded-lg p-1 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--app-primary)]"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        rating <= form.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-[var(--app-border)]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="review-content" className="mb-2 block text-sm font-semibold text-[var(--app-text)]">
              Your feedback *
            </label>
            <textarea
              id="review-content"
              required
              minLength={15}
              maxLength={1200}
              rows={5}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Tell us about your experience..."
              className={`${inputClass} resize-y`}
            />
            <p className="mt-1 text-right text-xs text-[var(--app-muted)]">
              {form.content.length}/1200
            </p>
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-rose-500/10 p-3 text-sm text-rose-600">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="rounded-xl bg-[var(--app-brand-soft)] p-3 text-sm text-[var(--app-text)]">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--app-primary)] px-5 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Testimonials;
