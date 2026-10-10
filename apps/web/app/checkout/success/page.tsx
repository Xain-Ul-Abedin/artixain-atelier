'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Sparkles, ShieldCheck, Printer, ArrowRight, Package } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ARTX-DEMO-001';

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/10 shadow-elevated space-y-6">
        {/* Success Icon Orb */}
        <div className="icon-orb w-16 h-16 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-champagne-600 dark:text-champagne-400">
            Work Order Confirmed
          </span>
          <h1 className="text-3xl font-serif font-bold text-obsidian-900 dark:text-white mt-1">
            Thank You for Your Order
          </h1>
          <p className="text-xs text-zinc-500 mt-2">
            Your custom bracelet blueprint has been routed to our physical atelier for hand-stringing and quality certification.
          </p>
        </div>

        {/* Order Reference Badge */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-700/50 border border-zinc-200/60 dark:border-white/5 inline-flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
            Order Reference Code
          </span>
          <span className="text-base font-mono font-bold text-obsidian-900 dark:text-white mt-0.5">
            {orderId}
          </span>
        </div>

        {/* 5-Stage State Machine Progress */}
        <div className="pt-4 border-t border-zinc-200/80 dark:border-white/10 text-left">
          <span className="text-xs font-bold text-obsidian-900 dark:text-white block mb-3">
            Fulfillment Journey Status:
          </span>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="p-2 rounded-xl bg-champagne-500/20 border border-champagne-500 text-champagne-800 dark:text-champagne-300">
              <span className="text-[10px] font-bold block">1. Placed</span>
              <span className="text-[9px] text-zinc-500">Active</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-700/40 text-zinc-400">
              <span className="text-[10px] font-bold block">2. Assembling</span>
              <span className="text-[9px]">Pending</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-700/40 text-zinc-400">
              <span className="text-[10px] font-bold block">3. QC Pass</span>
              <span className="text-[9px]">Pending</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-700/40 text-zinc-400">
              <span className="text-[10px] font-bold block">4. Shipped</span>
              <span className="text-[9px]">Pending</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-700/40 text-zinc-400">
              <span className="text-[10px] font-bold block">5. Delivered</span>
              <span className="text-[9px]">Pending</span>
            </div>
          </div>
        </div>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href={`/admin/orders/${orderId}`}
            className="btn-pill-primary py-3 px-6 text-xs flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Open Atelier Workbench</span>
          </Link>
          <Link
            href="/studio"
            className="btn-pill-secondary py-3 px-6 text-xs flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-champagne-500" />
            <span>Design Another Strand</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-500">Loading Order Confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
