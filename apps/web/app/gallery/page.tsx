'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ShimmerImage from '../../components/ui/ShimmerImage';
import { Sparkles, ArrowRight, Heart, Search } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    id: 'dreamy-kitty',
    title: 'Dreamy Kitty',
    category: 'Love',
    price: 35.63,
    originalPrice: 50.90,
    discount: '-30%',
    likes: '4,466',
    image: '/images/designs/dreamy-kitty.webp',
    description: 'Rose Quartz and Moonstone aura with celestial heart harmony.',
    token: 'artx.v1.RSQ8_MOON8_AMY8_OPL8'
  },
  {
    id: 'gilded-ash',
    title: 'Gilded Ash',
    category: 'Protection',
    price: 22.05,
    originalPrice: 31.50,
    discount: '-30%',
    likes: '6,435',
    image: '/images/designs/gilded-ash.webp',
    description: 'Black Obsidian, Labradorite, and Hematite grounding shield.',
    token: 'artx.v1.OBS8_LAB8_HEM8_TIG8'
  },
  {
    id: 'golden-dawn',
    title: 'Golden Dawn',
    category: 'Abundance',
    price: 22.61,
    originalPrice: 32.30,
    discount: '-30%',
    likes: '9,139',
    image: '/images/designs/golden-dawn.webp',
    description: 'Solar Citrine and Golden Tiger Eye prosperity alignment.',
    token: 'artx.v1.CIT8_SUN8_TIG8_PYR8'
  },
  {
    id: 'persona-code',
    title: 'Persona Code',
    category: 'Intuition',
    price: 23.10,
    originalPrice: 33.00,
    discount: '-30%',
    likes: '3,716',
    image: '/images/designs/persona-code.webp',
    description: 'Lapis Lazuli with golden pyrite flecks and obsidian anchor.',
    token: 'artx.v1.LAP8_OBS8_SOD8_HEM8'
  },
  {
    id: 'imperial-amethyst',
    title: 'Imperial Amethyst & Diamond',
    category: 'Intuition',
    price: 32.48,
    originalPrice: 46.40,
    discount: '-30%',
    likes: '5,120',
    image: '/images/designs/imperial-amethyst.webp',
    description: 'Crown chakra deep violet Amethyst with faceted Clear Quartz accents.',
    token: 'artx.v1.AMY8_CLR8_LEV8_SLV6'
  },
  {
    id: 'morning-dew',
    title: 'Morning Dew',
    category: 'Love',
    price: 25.90,
    originalPrice: 37.00,
    discount: '-30%',
    likes: '4,890',
    image: '/images/designs/morning-dew.webp',
    description: 'Aquamarine serenity balanced with translucent iridescent Moonstone.',
    token: 'artx.v1.AQU8_MOON8_CLR8_AMZ8'
  },
  {
    id: 'the-ice',
    title: 'The Ice',
    category: 'Protection',
    price: 28.00,
    originalPrice: 40.00,
    discount: '-30%',
    likes: '6,210',
    image: '/images/designs/the-ice.webp',
    description: 'Glacial crystal quartz formula with luminous selenite vibration.',
    token: 'artx.v1.CLR8_AQU8_SEL8_WHT8'
  },
  {
    id: 'ethereal-serenity',
    title: 'Ethereal Serenity',
    category: 'Love',
    price: 31.50,
    originalPrice: 45.00,
    discount: '-30%',
    likes: '7,440',
    image: '/images/designs/ethereal-serenity.webp',
    description: 'Angel Aura Quartz with soft Morganite and lavender amethyst.',
    token: 'artx.v1.ANG8_RSQ8_LIL8_GLD6'
  }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0E0E10] text-[#1D1D1F] dark:text-zinc-100 container mx-auto px-4 py-8 max-w-[1720px] pt-28 md:pt-32 transition-colors duration-300">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[11px] font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
          <span>Curated Design Gallery</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-zinc-950 dark:text-white mb-2">
          Patron & Artisan Formulations
        </h1>
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          Explore handcrafted bespoke formulas designed by our community and master atelier artisans. Click any piece to remix and calibrate to your wrist in the Customizer Studio.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-100 dark:border-white/10">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {['All', 'Love', 'Protection', 'Abundance', 'Intuition'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search designs or minerals..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:ring-1 focus:ring-zinc-400 border border-transparent dark:border-zinc-700"
          />
        </div>
      </div>

      {/* Design Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 p-3.5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-800 mb-3">
              <ShimmerImage
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                containerClassName="h-full w-full"
              />
              {/* Seamless borderless watermark mask card matching container background */}
              <div className="absolute inset-x-0 bottom-0 h-9 sm:h-10 bg-white dark:bg-zinc-900 pointer-events-none z-10" />

              <div className="absolute top-2.5 left-2.5 inline-flex items-center rounded-full bg-zinc-900 dark:bg-white px-2 py-0.5 text-[10px] font-bold text-white dark:text-zinc-900 shadow-sm z-20">
                {item.discount}
              </div>
              <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold text-zinc-700 dark:text-zinc-200 shadow-sm z-20">
                <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                <span>{item.likes}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block mb-0.5">
                {item.category}
              </span>
              <h3 className="font-serif font-bold text-sm text-zinc-900 dark:text-white truncate mb-1">
                {item.title}
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-bold text-sm text-zinc-900 dark:text-white">
                  ${item.price.toFixed(2)}
                </span>
                <span className="text-xs text-zinc-400 line-through">
                  ${item.originalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href={`/designer?remix=${item.id}&token=${item.token}`}
              className="w-full py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 text-xs font-semibold text-center transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              <span>Remix in Designer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
