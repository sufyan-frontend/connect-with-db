import { ArrowRight, Code, Database, Globe, LineChart, Lock, Headphones } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Globe, title: 'Web Platform', price: 'From $49/mo',
    desc: 'A fully hosted platform for your website, blog, and landing pages with built-in CMS.',
    features: ['Custom domain', 'SSL included', 'CDN delivery', 'SEO tools'],
    color: 'text-blue-600 bg-blue-50 border-blue-100',
  },
  {
    icon: Database, title: 'Data Management', price: 'From $79/mo',
    desc: 'Manage your users, customers, and business data with powerful filtering and exports.',
    features: ['Unlimited records', 'CSV export', 'REST API', 'Webhooks'],
    color: 'text-purple-600 bg-purple-50 border-purple-100',
  },
  {
    icon: LineChart, title: 'Analytics Suite', price: 'From $39/mo',
    desc: 'Real-time dashboards and reporting to track every metric that matters to your business.',
    features: ['Real-time data', 'Custom reports', 'Funnel analysis', 'Alerts'],
    color: 'text-green-600 bg-green-50 border-green-100',
  },
  {
    icon: Lock, title: 'Security & Auth', price: 'From $29/mo',
    desc: 'Enterprise-grade authentication, SSO, and role-based access control for your team.',
    features: ['SSO / OAuth', '2FA support', 'Audit logs', 'IP allowlist'],
    color: 'text-red-600 bg-red-50 border-red-100',
  },
  {
    icon: Code, title: 'Developer API', price: 'From $59/mo',
    desc: 'Programmatic access to all Nexus features via a clean, well-documented REST API.',
    features: ['REST & GraphQL', 'SDK libraries', 'Webhooks', 'Sandbox mode'],
    color: 'text-orange-600 bg-orange-50 border-orange-100',
  },
  {
    icon: Headphones, title: 'Managed Support', price: 'From $199/mo',
    desc: 'Dedicated onboarding, implementation help, and priority support from our team.',
    features: ['Dedicated CSM', 'Onboarding', 'SLA guarantee', 'Training'],
    color: 'text-teal-600 bg-teal-50 border-teal-100',
  },
];

export default function Services() {
  return (
    <div>
      <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Services</p>
          <h1 className="text-5xl font-extrabold mb-5">Everything you need to grow</h1>
          <p className="text-slate-300 text-lg">Pick the services that fit your stage. Mix and match, or get everything in one plan.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => (
            <div key={s.title} className={`bg-white rounded-2xl p-7 border shadow-sm hover:shadow-md transition-all`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${s.color}`}>
                <s.icon size={22} />
              </div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-lg">{s.title}</h3>
                <span className="text-indigo-600 font-semibold text-sm">{s.price}</span>
              </div>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">{s.desc}</p>
              <ul className="space-y-1.5 mb-6">
                {s.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="flex items-center gap-1 text-sm text-indigo-600 font-medium hover:gap-2 transition-all">
                Get started <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-indigo-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Not sure which plan?</h2>
          <p className="text-indigo-200 mb-7">Talk to our team and we'll help you find the right fit.</p>
          <Link href="/contact" className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors inline-block">
            Contact Sales
          </Link>
        </div>
      </section>
    </div>
  );
}

