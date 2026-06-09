import { ExternalLink, GitFork } from 'lucide-react';
import Link from 'next/link';

const projects = [
  { title: 'HealthTrack Pro', category: 'SaaS', desc: 'Patient management platform serving 200+ clinics. Built on Nexus in 3 weeks.', tags: ['Next.js', 'MongoDB', 'Tailwind'], gradient: 'from-green-400 to-teal-500', stats: { users: '12k', uptime: '99.9%' } },
  { title: 'CreatorHub', category: 'Content Platform', desc: 'Newsletter and content platform for independent creators. 50k subscribers.', tags: ['React', 'API', 'CMS'], gradient: 'from-purple-400 to-indigo-500', stats: { users: '8k', uptime: '99.8%' } },
  { title: 'ShopMetrics', category: 'E-Commerce', desc: 'Real-time analytics dashboard for Shopify stores. Processes 1M+ events/day.', tags: ['Analytics', 'Webhooks', 'Charts'], gradient: 'from-orange-400 to-amber-500', stats: { users: '3k', uptime: '100%' } },
  { title: 'DevLaunch', category: 'Developer Tool', desc: 'API marketplace for developers. Manage keys, usage, and billing in one place.', tags: ['API', 'Billing', 'Auth'], gradient: 'from-blue-400 to-cyan-500', stats: { users: '20k', uptime: '99.9%' } },
  { title: 'EduBase', category: 'EdTech', desc: 'Learning management system for 500 schools. Built and deployed in 6 weeks.', tags: ['LMS', 'Users', 'Roles'], gradient: 'from-pink-400 to-rose-500', stats: { users: '45k', uptime: '99.7%' } },
  { title: 'LogFlow', category: 'Infrastructure', desc: 'Centralized logging and alerting for microservices. 10B+ logs processed.', tags: ['Monitoring', 'Alerts', 'API'], gradient: 'from-slate-500 to-gray-700', stats: { users: '1k', uptime: '100%' } },
];

export default function Portfolio() {
  return (
    <div>
      <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Portfolio</p>
          <h1 className="text-5xl font-extrabold mb-5">Built with Nexus</h1>
          <p className="text-slate-300 text-lg">Real products built by real teams on top of the Nexus platform.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p.title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col">
              <div className={`h-36 bg-linear-to-br ${p.gradient} flex items-center justify-center`}>
                <div className="text-white text-4xl font-extrabold opacity-30">{p.title.slice(0, 2)}</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-2.5 py-1 rounded-full">{p.category}</span>
                  <div className="flex gap-1.5">
                    <a href="#" title="GitHub" aria-label="GitHub" className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"><GitFork size={13} /></a>
                    <a href="#" title="Live site" aria-label="Live site" className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"><ExternalLink size={13} /></a>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm flex-1 leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map(t => (
                    <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <div><div className="font-bold text-gray-900 text-sm">{p.stats.users}</div><div className="text-gray-400 text-xs">Users</div></div>
                  <div><div className="font-bold text-green-600 text-sm">{p.stats.uptime}</div><div className="text-gray-400 text-xs">Uptime</div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-indigo-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Build your own</h2>
          <p className="text-indigo-200 mb-8">Start building with Nexus today. Free forever, no credit card required.</p>
          <Link href="/dashboard" className="bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors inline-block">
            Open Dashboard â†’
          </Link>
        </div>
      </section>
    </div>
  );
}

