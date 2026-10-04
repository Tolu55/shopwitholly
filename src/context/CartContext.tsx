'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';
import { PROMO_CODES } from '@/data/products';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  totalItems: number;
  promoCode: string;
  appliedPromo: string | null;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_CART_KEY = 'shopwitholly_cart_v1';
const LOCAL_PROMO_KEY = 'shopwitholly_promo_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_CART_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedPromo = localStorage.getItem(LOCAL_PROMO_KEY);
      if (storedPromo && PROMO_CODES[storedPromo.toUpperCase()]) {
        setAppliedPromo(storedPromo.toUpperCase());
      }
    } catch (e) {
      console.error('Failed to load cart from storage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage:', e);
    }
  }, [items, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (appliedPromo) {
        localStorage.setItem(LOCAL_PROMO_KEY, appliedPromo);
      } else {
        localStorage.removeItem(LOCAL_PROMO_KEY);
      }
    } catch (e) {
      console.error('Failed to save promo to storage:', e);
    }
  }, [appliedPromo, isLoaded]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stockCount || 99) }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const formatted = code.trim().toUpperCase();
    if (PROMO_CODES[formatted] !== undefined) {
      setAppliedPromo(formatted);
      return { success: true, message: `Promo code ${formatted} applied successfully!` };
    }
    return { success: false, message: 'Invalid or expired promotional code.' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  let discount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const rate = PROMO_CODES[appliedPromo];
    if (rate < 1) {
      discount = Math.round(subtotal * rate);
    } else {
      discount = Math.min(subtotal, rate);
    }
  }

  // Complimentary shipping over $250
  const shipping = subtotal === 0 ? 0 : subtotal >= 250 ? 0 : 25;
  const taxable = Math.max(0, subtotal - discount);
  const tax = subtotal === 0 ? 0 : Math.round(taxable * 0.07);
  const total = subtotal === 0 ? 0 : taxable + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        totalItems,
        promoCode: appliedPromo || '',
        appliedPromo,
        discount,
        shipping,
        tax,
        total,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
