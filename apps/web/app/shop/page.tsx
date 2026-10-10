'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { CURATED_PREMADES, CuratedPremade } from '@artixain/shared';
import { Sparkles, ShoppingBag, Check, Compass, Tag, ArrowRight } from 'lucide-react';

export default function ShopPage() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'Protection', label: 'Protection & Shield' },
    { id: 'Abundance', label: 'Abundance & Wealth' },
    { id: 'Love', label: 'Love & Harmony' },
    { id: 'Intuition', label: 'Intuition & Clarity' },
    { id: 'Grounding', label: 'Grounding & Strength' },
    { id: 'Vitality', label: 'Vitality & Energy' }
  ];

  const filteredPremades = CURATED_PREMADES.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const handleQuickAdd = (item: CuratedPremade) => {
    const itemName = item.name || item.title;
    const beadsList = item.beads || item.beadRecipe.map((b) => ({
      code: 'OBS',
      name: b.gemstoneName,
      diameterMm: b.diameterMm,
      colorHex: '#27272A',
      isSpacer: b.gemstoneId.includes('spacer')
    }));

    addItem({
      name: itemName,
      type: 'premade',
      token: item.designToken || item.slug,
      wristSizeCm: item.defaultWristSizeCm,
      cordType: item.cordType || 'silicone_stretch',
      beadCount: beadsList.length,
      beadSummary: beadsList.map((b) => b.name).join(', '),
      unitPrice: item.basePrice,
      primaryGemCode: beadsList[0]?.code || 'OBS'
    });

    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 text-champagne-700 dark:text-champagne-300 text-[10px] uppercase font-bold tracking-widest mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Curated Atelier Blueprints</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-obsidian-900 dark:text-white">
            Signature Premade Collections
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
            Expertly balanced mineral harmonies crafted for specific energetic intentions. Order directly or remix any design in our interactive customizer studio.
          </p>
        </div>

        {/* Volume Pricing Reminder Pill */}
        <div className="p-3 rounded-2xl bg-champagne-500/10 dark:bg-champagne-500/15 border border-champagne-500/20 flex items-center gap-2.5 shrink-0">
          <Tag className="w-4 h-4 text-champagne-600 dark:text-champagne-400" />
          <span className="text-xs font-semibold text-champagne-800 dark:text-champagne-300">
            Buy 2 Save 25% • Buy 3 Save 35% • 4th+ $19 Flat
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`pill-chip shrink-0 ${
              selectedCategory === cat.id ? 'pill-chip-active' : 'pill-chip-inactive'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Premade Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredPremades.map((item) => {
          const isAdded = addedId === item.id;
          const itemName = item.name || item.title;
          const beadsList = item.beads || item.beadRecipe.map((b) => ({
            code: 'OBS',
            name: b.gemstoneName,
            diameterMm: b.diameterMm,
            colorHex: '#27272A',
            isSpacer: b.gemstoneId.includes('spacer')
          }));

          return (
            <div
              key={item.id}
              className="group p-6 rounded-3xl bg-white/80 dark:bg-zinc-800/60 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 hover:border-champagne-400/80 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Meta */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-champagne-600 dark:text-champagne-400 bg-champagne-500/10 dark:bg-champagne-500/20 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {item.totalBeads || beadsList.length} Beads • {item.defaultWristSizeCm}cm
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-obsidian-900 dark:text-white group-hover:text-champagne-600 dark:group-hover:text-champagne-400 transition-colors">
                  {itemName}
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-2 mt-1.5 leading-relaxed">
                  {item.description}
                </p>

                {/* Bead Swatches Row */}
                <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-700/60">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 mr-1">
                    Minerals:
                  </span>
                  {beadsList.slice(0, 6).map((bead, bIdx) => (
                    <div
                      key={bIdx}
                      title={`${bead.name} (${bead.diameterMm}mm)`}
                      className="w-4 h-4 rounded-full border border-black/10 dark:border-white/20 shadow-xs"
                      style={{
                        background: bead.isSpacer
                          ? '#C5A059'
                          : bead.colorHex
                      }}
                    />
                  ))}
                  {beadsList.length > 6 && (
                    <span className="text-[10px] text-zinc-400">
                      +{beadsList.length - 6}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-700/60 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] text-zinc-400 block">Atelier Price</span>
                  <span className="text-lg font-serif font-bold text-obsidian-900 dark:text-white">
                    ${item.basePrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/studio?remix=${encodeURIComponent(item.slug)}`}
                    className="btn-pill-secondary py-2 px-3.5 text-xs"
                    title="Remix this recipe in the 2D Studio"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-champagne-500" />
                    <span>Remix</span>
                  </Link>

                  <button
                    onClick={() => handleQuickAdd(item)}
                    className="btn-pill-primary py-2 px-4 text-xs"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
