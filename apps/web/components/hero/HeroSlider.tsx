'use client';

import React, { useState, useEffect } from 'react';
import ShimmerImage from '../ui/ShimmerImage';
import { ChevronLeft, ChevronRight, Sparkles, Gem } from 'lucide-react';

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  spec: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'pearl-triple',
    image: '/images/hero/triple-strand-pearl-bracelet.jpeg',
    title: 'Triple-Strand Luminous Pearls',
    subtitle: 'Hand-threaded on fine silk cord with celestial luster and ergonomic wrist contour',
    tag: 'Master Atelier Craft',
    spec: 'Natural Luster Pearls &bull; Silk Thread'
  },
  {
    id: 'himalayan-salt',
    image: '/images/hero/himalayan-salt-crystals.jpeg',
    title: 'Himalayan Salt Crystal Minerals',
    subtitle: 'Raw crystalline geological formation with natural saturation and geometric facets',
    tag: 'Natural Earth Minerals',
    spec: 'Raw Mineral Specimen &bull; Grade-A'
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slide every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      className="relative w-full max-w-2xl mx-auto flex flex-col group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Framed Visual Card */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-[2rem] overflow-hidden bg-zinc-950 shadow-2xl border border-zinc-200/90">
        {/* Slides with Smooth Crossfade */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <ShimmerImage
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center scale-[1.01] hover:scale-105 transition-transform duration-700"
                containerClassName="w-full h-full"
              />

              {/* Gentle Bottom Gradient for Text Legibility */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />

              {/* Top Luxury Pill Tag */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{slide.tag}</span>
                </span>
              </div>

              {/* Spec Badge Top Right */}
              <div className="absolute top-4 right-4 z-20 hidden sm:block">
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-zinc-900 text-[10px] font-mono font-semibold shadow-sm"
                  dangerouslySetInnerHTML={{ __html: slide.spec }}
                />
              </div>

              {/* Bottom Caption Inside Card */}
              <div className="absolute bottom-4 left-5 right-5 z-20 text-white pointer-events-none">
                <h3 className="font-serif text-lg sm:text-xl font-medium tracking-wide drop-shadow-sm mb-1">
                  {slide.title}
                </h3>
                <p className="text-xs text-white/85 font-light max-w-md drop-shadow-xs line-clamp-2">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          );
        })}

        {/* Previous / Next Arrow Controls */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-zinc-900 shadow-md backdrop-blur opacity-0 group-hover:opacity-100 transition-all active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 -ml-0.5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-zinc-900 shadow-md backdrop-blur opacity-0 group-hover:opacity-100 transition-all active:scale-95"
        >
          <ChevronRight className="w-5 h-5 -mr-0.5" />
        </button>
      </div>

      {/* Simplified, Intuitive Slide Switcher Controls (Bottom Pills) */}
      <div className="mt-4 flex items-center justify-between gap-3 px-2">
        {/* Slide Selection Pills */}
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-2xs active:scale-95 ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-900'
                    : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? 'bg-amber-300' : 'bg-zinc-300'
                  }`}
                />
                <span className="font-mono text-[11px]">0{idx + 1}</span>
                <span className="truncate max-w-[120px] sm:max-w-none">
                  {idx === 0 ? 'Luminous Pearls' : 'Salt Crystals'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timer Pause Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>{isPaused ? 'Paused on Hover' : 'Auto Advancing'}</span>
        </div>
      </div>
    </div>
  );
}
