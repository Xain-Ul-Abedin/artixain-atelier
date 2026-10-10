'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Gem } from 'lucide-react';

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-200 p-4">
          <img
            src="/images/features/2.webp"
            alt="Nature's Finest"
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h2 className="text-2xl font-serif font-bold text-zinc-900">
            Grade-A Certified Mineral Quality
          </h2>
          <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-light">
            We reject reconstituted glass, synthetic resins, and dyed composites. Our lapis lazuli features natural golden pyrite inclusions, our labradorite displays genuine blue-gold labradorescence, and our obsidian is pure volcanic vitreous glass.
          </p>
          <div className="pt-4 flex items-center gap-3">
            <Link
              href="/encyclopedia"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-2.5 text-xs font-semibold hover:bg-zinc-800 transition-colors"
            >
              <span>Explore Gem Encyclopedia</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
