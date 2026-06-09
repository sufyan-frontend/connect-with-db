'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Zap, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const links = [
  { href: '/',         label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/shop',     label: 'Shop' },
  { href: '/pricing',  label: 'Pricing' },
  { href: '/blog',     label: 'Blog' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-indigo-600 text-lg">
            <Zap size={20} className="fill-indigo-600" />
            Prism
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href))
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/cart" className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors">
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>
            <Link
              href="/dashboard"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Dashboard →
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link href="/cart" className="relative p-2 text-gray-500">
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button type="button" className="p-2 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium text-center"
            >
              Dashboard →
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
