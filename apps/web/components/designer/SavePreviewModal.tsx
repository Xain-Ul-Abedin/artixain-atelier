'use client';

import React, { useState } from 'react';
import { useDesigner } from '../../context/DesignerContext';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import { X, Check, Copy, ShoppingBag, Sparkles, Ruler, ShieldCheck, Tag } from 'lucide-react';

interface SavePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SavePreviewModal({ isOpen, onClose }: SavePreviewModalProps) {
  const router = useRouter();
  const {
    beads,
    designTitle,
    setDesignTitle,
    totalPrice,
    designToken,
    targetWristSizeCm,
    cordType,
    calculatedCircumferenceCm,
    fitRating
  } = useDesigner();

  const { addItem } = useCart();
  const [isCopied, setIsCopied] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  // Build gemstone summary list (e.g. 12x Obsidian, 6x Tigers Eye)
  const gemCounts: Record<string, { count: number; code: string; color: string; diam: number; price: number }> = {};
  beads.forEach((b) => {
    if (!gemCounts[b.name]) {
      gemCounts[b.name] = {
        count: 0,
        code: b.code,
        color: b.colorHex,
        diam: b.diameterMm,
        price: b.price
      };
    }
    gemCounts[b.name].count += 1;
  });

  const summaryString = Object.entries(gemCounts)
    .map(([name, data]) => `${data.count}x ${name} (${data.diam}mm)`)
    .join(', ');

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(designToken);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleAddToCart = (redirectCart: boolean = false) => {
    if (beads.length === 0) return;

    addItem({
      name: designTitle || 'Bespoke Custom Bracelet',
      type: 'custom',
      token: designToken,
      wristSizeCm: targetWristSizeCm,
      cordType,
      beadCount: beads.length,
      beadSummary: summaryString,
      unitPrice: totalPrice,
      primaryGemCode: beads[0]?.code || 'OBS'
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
      if (redirectCart) {
        router.push('/cart');
      }
    }, 800);
  };

  const fitBadgeConfig = {
    good: { label: 'Good Fit', bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200' },
    snug: { label: 'Snug Fit', bg: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200' },
    loose: { label: 'Loose Drape', bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200' },
    too_tight: { label: 'Too Tight', bg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200' },
    too_loose: { label: 'Too Loose', bg: 'bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200' }
  }[fitRating];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400">Atelier Preview</p>
              <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-white">
                Design Specification & Preview
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
            aria-label="Close preview modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="overflow-y-auto space-y-5 py-4 text-xs sm:text-sm">
          {/* Design Title & Top Parameter Capsule */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Design Name
                </label>
                <input
                  type="text"
                  value={designTitle}
                  onChange={(e) => setDesignTitle(e.target.value)}
                  placeholder="untitled"
                  className="w-full font-serif font-bold text-lg text-zinc-900 dark:text-white bg-transparent border-b border-dashed border-zinc-300 dark:border-zinc-700 focus:outline-none focus:border-zinc-900 dark:focus:border-white pb-0.5"
                />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${fitBadgeConfig.bg}`}>
                {fitBadgeConfig.label}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5" />
                <span>Target Wrist: <strong>{targetWristSizeCm} cm</strong></span>
              </span>
              <span>&bull;</span>
              <span>Circumference: <strong>{calculatedCircumferenceCm} cm</strong></span>
              <span>&bull;</span>
              <span>Total: <strong>{beads.length} beads</strong></span>
            </div>
          </div>

          {/* Gemstone Composition Breakdown */}
          <div>
            <h4 className="font-serif font-semibold text-sm text-zinc-900 dark:text-white mb-2.5 flex items-center justify-between">
              <span>Mineral Composition</span>
              <span className="text-xs font-mono text-zinc-400">{Object.keys(gemCounts).length} Distinct Minerals</span>
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {Object.entries(gemCounts).map(([name, data]) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-white/5"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-4 h-4 rounded-full border border-white/50 shadow-2xs"
                      style={{ backgroundColor: data.color }}
                    />
                    <div>
                      <span className="font-medium text-zinc-900 dark:text-white">{name}</span>
                      <span className="text-[11px] text-zinc-400 ml-2 font-mono">[{data.code}] &bull; {data.diam}mm</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-zinc-900 dark:text-white">{data.count}x</span>
                    <span className="text-[11px] text-zinc-400 ml-2 font-mono">${(data.price * data.count).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volume Tier Pricing Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-amber-900 dark:text-amber-200">Volume Discount Applied</p>
                <p className="text-[11px] text-amber-700 dark:text-amber-300">
                  1 for ${totalPrice.toFixed(2)} &bull; 2 for ${(totalPrice * 1.7).toFixed(2)} &bull; 3 for ${(totalPrice * 2.3).toFixed(2)}
                </p>
              </div>
            </div>
            <span className="text-base font-serif font-bold text-amber-900 dark:text-amber-200 shrink-0">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          {/* Shareable Design Code Box */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              Design Code Token (Save or Share with Friends)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={designToken}
                className="flex-1 px-3.5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-4 py-2.5 rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-xs font-semibold text-zinc-800 dark:text-white flex items-center gap-1.5 transition-colors shrink-0"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="pt-4 border-t border-zinc-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Complimentary worldwide tracked shipping</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => handleAddToCart(false)}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isAdded ? 'Added to Bag!' : 'Add to Bag'}</span>
            </button>
            <button
              onClick={() => handleAddToCart(true)}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Order Bespoke</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
