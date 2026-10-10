'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Package,
  Truck,
  Sparkles,
  Ruler,
  Check,
  Scissors
} from 'lucide-react';
import { MASTER_GEMSTONES, getGemstoneByCode } from '@artixain/shared';

interface AssemblySlot {
  slot: number;
  code: string;
  name: string;
  diameterMm: number;
  colorHex: string;
  isSpacer: boolean;
  isChecked: boolean;
}

export default function OrderWorkbenchPage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'ARTX-DEMO-001';

  const [status, setStatus] = useState<'Placed' | 'Assembling' | 'QC Passed' | 'Shipped' | 'Delivered'>('Assembling');
  const [wristSizeCm, setWristSizeCm] = useState<number>(16.5);
  const [customerName, setCustomerName] = useState('Eleanor Vance');
  const [customerEmail, setCustomerEmail] = useState('eleanor.vance@example.com');
  const [shippingAddress, setShippingAddress] = useState('742 Evergreen Terrace, Springfield, OR 97477');

  // Generate 20-slot sequence blueprint
  const [slots, setSlots] = useState<AssemblySlot[]>(() => {
    const defaultCodes = [
      'OBS', 'OBS', 'TIG', 'GSP', 'OBS', 'OBS', 'TIG', 'GSP',
      'OBS', 'OBS', 'TIG', 'GSP', 'OBS', 'OBS', 'TIG', 'GSP',
      'OBS', 'OBS', 'TIG', 'GSP'
    ];
    return defaultCodes.map((code, idx) => {
      const gem = getGemstoneByCode(code) || MASTER_GEMSTONES[0];
      const diam = gem.isSpacer ? 6 : 8;
      return {
        slot: idx + 1,
        code: `${gem.code}${diam}`,
        name: gem.name,
        diameterMm: diam,
        colorHex: gem.baseColorHex || '#111111',
        isSpacer: !!gem.isSpacer,
        isChecked: false
      };
    });
  });

  // Calculate cord length with +4.5cm knot allowance
  const cordCutLengthCm = Number((wristSizeCm + 4.5).toFixed(1));

  const toggleSlot = (idx: number) => {
    setSlots((prev) => {
      const next = [...prev];
      next[idx].isChecked = !next[idx].isChecked;
      return next;
    });
  };

  const handleNextState = () => {
    if (status === 'Placed') setStatus('Assembling');
    else if (status === 'Assembling') setStatus('QC Passed');
    else if (status === 'QC Passed') setStatus('Shipped');
    else if (status === 'Shipped') setStatus('Delivered');
  };

  const checkedCount = slots.filter((s) => s.isChecked).length;
  const isAllStrung = checkedCount === slots.length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl print:p-0">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10 print:hidden">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="icon-orb-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-champagne-600 dark:text-champagne-400">
                Atelier Assembly Workbench
              </span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs font-mono font-bold text-obsidian-900 dark:text-white">
                {orderId}
              </span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-obsidian-900 dark:text-white">
              Visual Stringing Blueprint & QC Station
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="btn-pill-secondary py-2 px-4 text-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Work Order</span>
          </button>

          <button
            onClick={handleNextState}
            disabled={status === 'Delivered'}
            className="btn-pill-primary py-2 px-5 text-xs shadow-luxury disabled:opacity-50"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {status === 'Placed'
                ? 'Advance to Assembling'
                : status === 'Assembling'
                ? 'Pass QC & Certify'
                : status === 'QC Passed'
                ? 'Dispatch & Send Tracking'
                : status === 'Shipped'
                ? 'Confirm Delivery'
                : 'Order Fulfilled'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Grid: Blueprint & Assembly Bench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Visual Bead-by-Bead Strip (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Cord Cut Calculation Banner */}
          <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="icon-orb w-10 h-10 bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 tracking-wider block">
                  Cord Cut Specification (+4.5cm Knot Allowance)
                </span>
                <span className="text-base font-bold text-obsidian-900 dark:text-white">
                  Cut Exactly {cordCutLengthCm} cm (210 mm) 0.8mm Elastic Core
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-zinc-500 block">Target Wrist Size:</span>
              <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                {wristSizeCm} cm
              </span>
            </div>
          </div>

          {/* Ordered Bead Sequence Slots */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-white/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-white/10">
              <div>
                <h3 className="text-sm font-bold text-obsidian-900 dark:text-white">
                  Ordered Stringing Sequence ({checkedCount}/{slots.length} Beads Checked)
                </h3>
                <p className="text-xs text-zinc-500">
                  Follow bead sequence from Slot 01 clockwise. Tap bead card to check off as you string.
                </p>
              </div>
              <span className="text-xs font-bold text-champagne-600 dark:text-champagne-400">
                {Math.round((checkedCount / slots.length) * 100)}% Complete
              </span>
            </div>

            {/* Bead Slots Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {slots.map((slot, idx) => (
                <button
                  key={slot.slot}
                  onClick={() => toggleSlot(idx)}
                  className={`p-3 rounded-2xl border transition-all text-left flex flex-col items-center justify-center relative ${
                    slot.isChecked
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200 shadow-sm'
                      : 'bg-zinc-50/80 dark:bg-zinc-800/80 border-zinc-200/80 dark:border-white/10 hover:border-zinc-300'
                  }`}
                >
                  {/* Slot Number Tag */}
                  <span className="absolute top-2 left-2.5 text-[9px] font-mono font-bold text-zinc-400">
                    #{String(slot.slot).padStart(2, '0')}
                  </span>

                  {/* Check Indicator */}
                  {slot.isChecked && (
                    <span className="absolute top-2 right-2.5 icon-orb w-4 h-4 bg-emerald-500 text-white">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}

                  {/* Gem Swatch Orb */}
                  <div
                    className="w-10 h-10 rounded-full border border-black/10 shadow-inner my-2 flex items-center justify-center"
                    style={{
                      background: slot.isSpacer
                        ? '#C5A059'
                        : slot.colorHex
                    }}
                  />

                  <span className="text-xs font-bold truncate max-w-full text-center">
                    {slot.code}
                  </span>
                  <span className="text-[10px] text-zinc-500 truncate max-w-full text-center">
                    {slot.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Details & Quality Certification (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* 5-Stage State Machine Indicator */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/10 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-obsidian-900 dark:text-white">
              Fulfillment State Machine
            </h3>

            <div className="space-y-2">
              {[
                { stage: 'Placed', label: '1. Placed (Payment Verified)' },
                { stage: 'Assembling', label: '2. Assembling on Workbench' },
                { stage: 'QC Passed', label: '3. QC Passed & Certificate Minted' },
                { stage: 'Shipped', label: '4. Shipped (Courier Dispatched)' },
                { stage: 'Delivered', label: '5. Delivered to Customer' }
              ].map((st) => {
                const isActive = status === st.stage;
                const isPassed =
                  ['Placed', 'Assembling', 'QC Passed', 'Shipped', 'Delivered'].indexOf(status) >=
                  ['Placed', 'Assembling', 'QC Passed', 'Shipped', 'Delivered'].indexOf(st.stage);

                return (
                  <div
                    key={st.stage}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium ${
                      isActive
                        ? 'bg-champagne-500/20 text-champagne-800 dark:text-champagne-300 font-bold border border-champagne-500/40'
                        : isPassed
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-zinc-400'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isActive
                          ? 'bg-champagne-500 animate-pulse'
                          : isPassed
                          ? 'bg-emerald-500'
                          : 'bg-zinc-300 dark:bg-zinc-700'
                      }`}
                    />
                    <span>{st.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer & Destination Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/10 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-obsidian-900 dark:text-white">
              Shipping & Recipient Details
            </h3>

            <div className="space-y-1 text-xs">
              <span className="text-zinc-400 block text-[11px]">Recipient:</span>
              <span className="font-semibold text-obsidian-900 dark:text-white block">
                {customerName}
              </span>
              <span className="text-zinc-500 block">
                {customerEmail}
              </span>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-700/60 text-xs">
              <span className="text-zinc-400 block text-[11px]">Destination:</span>
              <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed block mt-0.5">
                {shippingAddress}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
