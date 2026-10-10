'use client';

import React from 'react';
import Link from 'next/link';
import { Star, CheckCircle2, Heart, ArrowRight, Sparkles } from 'lucide-react';

const ALL_REVIEWS = [
  {
    id: 1,
    author: 'Clara M.',
    rating: 5,
    location: 'New York, US',
    date: 'October 2026',
    bracelet: 'Custom Moonstone & Labradorite',
    comment: 'The customizer was so intuitive. Seeing my exact wrist circumference calibrated before ordering gave me total confidence. The bracelet arrived in stunning gift packaging and fits like a second skin.'
  },
  {
    id: 2,
    author: 'David L.',
    rating: 5,
    location: 'London, UK',
    date: 'October 2026',
    bracelet: 'Gilded Ash Formula',
    comment: 'The natural inclusions on the obsidian and tiger eye are authentic. You can feel the weight of real Grade-A minerals compared to cheap plastic imitations. Outstanding craftsmanship.'
  },
  {
    id: 3,
    author: 'Elena R.',
    rating: 5,
    location: 'Toronto, CA',
    date: 'September 2026',
    bracelet: 'Dreamy Kitty Remix',
    comment: 'I designed matching bracelets for my sister and myself. The volume discount kicked in automatically. The elasticity and tension are perfect. 10/10 recommendation.'
  },
  {
    id: 4,
    author: 'Julian B.',
    rating: 5,
    location: 'Berlin, DE',
    date: 'September 2026',
    bracelet: 'Persona Code (Lapis & Pyrite)',
    comment: 'The pyrite flecks in the deep ultramarine lapis are breathtaking under sunlight. The double surgeon knot is invisible. Very high luxury standard.'
  },
  {
    id: 5,
    author: 'Sophia S.',
    rating: 5,
    location: 'Sydney, AU',
    date: 'September 2026',
    bracelet: 'Imperial Amethyst & Clear Quartz',
    comment: 'The color gradient from deep purple amethyst to ice clear quartz is completely uniform. Arrived in 4 days with free tracked courier shipping.'
  },
  {
    id: 6,
    author: 'Marcus T.',
    rating: 5,
    location: 'Chicago, US',
    date: 'August 2026',
    bracelet: 'Golden Dawn (Citrine & Sunstone)',
    comment: 'Warm golden energy and superb polish. The 8mm beads are calibrated with zero flat spots. Highly satisfied with my custom design.'
  }
];

export default function ReviewsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl pt-28">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Verified Client Feedback</span>
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-950 mb-4">
          Client Reviews & Experiences
        </h1>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">
          Over 10,000 satisfied customers have created custom mineral bracelets with Astris. Read their genuine impressions and unboxing stories below.
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {ALL_REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-6 md:p-8 rounded-3xl bg-[#FAFAFA] border border-zinc-100 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-light italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-200/60 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-zinc-900 block">{rev.author}</span>
                <span className="text-[11px] text-zinc-400">{rev.bracelet} &bull; {rev.location}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-10 rounded-3xl bg-zinc-900 text-white text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-serif font-bold">
          Design Your Own Custom Bracelet
        </h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Choose from 32 natural crystals, calibrate your wrist size, and have our artisans hand-string your creation today.
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
