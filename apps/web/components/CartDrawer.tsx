'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck, Sparkles, Tag } from 'lucide-react';
import { getGemstoneByCode } from '@artixain/shared';

export default function CartDrawer() {
  const {
    items,
    pricing,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearCart
  } = useCart();

  if (!isDrawerOpen) return null;

  const totalQuantity = items.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Dimmed Backdrop */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-obsidian-900 shadow-2xl border-l border-zinc-200/80 dark:border-white/10 flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header Row */}
          <div className="p-5 border-b border-zinc-200/80 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-champagne-600 dark:text-champagne-400" />
              <h3 className="text-lg font-serif font-bold text-obsidian-900 dark:text-white">
                Atelier Shopping Bag ({totalQuantity})
              </h3>
            </div>
            <button
              onClick={closeDrawer}
              className="icon-orb-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Pricing & Free Shipping Banners */}
          <div className="px-5 py-3 bg-champagne-500/10 dark:bg-champagne-500/15 border-b border-champagne-500/20 space-y-2">
            {/* Free Shipping Progress */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-medium text-champagne-800 dark:text-champagne-300">
                <Truck className="w-3.5 h-3.5" />
                <span>
                  {pricing.isFreeShipping
                    ? 'Complimentary Tracked Shipping Unlocked!'
                    : `Add $${pricing.amountNeededForFreeShipping.toFixed(2)} more for Free Shipping`}
                </span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-champagne-500 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (pricing.subtotal / 50) * 100)}%`
                }}
              />
            </div>

            {/* Volume Tier Message */}
            <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 pt-1">
              <Tag className="w-3 h-3 text-champagne-600 dark:text-champagne-400" />
              <span>{pricing.volumeTierMessage}</span>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="icon-orb w-16 h-16 bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-serif font-bold text-obsidian-900 dark:text-white">
                  Your Atelier Bag is Empty
                </h4>
                <p className="text-xs text-zinc-500 max-w-xs">
                  Create a bespoke bracelet in the Custom Studio or explore our curated premade collections.
                </p>
                <Link
                  href="/studio"
                  onClick={closeDrawer}
                  className="btn-pill-primary py-2.5 px-6 text-xs mt-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enter Custom Studio</span>
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const gem = getGemstoneByCode(item.primaryGemCode);

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-white/10 flex items-start gap-3 relative"
                  >
                    {/* Gem Swatch */}
                    <div
                      className="w-12 h-12 rounded-full border border-black/10 dark:border-white/20 shrink-0 shadow-inner flex items-center justify-center mt-1"
                      style={{
                        background: gem
                          ? `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7) 0%, ${gem.colorHex} 50%, ${gem.secondaryColorHex || '#18181B'} 100%)`
                          : '#C5A059'
                      }}
                    />

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-obsidian-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-400 hover:text-rose-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        Size: {item.wristSizeCm}cm • {item.beadCount} beads
                      </p>
                      <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                        {item.beadSummary}
                      </p>

                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 p-0.5 bg-white dark:bg-zinc-700 rounded-full border border-zinc-200 dark:border-zinc-600">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="icon-orb w-5 h-5 hover:bg-zinc-100 dark:hover:bg-zinc-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-1.5">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="icon-orb w-5 h-5 hover:bg-zinc-100 dark:hover:bg-zinc-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price Display */}
                        <span className="text-xs font-bold text-champagne-600 dark:text-champagne-400">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-200/80 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-800/30 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span>${pricing.subtotal.toFixed(2)}</span>
                </div>
                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Volume Tier Discount</span>
                    <span>-${pricing.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-500">
                  <span>Shipping</span>
                  <span>{pricing.isFreeShipping ? 'FREE' : `$${pricing.shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-obsidian-900 dark:text-white pt-2 border-t border-zinc-200/80 dark:border-white/10">
                  <span>Estimated Total</span>
                  <span className="text-champagne-600 dark:text-champagne-400 font-serif text-lg">
                    ${pricing.finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA Pill */}
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="btn-pill-primary w-full py-3 text-xs flex items-center justify-center gap-2 shadow-luxury"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
