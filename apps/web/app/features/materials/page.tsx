'use client';

import React from 'react';
import Link from 'next/link';
import ShimmerImage from '../../../components/ui/ShimmerImage';
import { Sparkles, ArrowRight, Gem, Ruler, Award } from 'lucide-react';

export default function MaterialsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl pt-28">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-widest mb-3">
          <Gem className="w-3.5 h-3.5" />
          <span>Nature's Finest Minerals</span>
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-950 mb-4">
          Ethically Sourced Natural Gemstones
        </h1>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">
          Every crystal in our atelier is hand-selected from certified ethical origins, evaluated for natural saturation, optical iridescence, and mineral density.
        </p>
      </div>

      {/* Row 1: Studio Quality Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
        <div className="group rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-200 p-3 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <ShimmerImage
              src="/images/features/2.webp"
              alt="Nature's Finest Natural Crystals"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              containerClassName="w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-[11px] font-semibold w-max">
            <Award className="w-3 h-3 text-amber-600" />
            <span>Grade-A Mineral Certification</span>
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900">
            Uncompromising Raw Purity
          </h2>
          <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-light">
            We reject reconstituted glass, synthetic resins, and dyed composites. Our lapis lazuli features natural golden pyrite inclusions, our labradorite displays genuine blue-gold labradorescence, and our obsidian is pure volcanic vitreous glass.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/encyclopedia"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-2.5 text-xs font-semibold hover:bg-zinc-800 transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <span>Explore Gem Encyclopedia</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Row 2: Bespoke Travertine Tray Inspection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
        <div className="flex flex-col justify-center space-y-4 order-2 md:order-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold w-max border border-amber-200">
            <Ruler className="w-3 h-3" />
            <span>Caliper-Verified Sizing</span>
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900">
            Fluted Travertine Inspection Trays
          </h2>
          <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-light">
            Before entering the stringing process, all beads are aligned on travertine groove trays. Our gemologists evaluate spherical roundness within 0.05mm tolerance using precision antique brass calipers.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/designer"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-2.5 text-xs font-semibold hover:bg-zinc-800 transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <span>Design with Natural Minerals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <div className="group rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-200 p-3 shadow-md hover:shadow-xl transition-all duration-300 order-1 md:order-2">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <ShimmerImage
              src="/images/hero/himalayan-salt-crystals.jpeg"
              alt="Raw Himalayan crystalline minerals on inspection tray"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              containerClassName="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
