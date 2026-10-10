'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Truck,
  ShieldCheck,
  ShoppingBag,
  Globe,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  User,
  LogOut,
  Award,
  Sun,
  Moon,
  ExternalLink
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { items, openDrawer } = useCart();
  const { profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItemCount = items.reduce((acc, it) => acc + it.quantity, 0);

  if (pathname?.startsWith('/designer') || pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <>
      <header className="fixed top-2 left-0 right-0 z-50 px-2.5 sm:px-4 md:px-8 pointer-events-none transition-all duration-300">
        <div className="w-full max-w-[1720px] mx-auto pointer-events-auto">
          {/* Top Announcement Capsule Banner with Subtle Pearlescent Rainbow Shimmer */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isScrolled
                ? 'max-h-0 opacity-0 mb-0 pointer-events-none'
                : 'max-h-12 opacity-100 mb-1.5'
            }`}
          >
            <button
              type="button"
              onClick={() => setShowShippingModal(true)}
              aria-label="Free Worldwide Shipping on Every Order"
              className="group relative flex w-full cursor-pointer appearance-none items-center justify-center overflow-hidden border backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 border-zinc-200/80 dark:border-white/10 rainbow-shimmer-bg text-zinc-800 dark:text-zinc-100 hover:border-zinc-300 dark:hover:border-white/20 rounded-full px-3 py-1.5 shadow-sm"
            >
              <span className="relative flex items-center justify-center gap-2 text-xs">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 ring-1 ring-zinc-300/80 dark:ring-white/20 shadow-2xs">
                  <Truck className="w-3 h-3" />
                </span>
                <span
                  className="truncate whitespace-nowrap font-bold text-xs tracking-wide"
                  dangerouslySetInnerHTML={{ __html: t('nav.shippingBanner') }}
                />
                <span className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/70 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/10">
                  <ShieldCheck className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />
                  <span>No code needed</span>
                </span>
              </span>
            </button>
          </div>

          {/* Floating Capsule Main Navigation */}
          <nav className="px-3 sm:px-4 md:px-8 py-2 md:py-2.5 flex items-center justify-between rounded-full bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-md transition-all duration-300 shadow-lg border border-gray-100/90 dark:border-white/10">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors p-1"
              aria-label="Open navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Official Artixain Logo & Brand Title with Transparent Background */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group cursor-pointer" aria-label="Artixain Home">
                <img
                  src="/favicon.png"
                  alt="Artixain Transparent Logo"
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain transition-transform group-hover:scale-105"
                />
                <span className="font-sans font-bold text-[#1D1D1F] dark:text-white uppercase tracking-[0.25em] sm:tracking-[0.35em] text-sm sm:text-base leading-tight transition-transform group-hover:scale-105">
                  ARTIXAIN
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links with Dropdowns & Multipaged Sections */}
            <div className="hidden md:flex min-w-0 flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {/* Studio Direct Link */}
              <Link
                href="/designer"
                className="hover:text-black dark:hover:text-white transition-colors py-2 px-2 text-xs font-semibold"
              >
                {t('nav.studio')}
              </Link>

              {/* Inspiration Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors py-2 px-2 text-xs font-semibold cursor-pointer">
                  <span>{t('nav.collections')}</span>
                  <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto">
                  <div className="bg-white dark:bg-[#1F1F23] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 py-2 px-1.5 min-w-[190px]">
                    <Link
                      href="/shop"
                      className="block px-3.5 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                    >
                      {t('nav.collections')}
                    </Link>
                    <Link
                      href="/gallery"
                      className="block px-3.5 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                    >
                      {t('nav.gallery')}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Encyclopedia Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors py-2 px-2 text-xs font-semibold cursor-pointer">
                  <span>{t('nav.encyclopedia')}</span>
                  <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto">
                  <div className="bg-white dark:bg-[#1F1F23] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 py-2 px-1.5 min-w-[190px]">
                    <Link
                      href="/encyclopedia"
                      className="block px-3.5 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                    >
                      32 Gemstones
                    </Link>
                    <Link
                      href="/articles"
                      className="block px-3.5 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                    >
                      Mineral Science
                    </Link>
                    <Link
                      href="/reviews"
                      className="block px-3.5 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                    >
                      Patron Reviews
                    </Link>
                  </div>
                </div>
              </div>

              {/* Location Salon */}
              <Link
                href="/location"
                className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white py-2 px-2 transition-colors inline-flex items-center gap-1"
              >
                <span>{t('nav.salon')}</span>
              </Link>

              {/* FAQ */}
              <Link
                href="/faq"
                className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white py-2 px-2 transition-colors inline-flex items-center gap-1"
              >
                <span>{t('nav.faq')}</span>
              </Link>

              {/* Contact Us */}
              <Link
                href="/contact"
                className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white py-2 px-2 transition-colors inline-flex items-center gap-1"
              >
                <span>{t('nav.contact')}</span>
              </Link>
            </div>

            {/* Right Action Controls: Language Switcher + Dark Theme Toggle + Auth + Cart + CTA */}
            <div className="flex items-center gap-2 md:gap-2.5 shrink-0">
              {/* Language Switcher Capsule Orb (EN / UR) */}
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={language === 'en' ? 'Switch to Urdu' : 'Switch to English'}
                title={language === 'en' ? 'اردو زبان میں تبدیل کریں' : 'Switch to English'}
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-all text-xs font-semibold shadow-2xs active:scale-95"
              >
                <Globe className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                <span className={language === 'ur' ? 'font-urdu font-bold' : ''}>
                  {language === 'en' ? 'UR' : 'EN'}
                </span>
              </button>

              {/* Dark Theme Toggle Orb with Smooth Inkdrop Animation Origin */}
              <button
                type="button"
                onClick={(e) => toggleTheme(e)}
                aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors shadow-2xs active:scale-95 cursor-pointer"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-zinc-700" />
                )}
              </button>

              {/* Profile Management or Dedicated Sign In Link */}
              {profile ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="inline-flex items-center gap-2 h-9 px-3 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 transition-all text-xs font-semibold shadow-2xs"
                    aria-label="User Profile Management"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white text-[10px] font-bold">
                      {profile.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline-block max-w-[90px] truncate font-medium">
                      {profile.name.split(' ')[0]}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#1F1F23] p-2 shadow-2xl border border-zinc-100 dark:border-white/10 z-50 text-xs animate-in fade-in slide-in-from-top-2"
                      onMouseLeave={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                        <p className="font-bold text-zinc-900 dark:text-white truncate">{profile.name}</p>
                        <p className="text-[11px] text-zinc-400 font-mono truncate">{profile.email}</p>
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[9px] font-bold px-2 py-0.5 mt-1 border border-amber-200 dark:border-amber-700/50">
                          <Award className="w-2.5 h-2.5" />
                          <span>{profile.tier}</span>
                        </span>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white font-medium transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-zinc-500" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/cart"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white font-medium transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Dedicated Cart</span>
                      </Link>
                      <Link
                        href="/admin"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white font-medium transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Atelier Admin</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium transition-colors border-t border-zinc-100 dark:border-zinc-800 mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-all text-xs font-semibold active:scale-95 shadow-2xs"
                  aria-label="Login to Artixain"
                >
                  <User className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                  <span>{t('nav.signIn')}</span>
                </Link>
              )}

              {/* Dedicated Cart Action Orb */}
              <Link
                href="/cart"
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors active:scale-95 shadow-2xs"
                aria-label="Dedicated Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 dark:bg-amber-400 px-1 text-[10px] font-bold text-white dark:text-zinc-950">
                    {totalItemCount}
                  </span>
                )}
              </Link>

              {/* Primary CTA: Start Designing Button */}
              <Link
                href="/designer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#1D1D1F] dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold px-4 md:px-5 py-2 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <span>{t('nav.startDesigning')}</span>
                <ArrowRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation Dropdown Drawer */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 p-4 rounded-3xl bg-white dark:bg-[#18181B] shadow-2xl border border-gray-100 dark:border-white/10 animate-in fade-in slide-in-from-top-2 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/designer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="col-span-2 flex items-center justify-center gap-2 p-3 rounded-full bg-zinc-900 text-white font-semibold text-center"
                >
                  <span>{t('nav.startDesigning')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {profile ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="col-span-2 flex items-center justify-center gap-2 p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-white text-center"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>My Profile ({profile.name})</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut();
                      }}
                      className="col-span-2 flex items-center justify-center gap-2 p-2 rounded-full bg-rose-50 text-rose-700 font-medium text-center"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <div className="col-span-2 grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-1.5 p-2.5 rounded-full bg-zinc-900 text-white font-semibold text-center"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{t('nav.signIn')}</span>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-1.5 p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold text-center"
                    >
                      <span>Register</span>
                    </Link>
                  </div>
                )}
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-700 dark:text-zinc-200 text-center"
                >
                  {t('nav.cart')} ({totalItemCount})
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-700 dark:text-zinc-200 text-center"
                >
                  {t('nav.collections')}
                </Link>
                <Link
                  href="/gallery"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-700 dark:text-zinc-200 text-center"
                >
                  {t('nav.gallery')}
                </Link>
                <Link
                  href="/encyclopedia"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-700 dark:text-zinc-200 text-center"
                >
                  {t('nav.encyclopedia')}
                </Link>
                <Link
                  href="/location"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-700 dark:text-zinc-200 text-center"
                >
                  {t('nav.salon')}
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-700 dark:text-zinc-200 text-center"
                >
                  {t('nav.faq')}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="col-span-2 p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-700 dark:text-zinc-200 text-center"
                >
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Free Shipping Information Sheet Modal */}
      {showShippingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 pointer-events-auto animate-in fade-in duration-200">
          <div className="max-w-md w-full p-6 md:p-8 rounded-[2rem] bg-white dark:bg-[#18181B] shadow-2xl border border-zinc-100 dark:border-white/10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-white">
              Complimentary Global Delivery
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
              Every custom Artixain bracelet is individually handcrafted on antique benches, energetically harmonized, and packed in luxury gift-ready jewelry presentation boxes with free tracked express shipping worldwide.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowShippingModal(false)}
                className="w-full py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all active:scale-[0.97]"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
