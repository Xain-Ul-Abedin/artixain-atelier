'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Ruler,
  Gem,
  CheckCircle2,
  Navigation
} from 'lucide-react';

export default function LocationPage() {
  const [selectedSlot, setSelectedSlot] = useState<string>('14:00 - 15:00');
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1720px] pt-28 md:pt-32">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200 text-[11px] font-bold uppercase tracking-widest mb-3 shadow-2xs">
          <MapPin className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
          <span>Atelier Flagship Salon & Fitting Suite</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-950 dark:text-white mb-3">
          Visit Our Atelier
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          Experience our physical mineral vaults, millimeter caliper fitting suites, and witness live bench stringing on historic Place Vendôme.
        </p>
      </div>

      {/* Main Location & Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Salon Details & Appointment Booking (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Atelier Address Card */}
          <div className="rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#18181B] p-6 sm:p-8 shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-zinc-400">
              Primary Flagship
            </span>
            <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mt-1 mb-4">
              Artixain Paris Salon
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zinc-800 dark:text-zinc-200 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">24 Place Vendôme</p>
                  <p className="text-zinc-500 dark:text-zinc-400">75001 Paris, France</p>
                  <p className="text-[11px] font-mono text-zinc-400 mt-0.5">Coordinates: 48.8675° N, 2.3294° E</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-zinc-800 dark:text-zinc-200 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Visiting Hours</p>
                  <p className="text-zinc-500 dark:text-zinc-400">Monday - Friday: 10:00 AM - 7:00 PM CET</p>
                  <p className="text-zinc-500 dark:text-zinc-400">Saturday: 11:00 AM - 6:00 PM CET</p>
                  <p className="text-zinc-400 text-[11px]">Sunday: Closed (Private Curations Only)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-zinc-800 dark:text-zinc-200 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Direct Salon Telephone</p>
                  <p className="text-zinc-500 dark:text-zinc-400">+33 1 42 68 55 00</p>
                </div>
              </div>
            </div>

            {/* Salon Amenities Badges */}
            <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2 text-[10px] font-semibold text-zinc-600 dark:text-zinc-300">
              <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                Millimeter Fitting Lounge
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                Mineral Vault Viewing
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                Live Bench Stringing
              </span>
            </div>
          </div>

          {/* Book Private Fitting Appointment */}
          <div className="rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#18181B] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
              <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
                Book Private Caliper Fitting
              </h3>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light mb-4">
              Select an available consultation slot with our master gemologists for bespoke wrist caliper measurement and energetic formulation.
            </p>

            {appointmentBooked ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Appointment confirmed for {selectedSlot}. A concierge confirmation was sent to your email.</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['11:00 - 12:00', '14:00 - 15:00', '16:00 - 17:00', '17:30 - 18:30'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-full text-center font-medium transition-all ${
                        selectedSlot === slot
                          ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold shadow-xs'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setAppointmentBooked(true)}
                  className="w-full mt-2 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all active:scale-[0.98]"
                >
                  Confirm Salon Consultation
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Real OpenStreetMap API Live Map Display (7 cols) */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 shadow-xl group">
            {/* Real Live OpenStreetMap API Embed */}
            <iframe
              title="Artixain Paris Salon Real Map API"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.3250%2C48.8650%2C2.3350%2C48.8700&layer=mapnik&marker=48.8675%2C2.3294"
              className="w-full h-full rounded-3xl border-0 dark:invert-[0.9] dark:hue-rotate-180 dark:contrast-[1.2] transition-all"
            />

            {/* Top Left Salon Landmark Capsule */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-md border border-zinc-200 dark:border-white/20 text-zinc-900 dark:text-white text-[11px] font-bold shadow-lg">
                <Gem className="w-3.5 h-3.5 text-amber-500" />
                <span>Artixain Atelier &bull; 24 Place Vendôme</span>
              </span>
            </div>

            {/* Top Right Map Coordinates Badge */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono shadow-sm">
                <Navigation className="w-3 h-3 text-amber-300" />
                <span>48.8675° N, 2.3294° E</span>
              </span>
            </div>

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-4 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-white">
              <div className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium">Open Today until 7:00 PM CET</span>
              </div>
              <a
                href="https://maps.google.com/?q=24+Place+Vendome+Paris"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-zinc-950 text-xs font-semibold shadow hover:bg-zinc-100 transition-colors"
              >
                <span>Directions</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
