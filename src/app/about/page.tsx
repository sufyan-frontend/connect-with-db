import { Heart, Zap, Eye, Users } from 'lucide-react';
import Link from 'next/link';

const values = [
  { icon: Eye, title: 'Transparency', desc: 'Open roadmap, honest pricing, no hidden fees â€” ever.', color: 'text-blue-600 bg-blue-50' },
  { icon: Heart, title: 'Customer First', desc: 'Every feature starts with a real customer problem.', color: 'text-red-500 bg-red-50' },
  { icon: Zap, title: 'Move Fast', desc: 'We ship, learn, and improve â€” every single week.', color: 'text-yellow-500 bg-yellow-50' },
  { icon: Users, title: 'Teamwork', desc: 'Built by a global remote team that practices what it preaches.', color: 'text-purple-600 bg-purple-50' },
];

const team = [
  { name: 'Alex Rivera', role: 'CEO & Co-Founder', avatar: 'AR', bg: 'from-indigo-500 to-purple-600' },
  { name: 'Priya Nair', role: 'CTO & Co-Founder', avatar: 'PN', bg: 'from-pink-500 to-rose-600' },
  { name: 'Luca Bianchi', role: 'Head of Design', avatar: 'LB', bg: 'from-teal-500 to-cyan-600' },
  { name: 'Sara Kim', role: 'Head of Growth', avatar: 'SK', bg: 'from-orange-500 to-amber-600' },
];

export default function About() {
  return (
    <div>
      <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">About Us</p>
          <h1 className="text-5xl font-extrabold mb-5">We're building the future of team productivity</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">Founded in 2021, Nexus is on a mission to replace 10 tools with one beautiful platform.</p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
        <div className="prose prose-lg text-gray-600 space-y-4">
          <p>Nexus was born out of frustration. Our founders were running a fast-growing startup and found themselves juggling 12 different SaaS tools â€” one for analytics, one for CMS, one for user management. The context-switching was killing productivity.</p>
          <p>So they built Nexus: a single, unified platform that brings together everything a modern team needs. No more switching tabs, no more duplicate data, no more integration headaches.</p>
          <p>Today, over 10,000 teams rely on Nexus to run their operations. We're a remote-first company of 60+ people spread across 25 countries, all united by a belief that great software should make life simpler, not harder.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm text-center border border-gray-100">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet the Leadership</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(m => (
              <div key={m.name} className="text-center">
                <div className={`w-20 h-20 rounded-2xl bg-linear-to-br ${m.bg} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}>{m.avatar}</div>
                <div className="font-semibold text-gray-900">{m.name}</div>
                <div className="text-gray-500 text-sm mt-1">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-indigo-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Want to join us?</h2>
          <p className="text-indigo-200 mb-7">We're always looking for exceptional people.</p>
          <Link href="/contact" className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors inline-block">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}

