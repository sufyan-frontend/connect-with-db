import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import AddToCartButton from '@/components/shop/AddToCartButton';
import Link from 'next/link';
import { Star, ChevronRight, Shield, Truck, RotateCcw } from 'lucide-react';
import { notFound } from 'next/navigation';

const GRADIENTS: Record<string, string> = {
  Electronics: 'from-indigo-500 to-blue-600',
  Accessories: 'from-amber-500 to-orange-600',
  Home: 'from-teal-500 to-cyan-600',
  Sports: 'from-green-500 to-emerald-600',
  Clothing: 'from-pink-500 to-rose-600',
  General: 'from-slate-500 to-gray-600',
};

async function getProduct(id: string) {
  try {
    await connectDB();
    const p = await Product.findById(id).lean();
    if (!p) return null;
    return { ...p, _id: p._id.toString() };
  } catch { return null; }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // placeholder fallback for demo products
  const isPlaceholder = id.startsWith('p') && id.length <= 3;
  let product;

  if (!isPlaceholder) {
    product = await getProduct(id);
    if (!product) notFound();
  } else {
    product = {
      _id: id, name: 'Premium Wireless Headphones',
      description: 'Studio-quality sound with 40-hour battery life and active noise cancellation. Compatible with all Bluetooth devices. Includes carrying case and 3.5mm cable.\n\nFeatures:\n• 40-hour battery life\n• Active Noise Cancellation\n• Bluetooth 5.0\n• Foldable design\n• Built-in microphone',
      price: 12999, originalPrice: 18999, category: 'Electronics', stock: 15, images: [], tags: ['audio', 'wireless'], featured: true, rating: 4.8, reviews: 342,
    };
  }

  const gradient = GRADIENTS[product.category] ?? GRADIENTS.General;
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">
        <Link href="/shop" className="hover:text-indigo-600 transition-colors">Shop</Link>
        <ChevronRight size={14} />
        <span className="text-gray-400">{product.category}</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="space-y-4">
          <div className={`h-80 rounded-3xl bg-linear-to-br ${gradient} flex items-center justify-center relative`}>
            {discount > 0 && <span className="absolute top-5 left-5 bg-red-500 text-white font-bold px-3 py-1.5 rounded-xl text-sm">-{discount}% OFF</span>}
            <span className="text-8xl opacity-75">
              {product.category === 'Electronics' ? '📱' : product.category === 'Accessories' ? '👜' : product.category === 'Home' ? '🏠' : product.category === 'Sports' ? '⚽' : product.category === 'Clothing' ? '👕' : '📦'}
            </span>
          </div>
          <div className="flex gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-20 flex-1 rounded-xl bg-linear-to-br ${gradient} opacity-60 flex items-center justify-center cursor-pointer hover:opacity-100 transition-opacity`}>
                <span className="text-2xl opacity-75">
                  {product.category === 'Electronics' ? '📱' : '📦'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-indigo-600 text-sm font-semibold uppercase tracking-wider">{product.category}</span>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-2 mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => <Star key={s} size={16} className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />)}
            </div>
            <span className="text-gray-700 font-medium text-sm">{product.rating}</span>
            <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-4xl font-extrabold text-gray-900">Rs. {product.price.toLocaleString()}</span>
            {product.originalPrice ? <span className="text-xl text-gray-400 line-through mb-0.5">Rs. {product.originalPrice.toLocaleString()}</span> : null}
          </div>

          <p className="text-gray-600 leading-relaxed mb-7 whitespace-pre-line text-sm">{product.description || 'No description provided.'}</p>

          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-7">
              {product.tags.map((t: string) => (
                <span key={t} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          )}

          <div className="flex gap-3 mb-7">
            <AddToCartButton productId={product._id} name={product.name} price={product.price} category={product.category} stock={product.stock} size="lg" className="flex-1" />
            <Link href="/cart" className="border-2 border-indigo-600 text-indigo-600 px-6 py-3.5 rounded-xl font-semibold hover:bg-indigo-50 transition-colors text-base">
              View Cart
            </Link>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck,      label: 'Free Shipping', sub: 'Orders over Rs. 2,000' },
              { icon: RotateCcw,  label: '30-Day Returns', sub: 'No questions asked' },
              { icon: Shield,     label: 'Secure Payment', sub: 'SSL encrypted' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <Icon size={18} className="text-indigo-600 mx-auto mb-1.5" />
                <div className="text-xs font-semibold text-gray-800">{label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-400'}`} />
            <span className={product.stock > 0 ? 'text-green-700 font-medium' : 'text-red-600 font-medium'}>
              {product.stock > 0 ? `In stock — ${product.stock} left` : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
