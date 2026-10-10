'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  ShieldCheck,
  Package,
  Heart,
  Ruler,
  LogOut,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Award,
  Settings,
  Clock,
  CheckCircle2
} from 'lucide-react';

const MOCK_ORDERS = [
  {
    id: 'ARTX-ORD-9281',
    date: 'October 8, 2026',
    status: 'STRINGING_IN_PROGRESS',
    statusLabel: 'Atelier Bench Stringing',
    statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
    total: 82.50,
    items: [
      { name: 'Custom Triple Strand Pearl & Gold', beads: 24, wrist: '16.0 cm' },
      { name: 'Gilded Ash Obsidian Formula', beads: 22, wrist: '16.0 cm' }
    ]
  },
  {
    id: 'ARTX-ORD-8814',
    date: 'September 24, 2026',
    status: 'DELIVERED',
    statusLabel: 'Delivered & Verified',
    statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    total: 35.63,
    items: [
      { name: 'Dreamy Kitty Moonstone & Rose Quartz', beads: 23, wrist: '16.0 cm' }
    ]
  }
];

const SAVED_DESIGNS = [
  {
    id: 'des-01',
    title: 'Himalayan Salt & Rose Quartz Aura',
    date: 'Saved yesterday',
    token: 'artx.v1.RSQ8_MOON8_AMY8_OPL8',
    beadsCount: 24,
    price: 35.63
  },
  {
    id: 'des-02',
    title: 'Yin Yang Agate & Onyx Anchor',
    date: 'Saved 3 days ago',
    token: 'artx.v1.OBS8_LAB8_HEM8_TIG8',
    beadsCount: 22,
    price: 28.00
  }
];

export default function ProfilePage() {
  const { profile, signOut, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'saved' | 'settings'>('orders');
  const [wristSize, setWristSize] = useState('16.0');

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md pt-36 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 mb-6">
          <User className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-zinc-950 mb-2">
          Patron Profile
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mb-8 font-light leading-relaxed">
          Sign in to view your orders, calibrated wrist dimensions, and saved custom gemstone formulations.
        </p>
        <Link
          href="/login"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 py-3.5 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all active:scale-[0.97]"
        >
          <span>Sign In to Artixain</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1720px] pt-28 md:pt-32">
      {/* Profile Header Container */}
      <div className="rounded-[2rem] bg-[#FAFAFA] border border-zinc-200/80 p-6 md:p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white font-serif text-2xl font-bold shadow-md">
              {profile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-serif font-bold text-zinc-950">
                  {profile.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider">
                  <Award className="w-3 h-3 text-amber-700" />
                  <span>{profile.tier}</span>
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-mono">
                {profile.email}
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-zinc-200 shadow-xs">
              <Ruler className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-xs font-semibold text-zinc-800">
                Calibrated: {wristSize} cm
              </span>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold transition-colors"
            >
              <span>Atelier Admin</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'orders'
              ? 'bg-zinc-900 text-white shadow-sm'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Order History ({MOCK_ORDERS.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'saved'
              ? 'bg-zinc-900 text-white shadow-sm'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Saved Strands ({SAVED_DESIGNS.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'settings'
              ? 'bg-zinc-900 text-white shadow-sm'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Wrist & Sizing Preferences</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {MOCK_ORDERS.map((ord) => (
            <div
              key={ord.id}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-zinc-900">
                    {ord.id}
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${ord.statusColor}`}>
                    <Clock className="w-3 h-3" />
                    <span>{ord.statusLabel}</span>
                  </span>
                </div>
                <div className="text-xs text-zinc-500 font-light">
                  Ordered on {ord.date} &bull; Tracked via Supabase WebSocket
                </div>
                <div className="pt-2">
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="text-xs font-medium text-zinc-800">
                      &bull; {it.name} ({it.beads} beads &bull; {it.wrist})
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-zinc-100">
                <span className="font-serif font-bold text-lg text-zinc-950">
                  ${ord.total.toFixed(2)}
                </span>
                <Link
                  href={`/orders?id=${ord.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 hover:bg-zinc-900 hover:text-white px-4 py-2 text-xs font-semibold text-zinc-800 transition-colors"
                >
                  <span>Track Lifecycle</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Saved Strands */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAVED_DESIGNS.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400">
                  {item.date}
                </span>
                <h3 className="font-serif font-bold text-base text-zinc-950 mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 font-light mt-1">
                  {item.beadsCount} gemstone beads calibrated for {wristSize} cm wrist.
                </p>
                <div className="mt-3 font-mono text-xs text-amber-800 font-bold">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                <Link
                  href={`/designer?token=${item.token}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 text-white px-4 py-2 text-xs font-semibold hover:bg-zinc-800 transition-all active:scale-[0.97]"
                >
                  <span>Open in 3D Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Settings */}
      {activeTab === 'settings' && (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 shadow-sm space-y-6 max-w-xl">
          <h2 className="text-lg font-serif font-bold text-zinc-900">
            Atelier Wrist Calibration
          </h2>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
              Default Wrist Circumference (cm)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.1"
                min="13.0"
                max="24.0"
                value={wristSize}
                onChange={(e) => setWristSize(e.target.value)}
                className="w-32 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-mono font-bold text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white"
              />
              <span className="text-xs text-zinc-500">
                Automatically calculates bead count (+4.5cm elastic knot allowance)
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100">
            <button
              type="button"
              onClick={() => alert('Wrist calibration preference saved in local session.')}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-2.5 text-xs font-semibold hover:bg-zinc-800 transition-all active:scale-[0.97]"
            >
              <span>Save Calibration</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
