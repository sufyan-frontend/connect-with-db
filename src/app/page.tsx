import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, BarChart2, Users, Plug, Smartphone, Star, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Prism — Modern SaaS Platform',
  description:
    'Prism is the all-in-one platform for modern teams. Manage users, content, and analytics from one beautiful dashboard. Start free, no credit card required.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Prism — Modern SaaS Platform',
    description:
      'Prism is the all-in-one platform for modern teams. Manage users, content, and analytics from one beautiful dashboard.',
    url: '/',
  },
};

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized with edge caching and CDN delivery globally. Pages load in under 100ms.', color: 'text-yellow-500 bg-yellow-50' },
  { icon: Shield, title: 'Secure by Default', desc: 'Enterprise-grade security with end-to-end encryption and SOC2 compliance.', color: 'text-green-500 bg-green-50' },
  { icon: BarChart2, title: 'Analytics Built-in', desc: 'Real-time dashboards and actionable insights for every part of your business.', color: 'text-blue-500 bg-blue-50' },
  { icon: Users, title: 'Team Collaboration', desc: 'Invite your whole team with granular roles, permissions, and audit logs.', color: 'text-purple-500 bg-purple-50' },
  { icon: Plug, title: 'API First', desc: 'Integrate with 200+ tools via our powerful REST & GraphQL APIs.', color: 'text-orange-500 bg-orange-50' },
  { icon: Smartphone, title: 'Mobile Ready', desc: 'Fully responsive on all devices. Native apps for iOS and Android.', color: 'text-pink-500 bg-pink-50' },
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'CEO, TechCorp', text: 'Prism transformed how our team works. Productivity is up 40% in just 2 months.', avatar: 'SJ', stars: 5 },
  { name: 'Ahmed Hassan', role: 'CTO, StartupX', text: "The best SaaS platform we've ever used. The dashboard is incredibly intuitive.", avatar: 'AH', stars: 5 },
  { name: 'Maria Garcia', role: 'Product Manager', text: 'Setup took 10 minutes. Our entire team was onboarded within the same day.', avatar: 'MG', stars: 5 },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-indigo-950 to-purple-950 text-white">
        <div className="absolute inset-0 hero-grid" />
        <div className="relative max-w-5xl mx-auto px-4 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-sm text-indigo-300 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Now live — Version 2.0 with AI features
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            Build faster.<br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Ship smarter.</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            The all-in-one platform for modern teams. Manage users, content, and analytics from one beautiful dashboard.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-xl shadow-indigo-900/50">
              Open Dashboard <ArrowRight size={18} />
            </Link>
            <Link href="/features" className="flex items-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-white/10 transition-all">
              See All Features
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-400">
            {['No credit card', 'Free forever plan', '5-minute setup'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-400" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[['10,000+', 'Active Users'], ['50+', 'Features'], ['99.9%', 'Uptime SLA'], ['24/7', 'Support']].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="text-4xl font-extrabold text-indigo-600">{v}</div>
              <div className="text-gray-500 text-sm mt-1.5 font-medium">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-indigo-600 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-4xl font-bold text-gray-900">Everything your team needs</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">A complete toolkit to run your entire business online.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all group border border-gray-100">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-indigo-600 text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-4xl font-bold text-gray-900">Loved by thousands of teams</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={15} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-700 mb-7 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">{t.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-linear-to-br from-indigo-600 to-purple-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-indigo-200 mb-10 text-lg">Join 10,000+ teams already using Prism to build their business.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard" className="bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-all inline-flex items-center gap-2">
              Open Dashboard <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className="border border-white/30 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all">
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
