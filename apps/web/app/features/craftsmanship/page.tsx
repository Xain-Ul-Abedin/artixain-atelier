'use client';

import React from 'react';
import Link from 'next/link';
import ShimmerImage from '../../../components/ui/ShimmerImage';
import { Sparkles, ArrowRight, CheckCircle2, Award } from 'lucide-react';

export default function CraftsmanshipPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[1720px] pt-28 md:pt-32">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier Handcrafted Excellence</span>
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-950 mb-4">
          Master Artisan Stringing & QC
        </h1>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">
          Unlike mass-produced factory jewelry, every Artixain bracelet is individually assembled by bench jewelers according to your exact bead-by-bead sequence blueprint.
        </p>
      </div>

      {/* Row 1: Studio Handcrafted Excellence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
        <div className="flex flex-col justify-center space-y-4 order-2 md:order-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-[11px] font-semibold w-max">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Zero-Slip Polymer Cord</span>
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900">
            Multi-Strand Elasticity & Double Surgeon Knots
          </h2>
          <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-light">
            We employ heavy-duty Japanese elastic polymer cords calibrated with +4.5cm of knot allowance. Every finished piece undergoes tensile load testing to ensure it can withstand daily wear, stretching, and removal without fraying.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/designer"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-2.5 text-xs font-semibold hover:bg-zinc-800 transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <span>Design Your Strand</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <div className="group rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-200 p-3 shadow-md hover:shadow-xl transition-all duration-300 order-1 md:order-2">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <ShimmerImage
              src="/images/features/3.webp"
              alt="Handcrafted Excellence"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              containerClassName="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Master Artisan Hands on Oak Workbench */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
        <div className="group rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-200 p-3 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <ShimmerImage
              src="/images/hero/triple-strand-pearl-bracelet.jpeg"
              alt="Artixain bespoke hand-threaded jewelry on bench"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              containerClassName="w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold w-max border border-amber-200">
            <Award className="w-3 h-3 text-amber-600" />
            <span>Master Bench Jewelers</span>
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900">
            Dedicated Bench Assembly
          </h2>
          <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-light">
            Each bead is threaded on an antique oak bench with dedicated grooves. The elastic core is pre-tensioned, double-looped through high-density focal stones, and concealed within a custom bead recess for seamless elegance.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/guide/how-to-design"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-2.5 text-xs font-semibold hover:bg-zinc-800 transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <span>Read Stringing Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
