import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the Prism team. We reply within 24 hours. Reach us by email, phone, or send a message directly from this page.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Prism',
    description: 'Get in touch with the Prism team. We reply within 24 hours.',
    url: '/contact',
  },
};

export default function Contact() {
  return (
    <div>
      <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Contact</p>
          <h1 className="text-5xl font-extrabold mb-5">Get in Touch</h1>
          <p className="text-slate-300 text-lg">We'd love to hear from you. Our team replies within 24 hours.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <ContactForm />
          </div>

          <div className="space-y-6 pt-2">
            <h2 className="text-2xl font-bold text-gray-900">Contact Info</h2>
            {[
              { icon: Mail, label: 'Email', value: 'hello@prism.app' },
              { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000' },
              { icon: MapPin, label: 'Office', value: '123 Startup Lane, San Francisco, CA 94107' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</div>
                  <div className="text-gray-800 text-sm font-medium">{value}</div>
                </div>
              </div>
            ))}

            <div className="p-5 bg-indigo-600 rounded-2xl text-white">
              <div className="font-semibold mb-1">Support Hours</div>
              <p className="text-indigo-200 text-sm">Monday — Friday: 9am — 6pm PST<br />Weekend: Emergency only</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
