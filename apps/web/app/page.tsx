'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ShimmerImage from '../components/ui/ShimmerImage';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Play,
  Heart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
  CheckCircle2,
  X,
  Ruler,
  Gem,
  Award,
  Clock,
  MapPin,
  Mail,
  Phone,
  Send,
  HelpCircle
} from 'lucide-react';

interface HeroSlide {
  id: string;
  image: string;
  tagKey: string;
  specKey: string;
  titleKey: string;
  subtitleKey: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'pearl-triple',
    image: '/images/hero/triple-strand-pearl-bracelet.jpeg',
    tagKey: 'hero.slide1Tag',
    specKey: 'hero.slide1Spec',
    titleKey: 'hero.slide1Title',
    subtitleKey: 'hero.slide1Subtitle'
  },
  {
    id: 'himalayan-salt',
    image: '/images/hero/himalayan-salt-crystals.jpeg',
    tagKey: 'hero.slide2Tag',
    specKey: 'hero.slide2Spec',
    titleKey: 'hero.slide2Title',
    subtitleKey: 'hero.slide2Subtitle'
  },
  {
    id: 'mineral-collection',
    image: '/images/hero/hero-bracelet-collection.jpg',
    tagKey: 'hero.slide3Tag',
    specKey: 'hero.slide3Spec',
    titleKey: 'hero.slide3Title',
    subtitleKey: 'hero.slide3Subtitle'
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

// Verified single-use authentic atelier gemstone & jewelry review assets
const PATRON_STORIES = [
  { img: '/images/atelier/marquee_gemstone_stack.jpg', label: 'Stacked Mineral Strands', user: '@sarah_gem', minerals: 'Amethyst & Rose Quartz' },
  { img: '/images/atelier/marquee_pearl_model.jpg', label: 'Model Wrist Adornment', user: '@david_wrist', minerals: 'Akoya Pearls & Silk Cord' },
  { img: '/images/atelier/marquee_crystal_beads.jpg', label: 'Faceted Crystal Strands', user: '@chloe_luxe', minerals: 'Labradorite & Sunstone' },
  { img: '/images/atelier/marquee_jewelry_craft.jpg', label: 'Artisan Bench Knotting', user: '@artisan_leo', minerals: 'Tiger Eye & Obsidian' },
  { img: '/images/hero/wrist-crystal-strand.jpg', label: 'Client Caliper Fitting', user: '@gem_elena', minerals: 'Rose Quartz & Clear Quartz' },
  { img: '/images/hero/gold-tassel-bracelet.jpg', label: 'Gold Silk Handcrafted Strand', user: '@alex_strands', minerals: 'Citrine & Pyrite' }
];

export default function HomePage() {
  const { t, isRTL, language } = useLanguage();
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [likedDesigns, setLikedDesigns] = useState<Record<string, boolean>>({});
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Auto-advance hero slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

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

  const currentHeroSlide = HERO_SLIDES[activeHeroIndex];

  return (
    <div className={`flex flex-col w-full bg-white dark:bg-[#0E0E10] text-[#1D1D1F] dark:text-zinc-100 overflow-x-hidden pt-32 sm:pt-36 md:pt-40 transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* 1. Hero Section: Full-Width Edge-to-Edge Luxury Hero (No Card, 0px Side Gap, Increased Vertical Height & Dedicated Vibrant Visual Showcase) */}
      <section className="relative w-full overflow-hidden min-h-[820px] sm:min-h-[880px] lg:min-h-[920px] xl:min-h-[960px] flex items-center border-b border-zinc-100 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center w-full min-h-[820px] sm:min-h-[880px] lg:min-h-[920px] xl:min-h-[960px]">
          {/* Editorial Copy Column (lg: 6 cols / xl: 5 cols) with Generous Spacing */}
          <div className="lg:col-span-6 xl:col-span-5 px-6 sm:px-12 md:px-16 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-24 flex flex-col justify-center order-2 lg:order-1 relative z-10">
            {/* Luxury Eyebrow Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200/90 dark:border-white/10 text-xs font-semibold text-zinc-900 dark:text-zinc-100 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-zinc-950 dark:text-amber-400" />
                <span>{t('hero.badge')}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-white/10 text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                <span className="font-semibold">{t(currentHeroSlide.tagKey)}</span>
                <span>&bull;</span>
                <span dangerouslySetInnerHTML={{ __html: t(currentHeroSlide.specKey) }} />
              </div>
            </div>

            {/* Editorial Luxury Heading */}
            <h1 className="font-serif text-[clamp(2.6rem,5.5vw,4.75rem)] leading-[1.12] tracking-tight text-zinc-950 dark:text-white mb-6">
              <span className="block font-medium">{t('hero.titleLine1')}</span>
              <span className="block italic text-zinc-400 dark:text-zinc-500 font-light">{t('hero.titleLine2')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons (Material You 50% Radius Pill Law) */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-10">
              <Link
                href="/designer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-xs uppercase tracking-wider shadow-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all active:scale-[0.98] w-full sm:w-auto"
              >
                <span>{t('hero.ctaPrimary')}</span>
                <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-zinc-200/90 dark:border-white/15 bg-white dark:bg-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-7 py-4 text-xs font-semibold uppercase tracking-wider transition-all w-full sm:w-auto shadow-sm active:scale-[0.98]"
              >
                <Gem className="w-3.5 h-3.5 text-zinc-800 dark:text-amber-400" />
                <span>{t('hero.ctaSecondary')}</span>
              </Link>
            </div>

            {/* Trust Pills */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-white/10 text-zinc-800 dark:text-zinc-200 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{t('hero.pill1')}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-white/10 text-zinc-800 dark:text-zinc-200 shadow-2xs">
                <Ruler className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                <span>{t('hero.pill2')}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-white/10 text-zinc-800 dark:text-zinc-200 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                <span>{t('hero.pill3')}</span>
              </span>
            </div>
          </div>

          {/* Visual Showcase Column (lg: 6 cols / xl: 7 cols) - 100% Crisp, Vibrant & Edge-to-Edge Visible */}
          <div className="lg:col-span-6 xl:col-span-7 relative h-[480px] sm:h-[560px] md:h-[640px] lg:h-full min-h-[480px] lg:min-h-[920px] xl:min-h-[960px] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 order-1 lg:order-2">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === activeHeroIndex;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <ShimmerImage
                    src={slide.image}
                    alt={t(slide.titleKey)}
                    priority={idx === 0 || isActive}
                    className="w-full h-full object-cover object-center scale-[1.01] hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                  />
                  {/* Subtle Inner Gradient Fade blending into text column background on desktop */}
                  {isRTL ? (
                    <div className="hidden lg:block absolute inset-y-0 right-0 w-36 sm:w-48 bg-gradient-to-l from-white dark:from-[#0E0E10] to-transparent pointer-events-none z-10" />
                  ) : (
                    <div className="hidden lg:block absolute inset-y-0 left-0 w-36 sm:w-48 bg-gradient-to-r from-white dark:from-[#0E0E10] to-transparent pointer-events-none z-10" />
                  )}
                  {/* Subtle Bottom Fade on Mobile */}
                  <div className="lg:hidden absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-[#0E0E10] to-transparent pointer-events-none z-10" />
                </div>
              );
            })}

            {/* Minimalist '...' Dot Navigation (Left-Right Scrollable, Material You Pill Capsule) */}
            <div
              className={`absolute bottom-6 sm:bottom-8 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-black/65 dark:bg-black/80 backdrop-blur-md border border-white/20 text-white shadow-lg ${
                isRTL ? 'left-6 sm:left-10' : 'right-6 sm:right-10'
              }`}
            >
              {/* Previous Slide Button */}
              <button
                type="button"
                onClick={() => setActiveHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer active:scale-90"
                aria-label="Previous slide"
              >
                <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-2 px-1">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === activeHeroIndex;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setActiveHeroIndex(idx)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        isActive
                          ? 'w-7 h-2.5 bg-white shadow-sm'
                          : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
                      }`}
                      aria-label={`Switch to slide ${idx + 1}`}
                    />
                  );
                })}
              </div>

              {/* Next Slide Button */}
              <button
                type="button"
                onClick={() => setActiveHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer active:scale-90"
                aria-label="Next slide"
              >
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust, Patron Counters & Master Atelier Walkthrough */}
      <section id="walkthrough" className="scroll-mt-36 relative w-full bg-white dark:bg-[#0E0E10] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-14 md:py-20 border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Header Row with Patron Counters */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/15 bg-zinc-50 dark:bg-zinc-800 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-600 dark:text-zinc-300 shadow-2xs mb-3">
                <Award className="w-3 h-3 text-zinc-800 dark:text-amber-400" />
                <span>{t('trust.badge')}</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[1.12] tracking-tight text-zinc-950 dark:text-white">
                {t('trust.heading')}
              </h2>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-light">
                {t('trust.subheading')}
              </p>
            </div>

            {/* Stat Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-900 px-4 py-2 shadow-2xs">
                <span className="text-base font-bold text-zinc-900 dark:text-white">{t('trust.designsStat')}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-900 px-4 py-2 shadow-2xs">
                <span className="text-base font-bold text-zinc-900 dark:text-white">{t('trust.purchasesStat')}</span>
              </div>
            </div>
          </div>

          {/* Featured Walkthrough Card */}
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-hidden rounded-[2rem] border border-zinc-200/90 dark:border-white/10 bg-[#FAFAFA] dark:bg-zinc-900/60 p-6 sm:p-8 md:p-12 shadow-sm mb-12">
            <div className="md:col-span-7 flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
                {t('walkthrough.badge')}
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-zinc-950 dark:text-white mb-3">
                {t('walkthrough.title')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light mb-6 max-w-xl">
                {t('walkthrough.desc')}
              </p>
              <div>
                <Link
                  href="/guide/how-to-design"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-sm active:scale-95"
                >
                  <span>{t('walkthrough.cta')}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div
                className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-md group cursor-pointer border border-zinc-300 dark:border-zinc-700"
                onClick={() => setActiveVideoModal('Artixain Master Atelier Walkthrough')}
              >
                <ShimmerImage
                  src="/images/atelier/marquee_jewelry_craft.jpg"
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

          {/* Marquee Video Reviews Track (6 unique single-use assets) */}
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

      {/* 3. Atelier Principles Bento Grid (12-Column Horizontal Split Layout - Increased Length to Eliminate Cutoff) */}
      <section id="principles" className="scroll-mt-36 relative w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-20 md:py-28 bg-[#FAFAFA] dark:bg-zinc-950 border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-2xs">
              <Gem className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
              <span>{t('principles.badge')}</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] dark:text-white leading-tight">
              <span className="block font-medium tracking-tight">{t('principles.titleLine1')}</span>
              <span className="block italic text-zinc-400 font-light mt-1">{t('principles.titleLine2')}</span>
            </h2>
          </div>

          {/* 12-Column Bento Grid: Increased Section Height & Flexible Breathing Room */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 min-h-[760px] lg:min-h-[820px]">
            {/* Left Column (4 cols): Tall Crystal Encyclopedia Card (Preserving /images/features/1.webp) */}
            <Link
              href="/encyclopedia"
              className="md:col-span-4 bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden relative group flex flex-col min-h-[520px] md:min-h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-zinc-200/80 dark:border-white/10"
            >
              <div className="relative h-[260px] sm:h-[300px] md:h-[50%] w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0">
                <ShimmerImage
                  src="/images/features/1.webp"
                  alt="Crystal Encyclopedia"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="hidden md:block absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent pointer-events-none" />
              </div>
              <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center text-center md:text-left bg-white dark:bg-zinc-900">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                  {t('principles.card1Category')}
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 dark:text-white mb-3">
                  {t('principles.card1Title')}
                </h3>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  {t('principles.card1Desc')}
                </p>
              </div>
            </Link>

            {/* Right Column (8 cols): Two Horizontal Split Cards */}
            <div className="md:col-span-8 flex flex-col gap-8 h-full">
              {/* Top Horizontal Card: Nature's Finest */}
              <Link
                href="/features/materials"
                className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden relative group flex flex-col md:flex-row min-h-[340px] lg:min-h-[380px] flex-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-zinc-200/80 dark:border-white/10"
              >
                <div className="h-[220px] md:h-full md:w-[50%] lg:w-[52%] relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  <ShimmerImage
                    src="/images/features/2.webp"
                    alt="Nature's Finest Minerals"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="hidden md:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent pointer-events-none" />
                </div>
                <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center text-center md:text-left bg-white dark:bg-zinc-900">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                    {t('principles.card2Category')}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 dark:text-white mb-3">
                    {t('principles.card2Title')}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                    {t('principles.card2Desc')}
                  </p>
                </div>
              </Link>

              {/* Bottom Horizontal Card: Handcrafted Master Assembly */}
              <Link
                href="/features/craftsmanship"
                className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden relative group flex flex-col md:flex-row min-h-[340px] lg:min-h-[380px] flex-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-zinc-200/80 dark:border-white/10"
              >
                <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center text-center md:text-left order-2 md:order-1 bg-white dark:bg-zinc-900">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                    {t('principles.card3Category')}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 dark:text-white mb-3">
                    {t('principles.card3Title')}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                    {t('principles.card3Desc')}
                  </p>
                </div>
                <div className="h-[220px] md:h-full md:w-[50%] lg:w-[52%] relative order-1 md:order-2 overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  <ShimmerImage
                    src="/images/features/3.webp"
                    alt="Master Bench Assembly"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent pointer-events-none" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Spark Your Imagination" Curated Designs Gallery with Bottom Mask Card */}
      <section id="gallery" className="scroll-mt-36 relative w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-white dark:bg-[#0E0E10] border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Header & Filter Chips */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-300 shadow-2xs mb-2">
                <Sparkles className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
                <span>{t('gallery.badge')}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-950 dark:text-white">
                <span>{t('gallery.titleLine1')} </span>
                <span className="italic text-zinc-400 font-light">{t('gallery.titleLine2')}</span>
              </h2>
              <p className="mt-1 text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-light">
                {t('gallery.desc')}
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
                  {cat === 'All' ? t('gallery.filterAll') : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Curated Design Cards Grid with Bottom Overlay Card */}
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

                    {/* Simple Bottom Card Overlay that cleanly covers the watermark while leaving bracelet in full view */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-100 dark:border-white/10 px-3 flex items-center justify-between z-10 pointer-events-none">
                      <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider truncate">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0">
                        {item.beads.length} gems
                      </span>
                    </div>

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
                    <span>{t('gallery.remix')}</span>
                    <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
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
              <span>{t('gallery.viewAll')}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Lookbook Showcase: 8-Card Pure Mineral & Workshop Gallery (Single Use, Verified Domain Media) */}
      <section id="lookbook" className="scroll-mt-36 relative w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-[#FAFAFA] dark:bg-zinc-950 border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold uppercase tracking-widest mb-3 shadow-2xs">
              <Ruler className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
              <span>{t('lookbook.badge')}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-950 dark:text-white mb-3">
              {t('lookbook.title')}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              {t('lookbook.desc')}
            </p>
          </div>

          {/* 8-Card Fluid Grid: 8 Unique Verified Domain Assets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Imperial Amethyst Geode Cluster */}
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
                {t('lookbook.card1Title')}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                {t('lookbook.card1Desc')}
              </p>
            </div>

            {/* Card 2: Deep Lapis Azure */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
                <ShimmerImage
                  src="/images/hero/lapis-lazuli-raw.jpg"
                  alt="Natural Raw Lapis Lazuli Specimen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  LAPIS LAZULI
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                {t('lookbook.card2Title')}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                {t('lookbook.card2Desc')}
              </p>
            </div>

            {/* Card 3: Tumbled Rose Quartz */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
                <ShimmerImage
                  src="/images/hero/rose-quartz-tumbled.jpg"
                  alt="Tumbled Rose Quartz Natural Minerals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  ROSE QUARTZ
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                {t('lookbook.card3Title')}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                {t('lookbook.card3Desc')}
              </p>
            </div>

            {/* Card 4: Multi-Mineral Yin Yang Formulations */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
                <ShimmerImage
                  src="/images/hero/yin-yang-beads.jpg"
                  alt="Natural Multi-Mineral Yin Yang Beads"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  MINERAL HARMONY
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                {t('lookbook.card4Title')}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                {t('lookbook.card4Desc')}
              </p>
            </div>

            {/* Card 5: Anthropometric Fit on Wrist */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
                <ShimmerImage
                  src="/images/hero/wrist-crystal-strand.jpg"
                  alt="Crystal Strand Anthropometric Wrist Fit"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  SECOND-SKIN FIT
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                {t('lookbook.card5Title')}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                {t('lookbook.card5Desc')}
              </p>
            </div>

            {/* Card 6: Gold Accent Strand */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
                <ShimmerImage
                  src="/images/hero/gold-tassel-bracelet.jpg"
                  alt="Gold Tassel Hand-Knotted Crystal Strand"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  GOLD SILK ACCENT
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                {t('lookbook.card6Title')}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                {t('lookbook.card6Desc')}
              </p>
            </div>

            {/* Card 7: Black Obsidian & Tiger Eye */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
                <ShimmerImage
                  src="/images/atelier/gem_01.jpg"
                  alt="Natural Obsidian and Tiger Eye Raw Stones"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  OBSIDIAN SHIELD
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                {t('lookbook.card7Title')}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                {t('lookbook.card7Desc')}
              </p>
            </div>

            {/* Card 8: Gemologist Lens Inspection */}
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 p-3.5 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
                <ShimmerImage
                  src="/images/atelier/gem_02.jpg"
                  alt="Optical Loupe Verification of Mineral Polish"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-mono">
                  GEMOLOGY LOUPE
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-1">
                {t('lookbook.card8Title')}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                {t('lookbook.card8Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Flagship Location & Real Map API Section (OpenStreetMap Live Embed with Dummy Location) */}
      <section id="location" className="scroll-mt-36 relative w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-white dark:bg-[#0E0E10] border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Salon Details */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-300 shadow-2xs mb-3 w-max">
                <MapPin className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
                <span>{t('location.badge')}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-950 dark:text-white mb-4">
                {t('location.title')}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-6">
                {t('location.desc')}
              </p>

              <div className="space-y-4 mb-8 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">{t('location.addressLabel')}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{t('location.addressVal')}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">{t('location.hoursLabel')}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{t('location.hoursVal')}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">{t('location.phoneLabel')}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{t('location.phoneVal')}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/location"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-7 py-3.5 text-xs font-semibold text-white dark:text-zinc-900 shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all active:scale-95"
                >
                  <span>{t('location.bookBtn')}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
                <Link
                  href="/location"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/20 bg-white dark:bg-zinc-900 px-6 py-3.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95"
                >
                  <span>{t('location.guideBtn')}</span>
                </Link>
              </div>
            </div>

            {/* Real Map API Canvas: Interactive Google Maps Embed with Paris Place Vendôme */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] min-h-[380px] sm:min-h-[440px] w-full rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 shadow-xl group">
                <iframe
                  title="Artixain Paris Flagship Salon Real Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://maps.google.com/maps?q=24+Place+Vendome,+75001+Paris,+France&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full rounded-3xl border-0 transition-all"
                  loading="lazy"
                />

                {/* Pinpoint Label Tag */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <div className="px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-white/20 text-zinc-900 dark:text-white text-[11px] font-bold shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>Artixain Atelier &bull; 24 Place Vendôme</span>
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
                  <a
                    href="https://maps.google.com/?q=24+Place+Vendome+Paris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <span>Get Directions</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                  <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-700 dark:text-zinc-300 text-[10px] font-mono border border-zinc-200 dark:border-white/10">
                    48.8675° N, 2.3294° E
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Concierge Contact Us Section */}
      <section id="contact" className="scroll-mt-36 relative w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-[#FAFAFA] dark:bg-zinc-950 border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-300 shadow-2xs mb-3">
                <Mail className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
                <span>{t('contact.badge')}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-950 dark:text-white mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-6">
                {t('contact.desc')}
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
                      {t('contact.successTitle')}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md font-light leading-relaxed mb-6">
                      {t('contact.successDesc')} ({contactForm.email})
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
                          {t('contact.nameLabel')}
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
                          {t('contact.emailLabel')}
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
                        {t('contact.messageLabel')}
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="I would like to inquire about bespoke sizing for a triple-strand pearl bracelet..."
                        className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-zinc-400 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-8 py-3.5 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md active:scale-95"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{t('contact.submitBtn')}</span>
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
      <section id="faq" className="scroll-mt-36 relative w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-white dark:bg-[#0E0E10] border-b border-zinc-100 dark:border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold uppercase tracking-widest mb-3 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-zinc-900 dark:text-amber-400" />
              <span>{t('faq.badge')}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-950 dark:text-white mb-3">
              {t('faq.title')}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              {t('faq.desc')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: language === 'ur' ? 'میں اپنی کلائی کی پیمائش کس طرح کروں؟' : 'How do I determine my exact wrist size for bespoke fitting?',
                a: language === 'ur' ? 'لچکدار درزی کا فیتہ اپنی کلائی کی ہڈی کے گرد بغیر کسی ڈھیل کے لپیٹیں۔ ہمارے سسٹم میں خودکار طور پر آرام دہ گنجائش شامل کی جاتی ہے۔' : 'Wrap a flexible tailor measuring tape flush around your wrist bone without adding slack. Our customizer automatically calculates bead packing and adds ergonomic breathing clearance.'
              },
              {
                q: language === 'ur' ? 'کیا آرٹیکزین کے نگینے ۱۰۰٪ قدرتی اور اصلی ہیں؟' : 'Are Artixain minerals and gemstones 100% natural and certified?',
                a: language === 'ur' ? 'جی ہاں۔ ہر نگینے کی ارضیاتی جانچ کی جاتی ہے۔ ہم کیمیائی رنگوں اور مصنوعی شیشے کے متبادل بالکل استعمال نہیں کرتے۔' : 'Yes. Every mineral batch undergoes strict gemological verification for density and optical refraction. We exclusively use Grade-A ethically sourced natural minerals.'
              },
              {
                q: language === 'ur' ? 'بریسلیٹ کی ترسیل میں کتنا وقت لگتا ہے؟' : 'What is your dispatch timeframe for custom handcrafted bracelets?',
                a: language === 'ur' ? 'ہر کسٹم بریسلیٹ ۱ سے ۲ کاروباری دنوں میں ہاتھ سے تیار ہوتا ہے۔ ہم بیمہ شدہ مفت ایکسپریس شپنگ فراہم کرتے ہیں۔' : 'Every custom bracelet is hand-threaded on our atelier bench within 1 to 2 business days with complimentary tracked express shipping.'
              },
              {
                q: language === 'ur' ? 'آرٹیکزین لائف ٹائم وارنٹی میں کیا شامل ہے؟' : 'What does the Artixain Lifetime Cord Warranty cover?',
                a: language === 'ur' ? 'ہماری تاحیات وارنٹی میں مفت دوبارہ پرونے، تار کی تبدیلی اور پالش شامل ہے۔ اگر تار کبھی بھی کمزور ہو تو ہم اسے مفت درست کریں گے۔' : 'Our lifetime warranty covers complimentary re-stringing, elastic cord replacement, and gemstone ultrasonic cleansing free of charge.'
              }
            ].map((item, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-[#FAFAFA] dark:bg-zinc-900/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-semibold text-base sm:text-lg text-zinc-900 dark:text-white cursor-pointer"
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
              <span>{t('faq.viewAll')}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Customer Testimonials & Reviews */}
      <section id="reviews" className="scroll-mt-36 relative w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-16 md:py-24 bg-[#FAFAFA] dark:bg-zinc-950">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2 shadow-2xs">
              {t('reviews.badge')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-zinc-950 dark:text-white">
              {t('reviews.title')}
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
              <span>{t('reviews.viewAll')}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
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
