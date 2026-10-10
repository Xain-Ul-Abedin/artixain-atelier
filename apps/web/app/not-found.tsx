import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center pt-28">
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold uppercase tracking-widest mb-4 border border-amber-200">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Celestial Navigation</span>
      </span>
      <h1 className="text-5xl md:text-6xl font-serif font-bold text-zinc-950 mb-3">
        404
      </h1>
      <h2 className="text-xl md:text-2xl font-serif text-zinc-700 mb-4">
        Strand Not Found
      </h2>
      <p className="text-xs md:text-sm text-zinc-500 max-w-md mb-8 leading-relaxed font-light">
        The celestial page or custom gemstone formulation you are seeking does not exist or has been shifted in the atelier.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-2.5 text-xs font-semibold hover:bg-zinc-800 transition-all active:scale-[0.97]"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Atelier Home</span>
        </Link>
        <Link
          href="/designer"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white text-zinc-800 px-6 py-2.5 text-xs font-semibold hover:bg-zinc-50 transition-all active:scale-[0.97]"
        >
          <span>Open 3D Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
