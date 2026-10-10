'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Tag, Sparkles } from 'lucide-react';
import { getGemstoneByCode } from '@artixain/shared';

export default function CartPage() {
  const { items, pricing, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 text-champagne-700 dark:text-champagne-300 text-[10px] uppercase font-bold tracking-widest mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Atelier Shopping Bag</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-obsidian-900 dark:text-white">
            Your Selected Strands ({items.reduce((a, b) => a + b.quantity, 0)})
          </h1>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="btn-pill py-1.5 px-3 text-xs bg-zinc-100 hover:bg-rose-50 text-zinc-600 hover:text-rose-600 dark:bg-zinc-800 dark:hover:bg-rose-950/60 dark:text-zinc-300"
          >
            Clear Entire Bag
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
          <div className="icon-orb w-20 h-20 bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-serif font-bold text-obsidian-900 dark:text-white">
            Your shopping bag is empty
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm">
            Begin by designing a custom bracelet with procedural mineral shaders or choose from our premade master recipes.
          </p>
          <div className="flex gap-3 pt-2">
            <Link href="/studio" className="btn-pill-primary py-3 px-6 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              <span>Enter Custom Studio</span>
            </Link>
            <Link href="/shop" className="btn-pill-secondary py-3 px-6 text-xs">
              <span>View Collections</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item) => {
              const gem = getGemstoneByCode(item.primaryGemCode);

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl bg-white dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-white/10 shadow-sm flex items-start gap-4"
                >
                  <div
                    className="w-14 h-14 rounded-full border border-black/10 dark:border-white/20 shadow-md shrink-0 flex items-center justify-center"
                    style={{
                      background: gem
                        ? `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75) 0%, ${gem.colorHex} 50%, ${gem.secondaryColorHex || '#18181B'} 100%)`
                        : '#C5A059'
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-obsidian-900 dark:text-white">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-zinc-500 mt-1">
                      Calibrated Size: {item.wristSizeCm} cm • {item.beadCount} beads
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                      {item.beadSummary}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-700/60">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 p-1 bg-zinc-100 dark:bg-zinc-700 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="icon-orb w-6 h-6 hover:bg-white dark:hover:bg-zinc-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="icon-orb w-6 h-6 hover:bg-white dark:hover:bg-zinc-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold text-champagne-600 dark:text-champagne-400">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Summary (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/10 shadow-elevated space-y-4">
              <h3 className="text-base font-serif font-bold text-obsidian-900 dark:text-white pb-3 border-b border-zinc-200/80 dark:border-white/10">
                Order Calculus & Savings
              </h3>

              {/* Free Shipping Meter */}
              <div className="p-3 rounded-2xl bg-champagne-500/10 border border-champagne-500/20 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium text-champagne-800 dark:text-champagne-300">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    <span>
                      {pricing.isFreeShipping
                        ? 'Free Shipping Unlocked!'
                        : `Add $${pricing.amountNeededForFreeShipping.toFixed(2)} for Free Shipping`}
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-champagne-500 rounded-full"
                    style={{ width: `${Math.min(100, (pricing.subtotal / 50) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Summary Lines */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span>${pricing.subtotal.toFixed(2)}</span>
                </div>

                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Volume Discount Savings</span>
                    <span>-${pricing.discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Shipping</span>
                  <span>{pricing.isFreeShipping ? 'FREE' : `$${pricing.shippingFee.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-obsidian-900 dark:text-white pt-3 border-t border-zinc-200/80 dark:border-white/10">
                  <span>Total Due</span>
                  <span className="text-xl font-serif text-champagne-600 dark:text-champagne-400">
                    ${pricing.finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="btn-pill-primary w-full py-3.5 text-xs flex items-center justify-center gap-2 shadow-luxury mt-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
