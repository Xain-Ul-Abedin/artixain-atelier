'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Gem } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { isRTL, language } = useLanguage();

  return (
    <footer className="w-full bg-white dark:bg-[#0E0E10] border-t border-gray-100 dark:border-white/10 pt-16 pb-12 text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Main Footer Links & Brand Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-gray-100 dark:border-white/10">
          {/* Brand Info (Span 2 on Desktop) */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <img
                src="/favicon.png"
                alt="Artixain Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="font-sans font-bold text-[#1D1D1F] dark:text-white uppercase tracking-[0.35em] text-lg leading-tight">
                ARTIXAIN
              </span>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed font-light">
              {language === 'ur'
                ? 'مصدقہ اصلی معدنیات، ملی میٹر کلائی پیمائش اور ماسٹر ایٹیلیئر کاریگری کے ساتھ آن لائن قدرتی قیمتی پتھروں کا بریسلیٹ ڈیزائن کریں۔'
                : 'Design a bespoke natural gemstone bracelet online with certified authentic minerals, millimeter anthropometric wrist calibration, and master atelier fulfillment.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-800 dark:text-amber-400" />
                <span>100% Grade-A Certified Minerals</span>
              </span>
            </div>
          </div>

          {/* SHOP Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              {language === 'ur' ? 'خریداری' : 'SHOP'}
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/gallery" className="hover:text-black dark:hover:text-white transition-colors">
                  {language === 'ur' ? 'ڈیزائن گیلری' : 'Design Gallery'}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-black dark:hover:text-white transition-colors">
                  {language === 'ur' ? 'منتخب مجموعے' : 'Curated Sets'}
                </Link>
              </li>
              <li>
                <Link href="/designer" className="hover:text-black dark:hover:text-white transition-colors">
                  {language === 'ur' ? 'کسٹمائزر اسٹوڈیو' : '3D Customizer Studio'}
                </Link>
              </li>
              <li>
                <Link href="/guide/how-to-design" className="hover:text-black dark:hover:text-white transition-colors">
                  {language === 'ur' ? 'ڈیزائن گائیڈ' : 'Design Guide'}
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              {language === 'ur' ? 'ایٹیلیئر' : 'ATELIER'}
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/location" className="hover:text-black dark:hover:text-white transition-colors">
                  {language === 'ur' ? 'پیرس سیلون' : 'Paris Salon'}
                </Link>
              </li>
              <li>
                <Link href="/features/materials" className="hover:text-black dark:hover:text-white transition-colors">
                  {language === 'ur' ? 'قدرتی معدنیات' : 'Natural Mineral Provenance'}
                </Link>
              </li>
              <li>
                <Link href="/features/craftsmanship" className="hover:text-black dark:hover:text-white transition-colors">
                  {language === 'ur' ? 'دستکار اسمبلی' : 'Artisan Stringing'}
                </Link>
              </li>
              <li>
                <Link href="/encyclopedia" className="hover:text-black dark:hover:text-white transition-colors">
                  {language === 'ur' ? 'کرسٹل لائبریری' : 'Gemstone Library'}
                </Link>
              </li>
            </ul>
          </div>

          {/* CUSTOMER CARE Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              {language === 'ur' ? 'خدماتِ صارفین' : 'CLIENT SERVICES'}
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/profile" className="hover:text-black dark:hover:text-white transition-colors">
                  {language === 'ur' ? 'صارف پروفائل' : 'Patron Profile'}
                </Link>
              </li>
              <li>
                <Link href="/guide/size-guide" className="hover:text-black dark:hover:text-white transition-colors">
                  {language === 'ur' ? 'سائز گائیڈ' : 'Size & Fit Guide'}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-black dark:hover:text-white transition-colors">
                  {language === 'ur' ? 'عام سوالات' : 'FAQ Guide'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">
                  {language === 'ur' ? 'رابطہ و مشاورت' : 'Concierge Contact'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-zinc-400 font-light">
          <p>&copy; 2026 Artixain Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs">
            <Link href="/articles" className="hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/articles" className="hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
              Terms of Service
            </Link>
            <Link href="/guide/size-guide" className="hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
              Authenticity Guarantee
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
