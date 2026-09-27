import React from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowUpRight, Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#0c0c0b] px-5 py-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-200px)] max-w-4xl items-center justify-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/50">
                <Compass className="h-3.5 w-3.5" />
                Error 404
              </div>

              <p className="text-7xl font-semibold tracking-[-0.06em] text-white/10 sm:text-8xl">
                404
              </p>

              <h1 className="-mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                This page doesn&apos;t exist.
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-white/45 sm:text-base">
                The page you&apos;re looking for may have moved, been removed,
                or the address may be incorrect.
              </p>
            </div>

            <div className="shrink-0">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-black/20">
                <Compass className="h-10 w-10 text-white/30" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/65 transition hover:border-white/20 hover:text-white"
            >
              Contact us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
