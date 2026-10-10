'use client';

import React from 'react';
import Link from 'next/link';
import { Ruler, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const SIZE_CHART = [
  { size: 'XS (Extra Small)', wrist: '14.0 - 15.0 cm', fit: 'Very Petite', beads: '20 - 21 beads (8mm)' },
  { size: 'S (Small)', wrist: '15.0 - 16.0 cm', fit: 'Slender Wrist', beads: '22 - 23 beads (8mm)' },
  { size: 'M (Medium - Most Popular)', wrist: '16.0 - 17.0 cm', fit: 'Standard Fit', beads: '23 - 24 beads (8mm)' },
  { size: 'L (Large)', wrist: '17.0 - 18.5 cm', fit: 'Comfortable Fit', beads: '25 - 26 beads (8mm)' },
  { size: 'XL (Extra Large)', wrist: '18.5 - 20.0 cm', fit: 'Broad Wrist', beads: '27 - 28 beads (8mm)' },
  { size: 'XXL (Custom Atelier)', wrist: '20.0+ cm', fit: 'Extended Custom', beads: '29+ beads (8mm)' }
];

export default function SizeGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[1720px] pt-28 md:pt-32">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-widest mb-3">
          <Ruler className="w-3.5 h-3.5" />
          <span>Atelier Sizing Guide</span>
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-950 mb-4">
          Finding Your Perfect Wrist Fit
        </h1>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">
          Every Artixain bracelet is individually strung to your millimeter measurements. Review our standard size ranges and measurement recommendations below.
        </p>
      </div>

      {/* Sizing Table */}
      <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm overflow-hidden mb-16">
        <div className="p-6 border-b border-zinc-100">
          <h2 className="text-lg font-serif font-bold text-zinc-900">
            Standard Wrist Sizing Chart
          </h2>
          <p className="text-xs text-zinc-500">
            All bracelets use heavy-duty multi-strand Japanese elastic silicone stretch cord with natural 0.5cm give.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 text-zinc-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-4">Size Code</th>
                <th className="p-4">Wrist Circumference</th>
                <th className="p-4">Fit Profile</th>
                <th className="p-4">Average 8mm Bead Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {SIZE_CHART.map((s) => (
                <tr key={s.size} className="hover:bg-zinc-50/60 transition-colors">
                  <td className="p-4 font-bold text-zinc-900">{s.size}</td>
                  <td className="p-4 font-mono font-medium text-amber-800">{s.wrist}</td>
                  <td className="p-4 text-zinc-600">{s.fit}</td>
                  <td className="p-4 text-zinc-500">{s.beads}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Measurement Techniques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-3xl bg-[#FAFAFA] border border-zinc-100 space-y-3">
          <span className="w-8 h-8 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
            1
          </span>
          <h3 className="font-serif font-bold text-base text-zinc-900">
            Flexible Measuring Tape
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-light">
            Wrap a soft tailor's tape snugly around your wrist just behind the wrist bone. Read the measurement in centimeters without adding extra slack.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#FAFAFA] border border-zinc-100 space-y-3">
          <span className="w-8 h-8 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
            2
          </span>
          <h3 className="font-serif font-bold text-base text-zinc-900">
            Paper Strip & Ruler
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-light">
            Wrap a plain strip of paper or string around your wrist. Mark the intersection point with a pen, then lay the strip flat against a ruler to measure.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#FAFAFA] border border-zinc-100 space-y-3">
          <span className="w-8 h-8 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
            3
          </span>
          <h3 className="font-serif font-bold text-base text-zinc-900">
            On-Screen Calibration
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-light">
            Inside our Customizer Studio, click "Measure Now" to use on-screen card calibration and camera caliper guides directly on your mobile device.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-10 rounded-3xl bg-zinc-900 text-white text-center space-y-4">
        <h3 className="text-2xl font-serif font-bold">
          Ready to Start Designing?
        </h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Enter your wrist measurement directly into our customizer studio to calculate your exact bead count automatically.
        </p>
        <Link
          href="/designer"
          className="inline-flex items-center gap-2 rounded-full bg-white text-zinc-900 px-8 py-3 text-xs font-bold hover:bg-zinc-100 transition-colors shadow-lg"
        >
          <span>Open Designer Studio</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
