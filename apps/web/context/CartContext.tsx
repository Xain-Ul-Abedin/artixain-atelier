'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateCartPricing, CartItemCalculus, CartPricingSummary } from '@artixain/shared';

export interface CartItem {
  id: string;
  name: string;
  type: 'custom' | 'premade';
  token?: string;
  designToken?: string;
  wristSizeCm: number;
  cordType: 'silicone_stretch' | 'braided_silk' | 'gold_wire';
  beadCount: number;
  beadSummary: string;
  unitPrice: number;
  quantity: number;
  primaryGemCode: string;
}

interface CartContextType {
  items: CartItem[];
  pricing: CartPricingSummary;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('artixain_cart_v1');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // LocalStorage fallback
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('artixain_cart_v1', JSON.stringify(items));
    } catch {
      // LocalStorage fallback
    }
  }, [items, isInitialized]);

  // Calculate volume tiered pricing
  const calculusItems: CartItemCalculus[] = items.map((it) => ({
    id: it.id,
    basePrice: it.unitPrice,
    quantity: it.quantity
  }));
  const pricing = calculateCartPricing(calculusItems);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const addItem = (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (p) => p.token && item.token && p.token === item.token && p.wristSizeCm === item.wristSizeCm
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity || 1;
        return updated;
      }
      const newItem: CartItem = {
        ...item,
        id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        quantity: item.quantity || 1
      };
      return [...prev, newItem];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter((it): it is CartItem => it !== null)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        pricing,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        addItem,
        removeItem,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
