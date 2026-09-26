import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What technologies do you use for full-stack web applications?',
    answer: 'We specialize in modern React with TypeScript, Vite for ultra-fast bundling, Tailwind CSS v4 for UI styling, and Supabase (PostgreSQL) for scalable backend database, authentication, and real-time features.',
  },
  {
    question: 'How long does a typical project take from start to launch?',
    answer: 'A Starter SPA typically launches within 1–2 weeks. Full-featured SaaS platforms with custom integrations or authentication workflows generally take 3–5 weeks depending on project scope.',
  },
  {
    question: 'How are client orders and lead inquiries managed?',
    answer: 'All lead submissions and package orders flow directly into encrypted Supabase tables protected by Row Level Security (RLS) policies. Admins manage them in real time via our secure internal dashboard.',
  },
  {
    question: 'Do you offer ongoing technical maintenance after delivery?',
    answer: 'Yes! We provide post-launch support SLAs, automated database backups, performance monitoring, and retainer packages for continuous feature updates.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 text-cyan-400 text-xs px-3 py-1 rounded-full mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Everything You Need to Know
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Got questions? We have answers to help guide your decision.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-5 text-left flex items-center justify-between space-x-4 text-white font-semibold text-sm sm:text-base focus:outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 border-t border-slate-800/50 pt-3 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
