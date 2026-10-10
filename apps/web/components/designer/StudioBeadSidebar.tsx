'use client';

import React, { useState } from 'react';
import { useDesigner } from '../../context/DesignerContext';
import { MASTER_GEMSTONES, Gemstone } from '@artixain/shared';
import { Search, X, Check, Plus, AlertCircle, Sparkles } from 'lucide-react';

interface StudioBeadSidebarProps {
  onCloseMobileDrawer?: () => void;
}

export default function StudioBeadSidebar({ onCloseMobileDrawer }: StudioBeadSidebarProps) {
  const {
    beads,
    addBead,
    selectedIndex,
    setSelectedIndex,
    replaceBeadAt,
    selectedDiameter,
    calculatedCircumferenceCm
  } = useDesigner();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'in_use' | 'protection' | 'love' | 'abundance' | 'intuition' | 'spacers'
  >('all');

  const inUseMap = new Map<string, number>();
  beads.forEach((b) => {
    inUseMap.set(b.code, (inUseMap.get(b.code) || 0) + 1);
  });

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'in_use', label: `In Use (${inUseMap.size})` },
    { id: 'protection', label: 'Protection' },
    { id: 'love', label: 'Love' },
    { id: 'abundance', label: 'Abundance' },
    { id: 'intuition', label: 'Intuition' },
    { id: 'spacers', label: 'Spacers' }
  ];

  const filteredGems = MASTER_GEMSTONES.filter((gem) => {
    const gemChakra = gem.chakra || gem.primaryChakra || '';
    const matchesSearch =
      gem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gemChakra.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'in_use') {
      return inUseMap.has(gem.code);
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
      setSelectedIndex(null);
    } else {
      addBead(gem, gem.isSpacer ? 6 : selectedDiameter);
    }

    if (onCloseMobileDrawer) {
      // Optional: on mobile keep open or let user continue building
    }
  };

  // Length calculation percentage
  const lengthPercent = Math.min(100, Math.max(0, (calculatedCircumferenceCm / 25.0) * 100));

  return (
    <aside className="w-full xl:w-80 h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-white/10 flex flex-col z-10 shrink-0 overflow-hidden transition-colors">
      {/* Top Filter & Search Controls */}
      <div className="border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/50 p-3.5 space-y-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Filter By Category
          </span>
          <span className="text-[10px] font-mono text-zinc-400">
            {filteredGems.length} minerals
          </span>
        </div>

        {/* Search Input Capsule */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search beads (e.g. Obsidian)..."
            className="w-full h-8 pl-8 pr-7 rounded-full bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 border border-zinc-200/80 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-zinc-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 p-0.5 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Category Filter Pills (Wrap or scroll) */}
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto scrollbar-none pt-0.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-2xs'
                    : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700 hover:border-zinc-400'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Replace active slot notification */}
        {selectedIndex !== null && (
          <div className="flex items-center justify-between px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-800 dark:text-amber-300">
            <span>
              Tap to <strong>replace Slot {selectedIndex + 1}</strong>
            </span>
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="underline font-bold"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Bead Grid (3 Columns) */}
      <div className="flex-1 overflow-y-auto p-3 grid grid-cols-3 gap-2 content-start scrollbar-elegant min-h-0">
        {filteredGems.length === 0 ? (
          <div className="col-span-3 py-12 text-center text-xs text-zinc-400">
            No minerals found matching &quot;{searchQuery}&quot;.
          </div>
        ) : (
          filteredGems.map((gem) => {
            const count = inUseMap.get(gem.code) || 0;
            const price =
              gem.pricesByDiameter[selectedDiameter] || (gem.isSpacer ? 1.2 : 2.0);

            return (
              <button
                key={gem.id}
                type="button"
                onClick={() => handleGemClick(gem)}
                className="group relative p-2 rounded-2xl bg-zinc-50/70 hover:bg-white dark:bg-zinc-800/40 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20 transition-all text-center flex flex-col items-center justify-between cursor-pointer active:scale-95 shadow-2xs hover:shadow-xs"
                title={`${gem.name} (${gem.code}) - $${price.toFixed(2)}`}
              >
                {/* In Use Badge */}
                {count > 0 && (
                  <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[9px] font-bold flex items-center justify-center shadow-2xs">
                    {count}
                  </span>
                )}

                {/* Mineral Avatar Orb (Procedural Graphic) */}
                <div
                  className="w-10 h-10 rounded-full border border-black/10 dark:border-white/20 shadow-sm relative overflow-hidden my-1 transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: gem.colorHex,
                    backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 45%), radial-gradient(circle at 70% 70%, ${gem.secondaryColorHex || '#000000'} 0%, ${gem.colorHex} 100%)`
                  }}
                >
                  {/* Subtle glossy sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                </div>

                {/* Name */}
                <span className="text-[11px] font-semibold text-zinc-900 dark:text-white truncate w-full px-0.5">
                  {gem.name}
                </span>

                {/* Code & Price */}
                <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                  {gem.code} &bull; ${price.toFixed(1)}
                </span>
              </button>
            );
          })
        )}
      </div>

      {/* Bottom Strand Length Progress Indicator (Min 13cm · Max 25cm) */}
      <div className="p-3.5 border-t border-zinc-100 dark:border-white/5 bg-zinc-50/60 dark:bg-zinc-900/60 shrink-0">
        <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
          <span className="text-zinc-600 dark:text-zinc-300">Strand Length</span>
          <span className="font-mono text-zinc-900 dark:text-white">
            {calculatedCircumferenceCm}cm <span className="text-zinc-400 font-normal">/ 25.0cm</span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              calculatedCircumferenceCm < 13
                ? 'bg-amber-400'
                : calculatedCircumferenceCm > 24
                ? 'bg-rose-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${lengthPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1 font-mono">
          <span>Min 13.0cm</span>
          <span>Max 25.0cm</span>
        </div>
      </div>
    </aside>
  );
}
