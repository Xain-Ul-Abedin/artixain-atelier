'use client';

import React from 'react';
import { X, BookOpen, Ruler, Sparkles, CheckCircle2, Mail, ExternalLink } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400">Atelier Reference</p>
              <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-white">
                Designer Guide & Sizing Chart
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
            aria-label="Close guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto space-y-6 py-4 text-xs sm:text-sm">
          {/* Section 1: How to Design Step-by-Step */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[11px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>How to Design</span>
            </div>
            <h4 className="text-base font-serif font-semibold text-zinc-900 dark:text-white mb-2">
              Build Your Bracelet Step by Step
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-white/5 space-y-1">
                <span className="inline-block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Step 1</span>
                <p className="font-semibold text-zinc-900 dark:text-white">Select Mineral Beads</p>
                <p className="text-zinc-500 text-xs">Browse by Protection, Love, Wealth, or Intuition. Tap any bead to add to your strand.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-white/5 space-y-1">
                <span className="inline-block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Step 2</span>
                <p className="font-semibold text-zinc-900 dark:text-white">Calibrate Wrist Size</p>
                <p className="text-zinc-500 text-xs">Use the screen credit-card caliper, body height/weight ratio, or enter your exact wrist size.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-white/5 space-y-1">
                <span className="inline-block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Step 3</span>
                <p className="font-semibold text-zinc-900 dark:text-white">Balance Symmetry</p>
                <p className="text-zinc-500 text-xs">Use 1-click Bilateral or Quadrant symmetry tools, or insert metallic spacers for harmonic balance.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-white/5 space-y-1">
                <span className="inline-block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Step 4</span>
                <p className="font-semibold text-zinc-900 dark:text-white">Save & Preview</p>
                <p className="text-zinc-500 text-xs">Preview your finished strand, check volume discounts, copy design code, or order atelier knotting.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Wrist Size Reference Chart */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[11px] font-bold uppercase tracking-wider mb-3">
              <Ruler className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
              <span>International Size Guide</span>
            </div>
            <h4 className="text-base font-serif font-semibold text-zinc-900 dark:text-white mb-2">
              Find Your Ideal Bracelet Fit
            </h4>
            <div className="rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <tr>
                    <th className="p-2.5">Fit Tier</th>
                    <th className="p-2.5">Wrist Size (cm)</th>
                    <th className="p-2.5">Inches</th>
                    <th className="p-2.5">Recommended For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-white/5 text-zinc-600 dark:text-zinc-400">
                  <tr>
                    <td className="p-2.5 font-medium text-zinc-900 dark:text-white">Extra Small (XS)</td>
                    <td className="p-2.5">14.0 - 15.0 cm</td>
                    <td className="p-2.5">5.5 - 5.9 in</td>
                    <td className="p-2.5">Petite wrists</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-zinc-900 dark:text-white">Small (S)</td>
                    <td className="p-2.5">15.0 - 16.0 cm</td>
                    <td className="p-2.5">5.9 - 6.3 in</td>
                    <td className="p-2.5">Standard slim build</td>
                  </tr>
                  <tr className="bg-amber-500/5 font-semibold text-zinc-900 dark:text-white">
                    <td className="p-2.5">Medium (M) &bull; Universal</td>
                    <td className="p-2.5">16.5 - 17.5 cm</td>
                    <td className="p-2.5">6.5 - 6.9 in</td>
                    <td className="p-2.5">Most common women / slim men</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-zinc-900 dark:text-white">Large (L)</td>
                    <td className="p-2.5">18.0 - 19.0 cm</td>
                    <td className="p-2.5">7.1 - 7.5 in</td>
                    <td className="p-2.5">Standard men / relaxed fit</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-zinc-900 dark:text-white">Extra Large (XL)</td>
                    <td className="p-2.5">&gt; 19.5 cm</td>
                    <td className="p-2.5">&gt; 7.7 in</td>
                    <td className="p-2.5">Broad wrists / loose drape</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[11px] text-zinc-400">
              * Note: For elastic silicone cord, our algorithm automatically adds 0.5cm ease so the bracelet fits comfortably without pinching.
            </p>
          </div>

          {/* Section 3: Concierge Support */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-white/10 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-zinc-900 dark:text-white text-xs">Need personal sizing or mineral advice?</p>
              <p className="text-zinc-500 text-[11px]">Our master bench artisans are ready to assist with custom requests.</p>
            </div>
            <a
              href="mailto:atelier@artixain.com"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Atelier</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-200/80 dark:border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 transition-colors"
          >
            Got it, Let's Design
          </button>
        </div>
      </div>
    </div>
  );
}
