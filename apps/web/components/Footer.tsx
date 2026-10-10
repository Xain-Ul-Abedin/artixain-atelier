'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Heart, Gem } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-12 text-zinc-600">
      <div className="max-w-[1400px] md:max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Main Footer Links & Brand Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-gray-100">
          {/* Brand Info (Span 2 on Desktop) */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="inline-block">
              <h2 className="font-sans font-bold text-[#1D1D1F] uppercase tracking-[0.4em] text-lg leading-tight">
                ASTRIS
              </h2>
            </Link>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Design a one-of-a-kind crystal bracelet online with natural gemstones, meaningful celestial symbolism, and gift-ready customization.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-zinc-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Natural Gemstones
              </span>
            </div>
          </div>

          {/* SHOP Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/gallery" className="hover:text-black transition-colors">
                  Design Gallery
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-black transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-black transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/guide/how-to-design" className="hover:text-black transition-colors">
                  Gift Ready
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              ABOUT
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/articles" className="hover:text-black transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/guide/how-to-design" className="hover:text-black transition-colors">
                  Design Philosophy
                </Link>
              </li>
              <li>
                <Link href="/encyclopedia" className="hover:text-black transition-colors">
                  Materials
                </Link>
              </li>
              <li>
                <Link href="/guide/size-guide" className="hover:text-black transition-colors">
                  Jewelry Care
                </Link>
              </li>
            </ul>
          </div>

          {/* CUSTOMER CARE Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/guide/how-to-design" className="hover:text-black transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/guide/size-guide" className="hover:text-black transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/guide/size-guide" className="hover:text-black transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-black transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-black transition-colors font-semibold text-zinc-700">
                  Atelier Workbench
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-zinc-400">
          <p>© 2024 ASTRIS. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs">
            <Link href="/privacy" className="hover:text-zinc-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-zinc-600 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
