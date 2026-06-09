import { CheckCircle, Zap } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free', price: '$0', period: 'forever', highlight: false,
    desc: 'Perfect for individuals and small side projects.',
    features: ['Up to 3 users', '1,000 records', 'Basic analytics', 'Community support', '1 GB storage'],
    cta: 'Get Started Free', href: '/dashboard',
  },
  {
    name: 'Pro', price: '$49', period: '/month', highlight: true,
    desc: 'For growing teams that need more power and flexibility.',
    features: ['Up to 25 users', 'Unlimited records', 'Advanced analytics', 'Priority email support', '50 GB storage', 'API access', 'Custom domain', 'SSO / OAuth'],
    cta: 'Start Free Trial', href: '/dashboard',
  },
  {
    name: 'Enterprise', price: 'Custom', period: '', highlight: false,
    desc: 'For large orgs with compliance, security, and scale needs.',
    features: ['Unlimited users', 'Unlimited everything', 'Dedicated account manager', '99.99% SLA', 'Custom integrations', 'On-premise option', 'SAML SSO', 'Audit logs'],
    cta: 'Contact Sales', href: '/contact',
  },
];

const faqs = [
  { q: 'Can I change plans later?', a: 'Yes. Upgrade or downgrade at any time. Changes apply to your next billing cycle.' },
  { q: 'Is there a free trial?', a: 'Pro comes with a 14-day free trial. No credit card required.' },
  { q: 'What payment methods do you accept?', a: 'Visa, Mastercard, Amex, and PayPal. Annual plans get 20% off.' },
  { q: 'Can I cancel anytime?', a: 'Absolutely. Cancel with one click from your dashboard. No cancellation fees.' },
];

export default function Pricing() {
  return (
    <div>
      <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Pricing</p>
          <h1 className="text-5xl font-extrabold mb-5">Simple, transparent pricing</h1>
          <p className="text-slate-300 text-lg">No hidden fees. No surprises. Just great software.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 items-start">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border transition-all ${
                plan.highlight
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-105'
                  : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              {plan.highlight && (
                <div className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-4">
                  <Zap size={12} className="fill-white" /> Most Popular
                </div>
              )}
              <div className={`text-sm font-semibold mb-2 ${plan.highlight ? 'text-indigo-200' : 'text-indigo-600'}`}>{plan.name}</div>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className={`text-sm mb-1 ${plan.highlight ? 'text-indigo-200' : 'text-gray-400'}`}>{plan.period}</span>
              </div>
              <p className={`text-sm mb-7 ${plan.highlight ? 'text-indigo-200' : 'text-gray-500'}`}>{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle size={15} className={plan.highlight ? 'text-indigo-200' : 'text-green-500'} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                  plan.highlight
                    ? 'bg-white text-indigo-700 hover:bg-indigo-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(faq => (
              <div key={faq.q} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

