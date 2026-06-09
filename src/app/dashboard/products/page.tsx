'use client';
import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Pencil, X, Check, Search, Package, Star } from 'lucide-react';

interface Product { _id: string; name: string; price: number; originalPrice?: number; category: string; stock: number; featured: boolean; rating: number; reviews: number; }

const EMPTY = { name: '', description: '', price: '', originalPrice: '', category: 'General', stock: '10', tags: '', featured: false, rating: '0', reviews: '0' };
const CATEGORIES = ['General', 'Electronics', 'Accessories', 'Home', 'Sports', 'Clothing', 'Books', 'Beauty', 'Food'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetch_ = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const json = await res.json();
    setProducts(json.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      const payload = {
        name: form.name, description: form.description ?? '',
        price: Number(form.price), originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        category: form.category, stock: Number(form.stock),
        tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
        featured: form.featured, rating: Number(form.rating), reviews: Number(form.reviews),
      };
      const url = editId ? `/api/products/${editId}` : '/api/products';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!json.success) { setError(json.message ?? 'Failed'); return; }
      setShowForm(false); setEditId(null); setForm(EMPTY);
      fetch_();
    } catch { setError('Network error'); }
    finally { setSaving(false); }
  }

  async function deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetch_();
  }

  async function toggleFeatured(p: Product) {
    await fetch(`/api/products/${p._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ featured: !p.featured }) });
    fetch_();
  }

  function startEdit(p: Product) {
    setEditId(p._id);
    setForm({ name: p.name, description: '', price: String(p.price), originalPrice: p.originalPrice ? String(p.originalPrice) : '', category: p.category, stock: String(p.stock), tags: '', featured: p.featured, rating: String(p.rating), reviews: String(p.reviews) });
    setShowForm(true);
  }

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-500 text-sm mt-1">{products.length} total products</p>
        </div>
        <button type="button" onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY); }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-gray-900">{editId ? 'Edit Product' : 'Add Product'}</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="e.g. Wireless Headphones" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea rows={2} value={form.description ?? ''} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Product description..." className={`${inputCls} resize-none`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (Rs.) *</label>
                  <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required placeholder="1999" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Original Price (Rs.)</label>
                  <input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} placeholder="2999 (for discount)" className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={`${inputCls} bg-white`}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock Quantity</label>
                  <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags <span className="text-gray-400">(comma separated)</span></label>
                <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="wireless, premium, sale" className={inputCls} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-indigo-600 rounded" />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer">Mark as Featured Product</label>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-60">
                  <Check size={15} />{saving ? 'Saving...' : (editId ? 'Update' : 'Add Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="relative max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package size={40} className="text-gray-200 mb-3" />
            <p className="text-gray-500 text-sm font-medium">{search ? 'No products match your search' : 'No products yet'}</p>
            {!search && <button type="button" onClick={() => setShowForm(true)} className="mt-3 text-indigo-600 text-sm font-medium hover:underline">Add your first product</button>}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3">Featured</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 text-sm max-w-[180px] truncate">{p.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{p.category}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 text-sm">Rs. {p.price.toLocaleString()}</div>
                    {p.originalPrice ? <div className="text-gray-400 text-xs line-through">Rs. {p.originalPrice.toLocaleString()}</div> : null}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${p.stock === 0 ? 'text-red-500' : p.stock <= 5 ? 'text-orange-500' : 'text-green-600'}`}>
                      {p.stock === 0 ? 'Out of stock' : `${p.stock} left`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {p.rating} <span className="text-gray-400">({p.reviews})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button type="button" onClick={() => toggleFeatured(p)}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${p.featured ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                      {p.featured ? '⭐ Yes' : 'No'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button type="button" onClick={() => startEdit(p)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Pencil size={15} /></button>
                      <button type="button" onClick={() => deleteProduct(p._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
