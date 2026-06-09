'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  category: string;
  q: string;
  a: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = Array.from(new Set(faqs.map(f => f.category)));
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(faq => (
          <div key={faq.q} className="border border-gray-200 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(open === faq.q ? null : faq.q)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
              <ChevronDown size={18} className={`text-gray-400 shrink-0 transition-transform ${open === faq.q ? 'rotate-180' : ''}`} />
            </button>
            {open === faq.q && (
              <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
