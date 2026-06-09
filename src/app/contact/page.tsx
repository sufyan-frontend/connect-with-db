'use client';
import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      setStatus(json.success ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

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

            {status === 'done' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={56} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h3>
                <p className="text-gray-500">We'll get back to you within 24 hours.</p>
                <button type="button" onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setStatus('idle'); }} className="mt-6 text-indigo-600 text-sm font-medium hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Your name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                  <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required placeholder="Tell us more..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" />
                </div>
                {status === 'error' && <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={status === 'sending'} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-60">
                  <Send size={16} />{status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6 pt-2">
            <h2 className="text-2xl font-bold text-gray-900">Contact Info</h2>
            {[
              { icon: Mail, label: 'Email', value: 'hello@nexus.app' },
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
              <p className="text-indigo-200 text-sm">Monday â€“ Friday: 9am â€“ 6pm PST<br />Weekend: Emergency only</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

