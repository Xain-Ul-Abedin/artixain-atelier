'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Ruler,
  Truck,
  RotateCcw,
  Gem,
  CheckCircle2,
  Search
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'Sizing' | 'Minerals' | 'Craftsmanship' | 'Shipping' | 'Warranty';
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'Sizing',
    question: 'How do I accurately calibrate my wrist circumference?',
    answer: 'Wrap a flexible tailor measuring tape snugly around your wrist bone without slack. If you do not have a tape, wrap a strip of paper, mark the overlap point, and measure against a ruler. Our Customizer Studio automatically incorporates a calibrated +4.5cm allowance for elastic pre-tensioning and double surgeon knot comfort.'
  },
  {
    id: 'faq-02',
    category: 'Minerals',
    question: 'Are all gemstones and crystalline minerals 100% natural and certified?',
    answer: 'Every specimen in the Artixain Atelier is strictly certified Grade-A natural crystalline mineral, ethically extracted from certified geological reserves. We reject reconstituted glass, pressed resin, and synthetic dyed imitations. All lapis lazuli retains authentic golden pyrite inclusions, labradorite displays natural optical labradorescence, and obsidian is genuine volcanic vitreous silica.'
  },
  {
    id: 'faq-03',
    category: 'Craftsmanship',
    question: 'What elastic cord and knotting methodology ensures lifetime durability?',
    answer: 'Our bench jewelers utilize heavy-duty multi-strand Japanese elastic polymer cord. Each strand is hand-threaded on fluted oak benches, pre-stretched under calibrated load, and secured with double surgeon knots carefully concealed inside precision bead recesses.'
  },
  {
    id: 'faq-04',
    category: 'Shipping',
    question: 'How does complimentary global delivery and order tracking work?',
    answer: 'Every custom and premade order includes complimentary tracked express courier delivery worldwide. Master bench assembly and quality inspection require 24 to 48 hours, followed by 3 to 5 business days for transit in bespoke gift-ready presentation packaging.'
  },
  {
    id: 'faq-05',
    category: 'Warranty',
    question: 'What is included in the Artixain Lifetime Elasticity Guarantee?',
    answer: 'All Artixain bracelets are backed by our lifetime restringing guarantee. If your elastic cord ever loosens, breaks, or requires size modification, dispatch the piece to our Paris or New York salon for complimentary restringing and energetic cleansing.'
  },
  {
    id: 'faq-06',
    category: 'Sizing',
    question: 'Can I design matching sets and receive volume order discounts?',
    answer: 'Yes. Our pricing engine automatically calculates volume discounts when multiple bracelets are added to your bag: 2 bracelets receive a 10% volume discount, 3-4 bracelets receive 15%, and 5+ bracelets receive 20% off automatically.'
  }
];

export default function FAQPage() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-01': true, 'faq-02': true });
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = FAQS.filter((f) => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory;
    const matchSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1720px] pt-28 md:pt-32">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200 text-[11px] font-bold uppercase tracking-widest mb-3 shadow-2xs">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
          <span>Atelier Concierge Knowledge Base</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-950 dark:text-white mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          Everything you need to know about millimeter wrist calibration, authentic mineral certification, master bench stringing, and complimentary lifetime warranties.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-3xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Sizing', 'Minerals', 'Craftsmanship', 'Shipping', 'Warranty'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                activeCategory === cat
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-zinc-300 dark:focus:border-zinc-600 text-xs text-zinc-900 dark:text-white outline-none transition-all"
          />
        </div>
      </div>

      {/* Accordion FAQ Grid */}
      <div className="max-w-3xl mx-auto space-y-4 mb-16">
        {filteredFaqs.map((faq) => {
          const isOpen = !!openIds[faq.id];
          return (
            <div
              key={faq.id}
              className="rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#18181B] shadow-2xs overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {faq.category}
                  </span>
                  <h3 className="font-serif font-semibold text-base sm:text-lg text-zinc-900 dark:text-white">
                    {faq.question}
                  </h3>
                </div>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light border-t border-zinc-100 dark:border-zinc-800/80 pt-4 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Banner */}
      <div className="max-w-3xl mx-auto rounded-3xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-white/10 p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="text-center sm:text-left">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-zinc-950 dark:text-white mb-1">
            Have a custom inquiry or special gemstone request?
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
            Our atelier concierges and master gemologists reply within 24 hours.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 text-xs font-semibold shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all active:scale-95"
        >
          <span>Contact Concierge</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
