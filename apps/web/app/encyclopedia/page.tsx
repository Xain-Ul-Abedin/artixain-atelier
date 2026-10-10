'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MASTER_GEMSTONES, Gemstone } from '@artixain/shared';
import { Gem, Sparkles, Search, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export default function EncyclopediaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChakra, setSelectedChakra] = useState('all');

  const chakras = [
    'all', 'Crown', 'Third Eye', 'Throat', 'Heart', 'Solar Plexus', 'Sacral', 'Root'
  ];

  const filteredGems = MASTER_GEMSTONES.filter((gem) => {
    const matchesSearch =
      gem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (gem.meaning || gem.healingLore || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    const gemChakra = gem.chakra || gem.primaryChakra || '';
    if (selectedChakra !== 'all' && !gemChakra.toLowerCase().includes(selectedChakra.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1720px] pt-28 md:pt-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 text-champagne-700 dark:text-champagne-300 text-[10px] uppercase font-bold tracking-widest mb-2">
            <Gem className="w-3.5 h-3.5" />
            <span>Mineralogical Reference Guide</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-obsidian-900 dark:text-white">
            Natural Gemstone Encyclopedia
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
            Explore the mineralogical composition, metaphysical properties, Mohs hardness, and chakra resonances of our 32 authentic natural crystals.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 32 minerals..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-champagne-400 text-xs outline-none"
          />
        </div>
      </div>

      {/* Chakra Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-4 no-scrollbar">
        {chakras.map((chk) => (
          <button
            key={chk}
            onClick={() => setSelectedChakra(chk)}
            className={`pill-chip shrink-0 ${
              selectedChakra === chk ? 'pill-chip-active' : 'pill-chip-inactive'
            }`}
          >
            {chk === 'all' ? 'All Minerals' : `${chk} Chakra`}
          </button>
        ))}
      </div>

      {/* Encyclopedia Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredGems.map((gem) => (
          <div
            key={gem.id}
            className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-800/60 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 hover:border-champagne-400 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Orb & Codes Header */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div
                  className="w-14 h-14 rounded-full border border-black/10 dark:border-white/20 shadow-md shrink-0 flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75) 0%, ${gem.colorHex} 50%, ${gem.secondaryColorHex || '#18181B'} 100%)`
                  }}
                >
                  <span className="text-[10px] font-bold text-white drop-shadow-sm">
                    {gem.code}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-champagne-600 dark:text-champagne-400 block">
                    Mohs Hardness: {gem.hardnessMohs || 7}
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    {gem.chakra || gem.primaryChakra} Chakra
                  </span>
                </div>
              </div>

              {/* Title & Meaning */}
              <h3 className="text-lg font-serif font-bold text-obsidian-900 dark:text-white">
                {gem.name}
              </h3>
              <p className="text-xs font-semibold text-champagne-700 dark:text-champagne-300 mt-1">
                &ldquo;{gem.meaning || gem.healingLore}&rdquo;
              </p>
              <p className="text-xs text-zinc-500 line-clamp-3 mt-2 leading-relaxed">
                {gem.description}
              </p>

              {/* Mineral Details Table */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-700/60 text-[11px]">
                <div>
                  <span className="text-zinc-400 block">Zodiac Link:</span>
                  <span className="font-medium text-obsidian-900 dark:text-zinc-200">
                    {(gem.zodiacSigns || gem.zodiac || []).join(', ') || 'Universal'}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Texture Luster:</span>
                  <span className="font-medium text-obsidian-900 dark:text-zinc-200 capitalize">
                    {gem.textureType.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-700/60 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                8mm: ${gem.pricesByDiameter[8].toFixed(2)}/bead
              </span>
              <Link
                href={`/studio?gem=${gem.code}`}
                className="btn-pill-primary py-1.5 px-4 text-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
                <span>Add in Studio</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
