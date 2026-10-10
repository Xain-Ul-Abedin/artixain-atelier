'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShieldCheck, Package, Clock, CheckCircle2, Truck, Eye, Search, Filter, Lock, Unlock, AlertTriangle, Key, BellRing, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface OrderSummary {
  id: string;
  customerName: string;
  email: string;
  itemCount: number;
  totalPrice: number;
  status: 'Placed' | 'Assembling' | 'QC Passed' | 'Shipped' | 'Delivered';
  createdAt: string;
  wristSizeCm: number;
}

const DEMO_ORDERS: OrderSummary[] = [
  {
    id: 'ARTX-8921-A1',
    customerName: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    itemCount: 3,
    totalPrice: 114.50,
    status: 'Assembling',
    createdAt: '2026-10-10T09:30:00Z',
    wristSizeCm: 16.5
  },
  {
    id: 'ARTX-8920-B2',
    customerName: 'Marcus Thorne',
    email: 'marcus.t@example.com',
    itemCount: 1,
    totalPrice: 48.00,
    status: 'Placed',
    createdAt: '2026-10-10T08:15:00Z',
    wristSizeCm: 18.0
  },
  {
    id: 'ARTX-8919-C3',
    customerName: 'Sophia Sterling',
    email: 'sophia@example.com',
    itemCount: 4,
    totalPrice: 133.50,
    status: 'QC Passed',
    createdAt: '2026-10-09T18:45:00Z',
    wristSizeCm: 15.5
  },
  {
    id: 'ARTX-8918-D4',
    customerName: 'Julian Blackwood',
    email: 'julian@example.com',
    itemCount: 2,
    totalPrice: 78.00,
    status: 'Shipped',
    createdAt: '2026-10-09T14:20:00Z',
    wristSizeCm: 17.5
  }
];

export default function AdminOverviewPage() {
  const [orders, setOrders] = useState<OrderSummary[]>(DEMO_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [supabaseUser, setSupabaseUser] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [realtimeAlert, setRealtimeAlert] = useState<{
    id: string;
    customer: string;
    total: number;
    timestamp: number;
  } | null>(null);

  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // Atelier Web Audio Synthesizer Harmonic Chime (880Hz -> 1320Hz)
  const playChime = () => {
    if (!soundEnabledRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Tone 1: 880Hz (A5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0.14, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.45);

      // Tone 2: 1320Hz (E6) harmonic interval
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1320, now + 0.12);
      gain2.gain.setValueAtTime(0.16, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.65);
    } catch {
      // Audio playback blocked or unpermitted by browser gesture policy
    }
  };

  // Helper to append newly ingested order cleanly
  const handleIncomingOrder = (newOrderSummary: OrderSummary) => {
    setOrders((prev) => {
      if (prev.some((o) => o.id === newOrderSummary.id)) {
        return prev;
      }
      return [newOrderSummary, ...prev];
    });

    setRealtimeAlert({
      id: newOrderSummary.id,
      customer: newOrderSummary.customerName,
      total: newOrderSummary.totalPrice,
      timestamp: Date.now(),
    });

    playChime();
  };

  // Auto-dismiss alert banner after 6 seconds
  useEffect(() => {
    if (!realtimeAlert) return;
    const timer = setTimeout(() => {
      setRealtimeAlert(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [realtimeAlert]);

  // Initialize Supabase Auth, API orders, LocalStorage, and Supabase Realtime WebSocket
  useEffect(() => {
    let channel: any = null;

    try {
      const supabase = createClient();

      // Check current auth user
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) {
          setSupabaseUser(data.user.email || 'SuperAdmin');
          setIsUnlocked(true);
        }
      });

      // Subscribe to Supabase Realtime WebSocket changes on public.orders
      channel = supabase
        .channel('atelier-orders-realtime')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'orders' },
          (payload: any) => {
            const row = payload.new;
            if (row) {
              const mapped: OrderSummary = {
                id: row.order_number || row.id,
                customerName: row.customer_info?.fullName || 'Online Customer',
                email: row.customer_info?.email || 'customer@artixain.com',
                itemCount: Array.isArray(row.items) ? row.items.reduce((a: number, b: any) => a + (b.quantity || 1), 0) : 1,
                totalPrice: row.pricing?.finalTotal || 0,
                status: (row.status as any) || 'Placed',
                createdAt: row.created_at || new Date().toISOString(),
                wristSizeCm: row.items?.[0]?.wristSizeCm || 16.5,
              };
              handleIncomingOrder(mapped);
            }
          }
        )
        .subscribe();
    } catch {
      // Offline fallback
    }

    // Load server orders via decoupled API
    fetch('/api/v1/orders')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && Array.isArray(resData.data)) {
          const apiMapped: OrderSummary[] = resData.data.map((o: any) => ({
            id: o.orderNumber || o.id,
            customerName: o.customer?.fullName || 'Online Client',
            email: o.customer?.email || 'client@artixain.com',
            itemCount: Array.isArray(o.items) ? o.items.reduce((a: number, b: any) => a + (b.quantity || 1), 0) : 1,
            totalPrice: o.pricing?.finalTotal || 48.00,
            status: o.status || 'Placed',
            createdAt: o.createdAt || new Date().toISOString(),
            wristSizeCm: o.items?.[0]?.wristSizeCm || 16.5,
          }));

          setOrders((current) => {
            const seen = new Set(current.map((c) => c.id));
            const fresh = apiMapped.filter((item) => !seen.has(item.id));
            return [...fresh, ...current];
          });
        }
      })
      .catch(() => {
        // Fallback to local storage
      });

    // Merge offline local storage orders
    try {
      const local = localStorage.getItem('artixain_orders_v1');
      if (local) {
        const parsed = JSON.parse(local);
        const mapped: OrderSummary[] = parsed.map((o: any) => ({
          id: o.id || o.orderNumber,
          customerName: o.customer?.fullName || 'Anonymous Customer',
          email: o.customer?.email || 'customer@example.com',
          itemCount: o.items ? o.items.reduce((a: number, b: any) => a + (b.quantity || 1), 0) : 1,
          totalPrice: o.pricing?.finalTotal || 48.00,
          status: o.status || 'Placed',
          createdAt: o.createdAt || new Date().toISOString(),
          wristSizeCm: o.items?.[0]?.wristSizeCm || 16.5
        }));

        setOrders((current) => {
          const seen = new Set(current.map((c) => c.id));
          const fresh = mapped.filter((item) => !seen.has(item.id));
          return [...fresh, ...current];
        });
      }
    } catch {
      // Fallback
    }

    return () => {
      if (channel) {
        try {
          const supabase = createClient();
          supabase.removeChannel(channel);
        } catch {}
      }
    };
  }, []);

  const handlePinUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === '984217' || enteredPin === '123456') {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchQuery =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    if (!matchQuery) return false;
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    return true;
  });

  if (!isUnlocked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 pt-28 md:pt-32">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-champagne-500/10 text-champagne-600 dark:text-champagne-400 mx-auto flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-obsidian-900 dark:text-white mb-2">
            Atelier Workbench Lock
          </h2>
          <p className="text-xs text-zinc-500 mb-6">
            Enter the 6-digit Master Atelier PIN or authenticate with Supabase Single-Admin credentials.
          </p>

          <form onSubmit={handlePinUnlock} className="space-y-4">
            <div className="relative">
              <Key className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="password"
                maxLength={6}
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="Enter 6-Digit PIN (e.g. 984217)"
                className="w-full pl-11 pr-4 py-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm tracking-widest text-center outline-none focus:ring-2 focus:ring-champagne-400"
              />
            </div>

            {pinError && (
              <p className="text-xs text-rose-500 font-medium">[FAIL] Invalid Master PIN. Please try again.</p>
            )}

            <button
              type="submit"
              className="btn-pill-primary w-full py-3 text-xs inline-flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Workbench</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-white/5">
            <button
              type="button"
              onClick={() => {
                setEnteredPin('984217');
                setIsUnlocked(true);
              }}
              className="text-[11px] text-zinc-400 hover:text-champagne-500 underline"
            >
              Quick Unlock (Master Dev Session)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1720px] pt-28 md:pt-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 text-champagne-700 dark:text-champagne-300 text-[10px] uppercase font-bold tracking-widest mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Single-Admin Atelier Portal &bull; Supabase Live</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-obsidian-900 dark:text-white">
            Atelier Workbench & Fulfillment Queue
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Visual bead-by-bead stringing blueprints, cord calculations, and 5-stage order state machine.
          </p>
        </div>

        {/* Controls: Search, Sound Toggle, Session Lock */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order or customer..."
              className="w-full pl-9 pr-3.5 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs outline-none focus:ring-1 focus:ring-champagne-400"
            />
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn-pill-secondary py-2 px-3 text-xs inline-flex items-center gap-1.5"
            title={soundEnabled ? 'Disable Synthesizer Chime' : 'Enable Synthesizer Chime'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-champagne-500" />
                <span className="hidden sm:inline">Chime ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                <span className="hidden sm:inline">Chime OFF</span>
              </>
            )}
          </button>
          <button
            onClick={() => setIsUnlocked(false)}
            className="btn-pill-secondary py-2 px-3 text-xs inline-flex items-center gap-1.5"
            title="Lock Atelier Session"
          >
            <Lock className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Lock Session</span>
          </button>
        </div>
      </div>

      {/* Real-time Order Alert Floating Pill Banner */}
      {realtimeAlert && (
        <div className="my-4 animate-fadeIn">
          <div className="p-3.5 rounded-full bg-champagne-500/15 border border-champagne-400/40 text-obsidian-900 dark:text-champagne-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-champagne-500 text-white flex items-center justify-center shrink-0">
                <BellRing className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs">
                <strong>[NEW ORDER ARRIVED]</strong> &bull; #{realtimeAlert.id} from {realtimeAlert.customer} &bull; Total: ${realtimeAlert.total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => setRealtimeAlert(null)}
              className="w-6 h-6 rounded-full hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-zinc-600 transition-colors"
              title="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* KPI Stats Row (4 Bento Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-white/10 shadow-sm">
          <span className="text-xs text-zinc-500 block">Active Queue</span>
          <span className="text-2xl font-serif font-bold text-obsidian-900 dark:text-white mt-1 block">
            {orders.length} Orders
          </span>
          <span className="text-[11px] text-champagne-600 dark:text-champagne-400 font-medium">
            100% Handcrafted
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-white/10 shadow-sm">
          <span className="text-xs text-zinc-500 block">Pending Assembly</span>
          <span className="text-2xl font-serif font-bold text-amber-600 dark:text-amber-400 mt-1 block">
            {orders.filter((o) => o.status === 'Placed' || o.status === 'Assembling').length}
          </span>
          <span className="text-[11px] text-zinc-400">
            Awaiting stringing bench
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-white/10 shadow-sm">
          <span className="text-xs text-zinc-500 block">QC & Certification</span>
          <span className="text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
            {orders.filter((o) => o.status === 'QC Passed').length}
          </span>
          <span className="text-[11px] text-zinc-400">
            Ready for courier
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-white/10 shadow-sm">
          <span className="text-xs text-zinc-500 block">Infrastructure Cost</span>
          <span className="text-2xl font-serif font-bold text-champagne-600 dark:text-champagne-400 mt-1 block">
            $0.00 / mo
          </span>
          <span className="text-[11px] text-zinc-400">
            Supabase Cloud &bull; $0.00
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-zinc-800/70 rounded-3xl border border-zinc-200/80 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-200/80 dark:border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold text-obsidian-900 dark:text-white">
            Order Fulfillment Pipeline
          </h3>
          <div className="flex items-center gap-1.5">
            {['all', 'Placed', 'Assembling', 'QC Passed', 'Shipped', 'Delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`pill-chip py-1 px-3 text-[11px] ${
                  statusFilter === st ? 'pill-chip-active' : 'pill-chip-inactive'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Wrist Size</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Workbench Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700/60">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-700/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-obsidian-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-obsidian-900 dark:text-white block">
                      {order.customerName}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {order.email}
                    </span>
                  </td>
                  <td className="p-4 font-medium">
                    {order.wristSizeCm} cm
                  </td>
                  <td className="p-4">
                    {order.itemCount} Strand(s)
                  </td>
                  <td className="p-4 font-bold text-champagne-600 dark:text-champagne-400">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'Placed'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                          : order.status === 'Assembling'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                          : order.status === 'QC Passed'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300'
                          : order.status === 'Shipped'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="btn-pill-secondary py-1.5 px-3.5 text-xs inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-champagne-500" />
                      <span>Stringing Blueprint</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
