import type { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to the most common questions about Prism — billing, security, API access, data export, and more. Can't find what you need? Contact us.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Frequently Asked Questions | Prism',
    description: 'Answers to common questions about Prism — billing, security, API, and more.',
    url: '/faq',
  },
};

const faqs = [
  { category: 'General', q: 'What is Prism?', a: 'Prism is an all-in-one SaaS platform that replaces 10+ tools with a single, beautiful dashboard. It combines user management, content management, and analytics in one place.' },
  { category: 'General', q: 'Who is Prism for?', a: 'Prism is built for modern teams — from solo founders to enterprises. If you manage users, content, or data, Prism has features designed for you.' },
  { category: 'Billing', q: 'Is there a free plan?', a: 'Yes! Our Free plan includes up to 3 users, 1,000 records, and basic analytics — forever free, no credit card required.' },
  { category: 'Billing', q: 'How does billing work?', a: 'We bill monthly or annually (save 20%). You can upgrade, downgrade, or cancel at any time. Changes take effect on your next billing date.' },
  { category: 'Billing', q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.' },
  { category: 'Technical', q: 'Is my data secure?', a: 'Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC2 Type II certified and GDPR compliant.' },
  { category: 'Technical', q: 'Can I export my data?', a: 'Yes. You can export all your data as CSV or JSON at any time from your dashboard settings. We believe in full data portability.' },
  { category: 'Technical', q: 'Is there an API?', a: 'Yes. All Pro and Enterprise plans include full REST API access with comprehensive documentation and client libraries for Node.js, Python, and more.' },
  { category: 'Support', q: 'How do I get help?', a: 'Free users have access to community forums and documentation. Pro users get priority email support with a 4-hour SLA. Enterprise gets a dedicated account manager.' },
  { category: 'Support', q: 'Do you offer onboarding?', a: 'Yes! Pro plans include a 1-hour onboarding call. Enterprise plans include full white-glove implementation support for your entire team.' },
];

export default function FAQ() {
  return (
    <div>
      <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">FAQ</p>
          <h1 className="text-5xl font-extrabold mb-5">Frequently Asked Questions</h1>
          <p className="text-slate-300 text-lg">Everything you need to know about Prism. Can't find the answer? Contact us.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
          <p className="text-gray-500 mb-7">Our team is happy to help with anything not covered here.</p>
          <Link href="/contact" className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors inline-block">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
