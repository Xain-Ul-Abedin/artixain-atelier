'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeroSlider from '../components/hero/HeroSlider';
import ShimmerImage from '../components/ui/ShimmerImage';
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
  Compass,
  Ruler,
  Gem,
  Award,
  Layers
} from 'lucide-react';

interface CuratedDesign {
  id: string;
  title: string;
  category: 'Protection' | 'Love' | 'Abundance' | 'Intuition';
  price: number;
  originalPrice: number;
  discount: string;
  likes: number;
  image: string;
  beads: string[];
  token: string;
}

const CURATED_DESIGNS: CuratedDesign[] = [
  {
    id: 'dreamy-kitty',
    title: 'Dreamy Kitty',
    category: 'Love',
    price: 35.63,
    originalPrice: 50.90,
    discount: '-30%',
    likes: 4466,
    image: '/images/designs/dreamy-kitty.webp',
    beads: ['RSQ-8', 'MOON-8', 'AMY-8', 'OPL-8'],
    token: 'artx.v1.RSQ8_MOON8_AMY8_OPL8'
  },
  {
    id: 'gilded-ash',
    title: 'Gilded Ash',
    category: 'Protection',
    price: 22.05,
    originalPrice: 31.50,
    discount: '-30%',
    likes: 6435,
    image: '/images/designs/gilded-ash.webp',
    beads: ['OBS-8', 'LAB-8', 'HEM-8', 'TIG-8'],
    token: 'artx.v1.OBS8_LAB8_HEM8_TIG8'
  },
  {
    id: 'golden-dawn',
    title: 'Golden Dawn',
    category: 'Abundance',
    price: 22.61,
    originalPrice: 32.30,
    discount: '-30%',
    likes: 9139,
    image: '/images/designs/golden-dawn.webp',
    beads: ['CIT-8', 'SUN-8', 'TIG-8', 'PYR-8'],
    token: 'artx.v1.CIT8_SUN8_TIG8_PYR8'
  },
  {
    id: 'persona-code',
    title: 'Persona Code',
    category: 'Intuition',
    price: 23.10,
    originalPrice: 33.00,
    discount: '-30%',
    likes: 3716,
    image: '/images/designs/persona-code.webp',
    beads: ['LAP-8', 'OBS-8', 'SOD-8', 'HEM-8'],
    token: 'artx.v1.LAP8_OBS8_SOD8_HEM8'
  },
  {
    id: 'imperial-amethyst',
    title: 'Imperial Amethyst & Diamond',
    category: 'Intuition',
    price: 32.48,
    originalPrice: 46.40,
    discount: '-30%',
    likes: 5120,
    image: '/images/designs/imperial-amethyst.webp',
    beads: ['AMY-8', 'CLR-8', 'LEV-8', 'SLV-6'],
    token: 'artx.v1.AMY8_CLR8_LEV8_SLV6'
  },
  {
    id: 'morning-dew',
    title: 'Morning Dew',
    category: 'Love',
    price: 25.90,
    originalPrice: 37.00,
    discount: '-30%',
    likes: 4890,
    image: '/images/designs/morning-dew.webp',
    beads: ['AQU-8', 'MOON-8', 'CLR-8', 'AMZ-8'],
    token: 'artx.v1.AQU8_MOON8_CLR8_AMZ8'
  },
  {
    id: 'the-ice',
    title: 'The Ice',
    category: 'Intuition',
    price: 28.00,
    originalPrice: 40.00,
    discount: '-30%',
    likes: 6210,
    image: '/images/designs/the-ice.webp',
    beads: ['CLR-8', 'AQU-8', 'SEL-8', 'WHT-8'],
    token: 'artx.v1.CLR8_AQU8_SEL8_WHT8'
  },
  {
    id: 'ethereal-serenity',
    title: 'Ethereal Serenity',
    category: 'Love',
    price: 31.50,
    originalPrice: 45.00,
    discount: '-30%',
    likes: 7440,
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
    date: 'Verified Patron',
    bracelet: 'Custom Triple Strand Pearl & Rose Quartz',
    comment: 'The customizer was so intuitive. Seeing my exact wrist circumference calibrated before ordering gave me total confidence. The bracelet arrived in stunning gift packaging and fits like a second skin.'
  },
  {
    id: 2,
    author: 'David L.',
    rating: 5,
    date: 'Verified Patron',
    bracelet: 'Gilded Ash Obsidian Formula',
    comment: 'The natural inclusions on the obsidian and tiger eye are authentic. You can feel the weight of real Grade-A minerals compared to cheap plastic imitations. Outstanding craftsmanship.'
  },
  {
    id: 3,
    author: 'Elena R.',
    rating: 5,
    date: 'Verified Patron',
    bracelet: 'Dreamy Kitty Remix',
    comment: 'I designed matching bracelets for my sister and myself. The volume discount kicked in automatically. The elasticity and tension are perfect. 10/10 recommendation.'
  }
];

export default function HomePage() {
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [likedDesigns, setLikedDesigns] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedDesigns((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredDesigns = selectedFilter === 'All'
    ? CURATED_DESIGNS
    : CURATED_DESIGNS.filter((d) => d.category === selectedFilter);

  return (
    <div className="flex flex-col w-full bg-white text-[#1D1D1F] overflow-x-hidden pt-16">
      {/* 1. Hero Section: Scrollable & Time-Advancing Hero Visuals with Authentic Photography */}
      <section className="relative w-full h-screen min-h-[640px] flex flex-col md:flex-row items-center overflow-hidden bg-[#FAFAFA]">
        {/* Right 55-60% Container: Interactive Time-Based Image Slider */}
        <div className="absolute inset-0 md:left-auto md:right-0 md:w-[60%] h-full z-0">
          <HeroSlider />
        </div>

        {/* Left 40-45% Typography & Action Container */}
        <div className="relative z-20 w-full md:w-[45%] h-full flex flex-col justify-end md:justify-center items-center md:items-start pointer-events-none pb-16 md:pb-0 md:pt-20 px-8 sm:px-12 md:pl-20 lg:pl-24">
          <div className="w-full pointer-events-auto flex flex-col items-center md:items-start text-center md:text-left">
            {/* Clean Static Luxury Badge (No Green Blinking AI Slop) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-zinc-200 text-[11px] font-semibold text-zinc-700 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
              <span>Artixain Atelier &bull; 100% Certified Natural Minerals</span>
            </div>

            <h1 className="font-serif text-[clamp(2.1rem,6vw,2.75rem)] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[4rem] md:leading-[1.1] tracking-tight text-[#1D1D1F] mb-4 md:mb-6 leading-[1.15]">
              <span className="block font-medium">Designed by You</span>
              <span className="block italic text-zinc-400 font-light">Crafted by Artixain</span>
            </h1>

            <p className="text-zinc-500 text-[15px] md:text-base font-light leading-relaxed mb-8 md:mb-10 max-w-sm md:max-w-md">
              Craft your bespoke gemstone bracelet. Interactive 120 FPS strand designer with millimeter wrist calibration and master bench fulfillment.
            </p>

            {/* CTA Button Actions (Clean & Free of Blinking Dots) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/designer"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full px-8 md:px-9 py-3.5 md:py-4 bg-[#18181B] text-white font-semibold text-sm shadow-[0_18px_38px_-16px_rgba(24,24,27,0.75)] hover:bg-zinc-800 hover:-translate-y-0.5 active:scale-[0.97] transition-all w-full sm:w-auto"
              >
                <span>Start Designing</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3 h-3 text-white" />
                </span>
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/90 hover:bg-white text-zinc-800 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all w-full sm:w-auto shadow-sm active:scale-[0.97]"
              >
                <Gem className="w-3.5 h-3.5 text-zinc-700" />
                <span>View Gallery</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust, Patron Counters & Walkthrough Video Section */}
      <section className="overflow-hidden bg-[#FAFAFA] px-4 py-12 md:py-20 border-t border-zinc-100">
        <div className="mx-auto max-w-[1400px] md:max-w-[1300px]">
          {/* Header Row with Patron Counters */}
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center md:max-w-none md:flex-row md:items-end md:justify-between md:gap-10 md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-600 shadow-sm">
                <Award className="w-3 h-3 text-zinc-800" />
                <span>Trusted by Artixain Patrons</span>
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[1.12] tracking-tight text-zinc-950">
                Helped patrons complete{' '}
                <span className="whitespace-nowrap font-semibold text-zinc-900 underline decoration-zinc-300 decoration-2 underline-offset-4">
                  60,000+ custom designs
                </span>
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-zinc-500 font-light">
                10,000+ patrons have completed master atelier orders
              </p>
            </div>

            {/* Stat Badges */}
            <div className="mt-6 flex w-full max-w-[22rem] items-center justify-center gap-3 md:mt-0 md:max-w-none md:justify-end">
              <div className="flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-4 py-2 shadow-sm">
                <span className="text-base font-black text-zinc-900">60,000+</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Designs</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-4 py-2 shadow-sm">
                <span className="text-base font-black text-zinc-900">10,000+</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Purchases</span>
              </div>
            </div>
          </div>

          {/* Featured Video Walkthrough Card with Shimmer Skeletal Loader */}
          <article className="mx-auto mt-10 grid max-w-4xl overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-xl md:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]">
            <div className="flex flex-col justify-center p-6 md:p-10 text-center md:text-left">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-600">
                Design guide
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-serif font-semibold text-zinc-950">
                Step-by-step design
              </h3>
              <p className="mt-2 text-xs md:text-sm text-zinc-500 leading-relaxed font-light">
                Watch the complete walkthrough before opening the studio. Learn wrist measurement, gemstone energy balance, and custom bead stringing.
              </p>
              <div className="mt-6">
                <Link
                  href="/guide/how-to-design"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-amber-800 transition-colors"
                >
                  <span>Read Complete Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="flex justify-center bg-zinc-100 p-4">
              <div
                className="relative aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-2xl bg-zinc-900 shadow-md group cursor-pointer"
                onClick={() => setActiveVideoModal('Design Walkthrough')}
              >
                <ShimmerImage
                  src="/images/video/guide.png"
                  alt="Step-by-step design walkthrough"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="h-full w-full"
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

          {/* Marquee Video Reviews Track with Shimmer Skeletons */}
          <div className="relative mt-12 overflow-hidden pb-4">
            <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max">
              {[
                { img: '/images/video/comment_1.png', label: 'Real patron feedback', user: '@sarah_gem' },
                { img: '/images/video/comment_2.png', label: 'Designed and purchased', user: '@david_wrist' },
                { img: '/images/video/comment_3.png', label: 'Unboxing ceremony', user: '@chloe_luxe' },
                { img: '/images/video/comment_1.png', label: 'Real patron feedback', user: '@sarah_gem' },
                { img: '/images/video/comment_2.png', label: 'Designed and purchased', user: '@david_wrist' },
                { img: '/images/video/comment_3.png', label: 'Unboxing ceremony', user: '@chloe_luxe' }
              ].map((vid, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveVideoModal(vid.user)}
                  className="group relative w-[180px] md:w-[220px] shrink-0 overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white p-2 shadow-md hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-zinc-100">
                    <ShimmerImage
                      src={vid.img}
                      alt={vid.label}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      containerClassName="h-full w-full"
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

      {/* 3. "Crafted by You, Refined by Us" Feature Bento Grid using User's Authentic Photography */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] md:max-w-[1300px]">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-bold uppercase tracking-wider mb-2">
              <Gem className="w-3.5 h-3.5 text-zinc-900" />
              <span>Atelier Principles</span>
            </span>
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
                <ShimmerImage
                  src="/images/features/1.webp"
                  alt="Natural Mineral Encyclopedia"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="hidden md:block absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none" />
              </div>
              <div className="h-[35%] p-6 md:p-8 flex flex-col justify-center text-center md:text-left bg-[#FAFAFA] group-hover:bg-white transition-colors">
                <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 mb-2">
                  Crystal Encyclopedia
                </h3>
                <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                  Explore natural gemstones, geological properties, chakra alignments, and care rituals for all 32 mineral varieties.
                </p>
              </div>
            </Link>

            {/* Right Column (8 cols): Two Horizontal Split Cards with Authentic User Media */}
            <div className="md:col-span-8 flex flex-col gap-6 h-full">
              {/* Top Horizontal Card: Nature's Finest (User Himalayan Salt & Rose Quartz) */}
              <Link
                href="/features/materials"
                className="bg-[#FAFAFA] rounded-[2rem] overflow-hidden relative group flex flex-col md:flex-row flex-1 transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-xl border border-zinc-100"
              >
                <div className="h-[55%] md:h-full md:w-[60%] relative overflow-hidden">
                  <ShimmerImage
                    src="/images/hero/himalayan-salt-crystals.jpeg"
                    alt="Natural Himalayan Minerals and Salt Crystals"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="hidden md:block absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none" />
                </div>
                <div className="h-[45%] md:h-full md:w-[40%] p-6 md:p-8 flex flex-col justify-center text-center md:text-left bg-[#FAFAFA] group-hover:bg-white transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">
                    Grade-A Certified
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 mb-2">
                    Nature's Finest
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                    Ethically sourced raw crystalline minerals, hand-evaluated for geological saturation, optical iridescence, and mineral density.
                  </p>
                </div>
              </Link>

              {/* Bottom Horizontal Card: Handcrafted (User Gold Tassel & Agate Beads) */}
              <Link
                href="/features/craftsmanship"
                className="bg-[#FAFAFA] rounded-[2rem] overflow-hidden relative group flex flex-col md:flex-row flex-1 transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-xl border border-zinc-100"
              >
                <div className="h-[45%] md:h-full md:w-[40%] p-6 md:p-8 flex flex-col justify-center text-center md:text-left order-2 md:order-1 bg-[#FAFAFA] group-hover:bg-white transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">
                    Artisan Assembly
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 mb-2">
                    Handcrafted
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                    Meticulously assembled with multi-strand Japanese elastic, leaf charms, and reinforced double surgeon knots for lifetime durability.
                  </p>
                </div>
                <div className="h-[55%] md:h-full md:w-[60%] relative order-1 md:order-2 overflow-hidden">
                  <ShimmerImage
                    src="/images/hero/triple-strand-pearl-bracelet.jpeg"
                    alt="Hand-threaded triple strand pearl bracelet on wrist"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="hidden md:block absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#FAFAFA] to-transparent pointer-events-none" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Spark Your Imagination" Curated Designs Gallery */}
      <section className="px-4 py-16 md:py-24 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[1400px] md:max-w-[1300px]">
          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-6 md:p-10 shadow-sm">
            {/* Header & Filter Chips */}
            <div className="relative mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                  <span>Design Inspiration</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-zinc-950">
                  <span className="block">Spark Your</span>
                  <span className="block italic text-zinc-400 font-light">Imagination</span>
                </h2>
                <p className="mt-1 text-xs md:text-sm text-zinc-600 font-light">
                  Curated formulations to inspire your bespoke creation. Tap any piece to remix in the 120 FPS studio.
                </p>
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-2">
                {['All', 'Protection', 'Love', 'Abundance', 'Intuition'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedFilter === cat
                        ? 'bg-zinc-900 text-white shadow-sm'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Curated Design Cards Grid with Shimmer Skeletal Loader */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredDesigns.map((item) => {
                const isLiked = !!likedDesigns[item.id];
                const displayedLikes = isLiked ? item.likes + 1 : item.likes;

                return (
                  <div
                    key={item.id}
                    className="group relative rounded-2xl md:rounded-3xl bg-white border border-zinc-100 p-3 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl md:rounded-2xl bg-zinc-50 mb-3">
                      <ShimmerImage
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        containerClassName="h-full w-full"
                      />
                      <div className="absolute top-2 left-2 inline-flex items-center rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                        {item.discount}
                      </div>

                      {/* Interactive Heart Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleLike(item.id);
                        }}
                        className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-zinc-700 shadow-sm hover:scale-105 active:scale-95 transition-transform"
                      >
                        <Heart
                          className={`w-2.5 h-2.5 transition-colors ${
                            isLiked
                              ? 'text-rose-500 fill-rose-500'
                              : 'text-zinc-400'
                          }`}
                        />
                        <span>{displayedLikes.toLocaleString()}</span>
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {item.beads.length} minerals
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-sm text-zinc-900 truncate mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-bold text-sm text-zinc-900">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-[11px] text-zinc-400 line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/designer?remix=${item.id}&token=${item.token}`}
                      className="w-full py-2 rounded-full bg-zinc-100 group-hover:bg-zinc-900 group-hover:text-white text-zinc-800 text-[11px] font-bold text-center transition-all flex items-center justify-center gap-1.5 active:scale-[0.97]"
                    >
                      <span>Remix in Studio</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* View All Button */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all hover:-translate-y-0.5 active:scale-[0.97]"
              >
                <span>Explore All Curated Formulations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Authentic Lookbook Showcase: User Mineral Specimens & Finished Jewelry */}
      <section className="px-4 py-16 md:py-24 bg-white border-t border-zinc-100">
        <div className="mx-auto max-w-[1400px] md:max-w-[1300px]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-[11px] font-bold uppercase tracking-widest mb-3">
              <Ruler className="w-3.5 h-3.5" />
              <span>Natural Mineral Calibration</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-950 mb-3">
              The Artixain Atelier Gallery
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
              Every millimeter is calibrated. Every gemstone is authentic. Handcrafted with genuine crystalline minerals and multi-strand elasticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Triple-Strand Pearl Bracelet on Wrist */}
            <div className="group rounded-3xl overflow-hidden bg-[#FAFAFA] border border-zinc-200/80 p-4 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-zinc-100">
                <ShimmerImage
                  src="/images/hero/triple-strand-pearl-bracelet.jpeg"
                  alt="Triple strand pearl bracelet with celestial luster"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-mono">
                  NATURAL PEARL STRAND &bull; ATELIER CRAFT
                </div>
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-900 mb-1">
                Triple-Strand Luminous Pearls
              </h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Hand-threaded on fine silk cord with celestial luster, millimeter-calibrated fit, and ergonomic wrist silhouette.
              </p>
            </div>

            {/* Card 2: Himalayan Salt Crystal Geological Formation */}
            <div className="group rounded-3xl overflow-hidden bg-[#FAFAFA] border border-zinc-200/80 p-4 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-zinc-100">
                <ShimmerImage
                  src="/images/hero/himalayan-salt-crystals.jpeg"
                  alt="Raw Himalayan salt crystal mineral facets"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-mono">
                  RAW CRYSTALLINE SALT &bull; GEOLOGICAL GRADE
                </div>
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-900 mb-1">
                Himalayan Mineral Crystals
              </h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Ethically selected raw mineral specimens exhibiting natural geometric facets, authentic geological density, and purity.
              </p>
            </div>

            {/* Card 3: Rose Gold Crystal Strand On-Wrist */}
            <div className="group rounded-3xl overflow-hidden bg-[#FAFAFA] border border-zinc-200/80 p-4 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-zinc-100">
                <ShimmerImage
                  src="/images/hero/wrist-crystal-strand.jpg"
                  alt="Rose gold crystal strand on client wrist with silk sleeve"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-mono">
                  ROSE GOLD &bull; ANTHROPOMETRIC FIT
                </div>
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-900 mb-1">
                Second-Skin Ergonomics
              </h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Balanced circumference with zero pinch, comfortable all-day weight, and seamless wrist silhouette.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials & Reviews */}
      <section className="px-4 py-16 md:py-24 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[1400px] md:max-w-[1300px]">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-2 shadow-sm">
              Patron Experiences
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-zinc-950">
              Loved by Crystal Enthusiasts Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-6 md:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
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

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-zinc-900 block">{rev.author}</span>
                    <span className="text-[11px] text-zinc-400">{rev.bracelet}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <span>View All 1,420+ Verified Patron Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Video Modal Player (Clean without green blinking dots) */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative max-w-sm w-full bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl p-4 text-center border border-zinc-700">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="Close video player"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black flex flex-col items-center justify-center text-white p-6 relative">
              <Play className="w-12 h-12 text-zinc-200 mb-3" />
              <p className="text-sm font-semibold text-zinc-200 mb-1">
                {activeVideoModal}
              </p>
              <p className="text-xs text-zinc-400 font-light">
                Artixain Atelier Video Presentation
              </p>
              <div className="mt-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                <span className="text-[11px] text-zinc-500 font-mono">1080p HD Streaming</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 mt-3 font-serif">
              Artixain Atelier &copy; 2026 &bull; Handcrafted Celestial Energy
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
