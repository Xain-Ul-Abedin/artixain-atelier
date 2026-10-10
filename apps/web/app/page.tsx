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
  Layers,
  Clock,
  Eye
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

// Clean Patron Video Testimonials without any external watermarks
const PATRON_STORIES = [
  { img: '/images/atelier/gem_04.jpg', label: 'Custom Strand Unboxing', user: '@sarah_gem', minerals: 'Rose Quartz & Moonstone' },
  { img: '/images/atelier/gem_08.jpg', label: 'Wrist Calibration Review', user: '@david_wrist', minerals: 'Obsidian & Tiger Eye' },
  { img: '/images/atelier/gem_14.jpg', label: 'Celestial Crystal Balance', user: '@chloe_luxe', minerals: 'Amethyst & Clear Quartz' },
  { img: '/images/atelier/gem_17.jpg', label: 'Studio Bench Assembly', user: '@artisan_leo', minerals: 'Lapis Lazuli & Silver' },
  { img: '/images/atelier/gem_21.jpg', label: 'Natural Light Reflections', user: '@gem_elena', minerals: 'Citrine & Pyrite' },
  { img: '/images/atelier/gem_24.jpg', label: 'Finished Patron Formulation', user: '@alex_strands', minerals: 'Aquamarine & Selenite' }
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
    <div className="flex flex-col w-full bg-white text-[#1D1D1F] overflow-x-hidden pt-24 md:pt-28">
      {/* 1. Hero Section: Simplified UX, 2-Column Responsive Layout without Navbar Collisions */}
      <section className="relative w-full bg-[#FAFAFA] border-b border-zinc-100 py-10 sm:py-14 lg:py-20">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Brand Story & Call to Actions (lg: 6 cols) */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Luxury Atelier Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 mb-5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
                <span>Artixain Atelier &bull; 100% Certified Natural Minerals</span>
              </div>

              {/* Editorial Luxury Title */}
              <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.12] tracking-tight text-[#1D1D1F] mb-5">
                <span className="block font-medium">Designed by You</span>
                <span className="block italic text-zinc-400 font-light">Crafted by Artixain</span>
              </h1>

              {/* Subtitle */}
              <p className="text-zinc-500 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-lg">
                Craft your bespoke gemstone bracelet. Interactive 120 FPS strand designer with millimeter wrist calibration and master bench fulfillment.
              </p>

              {/* Action Buttons (Material You 50% Radius Pill Law) */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-8">
                <Link
                  href="/designer"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 bg-[#18181B] text-white font-semibold text-xs uppercase tracking-wider shadow-lg hover:bg-zinc-800 hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
                >
                  <span>Start Designing</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </span>
                </Link>

                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 px-7 py-4 text-xs font-semibold uppercase tracking-wider transition-all w-full sm:w-auto shadow-2xs active:scale-[0.98]"
                >
                  <Gem className="w-3.5 h-3.5 text-zinc-700" />
                  <span>View Gallery</span>
                </Link>
              </div>

              {/* Value Proposition Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-[11px] text-zinc-500 font-medium">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100/90 text-zinc-700">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Grade-A Natural Minerals
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100/90 text-zinc-700">
                  <Ruler className="w-3 h-3 text-zinc-600" />
                  Millimeter Wrist Fit
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100/90 text-zinc-700">
                  <Clock className="w-3 h-3 text-zinc-600" />
                  Lifetime Cord Warranty
                </span>
              </div>
            </div>

            {/* Right Column: Simplified, Framed Authentic Visual Showcase (lg: 6 cols) */}
            <div className="lg:col-span-6 w-full flex justify-center">
              <HeroSlider />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust, Patron Counters & Master Atelier Walkthrough (Fluid Wide Container) */}
      <section id="walkthrough" className="scroll-mt-32 overflow-hidden bg-white px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-14 md:py-20 border-b border-zinc-100">
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Header Row with Patron Counters */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-600 shadow-2xs mb-3">
                <Award className="w-3 h-3 text-zinc-800" />
                <span>Trusted by Artixain Patrons</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[1.12] tracking-tight text-zinc-950">
                Helped patrons complete{' '}
                <span className="whitespace-nowrap font-semibold text-zinc-900 underline decoration-zinc-300 decoration-2 underline-offset-4">
                  60,000+ custom designs
                </span>
              </h2>
              <p className="mt-2 text-sm text-zinc-500 font-light">
                Over 10,000 patrons have received bespoke handcrafted atelier bracelets.
              </p>
            </div>

            {/* Stat Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-2xs">
                <span className="text-base font-bold text-zinc-900">60,000+</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Designs</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-2xs">
                <span className="text-base font-bold text-zinc-900">10,000+</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Purchases</span>
              </div>
            </div>
          </div>

          {/* Featured Walkthrough Card: Watermark-Free Authentic Workbench Visual */}
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-hidden rounded-[2rem] border border-zinc-200/90 bg-[#FAFAFA] p-6 sm:p-8 md:p-12 shadow-sm mb-12">
            <div className="md:col-span-7 flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                Master Bench Guide
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-zinc-950 mb-3">
                Step-by-Step Strand Creation
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light mb-6 max-w-xl">
                Explore how each Artixain bracelet is designed and assembled. Learn wrist caliper measurement, chakra gemstone balance, and our double surgeon knot silk-cord finishing.
              </p>
              <div>
                <Link
                  href="/guide/how-to-design"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-3 text-xs font-semibold hover:bg-zinc-800 transition-all shadow-sm active:scale-95"
                >
                  <span>Read Complete Design Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div
                className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-md group cursor-pointer border border-zinc-300"
                onClick={() => setActiveVideoModal('Artixain Master Atelier Walkthrough')}
              >
                <ShimmerImage
                  src="/images/atelier/gem_10.jpg"
                  alt="Artixain Master Atelier Workbench"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <button
                  type="button"
                  aria-label="Play design walkthrough"
                  className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-zinc-900 shadow-xl backdrop-blur transition-all hover:scale-110 active:scale-95"
                >
                  <Play className="ml-0.5 w-5 h-5 fill-current" />
                </button>
                <div className="absolute bottom-3 left-4 text-white text-[11px] font-semibold">
                  Artixain Atelier Master Bench
                </div>
              </div>
            </div>
          </article>

          {/* Marquee Video Reviews Track: Pure Watermark-Free Atelier Images */}
          <div className="relative overflow-hidden pb-2">
            <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max">
              {[...PATRON_STORIES, ...PATRON_STORIES].map((vid, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveVideoModal(vid.label)}
                  className="group relative w-[220px] md:w-[260px] shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2.5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100">
                    <ShimmerImage
                      src={vid.img}
                      alt={vid.label}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      containerClassName="h-full w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <button
                      type="button"
                      aria-label="Play patron review"
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg group-hover:scale-110 transition-transform"
                    >
                      <Play className="ml-0.5 w-4 h-4 fill-current" />
                    </button>
                    <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-semibold drop-shadow-xs">
                      {vid.user}
                    </div>
                  </div>
                  <div className="mt-2 px-1">
                    <p className="text-xs font-semibold text-zinc-900 truncate">{vid.label}</p>
                    <p className="text-[10px] text-zinc-400 font-mono truncate">{vid.minerals}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Atelier Principles Bento Grid (Fluid Wide Layout without Empty Side Gutters) */}
      <section id="principles" className="scroll-mt-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-[#FAFAFA] border-b border-zinc-100">
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-zinc-700 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-2xs">
              <Gem className="w-3.5 h-3.5 text-zinc-900" />
              <span>Atelier Principles</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] leading-tight">
              <span className="block font-medium tracking-tight">Crafted by You</span>
              <span className="block italic text-zinc-400 font-light mt-1">Refined by Artixain</span>
            </h2>
          </div>

          {/* 12-Column Expansive Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Card 1 (4 cols): Crystal Encyclopedia with Authentic Raw Amethyst */}
            <Link
              href="/encyclopedia"
              className="md:col-span-4 bg-white rounded-3xl overflow-hidden relative group flex flex-col min-h-[440px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-zinc-200/80 shadow-xs"
            >
              <div className="relative h-[65%] w-full bg-zinc-100 overflow-hidden">
                <ShimmerImage
                  src="/images/atelier/gem_01.jpg"
                  alt="Natural Amethyst Geode Encyclopedia"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="h-[35%] p-6 flex flex-col justify-center text-center md:text-left bg-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  Geological Archives
                </span>
                <h3 className="text-xl font-serif font-medium text-zinc-900 mb-1">
                  Crystal Encyclopedia
                </h3>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">
                  Explore geological hardness, chakra alignments, and care rituals for all 32 natural mineral varieties.
                </p>
              </div>
            </Link>

            {/* Card 2 (4 cols): Nature's Finest with Authentic Himalayan Salt Crystals */}
            <Link
              href="/features/materials"
              className="md:col-span-4 bg-white rounded-3xl overflow-hidden relative group flex flex-col min-h-[440px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-zinc-200/80 shadow-xs"
            >
              <div className="relative h-[65%] w-full bg-zinc-100 overflow-hidden">
                <ShimmerImage
                  src="/images/hero/himalayan-salt-crystals.jpeg"
                  alt="Authentic Himalayan Salt Mineral Crystals"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="h-[35%] p-6 flex flex-col justify-center text-center md:text-left bg-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  Grade-A Certified
                </span>
                <h3 className="text-xl font-serif font-medium text-zinc-900 mb-1">
                  Nature's Finest Minerals
                </h3>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">
                  Ethically sourced crystalline minerals, hand-evaluated for geological saturation, optical iridescence, and density.
                </p>
              </div>
            </Link>

            {/* Card 3 (4 cols): Handcrafted Assembly with Triple-Strand Pearls */}
            <Link
              href="/features/craftsmanship"
              className="md:col-span-4 bg-white rounded-3xl overflow-hidden relative group flex flex-col min-h-[440px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-zinc-200/80 shadow-xs"
            >
              <div className="relative h-[65%] w-full bg-zinc-100 overflow-hidden">
                <ShimmerImage
                  src="/images/hero/triple-strand-pearl-bracelet.jpeg"
                  alt="Triple Strand Pearl Handcrafted Assembly"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="h-[35%] p-6 flex flex-col justify-center text-center md:text-left bg-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  Artisan Stringing
                </span>
                <h3 className="text-xl font-serif font-medium text-zinc-900 mb-1">
                  Master Bench Assembly
                </h3>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">
                  Assembled on reinforced Japanese elastic with reinforced surgeon knots for comfortable lifetime durability.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. "Spark Your Imagination" Curated Designs Gallery (Fluid Wide Layout) */}
      <section id="gallery" className="scroll-mt-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-white border-b border-zinc-100">
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Header & Filter Chips */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 shadow-2xs mb-2">
                <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                <span>Design Inspiration</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-950">
                <span>Spark Your </span>
                <span className="italic text-zinc-400 font-light">Imagination</span>
              </h2>
              <p className="mt-1 text-xs md:text-sm text-zinc-600 font-light">
                Curated formulations to inspire your bespoke creation. Tap any piece to remix in the 120 FPS studio.
              </p>
            </div>

            {/* Category Filter Chips (Material You 50% Radius Pills) */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Protection', 'Love', 'Abundance', 'Intuition'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
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

          {/* Curated Design Cards Grid (Expansive 4-column fluid layout) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredDesigns.map((item) => {
              const isLiked = !!likedDesigns[item.id];
              const displayedLikes = isLiked ? item.likes + 1 : item.likes;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-3xl bg-white border border-zinc-200/80 p-3.5 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-50 mb-3">
                    <ShimmerImage
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      containerClassName="h-full w-full"
                    />
                    <div className="absolute top-2.5 left-2.5 inline-flex items-center rounded-full bg-zinc-900 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      {item.discount}
                    </div>

                    {/* Interactive Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLike(item.id);
                      }}
                      className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-zinc-700 shadow-sm hover:scale-105 active:scale-95 transition-transform"
                    >
                      <Heart
                        className={`w-3 h-3 transition-colors ${
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
                    className="w-full py-2.5 rounded-full bg-zinc-100 group-hover:bg-zinc-900 group-hover:text-white text-zinc-800 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <span>Remix in Studio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-3.5 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>Explore All Curated Formulations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Authentic Lookbook Showcase: 8-Card Pure Mineral & Workshop Gallery */}
      <section id="lookbook" className="scroll-mt-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-[#FAFAFA] border-b border-zinc-100">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-zinc-200 text-zinc-700 text-[11px] font-bold uppercase tracking-widest mb-3 shadow-2xs">
              <Ruler className="w-3.5 h-3.5" />
              <span>Natural Mineral Calibration</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-950 mb-3">
              The Artixain Atelier Gallery
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed">
              Every millimeter is calibrated. Every gemstone is authentic. Handcrafted with genuine crystalline minerals and multi-strand elasticity.
            </p>
          </div>

          {/* 8-Card Fluid Grid Spanning Full Width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Authentic Triple-Strand Pearls */}
            <div className="group rounded-3xl overflow-hidden bg-white border border-zinc-200/90 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100">
                <ShimmerImage
                  src="/images/hero/triple-strand-pearl-bracelet.jpeg"
                  alt="Triple strand pearl bracelet with celestial luster"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  NATURAL PEARL STRAND
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 mb-1">
                Triple-Strand Pearls
              </h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Hand-threaded on fine silk cord with celestial luster and ergonomic wrist contour.
              </p>
            </div>

            {/* Card 2: Authentic Himalayan Salt Crystals */}
            <div className="group rounded-3xl overflow-hidden bg-white border border-zinc-200/90 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100">
                <ShimmerImage
                  src="/images/hero/himalayan-salt-crystals.jpeg"
                  alt="Raw Himalayan salt crystal mineral facets"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  RAW CRYSTALLINE SALT
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 mb-1">
                Himalayan Minerals
              </h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Ethically selected raw mineral specimens exhibiting natural geometric facets.
              </p>
            </div>

            {/* Card 3: Raw Amethyst Geode Specimen */}
            <div className="group rounded-3xl overflow-hidden bg-white border border-zinc-200/90 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100">
                <ShimmerImage
                  src="/images/atelier/gem_01.jpg"
                  alt="Raw Amethyst Geode Specimen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  GRADE-A AMETHYST
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 mb-1">
                Imperial Amethyst Geode
              </h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Deep violet crystal clusters with natural optical clarity and high mineral vibration.
              </p>
            </div>

            {/* Card 4: Gemologist Workbench Calibration */}
            <div className="group rounded-3xl overflow-hidden bg-white border border-zinc-200/90 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100">
                <ShimmerImage
                  src="/images/atelier/gem_10.jpg"
                  alt="Master Atelier Gemologist Workbench"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  BENCH CALIBRATION
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 mb-1">
                Artisan Benchfitting
              </h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Precise caliper measurement ensuring exact millimeter diameter for every bead.
              </p>
            </div>

            {/* Card 5: Lapis Lazuli Deep Blue Strands */}
            <div className="group rounded-3xl overflow-hidden bg-white border border-zinc-200/90 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100">
                <ShimmerImage
                  src="/images/atelier/gem_17.jpg"
                  alt="Lapis Lazuli Deep Blue Strands"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  LAPIS LAZULI
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 mb-1">
                Deep Lapis Azure
              </h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Royal ultramarine mineral with golden pyrite flecks and throat chakra resonance.
              </p>
            </div>

            {/* Card 6: Handcrafted Mineral Strands */}
            <div className="group rounded-3xl overflow-hidden bg-white border border-zinc-200/90 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100">
                <ShimmerImage
                  src="/images/atelier/gem_04.jpg"
                  alt="Handcrafted Mineral Strands"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  BESPOKE STRAND
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 mb-1">
                Multi-Mineral Harmony
              </h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Harmoniously balanced bead sequencing creating serene tactile presence on wrist.
              </p>
            </div>

            {/* Card 7: Natural Rose Quartz Tumbled Minerals */}
            <div className="group rounded-3xl overflow-hidden bg-white border border-zinc-200/90 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100">
                <ShimmerImage
                  src="/images/atelier/gem_11.jpg"
                  alt="Natural Rose Quartz Tumbled Minerals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  ROSE QUARTZ
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 mb-1">
                Tumbled Rose Quartz
              </h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Translucent pink crystalline softness representing unconditional compassion.
              </p>
            </div>

            {/* Card 8: Second-Skin Wrist Ergonomics */}
            <div className="group rounded-3xl overflow-hidden bg-white border border-zinc-200/90 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100">
                <ShimmerImage
                  src="/images/hero/wrist-crystal-strand.jpg"
                  alt="Rose gold crystal strand on client wrist with silk sleeve"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  SECOND-SKIN FIT
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 mb-1">
                Anthropometric Fit
              </h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Balanced circumference with zero pinch, comfortable all-day weight, and seamless fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials & Reviews (Fluid Wide Layout) */}
      <section id="reviews" className="scroll-mt-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-2 shadow-2xs">
              Patron Experiences
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-zinc-950">
              Loved by Crystal Enthusiasts Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-6 md:p-8 rounded-3xl bg-[#FAFAFA] border border-zinc-200/90 shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
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
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Patron
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/reviews"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>View All 1,420+ Verified Patron Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Video Modal Player (Artixain Atelier Branded) */}
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
