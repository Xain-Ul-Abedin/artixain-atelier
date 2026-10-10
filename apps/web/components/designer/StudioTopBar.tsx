'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDesigner } from '../../context/DesignerContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  ChevronLeft,
  Sparkles,
  BookOpen,
  Ruler,
  ShoppingBag,
  Sun,
  Moon,
  Globe,
  Edit2,
  AlertCircle,
  Tag
} from 'lucide-react';

interface StudioTopBarProps {
  onOpenGuide: () => void;
  onOpenInspiration: () => void;
  onOpenSizingModal: () => void;
  onOpenSavePreview: () => void;
}

export default function StudioTopBar({
  onOpenGuide,
  onOpenInspiration,
  onOpenSizingModal,
  onOpenSavePreview
}: StudioTopBarProps) {
  const router = useRouter();
  const {
    beads,
    designTitle,
    setDesignTitle,
    calculatedCircumferenceCm,
    targetWristSizeCm,
    totalPrice,
    fitRating
  } = useDesigner();
  const { items, openDrawer } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, isRTL } = useLanguage();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  const totalCartCount = items.reduce((acc, it) => acc + it.quantity, 0);

  const handleBackClick = (e: React.MouseEvent) => {
    if (beads.length > 0) {
      e.preventDefault();
      setShowLeaveConfirm(true);
    }
  };

  const fitBadgeConfig = {
    good: { label: 'Good', bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
    snug: { label: 'Snug', bg: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800' },
    loose: { label: 'Loose', bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
    too_tight: { label: 'Too Tight', bg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
    too_loose: { label: 'Too Loose', bg: 'bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800' }
  }[fitRating];

  return (
    <>
      <header className="h-14 md:h-16 w-full border-b border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 px-3 md:px-6 flex items-center justify-between shrink-0 z-20 transition-colors">
        {/* Left: Back Arrow + Editable Title */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <Link
            href="/"
            onClick={handleBackClick}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors shrink-0 active:scale-95 shadow-2xs"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2 min-w-0">
            {isEditingTitle ? (
              <input
                type="text"
                autoFocus
                maxLength={50}
                value={designTitle}
                onChange={(e) => setDesignTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setIsEditingTitle(false);
                }}
                className="font-serif font-bold text-base md:text-lg text-zinc-900 dark:text-white bg-transparent border-b border-zinc-400 outline-none pb-0.5 max-w-[140px] sm:max-w-[200px]"
              />
            ) : (
              <div
                onClick={() => setIsEditingTitle(true)}
                className="group flex items-center gap-1.5 cursor-pointer min-w-0"
                title="Click to rename design"
              >
                <h1 className="font-serif font-bold text-base md:text-lg text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors truncate max-w-[120px] sm:max-w-[220px]">
                  {designTitle || 'untitled'}
                </h1>
                <Edit2 className="w-3 h-3 text-zinc-400 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            )}

            <span className="hidden sm:inline-block text-xs font-mono text-zinc-400 shrink-0">
              &bull; {beads.length} beads ({calculatedCircumferenceCm}cm)
            </span>
          </div>
        </div>

        {/* Center / Mid Bar Stats (Visible on < xl to show wrist & total) */}
        <div className="hidden md:flex xl:hidden items-center gap-2 text-xs">
          <button
            type="button"
            onClick={onOpenSizingModal}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold"
          >
            <Ruler className="w-3 h-3 text-zinc-500" />
            <span>{targetWristSizeCm}cm</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] border ${fitBadgeConfig.bg}`}>
              {fitBadgeConfig.label}
            </span>
          </button>

          <div className="px-3 py-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold">
            ${totalPrice.toFixed(2)}
          </div>
        </div>

        {/* Right Action Tools: Guide, Inspire, Language, Theme, Cart, and Mobile Save */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Guide Modal Trigger */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="inline-flex items-center gap-1.5 h-8 sm:h-9 px-3 sm:px-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all active:scale-95 shadow-2xs"
            title="How to design guide"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            <span className="hidden sm:inline">Guide</span>
          </button>

          {/* Inspire Gradient Trigger */}
          <button
            type="button"
            onClick={onOpenInspiration}
            className="inline-flex items-center gap-1.5 h-8 sm:h-9 px-3 sm:px-3.5 rounded-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400 text-white font-semibold text-xs shadow-md hover:shadow-lg active:scale-95 transition-all"
            title="Curated recipe inspiration"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Inspire</span>
          </button>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="hidden sm:inline-flex items-center gap-1 h-8 sm:h-9 px-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors active:scale-95"
            title="Toggle language (English / Urdu)"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[11px] uppercase font-mono">{language === 'en' ? 'UR' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center h-8 sm:h-9 w-8 sm:w-9 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors active:scale-95"
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-zinc-600" />}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            type="button"
            onClick={openDrawer}
            className="relative inline-flex items-center justify-center h-8 sm:h-9 w-8 sm:w-9 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors active:scale-95"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile-Only Save & Preview CTA (Hidden on desktop where right panel has primary CTA) */}
          <button
            type="button"
            onClick={onOpenSavePreview}
            disabled={beads.length === 0}
            className="xl:hidden inline-flex items-center gap-1.5 h-8 sm:h-9 px-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold shadow-md active:scale-95 transition-all disabled:opacity-40"
          >
            <span>Save</span>
          </button>
        </div>
      </header>

      {/* Discard Leave Confirm Modal */}
      {showLeaveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-white/10 p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-zinc-900 dark:text-white mb-2">
              Discard Current Design?
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              You have {beads.length} beads strung on canvas. Leaving now will reset unsaved changes.
            </p>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowLeaveConfirm(false)}
                className="flex-1 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 transition-colors"
              >
                Stay Here
              </button>
              <button
                onClick={() => {
                  setShowLeaveConfirm(false);
                  router.push('/');
                }}
                className="flex-1 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold shadow-sm transition-colors"
              >
                Discard & Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
