'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Heart, Gem } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-obsidian-900 border-t border-zinc-200/80 dark:border-white/10 pt-12 pb-8 mt-16 text-zinc-600 dark:text-zinc-400">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Atelier Trust Badges (4 Bento Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-zinc-200/80 dark:border-white/10">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-white/5">
            <div className="icon-orb w-10 h-10 bg-champagne-500/10 text-champagne-600 dark:text-champagne-400 shrink-0">
              <Gem className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-obsidian-900 dark:text-white uppercase tracking-wider">
                100% Natural Minerals
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                Ethically sourced, Grade-A authentic natural crystals & gemstones.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-white/5">
            <div className="icon-orb w-10 h-10 bg-champagne-500/10 text-champagne-600 dark:text-champagne-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-obsidian-900 dark:text-white uppercase tracking-wider">
                Handcrafted Atelier
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                Individually strung by master artisans with reinforced elastic cords.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-white/5">
            <div className="icon-orb w-10 h-10 bg-champagne-500/10 text-champagne-600 dark:text-champagne-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-obsidian-900 dark:text-white uppercase tracking-wider">
                Complimentary Shipping
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                Free tracked delivery on all orders over $50.00 worldwide.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-white/5">
            <div className="icon-orb w-10 h-10 bg-champagne-500/10 text-champagne-600 dark:text-champagne-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-obsidian-900 dark:text-white uppercase tracking-wider">
                Perfect Fit Guarantee
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                Complimentary resizing within 30 days of atelier delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Brand Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-zinc-200/80 dark:border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="icon-orb w-7 h-7 bg-champagne-500 text-white text-xs font-bold">
                A
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-obsidian-900 dark:text-white">
                ARTIXAIN
              </span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed mb-4">
              Artixain is an interactive bespoke jewelry studio and crystal atelier. We bring together natural mineral science, metaphysical heritage, and contemporary craftsmanship.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                Volume Pricing Enabled:
              </span>
              <span className="text-xs font-semibold text-champagne-600 dark:text-champagne-400">
                Buy 3+, 4th+ for $19 Flat
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-obsidian-900 dark:text-white mb-3">
              Experience
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/studio" className="hover:text-champagne-600 dark:hover:text-champagne-400 transition-colors">
                  Custom Studio
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-champagne-600 dark:hover:text-champagne-400 transition-colors">
                  Curated Sets
                </Link>
              </li>
              <li>
                <Link href="/encyclopedia" className="hover:text-champagne-600 dark:hover:text-champagne-400 transition-colors">
                  Gemstone Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier & Admin */}
          <div className="md:col-span-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-obsidian-900 dark:text-white mb-3">
              Atelier
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/admin" className="hover:text-champagne-600 dark:hover:text-champagne-400 transition-colors">
                  Atelier Workbench
                </Link>
              </li>
              <li>
                <Link href="/admin/orders" className="hover:text-champagne-600 dark:hover:text-champagne-400 transition-colors">
                  Order State Machine
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-champagne-600 dark:hover:text-champagne-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Atelier Gazette */}
          <div className="md:col-span-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-obsidian-900 dark:text-white mb-3">
              Atelier Gazette
            </h5>
            <p className="text-xs text-zinc-500 mb-3">
              Receive rare mineral drop alerts and bespoke design releases.
            </p>
            <div className="flex items-center gap-1.5">
              <input
                type="email"
                placeholder="Enter email address..."
                className="w-full px-3.5 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs text-obsidian-900 dark:text-white placeholder-zinc-400 border border-transparent focus:border-champagne-400 outline-none"
              />
              <button className="btn-pill-primary py-2 px-4 text-xs shrink-0">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-zinc-400">
          <p>© 2026 Artixain Atelier. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Zero-Emoji Architecture</span>
            <span>•</span>
            <span>$0.00/mo Infrastructure</span>
            <span>•</span>
            <span>Material You 50% Pill Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
