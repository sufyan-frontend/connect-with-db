'use client';
import { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

interface CartState { items: CartItem[] }

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'LOAD'; items: CartItem[] };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD': return { items: action.items };
    case 'ADD': {
      const exists = state.items.find(i => i.productId === action.item.productId);
      if (exists) {
        return { items: state.items.map(i => i.productId === action.item.productId ? { ...i, quantity: i.quantity + action.item.quantity } : i) };
      }
      return { items: [...state.items, action.item] };
    }
    case 'REMOVE': return { items: state.items.filter(i => i.productId !== action.productId) };
    case 'UPDATE_QTY': return { items: state.items.map(i => i.productId === action.productId ? { ...i, quantity: action.quantity } : i).filter(i => i.quantity > 0) };
    case 'CLEAR': return { items: [] };
    default: return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: CartItem) => void;
  remove: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nexus_cart');
      if (saved) dispatch({ type: 'LOAD', items: JSON.parse(saved) });
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem('nexus_cart', JSON.stringify(state.items));
  }, [state.items]);

  const count = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      count,
      subtotal,
      add:       (item) => dispatch({ type: 'ADD', item }),
      remove:    (productId) => dispatch({ type: 'REMOVE', productId }),
      updateQty: (productId, quantity) => dispatch({ type: 'UPDATE_QTY', productId, quantity }),
      clear:     () => dispatch({ type: 'CLEAR' }),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
