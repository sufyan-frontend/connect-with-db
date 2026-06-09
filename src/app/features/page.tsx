import type { Metadata } from 'next';
import { Zap, Shield, BarChart2, Users, Plug, Smartphone, RefreshCw, Globe, Bell, Search, FileText, GitBranch } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore 50+ features across performance, security, productivity, and integrations. See everything Prism has to offer for modern teams.',
  alternates: { canonical: '/features' },
  openGraph: {
    title: 'Features | Prism',
    description: 'Explore 50+ features across performance, security, productivity, and integrations.',
    url: '/features',
  },
};

const categories = [
  {
    title: 'Performance',
    features: [
      { icon: Zap, name: 'Instant Load', desc: 'Sub-100ms page loads powered by edge CDN nodes in 50+ cities.' },
      { icon: RefreshCw, name: 'Auto Scaling', desc: 'Handles traffic spikes automatically — no manual intervention needed.' },
      { icon: Globe, name: 'Global CDN', desc: 'Your content delivered from the nearest server to your users, everywhere.' },
    ],
  },
  {
    title: 'Security',
    features: [
      { icon: Shield, name: 'End-to-End Encryption', desc: 'All data encrypted in transit and at rest using AES-256.' },
      { icon: Users, name: 'Role-Based Access', desc: 'Fine-grained permissions for every team member and resource.' },
      { icon: Bell, name: 'Threat Alerts', desc: 'Real-time security alerts and anomaly detection for your account.' },
    ],
  },
  {
    title: 'Productivity',
    features: [
      { icon: Search, name: 'Universal Search', desc: 'Find anything — users, posts, settings — instantly with Cmd+K.' },
      { icon: FileText, name: 'Rich Content Editor', desc: 'Write and publish content with a beautiful Notion-like editor.' },
      { icon: Bell, name: 'Smart Notifications', desc: 'Only get alerted about what matters. Silence everything else.' },
    ],
  },
  {
    title: 'Integrations',
    features: [
      { icon: Plug, name: '200+ Integrations', desc: 'Connect with Slack, Stripe, HubSpot, Zapier, and hundreds more.' },
      { icon: GitBranch, name: 'Webhooks', desc: 'Push real-time events to any endpoint as data changes in Prism.' },
      { icon: Smartphone, name: 'Mobile Apps', desc: 'Native iOS and Android apps so your team stays connected on the go.' },
    ],
  },
];

export default function Features() {
  return (
    <div>
      <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Features</p>
          <h1 className="text-5xl font-extrabold mb-5">Built for modern teams</h1>
          <p className="text-slate-300 text-lg">50+ features across performance, security, productivity, and integrations.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-16">
          {categories.map(cat => (
            <div key={cat.title}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">{cat.title}</h2>
              <div className="grid md:grid-cols-3 gap-5">
                {cat.features.map(({ icon: Icon, name, desc }) => (
                  <div key={name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-indigo-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">See it in action</h2>
          <p className="text-indigo-200 mb-7">Explore the full dashboard and all features — no sign up required.</p>
          <Link href="/dashboard" className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors inline-block">
            Open Live Demo →
          </Link>
        </div>
      </section>
    </div>
  );
}
