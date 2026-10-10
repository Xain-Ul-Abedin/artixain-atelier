'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ShimmerImage from '../components/ui/ShimmerImage';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Play,
  Heart,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Star,
  CheckCircle2,
  X,
  Compass,
  Ruler,
  Gem,
  Award,
  Layers,
  Clock,
  Eye,
  MapPin,
  Mail,
  Phone,
  Send,
  HelpCircle
} from 'lucide-react';

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  spec: string;
}

const HERO_BACKGROUND_SLIDES: HeroSlide[] = [
  {
    id: 'pearl-triple',
    image: '/images/hero/triple-strand-pearl-bracelet.jpeg',
    title: 'Triple-Strand Luminous Pearls',
    subtitle: 'Hand-threaded on fine silk cord with celestial luster and ergonomic wrist contour',
    tag: 'Master Atelier Craft',
    spec: 'Natural Luster Pearls • Silk Thread'
  },
  {
    id: 'himalayan-salt',
    image: '/images/hero/himalayan-salt-crystals.jpeg',
    title: 'Himalayan Salt Crystal Minerals',
    subtitle: 'Raw crystalline geological formation with natural saturation and geometric facets',
    tag: 'Natural Earth Minerals',
    spec: 'Raw Mineral Specimen • Grade-A'
  }
];

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

const PATRON_STORIES = [
  { img: '/images/atelier/gem_04.jpg', label: 'Custom Strand Unboxing', user: '@sarah_gem', minerals: 'Rose Quartz & Moonstone' },
  { img: '/images/atelier/gem_08.jpg', label: 'Wrist Calibration Review', user: '@david_wrist', minerals: 'Obsidian & Tiger Eye' },
  { img: '/images/atelier/gem_14.jpg', label: 'Celestial Crystal Balance', user: '@chloe_luxe', minerals: 'Amethyst & Clear Quartz' },
  { img: '/images/atelier/gem_17.jpg', label: 'Studio Bench Assembly', user: '@artisan_leo', minerals: 'Lapis Lazuli & Silver' },
  { img: '/images/atelier/gem_21.jpg', label: 'Natural Light Reflections', user: '@gem_elena', minerals: 'Citrine & Pyrite' },
  { img: '/images/atelier/gem_24.jpg', label: 'Finished Patron Formulation', user: '@alex_strands', minerals: 'Aquamarine & Selenite' }
];

const FAQ_HOMEPAGE_ITEMS = [
  {
    q: 'How do I determine my exact wrist size for bespoke fitting?',
    a: 'Wrap a flexible tailor measuring tape flush around your wrist bone without adding slack. If you do not have a tape, wrap a strip of paper, mark the intersection, and measure against a flat ruler. Our customizer automatically calculates bead packing and adds ergonomic breathing clearance.'
  },
  {
    q: 'Are Artixain minerals and gemstones 100% natural and certified?',
    a: 'Yes. Every mineral batch undergoes strict gemological verification for density, optical refraction, and crystal structure. We exclusively use Grade-A ethically sourced natural minerals without chemical dyes or synthetic glass imitations.'
  },
  {
    q: 'What is your dispatch timeframe for custom handcrafted bracelets?',
    a: 'Every custom bracelet is hand-threaded on our atelier bench within 1 to 2 business days. We provide complimentary tracked global shipping with insured door-to-door delivery.'
  },
  {
    q: 'What does the Artixain Lifetime Cord Warranty cover?',
    a: 'Our lifetime warranty covers complimentary re-stringing, elastic cord replacement, and polishing. If your bracelet ever slackens or breaks, send it to our Paris atelier and our artisans will restore it free of charge.'
  }
];

export default function HomePage() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [likedDesigns, setLikedDesigns] = useState<Record<string, boolean>>({});
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Auto-advance hero background slide every 6 seconds unless hovered
  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % HERO_BACKGROUND_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHeroPaused]);

  const toggleLike = (id: string) => {
    setLikedDesigns((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredDesigns = selectedFilter === 'All'
    ? CURATED_DESIGNS
    : CURATED_DESIGNS.filter((d) => d.category === selectedFilter);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) return;
    setContactSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full bg-white dark:bg-[#0E0E10] text-[#1D1D1F] dark:text-zinc-100 overflow-x-hidden transition-colors duration-300">
      {/* 1. Hero Section: Authentic Visual Background with Smooth Time Crossfades & Luxury Readability */}
      <section
        className="relative w-full min-h-[82vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden pt-28 md:pt-32 pb-16"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
      >
        {/* Dynamic Background Image Layers with Crossfade */}
        {HERO_BACKGROUND_SLIDES.map((slide, idx) => {
          const isActive = idx === activeHeroIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
            >
              <ShimmerImage
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-10000"
                containerClassName="w-full h-full"
              />
            </div>
          );
        })}

        {/* Cinematic Luxury Dark Gradient Readability Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/45 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 z-10 pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-20 w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="max-w-2xl">
            {/* Luxury Atelier Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white mb-6 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Artixain Atelier &bull; 100% Certified Natural Minerals</span>
            </div>

            {/* Editorial Luxury Title */}
            <h1 className="font-serif text-[clamp(2.6rem,6vw,4.75rem)] leading-[1.08] tracking-tight text-white mb-6">
              <span className="block font-medium">Designed by You</span>
              <span className="block italic text-zinc-300 font-light">Crafted by Artixain</span>
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-200 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-xl">
              Craft your bespoke gemstone bracelet. Interactive 120 FPS strand designer with millimeter wrist calibration and master bench fulfillment.
            </p>

            {/* Action Buttons (Material You 50% Radius Pill Law) */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-10">
              <Link
                href="/designer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 bg-white text-zinc-950 font-semibold text-xs uppercase tracking-wider shadow-2xl hover:bg-zinc-100 hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
              >
                <span>Start Designing</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950/10 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3 h-3 text-zinc-950" />
                </span>
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-7 py-4 text-xs font-semibold uppercase tracking-wider transition-all w-full sm:w-auto shadow-sm active:scale-[0.98]"
              >
                <Gem className="w-3.5 h-3.5 text-amber-300" />
                <span>View Gallery</span>
              </Link>
            </div>

            {/* Value Proposition Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-[11px] text-zinc-300 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-zinc-100">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Grade-A Natural Minerals
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-zinc-100">
                <Ruler className="w-3 h-3 text-zinc-300" />
                Millimeter Wrist Fit
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-zinc-100">
                <Clock className="w-3 h-3 text-zinc-300" />
                Lifetime Cord Warranty
              </span>
            </div>
          </div>

          {/* Bottom Background Slide Switcher Pills */}
          <div className="mt-12 flex items-center gap-3">
            <button
              onClick={() => setActiveHeroIndex((prev) => (prev - 1 + HERO_BACKGROUND_SLIDES.length) % HERO_BACKGROUND_SLIDES.length)}
              className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/30 text-white flex items-center justify-center transition-colors active:scale-90"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {HERO_BACKGROUND_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setActiveHeroIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all active:scale-95 ${
                  idx === activeHeroIndex
                    ? 'bg-white text-zinc-950 shadow-md font-bold'
                    : 'bg-white/15 backdrop-blur-md text-white/80 hover:bg-white/25'
                }`}
              >
                <span>{`0${idx + 1}`}</span>{' '}
                <span className="hidden sm:inline">&bull; {slide.title.split(' ')[0]}</span>
              </button>
            ))}

            <button
              onClick={() => setActiveHeroIndex((prev) => (prev + 1) % HERO_BACKGROUND_SLIDES.length)}
              className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/30 text-white flex items-center justify-center transition-colors active:scale-90"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Trust, Patron Counters & Master Atelier Walkthrough */}
      <section id="walkthrough" className="scroll-mt-32 overflow-hidden bg-white dark:bg-[#0E0E10] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-14 md:py-20 border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Header Row with Patron Counters */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/15 bg-zinc-50 dark:bg-zinc-800 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-600 dark:text-zinc-300 shadow-2xs mb-3">
                <Award className="w-3 h-3 text-zinc-800 dark:text-amber-400" />
                <span>Trusted by Artixain Patrons</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[1.12] tracking-tight text-zinc-950 dark:text-white">
                Helped patrons complete{' '}
                <span className="whitespace-nowrap font-semibold text-zinc-900 dark:text-zinc-100 underline decoration-zinc-300 dark:decoration-zinc-600 decoration-2 underline-offset-4">
                  60,000+ custom designs
                </span>
              </h2>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-light">
                Over 10,000 patrons have received bespoke handcrafted atelier bracelets.
              </p>
            </div>

            {/* Stat Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-900 px-4 py-2 shadow-2xs">
                <span className="text-base font-bold text-zinc-900 dark:text-white">60,000+</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Designs</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-900 px-4 py-2 shadow-2xs">
                <span className="text-base font-bold text-zinc-900 dark:text-white">10,000+</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Purchases</span>
              </div>
            </div>
          </div>

          {/* Featured Walkthrough Card */}
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-hidden rounded-[2rem] border border-zinc-200/90 dark:border-white/10 bg-[#FAFAFA] dark:bg-zinc-900/60 p-6 sm:p-8 md:p-12 shadow-sm mb-12">
            <div className="md:col-span-7 flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
                Master Bench Guide
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-zinc-950 dark:text-white mb-3">
                Step-by-Step Strand Creation
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light mb-6 max-w-xl">
                Explore how each Artixain bracelet is designed and assembled. Learn wrist caliper measurement, chakra gemstone balance, and our double surgeon knot silk-cord finishing.
              </p>
              <div>
                <Link
                  href="/guide/how-to-design"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-sm active:scale-95"
                >
                  <span>Read Complete Design Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div
                className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-md group cursor-pointer border border-zinc-300 dark:border-zinc-700"
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

          {/* Marquee Video Reviews Track */}
          <div className="relative overflow-hidden pb-2">
            <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max">
              {[...PATRON_STORIES, ...PATRON_STORIES].map((vid, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveVideoModal(vid.label)}
                  className="group relative w-[220px] md:w-[260px] shrink-0 overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-2.5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
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
                    <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate">{vid.label}</p>
                    <p className="text-[10px] text-zinc-400 font-mono truncate">{vid.minerals}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Atelier Principles Bento Grid (Restored to the Previous 12-Column Horizontal Split Layout) */}
      <section id="principles" className="scroll-mt-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-[#FAFAFA] dark:bg-zinc-950 border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-2xs">
              <Gem className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
              <span>Atelier Principles</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] dark:text-white leading-tight">
              <span className="block font-medium tracking-tight">Crafted by You</span>
              <span className="block italic text-zinc-400 font-light mt-1">Refined by Artixain</span>
            </h2>
          </div>

          {/* 12-Column Bento Grid: Left Tall Card (4 cols) & Right Stacked Horizontal Cards (8 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[650px]">
            {/* Left Column (4 cols): Tall Crystal Encyclopedia Card (Preserving /images/features/1.webp) */}
            <Link
              href="/encyclopedia"
              className="md:col-span-4 bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden relative group flex flex-col h-[420px] md:h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-zinc-200/80 dark:border-white/10"
            >
              <div className="relative h-[65%] w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <ShimmerImage
                  src="/images/features/1.webp"
                  alt="Crystal Encyclopedia"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="hidden md:block absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent pointer-events-none" />
              </div>
              <div className="h-[35%] p-6 md:p-8 flex flex-col justify-center text-center md:text-left bg-white dark:bg-zinc-900">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
                  Geological Archives
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 dark:text-white mb-2">
                  Crystal Encyclopedia
                </h3>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  Explore natural gemstones, their unique properties, chakra connections, zodiac influences, and care rituals for all 32 varieties.
                </p>
              </div>
            </Link>

            {/* Right Column (8 cols): Two Horizontal Split Cards */}
            <div className="md:col-span-8 flex flex-col gap-6 h-full">
              {/* Top Horizontal Card: Nature's Finest */}
              <Link
                href="/features/materials"
                className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden relative group flex flex-col md:flex-row flex-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-zinc-200/80 dark:border-white/10"
              >
                <div className="h-[55%] md:h-full md:w-[60%] relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <ShimmerImage
                    src="/images/features/2.webp"
                    alt="Nature's Finest Minerals"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="hidden md:block absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent pointer-events-none" />
                </div>
                <div className="h-[45%] md:h-full md:w-[40%] p-6 md:p-8 flex flex-col justify-center text-center md:text-left bg-white dark:bg-zinc-900">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
                    Grade-A Certified
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 dark:text-white mb-2">
                    Nature's Finest
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                    Ethically sourced gemstones, hand-picked to showcase their inherent natural beauty, crystal geometry, and positive vibration.
                  </p>
                </div>
              </Link>

              {/* Bottom Horizontal Card: Handcrafted Master Assembly */}
              <Link
                href="/features/craftsmanship"
                className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden relative group flex flex-col md:flex-row flex-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-zinc-200/80 dark:border-white/10"
              >
                <div className="h-[45%] md:h-full md:w-[40%] p-6 md:p-8 flex flex-col justify-center text-center md:text-left order-2 md:order-1 bg-white dark:bg-zinc-900">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
                    Artisan Craftsmanship
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 dark:text-white mb-2">
                    Master Bench Assembly
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                    Meticulously handcrafted with passion on reinforced elastic, creating timeless pieces that mass production cannot replicate.
                  </p>
                </div>
                <div className="h-[55%] md:h-full md:w-[60%] relative order-1 md:order-2 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <ShimmerImage
                    src="/images/features/3.webp"
                    alt="Master Bench Assembly"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="hidden md:block absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent pointer-events-none" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Spark Your Imagination" Curated Designs Gallery with Seamless Watermark Mask Card */}
      <section id="gallery" className="scroll-mt-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-white dark:bg-[#0E0E10] border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Header & Filter Chips */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-300 shadow-2xs mb-2">
                <Sparkles className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
                <span>Design Inspiration</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-950 dark:text-white">
                <span>Spark Your </span>
                <span className="italic text-zinc-400 font-light">Imagination</span>
              </h2>
              <p className="mt-1 text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-light">
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
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Curated Design Cards Grid with Seamless Watermark Mask Card */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredDesigns.map((item) => {
              const isLiked = !!likedDesigns[item.id];
              const displayedLikes = isLiked ? item.likes + 1 : item.likes;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 p-3.5 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
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

                    <div className="absolute top-2.5 left-2.5 inline-flex items-center rounded-full bg-zinc-900 dark:bg-white px-2.5 py-0.5 text-[10px] font-bold text-white dark:text-zinc-900 shadow-sm z-20">
                      {item.discount}
                    </div>

                    {/* Interactive Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLike(item.id);
                      }}
                      className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-zinc-700 dark:text-zinc-200 shadow-sm hover:scale-105 active:scale-95 transition-transform z-20"
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
                      <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                        {item.beads.length} minerals
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-sm text-zinc-900 dark:text-white truncate mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-bold text-sm text-zinc-900 dark:text-white">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-zinc-400 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/designer?remix=${item.id}&token=${item.token}`}
                    className="w-full py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
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
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-8 py-3.5 text-xs font-semibold text-white dark:text-zinc-900 shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>Explore All Curated Formulations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Authentic Lookbook Showcase: 8-Card Strict Mineral Relevance */}
      <section id="lookbook" className="scroll-mt-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-[#FAFAFA] dark:bg-zinc-950 border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold uppercase tracking-widest mb-3 shadow-2xs">
              <Ruler className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
              <span>Natural Mineral Calibration</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-950 dark:text-white mb-3">
              The Artixain Atelier Gallery
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Every millimeter is calibrated. Every gemstone is authentic. Handcrafted with genuine crystalline minerals and multi-strand elasticity.
            </p>
          </div>

          {/* 8-Card Fluid Grid Spanning Full Width with Strict Mineral Media */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Authentic Triple-Strand Pearls */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
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
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                Triple-Strand Pearls
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                Hand-threaded on fine silk cord with celestial luster and ergonomic wrist contour.
              </p>
            </div>

            {/* Card 2: Authentic Himalayan Salt Crystals */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
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
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                Himalayan Minerals
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                Ethically selected raw mineral specimens exhibiting natural geometric facets.
              </p>
            </div>

            {/* Card 3: Raw Amethyst Geode Specimen */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
                <ShimmerImage
                  src="/images/hero/amethyst-geode-cluster.png"
                  alt="Raw Amethyst Geode Specimen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  GRADE-A AMETHYST
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                Imperial Amethyst Geode
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                Deep violet crystal clusters with natural optical clarity and high mineral vibration.
              </p>
            </div>

            {/* Card 4: Artisan Benchfitting */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
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
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                Artisan Benchfitting
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                Precise caliper measurement ensuring exact millimeter diameter for every bead.
              </p>
            </div>

            {/* Card 5: Deep Lapis Azure (Strict Mineral Photography) */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
                <ShimmerImage
                  src="/images/hero/lapis-lazuli-raw.jpg"
                  alt="Authentic Lapis Lazuli Raw Mineral with Pyrite Inclusions"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  LAPIS LAZULI
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                Deep Lapis Azure
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                Royal ultramarine mineral with golden pyrite flecks and throat chakra resonance.
              </p>
            </div>

            {/* Card 6: Multi-Mineral Harmony */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
                <ShimmerImage
                  src="/images/hero/yin-yang-beads.jpg"
                  alt="Authentic Multi-Mineral Yin Yang Formulations"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  BESPOKE STRAND
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                Multi-Mineral Harmony
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                Harmoniously balanced bead sequencing creating serene tactile presence on wrist.
              </p>
            </div>

            {/* Card 7: Tumbled Rose Quartz (Strict Mineral Photography) */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
                <ShimmerImage
                  src="/images/hero/rose-quartz-tumbled.jpg"
                  alt="Authentic Natural Tumbled Rose Quartz Gemstones"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  ROSE QUARTZ
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                Tumbled Rose Quartz
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                Translucent pink crystalline softness representing unconditional compassion.
              </p>
            </div>

            {/* Card 8: Second-Skin Wrist Ergonomics */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
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
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                Anthropometric Fit
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                Balanced circumference with zero pinch, comfortable all-day weight, and seamless fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Flagship Location & Interactive Map Section */}
      <section id="location" className="scroll-mt-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-white dark:bg-[#0E0E10] border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Salon Details */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-300 shadow-2xs mb-3 w-max">
                <MapPin className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
                <span>Flagship Atelier</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-950 dark:text-white mb-4">
                Visit Our Paris Atelier
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-6">
                Experience our mineral archives in person. Book a private appointment with our master gemologists for personalized wrist fitting and bespoke gemstone curation.
              </p>

              <div className="space-y-4 mb-8 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">Address</span>
                    <span className="text-zinc-500 dark:text-zinc-400">24 Place Vendôme, 75001 Paris, France</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">Salon Hours</span>
                    <span className="text-zinc-500 dark:text-zinc-400">Monday - Saturday: 10:00 - 19:30 &bull; Private Consultations by Appointment</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">Concierge Telephone</span>
                    <span className="text-zinc-500 dark:text-zinc-400">+33 1 42 68 00 00 &bull; concierge@artixain.com</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/location"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-7 py-3.5 text-xs font-semibold text-white dark:text-zinc-900 shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all active:scale-95"
                >
                  <span>Book Private Fitting</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/location"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/20 bg-white dark:bg-zinc-900 px-6 py-3.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95"
                >
                  <span>Explore Salon Guide</span>
                </Link>
              </div>
            </div>

            {/* Stylized Architectural Map Canvas */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-900 shadow-xl group">
                {/* Vector Map Graphic */}
                <svg
                  className="w-full h-full object-cover opacity-80"
                  viewBox="0 0 800 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Map Grid & Roads */}
                  <rect width="800" height="500" fill="#18181B" />
                  <path d="M0 120 Q 400 160 800 130" stroke="#27272A" strokeWidth="18" />
                  <path d="M0 380 Q 400 340 800 370" stroke="#27272A" strokeWidth="16" />
                  <path d="M220 0 Q 240 250 210 500" stroke="#27272A" strokeWidth="14" />
                  <path d="M580 0 Q 560 250 590 500" stroke="#27272A" strokeWidth="14" />
                  <path d="M100 0 L 700 500" stroke="#27272A" strokeWidth="8" />
                  <path d="M700 0 L 100 500" stroke="#27272A" strokeWidth="8" />

                  {/* Seine River Curve */}
                  <path
                    d="M0 430 C 250 460 550 400 800 440"
                    stroke="#1E293B"
                    strokeWidth="38"
                    fill="none"
                  />

                  {/* Place Vendôme Octagonal Landmark */}
                  <polygon
                    points="370,220 430,220 460,250 460,300 430,330 370,330 340,300 340,250"
                    fill="#27272A"
                    stroke="#3F3F46"
                    strokeWidth="2"
                  />
                  <circle cx="400" cy="275" r="32" fill="#18181B" stroke="#52525B" strokeWidth="2" />
                </svg>

                {/* Pinpoint Landmark Orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-12 h-12 rounded-full bg-amber-400/20 animate-ping" />
                    <span className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border-2 border-amber-400 shadow-2xl flex items-center justify-center">
                      <Gem className="w-5 h-5 text-amber-500" />
                    </span>
                  </div>
                  <div className="mt-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-lg">
                    Artixain Atelier &bull; 24 Place Vendôme
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur text-zinc-300 text-[10px] font-mono">
                  Coordinates: 48.8675° N, 2.3294° E &bull; Paris Ier
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Concierge Contact Us Section */}
      <section id="contact" className="scroll-mt-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-[#FAFAFA] dark:bg-zinc-950 border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-300 shadow-2xs mb-3">
                <Mail className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
                <span>Concierge Inquiries</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-950 dark:text-white mb-4">
                Connect with our Gemologist Team
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-6">
                Have a bespoke mineral request, corporate gifting inquiry, or wrist calibration question? Our concierge desk replies within 1 business day.
              </p>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Direct Artisan Consultation</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Custom Gemstone Sourcing on Demand</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Lifetime Restring & Care Guidance</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <div className="rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-6 sm:p-8 md:p-10 shadow-sm">
                {contactSubmitted ? (
                  <div className="py-12 text-center flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                      Inquiry Received
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md font-light leading-relaxed mb-6">
                      Thank you for contacting Artixain Atelier. A master gemologist concierge will review your message and reply at {contactForm.email} shortly.
                    </p>
                    <button
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactForm({ name: '', email: '', message: '' });
                      }}
                      className="px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 transition-all"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Lady Eleanor Vance"
                          className="w-full px-4 py-3 rounded-full bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-zinc-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="eleanor@patron.com"
                          className="w-full px-4 py-3 rounded-full bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-zinc-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Inquiry Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="I would like to inquire about bespoke sizing for a triple-strand pearl and lapis lazuli bracelet..."
                        className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-zinc-400 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-8 py-3.5 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md active:scale-95"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Concierge Inquiry</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive FAQ Accordion Section */}
      <section id="faq" className="scroll-mt-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-white dark:bg-[#0E0E10] border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold uppercase tracking-widest mb-3 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
              <span>Patron Questions</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-950 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Clear answers regarding our geological mineral standards, wrist sizing calibration, and atelier craftsmanship.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_HOMEPAGE_ITEMS.map((item, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-[#FAFAFA] dark:bg-zinc-900/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-semibold text-base sm:text-lg text-zinc-900 dark:text-white"
                  >
                    <span>{item.q}</span>
                    <span className={`w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed border-t border-zinc-100 dark:border-white/5 pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-8 py-3.5 text-xs font-semibold text-white dark:text-zinc-900 shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>View All FAQ Archives</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Customer Testimonials & Reviews */}
      <section id="reviews" className="scroll-mt-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-[#FAFAFA] dark:bg-zinc-950">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2 shadow-2xs">
              Patron Experiences
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-zinc-950 dark:text-white">
              Loved by Crystal Enthusiasts Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">{rev.author}</span>
                    <span className="text-[11px] text-zinc-400">{rev.bracelet}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/50">
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-8 py-4 text-xs font-semibold text-white dark:text-zinc-900 shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
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
