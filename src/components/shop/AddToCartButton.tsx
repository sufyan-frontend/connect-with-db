'use client';
import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Props {
  productId: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  stock: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function AddToCartButton({ productId, name, price, image, category, stock, className = '', size = 'md' }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (stock === 0) return;
    add({ productId, name, price, quantity: 1, image, category });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const sizeMap = { sm: 'px-3 py-1.5 text-xs gap-1.5', md: 'px-4 py-2.5 text-sm gap-2', lg: 'px-6 py-3.5 text-base gap-2' };

  if (stock === 0) {
    return (
      <button type="button" disabled className={`flex items-center justify-center rounded-xl font-semibold bg-gray-100 text-gray-400 cursor-not-allowed ${sizeMap[size]} ${className}`}>
        Out of Stock
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`flex items-center justify-center rounded-xl font-semibold transition-all ${sizeMap[size]} ${
        added ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
      } ${className}`}
    >
      {added ? <><Check size={size === 'sm' ? 13 : 16} /> Added!</> : <><ShoppingCart size={size === 'sm' ? 13 : 16} /> Add to Cart</>}
    </button>
  );
}
