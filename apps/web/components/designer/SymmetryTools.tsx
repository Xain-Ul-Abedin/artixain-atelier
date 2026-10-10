'use client';

import React from 'react';
import { useDesigner } from '../../context/DesignerContext';
import { getGemstoneByCode } from '@artixain/shared';
import { Split, Grid2X2, Sparkles, Trash2, RotateCcw } from 'lucide-react';

export default function SymmetryTools() {
  const {
    applyBilateralSymmetry,
    applyQuadrantSymmetry,
    applyAlternatingSpacers,
    clearStrand,
    beads
  } = useDesigner();

  const handleApplyGoldSpacers = () => {
    const goldSpacer = getGemstoneByCode('GSP');
    if (goldSpacer) applyAlternatingSpacers(goldSpacer);
  };

  const handleApplySilverSpacers = () => {
    const silverSpacer = getGemstoneByCode('SSP');
    if (silverSpacer) applyAlternatingSpacers(silverSpacer);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white/70 dark:bg-obsidian-900/70 backdrop-blur-xl rounded-2xl border border-zinc-200/80 dark:border-white/10 shadow-sm">
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider mr-1">
          Symmetry Tools:
        </span>

        {/* Bilateral Mirror */}
        <button
          onClick={applyBilateralSymmetry}
          disabled={beads.length < 2}
          className="btn-pill-secondary py-1.5 px-3 text-xs disabled:opacity-40"
        >
          <Split className="w-3.5 h-3.5 text-champagne-500" />
          <span>Bilateral Mirror</span>
        </button>

        {/* 4-Quadrant Symmetry */}
        <button
          onClick={applyQuadrantSymmetry}
          disabled={beads.length < 4}
          className="btn-pill-secondary py-1.5 px-3 text-xs disabled:opacity-40"
        >
          <Grid2X2 className="w-3.5 h-3.5 text-champagne-500" />
          <span>4-Quadrant</span>
        </button>

        {/* Gold Spacers */}
        <button
          onClick={handleApplyGoldSpacers}
          disabled={beads.length < 2}
          className="btn-pill-secondary py-1.5 px-3 text-xs disabled:opacity-40"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Gold Spacers</span>
        </button>

        {/* Silver Spacers */}
        <button
          onClick={handleApplySilverSpacers}
          disabled={beads.length < 2}
          className="btn-pill-secondary py-1.5 px-3 text-xs disabled:opacity-40"
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          <span>Silver Spacers</span>
        </button>
      </div>

      {/* Clear Strand */}
      <button
        onClick={clearStrand}
        disabled={beads.length === 0}
        className="btn-pill py-1.5 px-3 bg-zinc-100 hover:bg-rose-50 text-zinc-600 hover:text-rose-600 dark:bg-zinc-800 dark:hover:bg-rose-950/60 dark:text-zinc-300 dark:hover:text-rose-300 text-xs transition-colors disabled:opacity-40"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Clear Strand</span>
      </button>
    </div>
  );
}
