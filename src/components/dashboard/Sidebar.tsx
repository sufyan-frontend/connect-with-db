'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, Settings, ArrowLeft, Zap, Bell, Package, ShoppingBag } from 'lucide-react';

const navItems = [
  { href: '/dashboard',          icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/users',    icon: Users,           label: 'Users' },
  { href: '/dashboard/posts',    icon: FileText,        label: 'Posts' },
  { href: '/dashboard/products', icon: Package,         label: 'Products' },
  { href: '/dashboard/orders',   icon: ShoppingBag,     label: 'Orders' },
  { href: '/dashboard/settings', icon: Settings,        label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col shrink-0">
      <div className="p-5 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">Nexus</div>
            <div className="text-slate-500 text-xs">Admin Panel</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <p className="text-slate-600 text-xs font-medium uppercase tracking-wider px-3 mb-3">Menu</p>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon size={17} />
              {label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-300" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button type="button" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <Bell size={17} />
          Notifications
          <span className="ml-auto bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <ArrowLeft size={17} />
          Back to Site
        </Link>
      </div>
    </aside>
  );
}
