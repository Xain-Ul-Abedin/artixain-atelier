'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ShimmerImage from '../ui/ShimmerImage';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';

interface Slide {
  id: string;
  image: string;
  title: string;
  tagline: string;
  category: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'pearl-triple',
    image: '/images/hero/triple-strand-pearl-bracelet.jpeg',
    title: 'Triple-Strand Luminous Pearls',
    tagline: 'Hand-threaded on fine silk cord with celestial luster and ergonomic wrist contour',
    category: 'Master Atelier Collection'
  },
  {
    id: 'himalayan-salt',
    image: '/images/hero/himalayan-salt-crystals.jpeg',
    title: 'Himalayan Salt Crystal Minerals',
    tagline: 'Raw crystalline geological formation with natural saturation and sacred geometric facets',
    category: 'Natural Earth Minerals'
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  const SLIDE_DURATION_MS = 5000;
  const TICK_MS = 50;

  // Scroll smoothly to a specific slide index
  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    isProgrammaticScroll.current = true;
    const targetLeft = index * container.clientWidth;
    container.scrollTo({
      left: targetLeft,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
    setProgress(0);

    // Reset programmatic flag after smooth scroll animation completes
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 600);
  }, []);

  // Time-based automatic slide advancement
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          const nextIndex = (currentIndex + 1) % HERO_SLIDES.length;
          scrollToIndex(nextIndex);
          return 0;
        }
        return prev + (TICK_MS / SLIDE_DURATION_MS) * 100;
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex, scrollToIndex]);

  // Handle manual scroll events from the user (swipe, touch, trackpad scroll)
  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;
    const container = scrollContainerRef.current;
    if (!container || container.clientWidth === 0) return;

    const newIndex = Math.round(container.scrollLeft / container.clientWidth);
    if (newIndex >= 0 && newIndex < HERO_SLIDES.length && newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setProgress(0);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % HERO_SLIDES.length;
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    scrollToIndex(prevIdx);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none group bg-zinc-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Horizontally Scrollable & Swipeable Slide Track */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className="min-w-full w-full h-full snap-start snap-always relative shrink-0 overflow-hidden"
          >
            {/* Shimmer Skeletal Loader on High-Res Image */}
            <ShimmerImage
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center scale-[1.02] transition-transform duration-700 ease-out"
              containerClassName="w-full h-full"
            />

            {/* Subtle Gradient Overlays for Luxury Contrast and Copy Readability */}
            <div className="absolute inset-y-0 left-0 w-36 md:w-56 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/70 to-transparent z-10 hidden md:block pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Floating Slide Information Badge (Top Right) */}
      <div className="absolute top-6 right-6 z-20 hidden md:flex flex-col items-end text-right text-white drop-shadow-md pointer-events-none transition-all duration-300">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] uppercase font-bold tracking-[0.2em] text-white/90 mb-1">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>{currentSlide.category} &bull; 0{currentIndex + 1} / 0{HERO_SLIDES.length}</span>
        </div>
        <h3 className="font-serif text-lg font-semibold text-white drop-shadow">
          {currentSlide.title}
        </h3>
        <p className="text-xs text-white/80 font-light max-w-xs mt-0.5 drop-shadow">
          {currentSlide.tagline}
        </p>
      </div>

      {/* Slide Navigation Controls & Timer Progress (Bottom Bar) */}
      <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 z-20 flex flex-col gap-3">
        {/* Continuous Time Progress Bar */}
        <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden backdrop-blur shadow-inner">
          <div
            className="h-full bg-white transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Action Controls & Scrollable Slide Indicator Pills */}
        <div className="flex items-center justify-between gap-3">
          {/* Prev / Next & Pause Action Orbs */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg backdrop-blur-md transition-all active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg backdrop-blur-md transition-all active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Resume auto-advance' : 'Pause auto-advance'}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg backdrop-blur-md transition-all active:scale-95"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 ml-0.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Horizontally Scrollable Slide Indicator Capsules */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold shrink-0 transition-all backdrop-blur-md ${
                  idx === currentIndex
                    ? 'bg-white text-zinc-950 shadow-md scale-105'
                    : 'bg-black/45 text-white/85 hover:bg-black/60 border border-white/20'
                }`}
              >
                <span className="font-mono text-[10px]">0{idx + 1}</span>
                <span className="truncate max-w-[140px]">
                  {slide.title.replace('Triple-Strand ', '').replace(' Minerals', '')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
