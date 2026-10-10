'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, BookOpen, Clock } from 'lucide-react';

const ARTICLES = [
  {
    slug: 'science-of-crystal-piezoelectricity',
    title: 'The Science of Quartz Piezoelectricity and Natural Minerals',
    excerpt: 'Explore the physical crystalline lattice structures that produce measurable vibrational frequencies under pressure.',
    readTime: '4 min read',
    category: 'Mineral Science'
  },
  {
    slug: 'chakra-balancing-with-minerals',
    title: 'Aligning the 7 Chakras: How to Pair Complementary Gemstones',
    excerpt: 'A comprehensive guide to matching root, solar plexus, and third eye stones for emotional balance.',
    readTime: '6 min read',
    category: 'Holistic Energy'
  },
  {
    slug: 'caring-for-elastic-gemstone-jewelry',
    title: 'How to Clean, Cleanse, and Protect Elastic Crystal Bracelets',
    excerpt: 'Practical maintenance guidelines to preserve the tensile strength of silicone cords and optical lustre of soft minerals.',
    readTime: '3 min read',
    category: 'Jewelry Care'
  }
];

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[1720px] pt-28 md:pt-32">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-widest mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Atelier Gazette & Knowledge</span>
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-950 mb-4">
          Mineralogy, Energy & Craft
        </h1>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">
          Deep-dive editorial articles on crystal origins, optical lapidary science, and mindful jewelry styling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {ARTICLES.map((art) => (
          <div
            key={art.slug}
            className="p-6 rounded-3xl bg-[#FAFAFA] border border-zinc-100 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                <span className="font-bold uppercase tracking-wider text-amber-700">{art.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{art.readTime}</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-zinc-900 mb-2">
                {art.title}
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                {art.excerpt}
              </p>
            </div>
            <Link
              href="/encyclopedia"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-amber-700 transition-colors"
            >
              <span>Read in Encyclopedia</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
