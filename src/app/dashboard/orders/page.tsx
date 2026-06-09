'use client';
import { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Search, Eye, X, Trash2 } from 'lucide-react';

interface OrderItem { productId: string; name: string; price: number; quantity: number; }
interface Order {
  _id: string; orderNumber: string; status: string; total: number; paymentMethod: string; createdAt: string;
  customer: { name: string; email: string; phone?: string; address: string; city: string; country: string };
  items: OrderItem[];
}

const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-yellow-50 text-yellow-600',
  processing: 'bg-blue-50 text-blue-600',
  shipped:    'bg-indigo-50 text-indigo-600',
  delivered:  'bg-green-50 text-green-600',
  cancelled:  'bg-red-50 text-red-600',
};
const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/orders');
    const json = await res.json();
    setOrders(json.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/orders/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    fetchOrders();
    if (viewOrder?._id === id) setViewOrder(v => v ? { ...v, status } : null);
  }

  async function deleteOrder(id: string) {
    if (!confirm('Delete this order?')) return;
    await fetch(`/api/orders/${id}`, { method: 'DELETE' });
    fetchOrders();
    if (viewOrder?._id === id) setViewOrder(null);
  }

  const filtered = orders
    .filter(o => filterStatus === 'all' || o.status === filterStatus)
    .filter(o => o.orderNumber.toLowerCase().includes(search.toLowerCase()) || o.customer.name.toLowerCase().includes(search.toLowerCase()) || o.customer.email.toLowerCase().includes(search.toLowerCase()));

  const revenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
          <p className="text-gray-500 text-sm mt-1">{orders.length} orders · Rs. {revenue.toLocaleString()} total revenue</p>
        </div>
        <a href="/shop" target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-indigo-200 text-indigo-600 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-50 transition-colors">
          View Shop →
        </a>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {STATUSES.map(s => {
          const count = orders.filter(o => o.status === s).length;
          return (
            <button key={s} type="button" onClick={() => setFilterStatus(filterStatus === s ? 'all' : s)}
              className={`p-4 rounded-2xl border text-left transition-all ${filterStatus === s ? 'border-indigo-400 bg-indigo-50' : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'}`}>
              <div className="text-2xl font-extrabold text-gray-900">{count}</div>
              <div className={`text-xs font-semibold capitalize px-2 py-0.5 rounded-full w-fit mt-1 ${STATUS_COLORS[s]}`}>{s}</div>
            </button>
          );
        })}
      </div>

      {/* Order detail modal */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <div>
                <h3 className="font-bold text-gray-900">{viewOrder.orderNumber}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{new Date(viewOrder.createdAt).toLocaleString()}</p>
              </div>
              <button type="button" onClick={() => setViewOrder(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Customer</p>
                <div className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm">
                  <div className="font-semibold text-gray-900">{viewOrder.customer.name}</div>
                  <div className="text-gray-500">{viewOrder.customer.email}</div>
                  {viewOrder.customer.phone && <div className="text-gray-500">{viewOrder.customer.phone}</div>}
                  <div className="text-gray-500">{viewOrder.customer.address}, {viewOrder.customer.city}, {viewOrder.customer.country}</div>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Items</p>
                <div className="space-y-2">
                  {viewOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm bg-gray-50 rounded-xl px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-gray-400 text-xs">Qty: {item.quantity} × Rs. {item.price.toLocaleString()}</div>
                      </div>
                      <div className="font-semibold text-gray-900">Rs. {(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                <span>Total</span><span>Rs. {viewOrder.total.toLocaleString()}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map(s => (
                    <button key={s} type="button" onClick={() => updateStatus(viewOrder._id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${viewOrder.status === s ? STATUS_COLORS[s] + ' ring-2 ring-current ring-offset-1' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order # or customer..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag size={40} className="text-gray-200 mb-3" />
            <p className="text-gray-500 text-sm font-medium">{search || filterStatus !== 'all' ? 'No orders match your filter' : 'No orders yet'}</p>
            {!search && filterStatus === 'all' && <a href="/shop" className="mt-3 text-indigo-600 text-sm font-medium hover:underline">Go to shop to create orders</a>}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(o => (
                <tr key={o._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 text-sm">{o.orderNumber}</div>
                    <div className="text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 text-sm">{o.customer.name}</div>
                    <div className="text-gray-400 text-xs truncate max-w-[140px]">{o.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{o.items.length} item{o.items.length !== 1 ? 's' : ''}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-sm">Rs. {o.total.toLocaleString()}</td>
                  <td className="px-6 py-4 text-xs text-gray-500">{o.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 outline-none cursor-pointer ${STATUS_COLORS[o.status] ?? ''}`}>
                      {STATUSES.map(s => <option key={s} value={s} className="bg-white text-gray-800">{s}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button type="button" onClick={() => setViewOrder(o)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Eye size={15} /></button>
                      <button type="button" onClick={() => deleteOrder(o._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
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
