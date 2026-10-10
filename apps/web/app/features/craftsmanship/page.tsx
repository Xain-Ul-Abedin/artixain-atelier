'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CraftsmanshipPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl pt-28">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier Handcrafted Excellence</span>
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-950 mb-4">
          Master Artisan Stringing & QC
        </h1>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">
          Unlike mass-produced factory jewelry, every Astris bracelet is individually assembled by bench jewelers according to your exact bead-by-bead sequence blueprint.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="flex flex-col justify-center space-y-4 order-2 md:order-1">
          <h2 className="text-2xl font-serif font-bold text-zinc-900">
            Multi-Strand Elasticity & Double Surgeon Knots
          </h2>
          <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-light">
            We employ heavy-duty Japanese elastic polymer cords calibrated with +4.5cm of knot allowance. Every finished piece undergoes tensile load testing to ensure it can withstand daily wear, stretching, and removal without fraying.
          </p>
          <div className="pt-4 flex items-center gap-3">
            <Link
              href="/designer"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-2.5 text-xs font-semibold hover:bg-zinc-800 transition-colors"
            >
              <span>Design Your Strand</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-200 p-4 order-1 md:order-2">
          <img
            src="/images/features/3.webp"
            alt="Handcrafted Excellence"
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
