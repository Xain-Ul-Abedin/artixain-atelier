'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { Sparkles, ShoppingBag, Menu, X, Compass, Gem, ShieldCheck, Ruler } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { items, openDrawer } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItemCount = items.reduce((acc, it) => acc + it.quantity, 0);

  const navLinks = [
    { href: '/studio', label: 'Custom Studio', icon: Sparkles },
    { href: '/shop', label: 'Premade Sets', icon: Compass },
    { href: '/encyclopedia', label: 'Encyclopedia', icon: Gem },
    { href: '/admin', label: 'Atelier Admin', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 bg-white/80 dark:bg-obsidian-900/80 backdrop-blur-xl border-b border-zinc-200/70 dark:border-white/10 transition-all">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="icon-orb w-9 h-9 bg-champagne-500/10 dark:bg-champagne-500/20 text-champagne-600 dark:text-champagne-400 border border-champagne-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-wider text-obsidian-900 dark:text-white group-hover:text-champagne-600 dark:group-hover:text-champagne-400 transition-colors">
              ARTIXAIN
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 -mt-1 font-sans">
              Bespoke Atelier
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Pill Capsules) */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-full border border-zinc-200/50 dark:border-white/5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`pill-chip py-1.5 px-4 text-xs ${
                  isActive
                    ? 'pill-chip-active'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-obsidian-900 dark:hover:text-white border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Cart Pill & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Cart Pill Button */}
          <button
            onClick={openDrawer}
            className="btn-pill-secondary py-2 px-3.5 text-xs group"
          >
            <ShoppingBag className="w-4 h-4 text-champagne-600 dark:text-champagne-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-medium">Cart</span>
            {totalItemCount > 0 && (
              <span className="icon-orb w-5 h-5 bg-champagne-500 text-white text-[10px] font-bold">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden icon-orb-md"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden pt-3 pb-2 border-t border-zinc-200/70 dark:border-white/10 mt-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-obsidian-900 dark:bg-white text-white dark:text-obsidian-900'
                      : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
