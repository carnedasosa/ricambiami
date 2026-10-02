'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product } from '@/lib/products';

// ─── Tipi ──────────────────────────────────────────────────────────────────────

export interface CartItem extends Product {
  cartQuantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Carica dal localStorage all'avvio
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('ricambiami_cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Salva nel localStorage ad ogni modifica
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('ricambiami_cart', JSON.stringify(items));
    }
  }, [items, isMounted]);

  // Azioni
  const addItem = (product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: Math.min(product.stock, item.cartQuantity + quantity) }
            : item
        );
      }
      return [...current, { ...product, cartQuantity: Math.min(product.stock, quantity) }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((current) =>
      current.map((item) => {
        if (item.id === productId) {
          return { ...item, cartQuantity: Math.max(1, Math.min(item.stock, quantity)) };
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);

  // Calcoli
  const totalItems = items.reduce((sum, item) => sum + item.cartQuantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve essere usato all\'interno di un CartProvider');
  }
  return context;
}
