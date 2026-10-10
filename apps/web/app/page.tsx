'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Play,
  Heart,
  ChevronRight,
  Star,
  CheckCircle2,
  X,
  Compass
} from 'lucide-react';

const CURATED_DESIGNS = [
  {
    id: 'dreamy-kitty',
    title: 'Dreamy Kitty',
    price: 35.63,
    originalPrice: 50.90,
    discount: '-30%',
    likes: '4,466',
    image: '/images/designs/dreamy-kitty.webp',
    beads: ['RSQ-8', 'MOON-8', 'AMY-8', 'OPL-8'],
    token: 'artx.v1.RSQ8_MOON8_AMY8_OPL8'
  },
  {
    id: 'gilded-ash',
    title: 'Gilded Ash',
    price: 22.05,
    originalPrice: 31.50,
    discount: '-30%',
    likes: '6,435',
    image: '/images/designs/gilded-ash.webp',
    beads: ['OBS-8', 'LAB-8', 'HEM-8', 'TIG-8'],
    token: 'artx.v1.OBS8_LAB8_HEM8_TIG8'
  },
  {
    id: 'golden-dawn',
    title: 'Golden Dawn',
    price: 22.61,
    originalPrice: 32.30,
    discount: '-30%',
    likes: '9,139',
    image: '/images/designs/golden-dawn.webp',
    beads: ['CIT-8', 'SUN-8', 'TIG-8', 'PYR-8'],
    token: 'artx.v1.CIT8_SUN8_TIG8_PYR8'
  },
  {
    id: 'persona-code',
    title: 'Persona Code',
    price: 23.10,
    originalPrice: 33.00,
    discount: '-30%',
    likes: '3,716',
    image: '/images/designs/persona-code.webp',
    beads: ['LAP-8', 'OBS-8', 'SOD-8', 'HEM-8'],
    token: 'artx.v1.LAP8_OBS8_SOD8_HEM8'
  },
  {
    id: 'imperial-amethyst',
    title: 'Imperial Amethyst & Diamond',
    price: 32.48,
    originalPrice: 46.40,
    discount: '-30%',
    likes: '5,120',
    image: '/images/designs/imperial-amethyst.webp',
    beads: ['AMY-8', 'CLR-8', 'LEV-8', 'SLV-6'],
    token: 'artx.v1.AMY8_CLR8_LEV8_SLV6'
  },
  {
    id: 'morning-dew',
    title: 'Morning Dew',
    price: 25.90,
    originalPrice: 37.00,
    discount: '-30%',
    likes: '4,890',
    image: '/images/designs/morning-dew.webp',
    beads: ['AQU-8', 'MOON-8', 'CLR-8', 'AMZ-8'],
    token: 'artx.v1.AQU8_MOON8_CLR8_AMZ8'
  },
  {
    id: 'the-ice',
    title: 'The Ice',
    price: 28.00,
    originalPrice: 40.00,
    discount: '-30%',
    likes: '6,210',
    image: '/images/designs/the-ice.webp',
    beads: ['CLR-8', 'AQU-8', 'SEL-8', 'WHT-8'],
    token: 'artx.v1.CLR8_AQU8_SEL8_WHT8'
  },
  {
    id: 'ethereal-serenity',
    title: 'Ethereal Serenity',
    price: 31.50,
    originalPrice: 45.00,
    discount: '-30%',
    likes: '7,440',
    image: '/images/designs/ethereal-serenity.webp',
    beads: ['ANG-8', 'RSQ-8', 'LIL-8', 'GLD-6'],
    token: 'artx.v1.ANG8_RSQ8_LIL8_GLD6'
  }
];

const REVIEWS = [
  {
    id: 1,
    author: 'Clara M.',
    rating: 5,
    date: 'Verified Buyer',
    bracelet: 'Custom Moonstone & Labradorite',
    comment: 'The customizer was so intuitive. Seeing my exact wrist circumference calibrated before ordering gave me total confidence. The bracelet arrived in stunning gift packaging and fits like a second skin.'
  },
  {
    id: 2,
    author: 'David L.',
    rating: 5,
    date: 'Verified Buyer',
    bracelet: 'Gilded Ash Formula',
    comment: 'The natural inclusions on the obsidian and tiger eye are authentic. You can feel the weight of real Grade-A minerals compared to cheap plastic imitations. Outstanding craftsmanship.'
  },
  {
    id: 3,
    author: 'Elena R.',
    rating: 5,
    date: 'Verified Buyer',
    bracelet: 'Dreamy Kitty Remix',
    comment: 'I designed matching bracelets for my sister and myself. The volume discount kicked in automatically. The elasticity and tension are perfect. 10/10 recommendation.'
  }
];

export default function HomePage() {
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-full bg-white text-[#1D1D1F] overflow-x-hidden pt-16">
      {/* 1. Hero Section (1:1 Exact Match with myastris.com) */}
      <section className="relative w-full h-screen min-h-[620px] flex flex-col md:flex-row items-center overflow-hidden bg-[#FAFAFA]">
        {/* Right 60% Full-Bleed Bracelet Visual with Left Gradient Fade */}
        <div className="absolute inset-0 md:left-auto md:right-0 md:w-[60%] h-full z-0">
          <div className="relative w-full h-full md:hidden">
            <img
              src="/images/hero/main-bracelet-mobile.webp"
              alt="Beautiful gemstone bracelet"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative w-full h-full hidden md:block">
            <img
              src="/images/hero/main-bracelet-desktop.webp"
              alt="Beautiful gemstone bracelet"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Subtle Left Fade into White Background */}
          <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 hidden md:block pointer-events-none" />
        </div>

        {/* Left 40% Typography & Action Container */}
        <div className="relative z-20 w-full md:w-[45%] h-full flex flex-col justify-end md:justify-center items-center md:items-start pointer-events-none pb-16 md:pb-0 md:pt-20 px-8 sm:px-12 md:pl-20 lg:pl-24">
          <div className="w-full pointer-events-auto flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="font-serif text-[clamp(2.1rem,6vw,2.75rem)] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[4rem] md:leading-[1.1] tracking-tight text-[#1D1D1F] mb-4 md:mb-6 leading-[1.15]">
              <span className="block font-medium">Designed by You</span>
              <span className="block italic text-zinc-400 font-light">Defined by Stars</span>
            </h1>

            <p className="text-zinc-500 text-[15px] md:text-base font-light leading-relaxed mb-8 md:mb-10 max-w-sm md:max-w-md">
              Craft your personal celestial energy.
            </p>

            {/* CTA Button Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/designer"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full px-8 md:px-9 py-3.5 md:py-4 bg-[#18181B] text-white font-semibold text-sm shadow-[0_18px_38px_-16px_rgba(24,24,27,0.75)] hover:bg-zinc-800 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
              >
                <span>Start Designing</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3 h-3 text-white" />
                </span>
                <span className="absolute right-3.5 top-3 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white/80 hover:bg-white text-zinc-800 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all w-full sm:w-auto shadow-sm"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust, Social Proof & Video Guide Section (1:1 Exact Match) */}
      <section className="overflow-hidden bg-[#FAFAFA] px-4 py-12 md:py-20 border-t border-zinc-100">
        <div className="mx-auto max-w-[1400px] md:max-w-[1300px]">
          {/* Header Row with Customer Counters */}
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center md:max-w-none md:flex-row md:items-end md:justify-between md:gap-10 md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <span className="inline-flex rounded-full border border-zinc-200 bg-white/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 shadow-sm">
                Trusted by ASTRIS customers
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[1.12] tracking-tight text-zinc-950">
                Helped customers complete{' '}
                <span className="whitespace-nowrap font-semibold text-zinc-900 underline decoration-zinc-300 decoration-2 underline-offset-4">
                  60,000+ designs
                </span>
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-zinc-500">
                10,000+ customers have completed a purchase
              </p>
            </div>

            {/* Stat Badges */}
            <div className="mt-6 flex w-full max-w-[22rem] items-center justify-center gap-3 md:mt-0 md:max-w-none md:justify-end">
              <div className="flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-4 py-2 shadow-sm">
                <span className="text-base font-black text-amber-600">60,000+</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Designs</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-4 py-2 shadow-sm">
                <span className="text-base font-black text-amber-600">10,000+</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Purchases</span>
              </div>
            </div>
          </div>

          {/* Featured Video Walkthrough Card */}
          <article className="mx-auto mt-10 grid max-w-4xl overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-xl md:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]">
            <div className="flex flex-col justify-center p-6 md:p-10 text-center md:text-left">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-600">
                Design guide
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-serif font-semibold text-zinc-950">
                Step-by-step design
              </h3>
              <p className="mt-2 text-xs md:text-sm text-zinc-500 leading-relaxed">
                Watch the full walkthrough before opening the designer. Learn wrist measurement, gemstone energy balance, and custom bead stringing.
              </p>
              <div className="mt-6">
                <Link
                  href="/guide/how-to-design"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-amber-600 transition-colors"
                >
                  <span>Read Complete Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="flex justify-center bg-zinc-100 p-4">
              <div className="relative aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-2xl bg-zinc-900 shadow-md group cursor-pointer" onClick={() => setActiveVideoModal('guide')}>
                <img
                  src="/images/video/guide.png"
                  alt="Step-by-step design walkthrough"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  type="button"
                  aria-label="Play design guide"
                  className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-zinc-900 shadow-xl backdrop-blur transition-all hover:scale-110 active:scale-95"
                >
                  <Play className="ml-0.5 w-5 h-5 fill-current" />
                </button>
              </div>
            </div>
          </article>

          {/* Marquee Video Reviews Track */}
          <div className="relative mt-12 overflow-hidden pb-4">
            <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max">
              {[
                { img: '/images/video/comment_1.png', label: 'Real customer feedback', user: '@sarah_gem' },
                { img: '/images/video/comment_2.png', label: 'Designed and purchased', user: '@david_wrist' },
                { img: '/images/video/comment_3.png', label: 'Unboxing ceremony', user: '@chloe_luxe' },
                { img: '/images/video/comment_1.png', label: 'Real customer feedback', user: '@sarah_gem' },
                { img: '/images/video/comment_2.png', label: 'Designed and purchased', user: '@david_wrist' },
                { img: '/images/video/comment_3.png', label: 'Unboxing ceremony', user: '@chloe_luxe' }
              ].map((vid, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveVideoModal(vid.user)}
                  className="group relative w-[180px] md:w-[220px] shrink-0 overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white p-2 shadow-md hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-zinc-100">
                    <img
                      src={vid.img}
                      alt={vid.label}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <button
                      type="button"
                      aria-label="Play customer review"
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg group-hover:scale-110 transition-transform"
                    >
                      <Play className="ml-0.5 w-4 h-4 fill-current" />
                    </button>
                    <div className="absolute bottom-3 left-3 text-white text-[11px] font-semibold">
                      {vid.user}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. "Crafted by You, Refined by Us" Editorial Feature Grid (1:1 Exact Match) */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] md:max-w-[1300px]">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] leading-tight">
              <span className="block font-medium tracking-tight">Crafted by You</span>
              <span className="block italic text-zinc-400 font-light mt-1">Refined by Us</span>
            </h2>
          </div>

          {/* 12-Column Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[650px]">
            {/* Left Column (4 cols): Tall Crystal Encyclopedia Card */}
            <Link
              href="/encyclopedia"
              className="md:col-span-4 bg-[#FAFAFA] rounded-[2rem] overflow-hidden relative group flex flex-col h-[400px] md:h-full transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-xl border border-zinc-100"
            >
              <div className="relative h-[65%] w-full bg-[#FAFAFA] overflow-hidden">
                <img
                  src="/images/features/1.webp"
                  alt="Crystal Encyclopedia"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="hidden md:block absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none" />
              </div>
              <div className="h-[35%] p-6 md:p-8 flex flex-col justify-center text-center md:text-left bg-[#FAFAFA] group-hover:bg-white transition-colors">
                <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 mb-2">
                  Crystal Encyclopedia
                </h3>
                <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                  Explore natural gemstones, their unique properties, chakra connections, zodiac influences, and care rituals.
                </p>
              </div>
            </Link>

            {/* Right Column (8 cols): Two Horizontal Split Cards */}
            <div className="md:col-span-8 flex flex-col gap-6 h-full">
              {/* Top Horizontal Card: Nature's Finest */}
              <Link
                href="/features/materials"
                className="bg-[#FAFAFA] rounded-[2rem] overflow-hidden relative group flex flex-col md:flex-row flex-1 transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-xl border border-zinc-100"
              >
                <div className="h-[55%] md:h-full md:w-[60%] relative overflow-hidden">
                  <img
                    src="/images/features/2.webp"
                    alt="Nature's Finest"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="hidden md:block absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none" />
                </div>
                <div className="h-[45%] md:h-full md:w-[40%] p-6 md:p-8 flex flex-col justify-center text-center md:text-left bg-[#FAFAFA] group-hover:bg-white transition-colors">
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 mb-2">
                    Nature's Finest
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                    Ethically sourced gemstones, hand-picked to showcase their inherent natural beauty and energy.
                  </p>
                </div>
              </Link>

              {/* Bottom Horizontal Card: Handcrafted */}
              <Link
                href="/features/craftsmanship"
                className="bg-[#FAFAFA] rounded-[2rem] overflow-hidden relative group flex flex-col md:flex-row flex-1 transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-xl border border-zinc-100"
              >
                <div className="h-[45%] md:h-full md:w-[40%] p-6 md:p-8 flex flex-col justify-center text-center md:text-left order-2 md:order-1 bg-[#FAFAFA] group-hover:bg-white transition-colors">
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 mb-2">
                    Handcrafted
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                    Meticulously handcrafted with passion, creating timeless pieces that mass production cannot replicate.
                  </p>
                </div>
                <div className="h-[55%] md:h-full md:w-[60%] relative order-1 md:order-2 overflow-hidden">
                  <img
                    src="/images/features/3.webp"
                    alt="Handcrafted"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="hidden md:block absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#FAFAFA] to-transparent pointer-events-none" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Spark Your Imagination" Curated Designs Gallery (1:1 Exact Match) */}
      <section className="px-4 py-16 md:py-24 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[1400px] md:max-w-[1300px]">
          <div className="relative overflow-hidden rounded-[2rem] border border-amber-100 bg-[radial-gradient(circle_at_12%_12%,rgba(251,191,36,0.14),transparent_26%),linear-gradient(135deg,#fff7ed,#ffffff_46%,#ffffff)] p-6 md:p-10 shadow-sm">
            {/* Header */}
            <div className="relative mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-700 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Design Inspiration</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-zinc-950">
                  <span className="block">Spark Your</span>
                  <span className="block italic text-zinc-400 font-light">Imagination</span>
                </h2>
                <p className="mt-1 text-xs md:text-sm text-zinc-600">
                  Curated designs to inspire your unique creation.
                </p>
              </div>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all hover:-translate-y-0.5"
              >
                <span>View All Designs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 8 Curated Design Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {CURATED_DESIGNS.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl md:rounded-3xl bg-white border border-zinc-100 p-3 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl md:rounded-2xl bg-zinc-50 mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 inline-flex items-center rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      {item.discount}
                    </div>
                    <div className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-zinc-700 shadow-sm">
                      <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                      <span>{item.likes}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-sm text-zinc-900 truncate mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-bold text-sm text-amber-700">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-zinc-400 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/designer?remix=${item.id}&token=${item.token}`}
                    className="w-full py-2 rounded-full bg-zinc-100 group-hover:bg-zinc-900 group-hover:text-white text-zinc-800 text-[11px] font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Remix in Studio</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials & Reviews (1:1 Exact Match) */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] md:max-w-[1300px]">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-2">
              Customer Experiences
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-zinc-950">
              Loved by Crystal Enthusiasts Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-6 md:p-8 rounded-3xl bg-[#FAFAFA] border border-zinc-100 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(5)].map((_, i) => (
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
                    <span className="text-[11px] text-zinc-400">{rev.bracelet}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/reviews"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all hover:-translate-y-0.5"
            >
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative max-w-sm w-full bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl p-4 text-center">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center text-white">
              <p className="text-xs text-zinc-400 p-6">
                Playing walkthrough presentation for {activeVideoModal}.
              </p>
            </div>
            <p className="text-xs text-zinc-400 mt-3">
              Astris Studio Walkthrough &copy; 2024
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
