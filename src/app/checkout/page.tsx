'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle, CreditCard, Truck } from 'lucide-react';

const EMPTY = { name: '', email: '', phone: '', address: '', city: '', zip: '', country: 'Pakistan', notes: '', paymentMethod: 'Cash on Delivery' };

export default function Checkout() {
  const { items, subtotal, clear, count } = useCart();
  const [form, setForm] = useState(EMPTY);
  const [step, setStep] = useState<1 | 2>(1);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const shipping = subtotal >= 2000 ? 0 : 200;
  const total = subtotal + shipping;

  if (count === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Nothing to checkout</h2>
        <Link href="/shop" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold mt-4 hover:bg-indigo-700 transition-colors">Go to Shop</Link>
      </div>
    );
  }

  async function placeOrder() {
    setPlacing(true); setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name: form.name, email: form.email, phone: form.phone, address: form.address, city: form.city, zip: form.zip, country: form.country },
          items: items.map(i => ({ productId: i.productId, name: i.name, price: i.price, quantity: i.quantity })),
          subtotal, shipping, total,
          paymentMethod: form.paymentMethod,
          notes: form.notes,
        }),
      });
      const json = await res.json();
      if (!json.success) { setError('Order failed. Please try again.'); return; }
      clear();
      router.push(`/order-success?order=${json.data.orderNumber}`);
    } catch { setError('Network error. Please try again.'); }
    finally { setPlacing(false); }
  }

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-8">
        {([{ n: 1, label: 'Shipping' }, { n: 2, label: 'Payment' }] as const).map(s => (
          <div key={s.n} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s.n ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>{s.n}</div>
            <span className={`text-sm font-medium ${step >= s.n ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</span>
            {s.n < 2 && <div className={`w-12 h-0.5 ${step > s.n ? 'bg-indigo-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-5 flex items-center gap-2"><Truck size={18} className="text-indigo-600" /> Shipping Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className={inputCls} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className={inputCls} required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+92 300 0000000" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                  <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Karachi" className={inputCls} required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address *</label>
                  <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="House #, Street, Area" className={inputCls} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">ZIP / Postal Code</label>
                  <input value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} placeholder="75500" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                  <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className={`${inputCls} bg-white`}>
                    {['Pakistan', 'India', 'UAE', 'UK', 'USA'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Order Notes <span className="text-gray-400">(optional)</span></label>
                  <textarea rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any special instructions..." className={`${inputCls} resize-none`} />
                </div>
              </div>
              <button type="button" onClick={() => { if (!form.name || !form.email || !form.address || !form.city) { setError('Please fill all required fields.'); return; } setError(''); setStep(2); }}
                className="mt-5 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                Continue to Payment →
              </button>
              {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-5 flex items-center gap-2"><CreditCard size={18} className="text-indigo-600" /> Payment Method</h2>
              <div className="space-y-3 mb-6">
                {['Cash on Delivery', 'Bank Transfer', 'EasyPaisa', 'JazzCash'].map(method => (
                  <label key={method} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.paymentMethod === method ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value={method} checked={form.paymentMethod === method} onChange={() => setForm({ ...form, paymentMethod: method })} className="accent-indigo-600" />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{method}</div>
                      <div className="text-gray-400 text-xs">
                        {method === 'Cash on Delivery' ? 'Pay when your order arrives' :
                         method === 'Bank Transfer' ? 'Transfer to our bank account' :
                         `Pay via ${method} mobile wallet`}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">← Back</button>
                <button type="button" onClick={placeOrder} disabled={placing} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
                  <CheckCircle size={18} />{placing ? 'Placing Order...' : `Place Order — Rs. ${total.toLocaleString()}`}
                </button>
              </div>
              {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {items.map(i => (
                <div key={i.productId} className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">{i.quantity}</span>
                  <span className="flex-1 text-gray-700 truncate">{i.name}</span>
                  <span className="font-semibold text-gray-900">Rs. {(i.price * i.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>Shipping</span><span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `Rs. ${shipping}`}</span></div>
              <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100"><span>Total</span><span>Rs. {total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
