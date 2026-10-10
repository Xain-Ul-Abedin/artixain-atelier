'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  User,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Clock,
  MapPin,
  Send
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    inquiryType: 'Bespoke Wrist Calibration',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 800);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1720px] pt-28 md:pt-32">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200 text-[11px] font-bold uppercase tracking-widest mb-3 shadow-2xs">
          <Mail className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
          <span>Atelier Concierge & Master Bench Support</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-950 dark:text-white mb-3">
          Contact the Atelier
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          Whether inquiring about rare mineral sourcing, custom wrist caliper fitting, or order status, our concierges respond within 24 hours.
        </p>
      </div>

      {/* Main Grid: Contact Cards & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Direct Concierge Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#18181B] p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-zinc-400">
                Direct Channels
              </span>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mt-1">
                Atelier Assistance
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Patron Concierge Email</p>
                  <p className="text-zinc-500 dark:text-zinc-400 font-mono text-xs">concierge@artixain.com</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Average reply time: under 3 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Global Patron Line</p>
                  <p className="text-zinc-500 dark:text-zinc-400 font-mono text-xs">+1 (800) 492-7849</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Toll-free across North America and Europe</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Flagship Salon</p>
                  <p className="text-zinc-500 dark:text-zinc-400">24 Place Vendôme, 75001 Paris, France</p>
                  <Link href="/location" className="text-[11px] font-semibold text-zinc-900 dark:text-white underline mt-0.5 block">
                    View Interactive Map & Salon Hours
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
              <span>All communications protected under encrypted patron confidentiality</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#18181B] p-6 sm:p-10 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mb-2">
              Send Concierge Inquiry
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mb-6">
              Please provide your design specifications, wrist measurements, or question below.
            </p>

            {isSent ? (
              <div className="p-8 text-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-emerald-900 dark:text-emerald-200">
                  Message Dispatched to Atelier Concierge
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <span className="font-semibold">{formData.fullName}</span>. Your inquiry regarding {formData.inquiryType} has been assigned ticket token ARTX-MSG-{Date.now().toString().slice(-4)}. We will respond shortly to {formData.email}.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Elena Rostova"
                        className="w-full rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-800/70 py-3 pl-11 pr-4 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-zinc-900 dark:focus:border-white focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 ml-1">
                      Patron Email
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@artixain.com"
                        className="w-full rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-800/70 py-3 pl-11 pr-4 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-zinc-900 dark:focus:border-white focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 ml-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-800/70 py-3 px-4 text-xs text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-white focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all"
                  >
                    <option value="Bespoke Wrist Calibration">Bespoke Wrist Calibration</option>
                    <option value="Custom Mineral Sourcing">Custom Mineral Sourcing</option>
                    <option value="Order Tracking & QC">Order Tracking & QC</option>
                    <option value="Salon Appointment Inquiry">Salon Appointment Inquiry</option>
                    <option value="Lifetime Elastic Warranty">Lifetime Elastic Warranty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 ml-1">
                    Message Content
                  </label>
                  <div className="relative">
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your requirements, wrist measurements, or inquiries..."
                      className="w-full rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-800/70 p-4 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-zinc-900 dark:focus:border-white focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Dispatched to Concierge...</span>
                  ) : (
                    <>
                      <span>Transmit Concierge Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
