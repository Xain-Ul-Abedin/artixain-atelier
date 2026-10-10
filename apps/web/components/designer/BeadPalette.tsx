'use client';

import React, { useState } from 'react';
import { useDesigner } from '../../context/DesignerContext';
import { MASTER_GEMSTONES, Gemstone } from '@artixain/shared';
import { Sparkles, Search, Filter, ShieldCheck, Plus, Check } from 'lucide-react';

export default function BeadPalette() {
  const {
    addBead,
    selectedIndex,
    replaceBeadAt,
    selectedDiameter,
    setSelectedDiameter
  } = useDesigner();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'chakra' | 'spacers' | 'protection' | 'clarity' | 'love'>('all');
  const [selectedChakra, setSelectedChakra] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Minerals' },
    { id: 'protection', label: 'Protection' },
    { id: 'love', label: 'Love & Heart' },
    { id: 'clarity', label: 'Focus & Clarity' },
    { id: 'chakra', label: 'Chakras' },
    { id: 'spacers', label: 'Metallic Spacers' }
  ];

  const chakras = [
    'Crown', 'Third Eye', 'Throat', 'Heart', 'Solar Plexus', 'Sacral', 'Root'
  ];

  const filteredGems = MASTER_GEMSTONES.filter((gem) => {
    // Search query
    const matchesSearch =
      gem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.chakra.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'spacers') return !!gem.isSpacer;
    if (selectedCategory === 'protection') {
      return ['OBS', 'TIG', 'LAB', 'BLT', 'ONY', 'LAV', 'HMT', 'SMQ'].includes(gem.code);
    }
    if (selectedCategory === 'love') {
      return ['RSQ', 'RDC', 'MNS', 'KUN', 'GAR', 'AMZ'].includes(gem.code);
    }
    if (selectedCategory === 'clarity') {
      return ['LAP', 'SDR', 'FLR', 'CLQ', 'HOW', 'AZU', 'APO'].includes(gem.code);
    }
    if (selectedCategory === 'chakra' && selectedChakra !== 'all') {
      return gem.chakra.toLowerCase().includes(selectedChakra.toLowerCase());
    }

    return true;
  });

  const handleGemClick = (gem: Gemstone) => {
    if (selectedIndex !== null) {
      replaceBeadAt(selectedIndex, gem);
    } else {
      addBead(gem, gem.isSpacer ? 6 : selectedDiameter);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/70 dark:bg-obsidian-900/70 backdrop-blur-xl rounded-3xl border border-zinc-200/80 dark:border-white/10 p-5 shadow-elevated">
      {/* Top Header & Diameter Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-200/70 dark:border-white/10">
        <div>
          <h2 className="text-lg font-serif font-bold text-obsidian-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-champagne-500" />
            <span>Gemstone & Spacer Palette</span>
          </h2>
          <p className="text-xs text-zinc-500">
            {selectedIndex !== null
              ? `Select gemstone to replace Slot ${selectedIndex + 1}`
              : 'Tap any gemstone to add it to your custom strand'}
          </p>
        </div>

        {/* Diameter Selector Pill */}
        <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
          <span className="text-[10px] uppercase font-semibold text-zinc-400 px-2">Size:</span>
          {([6, 8, 10, 12] as const).map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDiameter(d)}
              className={`pill-chip py-1 px-2.5 text-xs transition-all ${
                selectedDiameter === d
                  ? 'bg-obsidian-900 dark:bg-white text-white dark:text-obsidian-900 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-obsidian-900'
              }`}
            >
              {d}mm
            </button>
          ))}
        </div>
      </div>

      {/* Filter Categories Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id as any);
              if (cat.id !== 'chakra') setSelectedChakra('all');
            }}
            className={`pill-chip shrink-0 ${
              selectedCategory === cat.id ? 'pill-chip-active' : 'pill-chip-inactive'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Secondary Chakra Selector */}
      {selectedCategory === 'chakra' && (
        <div className="flex items-center gap-1 overflow-x-auto pb-3 no-scrollbar">
          <button
            onClick={() => setSelectedChakra('all')}
            className={`pill-chip py-1 text-[11px] shrink-0 ${
              selectedChakra === 'all' ? 'pill-chip-active' : 'pill-chip-inactive'
            }`}
          >
            All Chakras
          </button>
          {chakras.map((chk) => (
            <button
              key={chk}
              onClick={() => setSelectedChakra(chk)}
              className={`pill-chip py-1 text-[11px] shrink-0 ${
                selectedChakra === chk ? 'pill-chip-active' : 'pill-chip-inactive'
              }`}
            >
              {chk}
            </button>
          ))}
        </div>
      )}

      {/* Search Input Bar */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search minerals by name, chakra, or property..."
          className="w-full pl-9 pr-4 py-2 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 border border-transparent focus:border-champagne-400 focus:bg-white dark:focus:bg-obsidian-900 text-xs text-obsidian-900 dark:text-white placeholder-zinc-400 transition-all outline-none"
        />
      </div>

      {/* Gemstone Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 overflow-y-auto max-h-[380px] pr-1">
        {filteredGems.map((gem) => {
          const currentPrice = gem.pricesByDiameter[gem.isSpacer ? 6 : selectedDiameter] || 2.0;

          return (
            <button
              key={gem.id}
              onClick={() => handleGemClick(gem)}
              className="group relative flex flex-col items-center p-3 rounded-2xl bg-white/90 dark:bg-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 hover:border-champagne-400 dark:hover:border-champagne-400/60 shadow-sm hover:shadow-md transition-all duration-200 text-left"
            >
              {/* Gemstone Orb Preview */}
              <div
                className="w-10 h-10 rounded-full shadow-inner border border-black/10 dark:border-white/20 mb-2 transition-transform duration-200 group-hover:scale-110 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7) 0%, ${gem.colorHex} 45%, ${gem.secondaryColorHex || '#18181B'} 100%)`
                }}
              >
                {gem.isSpacer && (
                  <span className="text-[9px] font-bold text-black/60">
                    {gem.code}
                  </span>
                )}
              </div>

              {/* Gemstone Meta */}
              <span className="text-xs font-semibold text-obsidian-900 dark:text-white line-clamp-1 text-center w-full">
                {gem.name}
              </span>
              <span className="text-[10px] text-zinc-500 line-clamp-1 text-center">
                {gem.isSpacer ? 'Metallic Accent' : `${gem.chakra} Chakra`}
              </span>

              {/* Price & Action Badge */}
              <div className="mt-2 flex items-center justify-between w-full pt-1.5 border-t border-zinc-100 dark:border-zinc-700/60">
                <span className="text-xs font-bold text-champagne-600 dark:text-champagne-400">
                  ${currentPrice.toFixed(2)}
                </span>
                <span className="icon-orb w-6 h-6 bg-zinc-100 dark:bg-zinc-700 group-hover:bg-champagne-500 group-hover:text-white transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
