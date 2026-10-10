'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { Truck, ShieldCheck, ShoppingBag, Globe, Menu, X, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { items, openDrawer } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);

  const totalItemCount = items.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <header className="fixed top-2 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none">
      <div className="max-w-[1400px] md:max-w-[1300px] mx-auto pointer-events-auto">
        {/* Top Announcement Capsule Banner */}
        <div className="mb-1 overflow-hidden transition-all duration-300">
          <button
            type="button"
            onClick={() => setShowShippingModal(true)}
            aria-label="Free Shipping on Every Order. No code needed"
            className="group relative flex w-full cursor-pointer appearance-none items-center justify-center overflow-hidden border backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 border-emerald-200/80 bg-emerald-50/90 text-emerald-900 hover:border-emerald-300 hover:shadow-emerald-100/70 rounded-full px-3 py-1.5 shadow-sm"
          >
            <span className="relative flex items-center justify-center gap-2 text-xs">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200/80 shadow-sm">
                <Truck className="w-3 h-3" />
              </span>
              <span className="truncate whitespace-nowrap font-bold text-xs tracking-wide">
                Free Shipping on Every Order
              </span>
              <span className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/80 text-teal-700 ring-1 ring-emerald-100">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                No code needed
              </span>
            </span>
          </button>
        </div>

        {/* Floating Capsule Main Navigation */}
        <nav className="px-4 md:px-7 py-2 md:py-2.5 flex items-center justify-between rounded-full bg-white/95 backdrop-blur-md transition-all duration-300 shadow-lg border border-gray-100/80">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-zinc-900 hover:text-zinc-600 transition-colors p-1"
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo / Brand Name */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-col items-center group cursor-pointer">
              <h1 className="font-sans font-bold text-[#1D1D1F] uppercase tracking-[0.4em] ml-[0.2em] text-base leading-tight transition-transform group-hover:scale-105">
                ASTRIS
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links with Dropdowns */}
          <div className="hidden md:flex min-w-0 flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-medium text-zinc-700">
            {/* Inspiration Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-black transition-colors py-2 px-2.5 text-xs font-semibold cursor-pointer">
                <span>Inspiration</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-black transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-2 px-1.5 min-w-[190px]">
                  <Link
                    href="/gallery"
                    className="block px-3.5 py-2 text-xs font-medium text-zinc-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    Design Gallery
                  </Link>
                  <Link
                    href="/shop"
                    className="block px-3.5 py-2 text-xs font-medium text-zinc-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    Curated Sets
                  </Link>
                </div>
              </div>
            </div>

            {/* Encyclopedia Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-black transition-colors py-2 px-2.5 text-xs font-semibold cursor-pointer">
                <span>Encyclopedia</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-black transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-2 px-1.5 min-w-[190px]">
                  <Link
                    href="/encyclopedia"
                    className="block px-3.5 py-2 text-xs font-medium text-zinc-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    Gem Library
                  </Link>
                  <Link
                    href="/articles"
                    className="block px-3.5 py-2 text-xs font-medium text-zinc-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    Articles
                  </Link>
                  <Link
                    href="/reviews"
                    className="block px-3.5 py-2 text-xs font-medium text-zinc-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    Reviews
                  </Link>
                </div>
              </div>
            </div>

            {/* Guide Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-black transition-colors py-2 px-2.5 text-xs font-semibold cursor-pointer">
                <span>Guide</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-black transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-2 px-1.5 min-w-[190px]">
                  <Link
                    href="/guide/how-to-design"
                    className="block px-3.5 py-2 text-xs font-medium text-zinc-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    How to Design
                  </Link>
                  <Link
                    href="/guide/size-guide"
                    className="block px-3.5 py-2 text-xs font-medium text-zinc-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    Size Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* Atelier Admin Portal Link */}
            <Link
              href="/admin"
              className="text-xs font-semibold text-zinc-600 hover:text-black py-2 px-2.5 transition-colors"
            >
              Atelier Admin
            </Link>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Language Switcher Pill */}
            <button
              className="hidden sm:flex h-9 items-center justify-center gap-1.5 rounded-full bg-zinc-100 px-3 text-xs font-semibold text-zinc-700 hover:bg-zinc-200 transition-colors"
              aria-label="Language"
            >
              <Globe className="w-3.5 h-3.5 text-zinc-600" />
              <span>EN</span>
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={openDrawer}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-800 hover:bg-zinc-200 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Primary CTA: Start Designing Button */}
            <Link
              href="/designer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#1D1D1F] text-white text-xs font-semibold px-4 md:px-5 py-2 rounded-full hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <span>Start Designing</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-3xl bg-white shadow-xl border border-gray-100 animate-in fade-in slide-in-from-top-2 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/designer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="col-span-2 flex items-center justify-center gap-2 p-3 rounded-full bg-zinc-900 text-white font-semibold text-center"
              >
                <span>Start Designing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-2xl bg-zinc-50 font-medium text-zinc-700 hover:bg-zinc-100 text-center"
              >
                Design Gallery
              </Link>
              <Link
                href="/encyclopedia"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-2xl bg-zinc-50 font-medium text-zinc-700 hover:bg-zinc-100 text-center"
              >
                Gem Library
              </Link>
              <Link
                href="/guide/how-to-design"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-2xl bg-zinc-50 font-medium text-zinc-700 hover:bg-zinc-100 text-center"
              >
                How to Design
              </Link>
              <Link
                href="/guide/size-guide"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-2xl bg-zinc-50 font-medium text-zinc-700 hover:bg-zinc-100 text-center"
              >
                Size Guide
              </Link>
              <Link
                href="/reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-2xl bg-zinc-50 font-medium text-zinc-700 hover:bg-zinc-100 text-center"
              >
                Customer Reviews
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-2xl bg-zinc-50 font-medium text-zinc-700 hover:bg-zinc-100 text-center"
              >
                Atelier Admin
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Shipping Guarantee Modal Sheet */}
      {showShippingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 pointer-events-auto">
          <div className="max-w-md w-full p-6 rounded-3xl bg-white shadow-2xl border border-zinc-100 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-zinc-900">
              Complimentary Global Delivery
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Every custom Astris bracelet is carefully handcrafted, energetically cleansed, and packed in luxury gift-ready jewelry presentation packaging with free tracked shipping.
            </p>
            <button
              onClick={() => setShowShippingModal(false)}
              className="w-full py-2.5 rounded-full bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
