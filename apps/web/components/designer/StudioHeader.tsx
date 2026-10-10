'use client';

import React, { useState } from 'react';
import { useDesigner } from '../../context/DesignerContext';
import { useCart } from '../../context/CartContext';
import { Share2, ShoppingBag, Ruler, Check, Sparkles, Copy } from 'lucide-react';

interface StudioHeaderProps {
  onOpenSizingModal: () => void;
}

export default function StudioHeader({ onOpenSizingModal }: StudioHeaderProps) {
  const {
    beads,
    totalPrice,
    designToken,
    targetWristSizeCm,
    cordType,
    calculatedCircumferenceCm
  } = useDesigner();

  const { addItem } = useCart();
  const [isCopied, setIsCopied] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/studio?design=${encodeURIComponent(designToken)}`;
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleAddToCart = () => {
    if (beads.length === 0) return;

    // Build gemstone summary list (e.g. 12x Obsidian, 6x Tigers Eye)
    const gemCounts: Record<string, number> = {};
    beads.forEach((b) => {
      gemCounts[b.name] = (gemCounts[b.name] || 0) + 1;
    });
    const summary = Object.entries(gemCounts)
      .map(([name, count]) => `${count}x ${name}`)
      .join(', ');

    addItem({
      name: 'Bespoke Custom Bracelet',
      type: 'custom',
      token: designToken,
      wristSizeCm: targetWristSizeCm,
      cordType,
      beadCount: beads.length,
      beadSummary: summary,
      unitPrice: totalPrice,
      primaryGemCode: beads[0]?.code || 'OBS'
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-white/10">
      {/* Studio Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-champagne-600 dark:text-champagne-400 bg-champagne-500/10 dark:bg-champagne-500/20 px-2.5 py-0.5 rounded-full border border-champagne-500/20">
            Atelier Customizer Studio
          </span>
          <span className="text-xs text-zinc-400">•</span>
          <span className="text-xs text-zinc-500">
            {beads.length} Beads ({calculatedCircumferenceCm} cm)
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-obsidian-900 dark:text-white">
          Design Your Mineral Bracelet
        </h1>
      </div>

      {/* Live Actions & Price Capsule */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Sizing Modal Button */}
        <button
          onClick={onOpenSizingModal}
          className="btn-pill-secondary py-2 px-3.5 text-xs"
        >
          <Ruler className="w-3.5 h-3.5 text-champagne-500" />
          <span>Size: {targetWristSizeCm}cm</span>
        </button>

        {/* Share Token Button */}
        <button
          onClick={handleShare}
          className="btn-pill-secondary py-2 px-3.5 text-xs"
          title="Copy shareable link"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>

        {/* Price Ticker Capsule */}
        <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-champagne-500/10 dark:bg-champagne-500/20 border border-champagne-500/30">
          <span className="text-xs text-champagne-700 dark:text-champagne-300 font-medium">Total:</span>
          <span className="text-base font-bold text-champagne-700 dark:text-champagne-300">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        {/* Add to Cart CTA */}
        <button
          onClick={handleAddToCart}
          disabled={beads.length === 0}
          className="btn-pill-primary py-2 px-5 text-xs disabled:opacity-50"
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
