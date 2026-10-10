'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { ShieldCheck, Truck, CreditCard, Lock, Check, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { EmailService } from '@/lib/services/emailService';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, pricing, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    giftNote: '',
    paymentMethod: 'card'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    const orderId = `ARTX-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const cordLengthCm = Number((items[0]?.wristSizeCm ? items[0].wristSizeCm + 4.5 : 21.0).toFixed(1));

    // 1. Post to decoupled API microservice (/api/v1/orders)
    try {
      await fetch('/api/v1/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items.map((it) => ({
            ...it,
            cordType: it.cordType || 'Silicone Stretch',
          })),
        }),
      });
    } catch {
      // Offline API fallback
    }

    // 2. Insert directly into Supabase public.orders ledger for real-time workbench broadcast
    try {
      const supabase = createClient();
      await supabase.from('orders').insert({
        order_number: orderId,
        customer_info: formData,
        items,
        pricing,
        status: 'Placed',
        cord_cut_length_cm: cordLengthCm,
        created_at: new Date().toISOString(),
      });
    } catch {
      // Supabase offline/RLS fallback
    }

    // 3. Dispatch luxury HTML email notifications (Customer receipt + Artisan work order)
    try {
      await EmailService.sendOrderNotifications({
        orderId,
        customerName: formData.fullName,
        customerEmail: formData.email,
        items: items.map((it) => ({
          name: it.name,
          wristSizeCm: it.wristSizeCm,
          cordType: it.cordType || 'Silicone Stretch',
          beadCount: it.beadCount,
          unitPrice: it.unitPrice,
          quantity: it.quantity,
          token: it.token || it.designToken,
        })),
        finalTotal: pricing.finalTotal,
        cordCutLengthCm: cordLengthCm,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}`,
      });
    } catch {
      // Email dispatch fallback
    }

    // 4. Store completed order in localStorage for offline resilience & client-side review
    try {
      const existingOrders = JSON.parse(localStorage.getItem('artixain_orders_v1') || '[]');
      const newOrder = {
        id: orderId,
        orderNumber: orderId,
        customer: formData,
        items,
        pricing,
        status: 'Placed',
        createdAt: new Date().toISOString(),
        cordLengthCm,
      };
      localStorage.setItem('artixain_orders_v1', JSON.stringify([newOrder, ...existingOrders]));
    } catch {
      // Fallback
    }

    setTimeout(() => {
      clearCart();
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-lg">
        <h2 className="text-2xl font-serif font-bold text-obsidian-900 dark:text-white mb-2">
          Your bag is empty
        </h2>
        <p className="text-xs text-zinc-500 mb-6">
          Add custom or premade bracelets to proceed with atelier checkout.
        </p>
        <button
          onClick={() => router.push('/studio')}
          className="btn-pill-primary py-3 px-6 text-xs"
        >
          Enter Custom Studio
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="pb-6 border-b border-zinc-200/80 dark:border-white/10 mb-8">
        <h1 className="text-3xl font-serif font-bold text-obsidian-900 dark:text-white">
          Atelier Bespoke Checkout
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Review your customized strands and enter your delivery destination.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form: Shipping & Customer Demographics (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-white/10 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-obsidian-900 dark:text-white flex items-center gap-2">
              <span className="icon-orb w-6 h-6 bg-champagne-500 text-white text-[11px] font-bold">1</span>
              <span>Customer Credentials & Contact</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700/60 border border-transparent focus:border-champagne-400 text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                  Email Address (For Order Tracking) *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="eleanor@example.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700/60 border border-transparent focus:border-champagne-400 text-xs outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                  Phone Number (Courier Dispatch) *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700/60 border border-transparent focus:border-champagne-400 text-xs outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Destination */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-white/10 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-obsidian-900 dark:text-white flex items-center gap-2">
              <span className="icon-orb w-6 h-6 bg-champagne-500 text-white text-[11px] font-bold">2</span>
              <span>Shipping Destination</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                  Street Address *
                </label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="742 Evergreen Terrace"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700/60 border border-transparent focus:border-champagne-400 text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                    City *
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Springfield"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700/60 border border-transparent focus:border-champagne-400 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                    State / Province *
                  </label>
                  <input
                    required
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="OR"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700/60 border border-transparent focus:border-champagne-400 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                    Postal Code *
                  </label>
                  <input
                    required
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="97477"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700/60 border border-transparent focus:border-champagne-400 text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                  Atelier Gift Inscription (Optional)
                </label>
                <textarea
                  name="giftNote"
                  rows={2}
                  value={formData.giftNote}
                  onChange={handleChange}
                  placeholder="Add a personalized blessing or dedication note for the packaging card..."
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700/60 border border-transparent focus:border-champagne-400 text-xs outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-white/10 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-obsidian-900 dark:text-white flex items-center gap-2">
              <span className="icon-orb w-6 h-6 bg-champagne-500 text-white text-[11px] font-bold">3</span>
              <span>Payment & Atelier Guarantee</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-champagne-400 bg-champagne-500/5 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="accent-champagne-500"
                />
                <CreditCard className="w-4 h-4 text-champagne-600" />
                <span className="text-xs font-semibold text-obsidian-900 dark:text-white">
                  Credit / Debit Card
                </span>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 cursor-pointer hover:border-zinc-300">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="dispatch"
                  checked={formData.paymentMethod === 'dispatch'}
                  onChange={handleChange}
                  className="accent-champagne-500"
                />
                <Truck className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-semibold text-obsidian-900 dark:text-white">
                  Pay Upon Atelier Dispatch
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order Button (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/10 shadow-elevated space-y-4">
            <h3 className="text-base font-serif font-bold text-obsidian-900 dark:text-white pb-3 border-b border-zinc-200/80 dark:border-white/10">
              Order Summary ({items.reduce((a, b) => a + b.quantity, 0)} items)
            </h3>

            {/* Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.id} className="flex justify-between items-start text-xs gap-2">
                  <div>
                    <span className="font-semibold text-obsidian-900 dark:text-white block">
                      {it.quantity}x {it.name}
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Size: {it.wristSizeCm}cm • {it.beadCount} beads
                    </span>
                  </div>
                  <span className="font-bold text-champagne-600 dark:text-champagne-400">
                    ${(it.unitPrice * it.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-zinc-200/80 dark:border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span>${pricing.subtotal.toFixed(2)}</span>
              </div>
              {pricing.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Volume Savings ({pricing.appliedTierCount} items)</span>
                  <span>-${pricing.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-500">
                <span>Shipping</span>
                <span>{pricing.isFreeShipping ? 'FREE' : `$${pricing.shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-obsidian-900 dark:text-white pt-3 border-t border-zinc-200/80 dark:border-white/10">
                <span>Final Total</span>
                <span className="text-2xl font-serif text-champagne-600 dark:text-champagne-400">
                  ${pricing.finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-pill-primary w-full py-3.5 text-xs flex items-center justify-center gap-2 shadow-luxury disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Minting Atelier Work Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Atelier Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
