import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import AddToCartButton from '@/components/shop/AddToCartButton';
import Link from 'next/link';
import { Star, SlidersHorizontal } from 'lucide-react';

const PLACEHOLDER_PRODUCTS = [
  { _id: 'p1', name: 'Premium Wireless Headphones', description: 'Studio-quality sound with 40hr battery life and active noise cancellation.', price: 12999, originalPrice: 18999, category: 'Electronics', stock: 15, images: [], tags: ['audio', 'wireless'], featured: true, rating: 4.8, reviews: 342 },
  { _id: 'p2', name: 'Minimal Leather Wallet', description: 'Slim RFID-blocking genuine leather wallet. Fits 8 cards and cash.', price: 2499, originalPrice: 3999, category: 'Accessories', stock: 50, images: [], tags: ['leather', 'slim'], featured: false, rating: 4.6, reviews: 128 },
  { _id: 'p3', name: 'Mechanical Keyboard', description: 'Compact 75% layout with hot-swap switches and per-key RGB backlighting.', price: 9999, originalPrice: 14999, category: 'Electronics', stock: 8, images: [], tags: ['keyboard', 'rgb'], featured: true, rating: 4.9, reviews: 576 },
  { _id: 'p4', name: 'Ceramic Coffee Mug Set', description: 'Handcrafted ceramic mugs in matte finish. Set of 4, dishwasher safe.', price: 1999, originalPrice: 2999, category: 'Home', stock: 30, images: [], tags: ['ceramic', 'kitchen'], featured: false, rating: 4.5, reviews: 89 },
  { _id: 'p5', name: 'Yoga Mat Pro', description: 'Non-slip 6mm thick eco-friendly TPE mat with alignment lines.', price: 3499, originalPrice: 4999, category: 'Sports', stock: 25, images: [], tags: ['yoga', 'fitness'], featured: false, rating: 4.7, reviews: 215 },
  { _id: 'p6', name: 'Smart LED Desk Lamp', description: 'Touch-control lamp with 5 brightness levels, USB-C charging port, and memory function.', price: 4299, originalPrice: 6499, category: 'Electronics', stock: 0, images: [], tags: ['lamp', 'smart'], featured: false, rating: 4.4, reviews: 67 },
  { _id: 'p7', name: 'Merino Wool Beanie', description: '100% merino wool, one size fits all. Available in 8 classic colors.', price: 1299, originalPrice: 0, category: 'Clothing', stock: 40, images: [], tags: ['wool', 'winter'], featured: false, rating: 4.6, reviews: 93 },
  { _id: 'p8', name: 'Portable Bluetooth Speaker', description: '360° surround sound, IPX7 waterproof, 24hr playtime. Built-in mic for calls.', price: 6499, originalPrice: 9999, category: 'Electronics', stock: 12, images: [], tags: ['speaker', 'portable'], featured: true, rating: 4.8, reviews: 411 },
];

const GRADIENTS: Record<string, string> = {
  Electronics: 'from-indigo-500 to-blue-600',
  Accessories: 'from-amber-500 to-orange-600',
  Home:        'from-teal-500 to-cyan-600',
  Sports:      'from-green-500 to-emerald-600',
  Clothing:    'from-pink-500 to-rose-600',
  General:     'from-slate-500 to-gray-600',
};

async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return products.map(p => ({ ...p, _id: p._id.toString() }));
  } catch { return []; }
}

export default async function Shop() {
  const dbProducts = await getProducts();
  const products = dbProducts.length > 0 ? dbProducts : PLACEHOLDER_PRODUCTS;
  const isPlaceholder = dbProducts.length === 0;
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div>
      {/* Hero */}
      <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">New Arrivals</p>
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">Shop the <span className="text-indigo-300">Best</span> Products</h1>
            <p className="text-slate-300 text-lg mb-7">Curated selection of premium items at unbeatable prices. Free shipping on orders over Rs. 2,000.</p>
            <div className="flex gap-3">
              <Link href="#products" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-500 transition-colors">Shop Now</Link>
              <Link href="/cart" className="border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">View Cart</Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 shrink-0">
            {(['🎧','⌨️','🔊','📱','💻','🎮'] as const).map((e, i) => (
              <div key={i} className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">{e}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-8 text-sm font-medium">
          {['🚚 Free shipping over Rs. 2,000', '↩️ 30-day returns', '🔒 Secure checkout', '⭐ 10,000+ happy customers'].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* Products */}
      <section id="products" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {isPlaceholder && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 mb-6 text-sm text-amber-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Showing sample products — add real products from <Link href="/dashboard/products" className="underline font-medium">Dashboard → Products</Link>.
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <span key={c} className="bg-white border border-gray-200 text-gray-700 text-sm px-4 py-1.5 rounded-full cursor-pointer hover:border-indigo-500 hover:text-indigo-600 transition-colors font-medium">
                  {c}
                </span>
              ))}
            </div>
            <button type="button" className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 bg-white px-4 py-1.5 rounded-full hover:border-gray-300">
              <SlidersHorizontal size={14} /> Sort
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map(p => {
              const gradient = GRADIENTS[p.category] ?? GRADIENTS.General;
              const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
              return (
                <div key={p._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group flex flex-col">
                  <Link href={`/shop/${p._id}`} className="block">
                    <div className={`h-44 bg-linear-to-br ${gradient} flex items-center justify-center relative`}>
                      {discount > 0 && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">-{discount}%</span>
                      )}
                      {p.featured && (
                        <span className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-lg">⭐ Featured</span>
                      )}
                      {p.stock === 0 && (
                        <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-sm">Out of Stock</span>
                      )}
                      <span className="text-5xl opacity-80">{p.category === 'Electronics' ? '📱' : p.category === 'Accessories' ? '👜' : p.category === 'Home' ? '🏠' : p.category === 'Sports' ? '⚽' : p.category === 'Clothing' ? '👕' : '📦'}</span>
                    </div>
                  </Link>
                  <div className="p-4 flex-1 flex flex-col">
                    <span className="text-xs text-indigo-500 font-medium mb-1">{p.category}</span>
                    <Link href={`/shop/${p._id}`} className="font-bold text-gray-900 text-sm leading-snug mb-1 hover:text-indigo-600 transition-colors line-clamp-2">{p.name}</Link>
                    <div className="flex items-center gap-1 mb-3">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs text-gray-600 font-medium">{p.rating}</span>
                      <span className="text-xs text-gray-400">({p.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4 mt-auto">
                      <span className="text-lg font-extrabold text-gray-900">Rs. {p.price.toLocaleString()}</span>
                      {p.originalPrice ? <span className="text-sm text-gray-400 line-through">Rs. {p.originalPrice.toLocaleString()}</span> : null}
                    </div>
                    <AddToCartButton productId={p._id} name={p.name} price={p.price} category={p.category} stock={p.stock} size="sm" className="w-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
