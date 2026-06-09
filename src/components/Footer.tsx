import Link from 'next/link';
import { Zap, GitFork, MessageSquare, Briefcase } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Zap size={18} className="fill-indigo-400 text-indigo-400" />
              Nexus
            </Link>
            <p className="text-sm max-w-xs leading-relaxed">
              The all-in-one platform for modern teams. Manage everything from one beautiful dashboard.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {([['GitHub', GitFork], ['Twitter', MessageSquare], ['LinkedIn', Briefcase]] as const).map(([label, Icon]) => (
                <a key={label} href="#" title={label} aria-label={label} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Product', links: [['Features', '/features'], ['Pricing', '/pricing'], ['Blog', '/blog'], ['Portfolio', '/portfolio']] },
            { title: 'Company', links: [['About', '/about'], ['Team', '/team'], ['Contact', '/contact'], ['Services', '/services']] },
            { title: 'Legal', links: [['Privacy', '#'], ['Terms', '#'], ['Cookies', '#'], ['Security', '#']] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>Â© 2024 Nexus Inc. All rights reserved.</span>
          <Link href="/dashboard" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            Open Dashboard â†’
          </Link>
        </div>
      </div>
    </footer>
  );
}

