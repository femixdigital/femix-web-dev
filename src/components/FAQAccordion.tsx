import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'payments' | 'tech';
}

const FAQS: FAQItem[] = [
  {
    category: 'general',
    question: 'How long does a typical project take from start to launch?',
    answer: 'Standard Landing Pages take 3–5 working days. Full Single Page Applications (SPAs) with Supabase authentication, database schema design, and custom payment integrations typically take 7–14 working days.'
  },
  {
    category: 'payments',
    question: 'What are your payment terms and accepted currencies?',
    answer: 'We operate on a 50% upfront deposit to initiate development and 50% upon final delivery prior to domain pointing. We accept USD ($) via wire transfer and NGN (₦) via automated Paystack checkout.'
  },
  {
    category: 'tech',
    question: 'Will I own the source code and database rights?',
    answer: 'Yes, 100%. Upon final payment, full GitHub repository ownership, Supabase project admin access, and production environment credentials are transferred directly to you with zero lock-in.'
  },
  {
    category: 'tech',
    question: 'How do you handle site updates and post-launch maintenance?',
    answer: 'Every build includes a 30-day post-launch warranty covering bug fixes and system optimization. We also offer monthly retainer plans for continuous feature development and database management.'
  }
];

export const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
      <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
        <HelpCircle className="w-4 h-4"/>
        <span>Frequently Asked Questions</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
        Got Questions? We Have Answers.
      </h2>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-slate-800 rounded-2xl bg-slate-950/80 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-5 text-left flex justify-between items-center space-x-4 hover:bg-slate-900/50 transition-colors"
              >
                <span className="font-semibold text-white text-sm sm:text-base">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-cyan-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-slate-400 text-xs sm:text-sm border-t border-slate-800/60 leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
