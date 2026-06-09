'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, count, subtotal, remove, updateQty } = useCart();

  const shipping = subtotal >= 2000 ? 0 : 200;
  const total = subtotal + shipping;

  if (count === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/shop" className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
          Browse Shop <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
        <span className="bg-indigo-100 text-indigo-700 font-semibold px-3 py-1.5 rounded-full text-sm">{count} {count === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.productId} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4">
              <div className={`w-20 h-20 rounded-xl bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-3xl shrink-0`}>
                {item.category === 'Electronics' ? '📱' : item.category === 'Accessories' ? '👜' : item.category === 'Home' ? '🏠' : item.category === 'Sports' ? '⚽' : '📦'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                <p className="text-indigo-600 font-bold text-lg mt-1">Rs. {item.price.toLocaleString()}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button type="button" onClick={() => updateQty(item.productId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600">
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                    <button type="button" onClick={() => updateQty(item.productId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-gray-400 text-sm">× Rs. {item.price.toLocaleString()} = <span className="text-gray-700 font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</span></span>
                </div>
              </div>
              <button type="button" onClick={() => remove(item.productId)} className="p-2 text-gray-300 hover:text-red-500 transition-colors self-start">
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <Link href="/shop" className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">← Continue Shopping</Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 text-lg mb-5">Order Summary</h2>
            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({count} items)</span>
                <span className="font-medium text-gray-900">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg">
                  Add Rs. {(2000 - subtotal).toLocaleString()} more for free shipping!
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
              <span>🔒 SSL Secure</span>
              <span>↩️ 30-day returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
