import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default async function OrderSuccess({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <CheckCircle size={48} className="text-green-500" />
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Placed!</h1>
      {order && (
        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Package size={15} /> Order #{order}
        </div>
      )}
      <p className="text-gray-500 max-w-md mx-auto mb-3 text-lg">
        Thank you for your order! We've received it and will start processing it shortly.
      </p>
      <p className="text-gray-400 text-sm mb-10">
        A confirmation email will be sent to your inbox. You can also track your order from the dashboard.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
        {[
          { step: '1', label: 'Order Confirmed', desc: 'Your order has been received', active: true },
          { step: '2', label: 'Processing',      desc: 'We are packing your items', active: false },
          { step: '3', label: 'On the Way',      desc: 'Your order will arrive soon', active: false },
        ].map(s => (
          <div key={s.step} className={`p-4 rounded-2xl text-center border ${s.active ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
            <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${s.active ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>{s.step}</div>
            <div className={`text-sm font-semibold ${s.active ? 'text-green-700' : 'text-gray-500'}`}>{s.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/shop" className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
          Continue Shopping <ArrowRight size={18} />
        </Link>
        <Link href="/dashboard/orders" className="border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
          View All Orders
        </Link>
      </div>
    </div>
  );
}
