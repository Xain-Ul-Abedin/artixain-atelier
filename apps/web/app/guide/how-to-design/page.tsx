'use client';

import React from 'react';
import Link from 'next/link';
import ShimmerImage from '../../../components/ui/ShimmerImage';
import { Sparkles, ArrowRight, Ruler, CheckCircle2, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Measure & Calibrate Wrist Size',
    description: 'Use a flexible tape measure or our on-screen card calibration tool to measure your wrist snugly without slack. We automatically calculate the perfect bead count and +4.5cm elastic cord allowance.',
    image: '/images/design-guide/01.webp'
  },
  {
    step: '02',
    title: 'Select Mineral Energy & Colors',
    description: 'Browse our encyclopedia of 32 authentic natural crystals. Combine gemstones according to their chakra resonance, zodiac affinity, or visual aesthetic contrast.',
    image: '/images/design-guide/02.webp'
  },
  {
    step: '03',
    title: 'Drag, Reorder & Test Symmetry',
    description: 'Use the interactive 120 FPS strand canvas to position beads. Enable dual-axis or quad-axis symmetry tools to automatically mirror focal spacers and accent stones.',
    image: '/images/design-guide/03.webp'
  },
  {
    step: '04',
    title: 'Verify Fit & Atelier Stringing',
    description: 'Check the real-time fit indicator (Snug / Perfect / Loose). Once satisfied, submit your design. Our atelier stringing bench hand-crafts your bracelet using multi-strand silicone cord and reinforced double surgeon knots.',
    image: '/images/design-guide/04.webp'
  }
];

export default function HowToDesignPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl pt-28">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier Design Guide</span>
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-950 mb-4">
          How to Design Your Bracelet
        </h1>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">
          A step-by-step walkthrough to creating a meaningful, perfectly calibrated natural gemstone bracelet.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-16">
        {STEPS.map((s, idx) => (
          <div
            key={s.step}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
              idx % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Visual Guide Card */}
            <div className="w-full md:w-1/2 rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-200/80 p-4 shadow-md">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white p-4">
                <ShimmerImage
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-contain"
                  containerClassName="w-full h-full"
                />
              </div>
            </div>

            {/* Description */}
            <div className="w-full md:w-1/2 space-y-4">
              <span className="text-3xl font-serif font-bold text-amber-700">
                Step {s.step}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900">
                {s.title}
              </h2>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-light">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 p-10 rounded-3xl bg-zinc-900 text-white text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-serif font-bold">
          Ready to Craft Your Strand?
        </h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Open the Customizer Studio and start arranging your personalized gemstone combination now.
        </p>
        <Link
          href="/designer"
          className="inline-flex items-center gap-2 rounded-full bg-white text-zinc-900 px-8 py-3 text-xs font-bold hover:bg-zinc-100 transition-colors shadow-lg"
        >
          <span>Open Designer Studio</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
