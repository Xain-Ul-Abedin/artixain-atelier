'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Gem,
  Ruler,
  Compass,
  CheckCircle2,
  Tag,
  Flame
} from 'lucide-react';
import { CURATED_PREMADES, MASTER_GEMSTONES } from '@artixain/shared';

export default function HomePage() {
  const featuredPremades = CURATED_PREMADES.slice(0, 4);
  const featuredGems = MASTER_GEMSTONES.filter((g) =>
    ['OBS', 'TIG', 'LAB', 'LAP', 'RSQ', 'MAL'].includes(g.code)
  );

  return (
    <div className="flex flex-col gap-16 md:gap-24 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-16 px-4 bg-radial-vignette border-b border-zinc-200/70 dark:border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne-500/10 dark:bg-champagne-500/20 border border-champagne-500/30 text-champagne-700 dark:text-champagne-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[11px] uppercase font-bold tracking-[0.25em]">
                Bespoke Mineral Alchemy • 2026 Atelier
              </span>
            </div>

            {/* Editorial Serif Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-obsidian-900 dark:text-white leading-[1.08] tracking-tight">
              Bespoke Gemstone Bracelets <br />
              <span className="italic font-normal text-champagne-600 dark:text-champagne-400">
                Calibrated to Your Wrist
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed font-sans">
              Craft your signature strand using our 2D procedural mineral canvas. Select from 32 Grade-A natural crystals, calibrate your exact wrist circumference, and have master artisans hand-string your bracelet.
            </p>

            {/* Dual CTA Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/studio"
                className="btn-pill-primary py-3.5 px-8 text-sm flex items-center gap-2 shadow-luxury hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-champagne-400" />
                <span>Enter Custom Studio</span>
              </Link>
              <Link
                href="/shop"
                className="btn-pill-secondary py-3.5 px-8 text-sm flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-zinc-500" />
                <span>Explore Curated Sets</span>
              </Link>
            </div>

            {/* Floating Luxury Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 w-full border-t border-zinc-200/60 dark:border-white/10 mt-6 text-left">
              <div className="p-3 rounded-2xl bg-white/60 dark:bg-obsidian-900/60 backdrop-blur-md border border-zinc-200/60 dark:border-white/5">
                <span className="text-xl font-serif font-bold text-obsidian-900 dark:text-white block">
                  32
                </span>
                <span className="text-[11px] text-zinc-500">
                  Grade-A Natural Minerals
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/60 dark:bg-obsidian-900/60 backdrop-blur-md border border-zinc-200/60 dark:border-white/5">
                <span className="text-xl font-serif font-bold text-obsidian-900 dark:text-white block">
                  0.1mm
                </span>
                <span className="text-[11px] text-zinc-500">
                  Wrist Sizing Accuracy
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/60 dark:bg-obsidian-900/60 backdrop-blur-md border border-zinc-200/60 dark:border-white/5">
                <span className="text-xl font-serif font-bold text-champagne-600 dark:text-champagne-400 block">
                  $19 Flat
                </span>
                <span className="text-[11px] text-zinc-500">
                  4th+ Bracelet Volume Tier
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/60 dark:bg-obsidian-900/60 backdrop-blur-md border border-zinc-200/60 dark:border-white/5">
                <span className="text-xl font-serif font-bold text-obsidian-900 dark:text-white block">
                  100%
                </span>
                <span className="text-[11px] text-zinc-500">
                  Physical Atelier Hand-Strung
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Gemstone Spotlight */}
      <section className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-champagne-600 dark:text-champagne-400">
                Natural Mineral Specimen
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-obsidian-900 dark:text-white">
              Authentic Crystals & Rare Gemstones
            </h2>
          </div>
          <Link
            href="/encyclopedia"
            className="btn-pill-secondary py-2 px-4 text-xs shrink-0 self-start md:self-auto"
          >
            <span>View Full Encyclopedia (32 Minerals)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Gemstone Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredGems.map((gem) => (
            <div
              key={gem.id}
              className="group p-4 rounded-3xl bg-white/80 dark:bg-zinc-800/60 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 hover:border-champagne-400/80 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Gem Sphere Swatch */}
              <div
                className="w-16 h-16 rounded-full border border-black/10 dark:border-white/20 shadow-md group-hover:scale-110 transition-transform duration-300 mb-3"
                style={{
                  background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8) 0%, ${gem.colorHex} 50%, ${gem.secondaryColorHex || '#18181B'} 100%)`
                }}
              />
              <span className="text-sm font-bold text-obsidian-900 dark:text-white">
                {gem.name}
              </span>
              <span className="text-[10px] text-zinc-500 mt-0.5">
                {gem.chakra} Chakra
              </span>
              <span className="text-xs font-semibold text-champagne-600 dark:text-champagne-400 mt-2">
                From ${gem.pricesByDiameter[8].toFixed(2)}/bead
              </span>
              <Link
                href={`/studio?gem=${gem.code}`}
                className="btn-pill py-1 px-3 mt-3 bg-zinc-100 dark:bg-zinc-700/80 hover:bg-champagne-500 hover:text-white text-[10px] font-medium transition-colors w-full"
              >
                Add in Studio
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 3-Step Atelier Customizer Journey */}
      <section className="bg-zinc-50 dark:bg-obsidian-900/40 py-16 border-y border-zinc-200/70 dark:border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-champagne-600 dark:text-champagne-400">
              The Bespoke Process
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-obsidian-900 dark:text-white mt-1">
              How Your Bracelet is Created
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 mt-2">
              A seamless bridge between digital procedural design and physical artisan stringing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-white/10 shadow-sm relative overflow-hidden">
              <div className="icon-orb w-12 h-12 bg-champagne-500/10 text-champagne-600 dark:text-champagne-400 mb-4 font-serif font-bold text-lg">
                01
              </div>
              <h3 className="text-base font-bold text-obsidian-900 dark:text-white mb-2">
                Curate Mineral Strand
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Arrange beads on the 2D radial canvas with real-time mineral shader reflections, bilateral symmetry tools, and 14K gold spacers.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-white/10 shadow-sm relative overflow-hidden">
              <div className="icon-orb w-12 h-12 bg-champagne-500/10 text-champagne-600 dark:text-champagne-400 mb-4 font-serif font-bold text-lg">
                02
              </div>
              <h3 className="text-base font-bold text-obsidian-900 dark:text-white mb-2">
                Calibrate Wrist Sizing
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Use anthropometric body ratio regression or the on-screen credit card caliper to ensure a tailored millimeter-accurate fit.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-white/10 shadow-sm relative overflow-hidden">
              <div className="icon-orb w-12 h-12 bg-champagne-500/10 text-champagne-600 dark:text-champagne-400 mb-4 font-serif font-bold text-lg">
                03
              </div>
              <h3 className="text-base font-bold text-obsidian-900 dark:text-white mb-2">
                Atelier Hand-Stringing
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Our master artisans follow the exact visual stringing sequence, cord knot allowance, and quality checks before shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Volume Discount Tier Banner */}
      <section className="container mx-auto px-4 max-w-7xl">
        <div className="p-8 md:p-12 rounded-3xl bg-obsidian-900 dark:bg-zinc-900 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-champagne-500/30">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/20 text-champagne-300 text-[10px] uppercase font-bold tracking-widest">
              <Tag className="w-3.5 h-3.5" />
              <span>Multi-Tier Volume Incentives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
              Stack Your Strands & Unlock Exceptional Atelier Savings
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Mix and match bespoke custom designs and signature premades. The more you curate, the greater your atelier tier rewards.
            </p>
          </div>

          {/* Tier Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="text-xs text-zinc-400 block">2nd Bracelet</span>
              <span className="text-xl font-serif font-bold text-champagne-400">
                25% OFF
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="text-xs text-zinc-400 block">3rd Bracelet</span>
              <span className="text-xl font-serif font-bold text-champagne-400">
                35% OFF
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-champagne-500/20 backdrop-blur-md border border-champagne-400 text-center">
              <span className="text-xs text-champagne-300 block font-semibold">4th+ Bracelet</span>
              <span className="text-xl font-serif font-bold text-white">
                $19 FLAT
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Curated Sets */}
      <section className="container mx-auto px-4 max-w-7xl pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-champagne-600 dark:text-champagne-400">
              Artisan Catalog
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-obsidian-900 dark:text-white">
              Curated Premade Collections
            </h2>
          </div>
          <Link
            href="/shop"
            className="btn-pill-secondary py-2 px-4 text-xs shrink-0"
          >
            <span>View All Curated Sets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Premade Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPremades.map((premade) => (
            <div
              key={premade.id}
              className="group p-5 rounded-3xl bg-white/80 dark:bg-zinc-800/60 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 hover:border-champagne-400 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-champagne-600 dark:text-champagne-400 bg-champagne-500/10 px-2.5 py-0.5 rounded-full">
                  {premade.category}
                </span>
                <h3 className="text-base font-serif font-bold text-obsidian-900 dark:text-white mt-2">
                  {premade.name}
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-2 mt-1">
                  {premade.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block">Price</span>
                  <span className="text-base font-bold text-obsidian-900 dark:text-white">
                    ${premade.basePrice.toFixed(2)}
                  </span>
                </div>
                <Link
                  href={`/studio?design=${encodeURIComponent(premade.designToken)}`}
                  className="btn-pill-primary py-2 px-4 text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
                  <span>Remix</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
