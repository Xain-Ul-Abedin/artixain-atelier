'use client';

import React, { useState } from 'react';
import { useDesigner } from '../../context/DesignerContext';
import { MASTER_GEMSTONES, Gemstone } from '@artixain/shared';
import { Sparkles, Search, X, Check, Plus, AlertCircle } from 'lucide-react';

export default function BeadPalette() {
  const {
    beads,
    addBead,
    selectedIndex,
    replaceBeadAt,
    selectedDiameter,
    calculatedCircumferenceCm
  } = useDesigner();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'in_use' | 'protection' | 'love' | 'abundance' | 'intuition' | 'spacers'>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'in_use', label: `In Use (${new Set(beads.map((b) => b.code)).size})` },
    { id: 'protection', label: 'Protection' },
    { id: 'love', label: 'Love' },
    { id: 'abundance', label: 'Abundance' },
    { id: 'intuition', label: 'Intuition' },
    { id: 'spacers', label: 'Metallic Accents' }
  ];

  const inUseCodes = new Set(beads.map((b) => b.code));

  const filteredGems = MASTER_GEMSTONES.filter((gem) => {
    // Search query matching
    const gemChakra = gem.chakra || gem.primaryChakra || '';
    const matchesSearch =
      gem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gemChakra.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'in_use') {
      return inUseCodes.has(gem.code);
    }
    if (selectedCategory === 'spacers') return !!gem.isSpacer;
    if (selectedCategory === 'protection') {
      return ['OBS', 'TIG', 'LAB', 'BLT', 'ONY', 'LAV', 'HMT', 'SMQ'].includes(gem.code);
    }
    if (selectedCategory === 'love') {
      return ['RSQ', 'RDC', 'MNS', 'KUN', 'GAR', 'AMZ'].includes(gem.code);
    }
    if (selectedCategory === 'abundance') {
      return ['CIT', 'SUN', 'TIG', 'PYR', 'AVN', 'JAD'].includes(gem.code);
    }
    if (selectedCategory === 'intuition') {
      return ['LAP', 'SDR', 'FLR', 'CLQ', 'HOW', 'AZU', 'APO', 'AMY'].includes(gem.code);
    }

    return true;
  });

  const handleGemClick = (gem: Gemstone) => {
    if (calculatedCircumferenceCm >= 25.0 && selectedIndex === null) {
      alert('Bracelet strand length cannot exceed 25cm.');
      return;
    }

    if (selectedIndex !== null) {
      replaceBeadAt(selectedIndex, gem);
    } else {
      addBead(gem, gem.isSpacer ? 6 : selectedDiameter);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-zinc-200/80 dark:border-white/10 p-4 sm:p-5 shadow-sm">
      {/* Search Input & Active Slot Hint */}
      <div className="pb-3 border-b border-zinc-200/70 dark:border-white/10 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="font-serif font-bold text-base text-zinc-900 dark:text-white">
              Bead Library
            </h2>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            {filteredGems.length} available
          </span>
        </div>

        {/* Search Bar Capsule with Clear Button */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search beads by name or code (e.g. Obsidian, OBS)..."
            className="w-full h-9 pl-9 pr-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 border border-zinc-200/80 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-zinc-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 p-1 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Selected Slot Replace Notification */}
        {selectedIndex !== null ? (
          <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 flex items-center justify-between">
            <span>Tap any bead to <strong>replace Slot {selectedIndex + 1}</strong></span>
            <span className="font-bold cursor-pointer underline text-[10px]" onClick={() => replaceBeadAt(selectedIndex, MASTER_GEMSTONES[0])}>Reset</span>
          </div>
        ) : (
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Tap any bead to append to the strand ({selectedDiameter}mm active)
          </p>
        )}
      </div>

      {/* Category Filter Pills (Horizontal Scrollable) */}
      <div className="flex items-center gap-1.5 py-3 overflow-x-auto border-b border-zinc-100 dark:border-white/5 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors ${
              selectedCategory === cat.id
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-2xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gemstone Grid */}
      <div className="flex-1 overflow-y-auto py-3 pr-1 space-y-2 min-h-0">
        {filteredGems.length === 0 ? (
          <div className="py-12 text-center text-xs text-zinc-400">
            No beads matched &quot;{searchQuery}&quot;.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
            {filteredGems.map((gem) => {
              const currentPrice = gem.pricesByDiameter[selectedDiameter] || (gem.isSpacer ? 1.2 : 2.0);
              const isInUse = inUseCodes.has(gem.code);

              return (
                <button
                  key={gem.id}
                  onClick={() => handleGemClick(gem)}
                  className="group relative p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-sm transition-all text-left flex items-center gap-2.5 cursor-pointer active:scale-95"
                >
                  {/* Procedural Gem Color Thumbnail */}
                  <div
                    className="w-8 h-8 rounded-full border border-white/60 shadow-xs shrink-0 flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: gem.baseColorHex || gem.colorHex }}
                  >
                    {/* Secondary shine accent */}
                    <div
                      className="absolute inset-0 opacity-40 bg-radial-vignette"
                    />
                    {isInUse && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Gem Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono text-zinc-400 font-semibold truncate">
                        {gem.code}-{gem.isSpacer ? '6' : selectedDiameter}
                      </span>
                      <span className="text-xs font-bold text-zinc-900 dark:text-white shrink-0">
                        ${currentPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 truncate group-hover:text-zinc-950 dark:group-hover:text-white">
                      {gem.name}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[9px] text-zinc-400">In Stock</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Length Limit Status Bar (Mimicking Astris 25cm limit) */}
      <div className="pt-3 border-t border-zinc-200/70 dark:border-white/10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          {calculatedCircumferenceCm > 24.0 && (
            <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          )}
          <span>Strand: <strong>{calculatedCircumferenceCm} cm</strong> / {beads.length} beads</span>
        </div>
        <span className="text-[10px] text-zinc-400 font-mono">
          Min 13cm &bull; Max 25cm
        </span>
      </div>
    </div>
  );
}
