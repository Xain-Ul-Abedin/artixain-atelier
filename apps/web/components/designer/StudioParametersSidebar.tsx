'use client';

import React, { useState } from 'react';
import { useDesigner } from '../../context/DesignerContext';
import {
  Ruler,
  ShoppingBag,
  Sparkles,
  Tag,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface StudioParametersSidebarProps {
  onOpenSizingModal: () => void;
  onOpenInspiration: () => void;
  onOpenSavePreview: () => void;
}

export default function StudioParametersSidebar({
  onOpenSizingModal,
  onOpenInspiration,
  onOpenSavePreview
}: StudioParametersSidebarProps) {
  const {
    beads,
    totalPrice,
    targetWristSizeCm,
    calculatedCircumferenceCm,
    selectedDiameter,
    fitRating,
    loadFromToken
  } = useDesigner();

  const [codeInputValue, setCodeInputValue] = useState('');
  const [codeFeedback, setCodeFeedback] = useState<string | null>(null);

  const handlePasteCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeInputValue.trim()) return;
    const success = loadFromToken(codeInputValue.trim());
    if (success) {
      setCodeFeedback('Design loaded successfully!');
      setCodeInputValue('');
      setTimeout(() => setCodeFeedback(null), 3000);
    } else {
      setCodeFeedback('Invalid design code.');
      setTimeout(() => setCodeFeedback(null), 3000);
    }
  };

  const fitBadgeConfig = {
    good: {
      label: 'Good',
      border: 'border-emerald-200 dark:border-emerald-800',
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
      text: 'text-emerald-700 dark:text-emerald-300',
      orbBg: 'bg-emerald-50 dark:bg-emerald-950/80',
      orbText: 'text-emerald-600 dark:text-emerald-400'
    },
    snug: {
      label: 'Snug',
      border: 'border-sky-200 dark:border-sky-800',
      bg: 'bg-sky-50 dark:bg-sky-950/60',
      text: 'text-sky-700 dark:text-sky-300',
      orbBg: 'bg-sky-50 dark:bg-sky-950/80',
      orbText: 'text-sky-600 dark:text-sky-400'
    },
    loose: {
      label: 'Loose',
      border: 'border-amber-200 dark:border-amber-800',
      bg: 'bg-amber-50 dark:bg-amber-950/60',
      text: 'text-amber-700 dark:text-amber-300',
      orbBg: 'bg-amber-50 dark:bg-amber-950/80',
      orbText: 'text-amber-600 dark:text-amber-400'
    },
    too_tight: {
      label: 'Too Tight',
      border: 'border-rose-200 dark:border-rose-800',
      bg: 'bg-rose-50 dark:bg-rose-950/60',
      text: 'text-rose-700 dark:text-rose-300',
      orbBg: 'bg-rose-50 dark:bg-rose-950/80',
      orbText: 'text-rose-600 dark:text-rose-400'
    },
    too_loose: {
      label: 'Too Loose',
      border: 'border-orange-200 dark:border-orange-800',
      bg: 'bg-orange-50 dark:bg-orange-950/60',
      text: 'text-orange-700 dark:text-orange-300',
      orbBg: 'bg-orange-50 dark:bg-orange-950/80',
      orbText: 'text-orange-600 dark:text-orange-400'
    }
  }[fitRating];

  return (
    <aside className="hidden xl:flex w-80 h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-white/10 flex-col p-6 z-10 shrink-0 overflow-y-auto transition-colors space-y-6">
      {/* Title */}
      <h2 className="font-sans font-bold text-zinc-900 dark:text-white text-lg tracking-tight">
        Design Parameters
      </h2>

      {/* Paste Design Code Form */}
      <div className="space-y-1.5">
        <form
          onSubmit={handlePasteCodeSubmit}
          className="flex items-center bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl p-1 border border-zinc-200/80 dark:border-white/10"
        >
          <div className="pl-3 text-zinc-400">
            <Tag className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={codeInputValue}
            onChange={(e) => setCodeInputValue(e.target.value)}
            placeholder="Paste design code..."
            className="flex-1 bg-transparent border-none py-2 px-2 text-xs font-mono text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 outline-none min-w-0"
          />
          <button
            type="submit"
            disabled={!codeInputValue.trim()}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold border border-zinc-200 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-600 disabled:opacity-40 transition-colors shadow-2xs"
          >
            Apply
          </button>
        </form>

        {codeFeedback && (
          <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 px-2 animate-in fade-in">
            {codeFeedback}
          </p>
        )}
      </div>

      {/* Physical Dimensions Breakdown Card */}
      <div className="rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/70 dark:border-white/10 p-4 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 dark:text-zinc-400">Strand Count:</span>
          <span className="font-mono font-bold text-zinc-900 dark:text-white">
            {beads.length} beads
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 dark:text-zinc-400">Inner Circumference:</span>
          <span className="font-mono font-bold text-zinc-900 dark:text-white">
            {calculatedCircumferenceCm} cm
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 dark:text-zinc-400">Active Bead Diameter:</span>
          <span className="font-mono font-bold text-zinc-900 dark:text-white">
            {selectedDiameter} mm
          </span>
        </div>
      </div>

      {/* "Your Wrist" Calibration Card (Clickable to open SizingModal) */}
      <button
        type="button"
        onClick={onOpenSizingModal}
        className={`w-full rounded-2xl border p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] flex items-center gap-3.5 bg-white dark:bg-zinc-800/80 ${fitBadgeConfig.border}`}
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${fitBadgeConfig.orbBg} ${fitBadgeConfig.orbText}`}
        >
          <Ruler className="w-5 h-5" />
        </span>

        <div className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
            YOUR WRIST
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-lg font-black text-zinc-900 dark:text-white font-serif">
              {targetWristSizeCm.toFixed(1)} cm
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${fitBadgeConfig.bg} ${fitBadgeConfig.text} ${fitBadgeConfig.border}`}
            >
              {fitBadgeConfig.label}
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block mt-0.5 underline">
            Calibrate with screen card &bull; AI
          </span>
        </div>
      </button>

      {/* Volume Discount Tier Calculator Box */}
      <div className="mt-auto border-t border-zinc-100 dark:border-white/5 pt-5 space-y-4">
        <div className="rounded-2xl border border-pink-100 dark:border-pink-950/40 bg-gradient-to-br from-white dark:from-zinc-900 to-pink-50/60 dark:to-pink-950/20 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Total
            </span>
            <span className="rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2.5 py-0.5 text-[11px] font-mono text-zinc-600 dark:text-zinc-300">
              {beads.length} items
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-zinc-900 dark:text-white">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          {/* Tier Discounts Breakdown */}
          <div className="pt-2 border-t border-pink-100 dark:border-pink-900/30 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1">
            <div className="flex justify-between">
              <span>1 strand:</span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                ${totalPrice.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>2 strands (15% off):</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                ${(totalPrice * 1.7).toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>3 strands (23% off):</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                ${(totalPrice * 2.3).toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Inspire Button */}
        <button
          type="button"
          onClick={onOpenInspiration}
          className="w-full h-11 rounded-full font-bold text-white bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 text-xs"
        >
          <Sparkles className="w-4 h-4" />
          <span>Get Inspiration</span>
        </button>

        {/* Primary Save & Preview CTA Button */}
        <button
          id="desktop-save-design-button"
          type="button"
          onClick={onOpenSavePreview}
          disabled={beads.length === 0}
          className="w-full h-12 bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-40"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Save & Preview</span>
        </button>
      </div>
    </aside>
  );
}
