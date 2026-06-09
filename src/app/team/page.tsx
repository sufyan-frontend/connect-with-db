import type { Metadata } from 'next';
import { GitFork, MessageSquare, Briefcase } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Meet the people behind Prism — a remote-first team of 60+ engineers, designers, and operators spread across 25 countries building great software.',
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Team | Prism',
    description: 'Meet the people behind Prism — 60+ people across 25 countries building great software.',
    url: '/team',
  },
};

const team = [
  { name: 'Alex Rivera', role: 'CEO & Co-Founder', bio: 'Former VP at Salesforce. Obsessed with developer experience and product simplicity.', avatar: 'AR', gradient: 'from-indigo-500 to-purple-600', social: ['github', 'twitter', 'linkedin'] },
  { name: 'Priya Nair', role: 'CTO & Co-Founder', bio: 'Ex-Google engineer. Built distributed systems at scale. Loves Rust and cold brew.', avatar: 'PN', gradient: 'from-pink-500 to-rose-600', social: ['github', 'linkedin'] },
  { name: 'Luca Bianchi', role: 'Head of Design', bio: 'Previously at Figma and Linear. Makes everything beautiful and functional.', avatar: 'LB', gradient: 'from-teal-500 to-cyan-600', social: ['twitter', 'linkedin'] },
  { name: 'Sara Kim', role: 'Head of Growth', bio: 'Scaled two startups from 0 to $10M ARR. Data-driven and relentlessly creative.', avatar: 'SK', gradient: 'from-orange-500 to-amber-600', social: ['twitter', 'linkedin'] },
  { name: 'Marcus Wei', role: 'Lead Engineer', bio: "Full-stack generalist who's shipped code at Netflix, Stripe, and two startups.", avatar: 'MW', gradient: 'from-blue-500 to-cyan-600', social: ['github', 'linkedin'] },
  { name: 'Aisha Diallo', role: 'Head of Customer Success', bio: 'Turned 200 churning customers into our biggest advocates. NPS fanatic.', avatar: 'AD', gradient: 'from-green-500 to-emerald-600', social: ['linkedin'] },
  { name: 'Tom Okafor', role: 'Senior Designer', bio: 'Creates interfaces that feel intuitive on first use. Microinteractions enthusiast.', avatar: 'TO', gradient: 'from-violet-500 to-purple-600', social: ['twitter', 'linkedin'] },
  { name: 'Elena Popov', role: 'DevOps Engineer', bio: 'Kubernetes whisperer. Keeps our 99.99% uptime number where it belongs.', avatar: 'EP', gradient: 'from-slate-600 to-slate-800', social: ['github'] },
];

const IconMap: Record<string, { icon: React.ComponentType<{ size?: number }>; label: string }> = {
  github:   { icon: GitFork,       label: 'GitHub' },
  twitter:  { icon: MessageSquare, label: 'Twitter' },
  linkedin: { icon: Briefcase,     label: 'LinkedIn' },
};

export default function Team() {
  return (
    <div>
      <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Team</p>
          <h1 className="text-5xl font-extrabold mb-5">The people behind Prism</h1>
          <p className="text-slate-300 text-lg">60+ people across 25 countries. All remote. All obsessed with building great software.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(m => (
            <div key={m.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-all">
              <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${m.gradient} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}>
                {m.avatar}
              </div>
              <h3 className="font-bold text-gray-900">{m.name}</h3>
              <p className="text-indigo-600 text-xs font-medium mt-0.5 mb-3">{m.role}</p>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">{m.bio}</p>
              <div className="flex items-center justify-center gap-2">
                {m.social.map(s => {
                  const entry = IconMap[s];
                  if (!entry) return null;
                  const { icon: Icon, label } = entry;
                  return (
                    <a key={s} href="#" title={label} aria-label={label} className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                      <Icon size={13} />
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to join the team?</h2>
          <p className="text-gray-500 mb-8 text-lg">We're always hiring exceptional engineers, designers, and operators.</p>
          <Link href="/contact" className="bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors inline-block">
            View Open Positions
          </Link>
        </div>
      </section>
    </div>
  );
}
