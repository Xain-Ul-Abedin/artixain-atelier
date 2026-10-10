'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Package, Clock, CheckCircle2, Truck, Eye, Search, Filter } from 'lucide-react';

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

  // Load from localStorage if present
  useEffect(() => {
    try {
      const local = localStorage.getItem('artixain_orders_v1');
      if (local) {
        const parsed = JSON.parse(local);
        const mapped = parsed.map((o: any) => ({
          id: o.id,
          customerName: o.customer.fullName || 'Anonymous Customer',
          email: o.customer.email || 'customer@example.com',
          itemCount: o.items.reduce((a: number, b: any) => a + b.quantity, 0),
          totalPrice: o.pricing.finalTotal,
          status: o.status || 'Placed',
          createdAt: o.createdAt,
          wristSizeCm: o.items[0]?.wristSizeCm || 16.5
        }));
        setOrders([...mapped, ...DEMO_ORDERS]);
      }
    } catch {
      // Fallback
    }
  }, []);

  const filteredOrders = orders.filter((o) => {
    const matchQuery =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    if (!matchQuery) return false;
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 text-champagne-700 dark:text-champagne-300 text-[10px] uppercase font-bold tracking-widest mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Single-Admin Atelier Portal</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-obsidian-900 dark:text-white">
            Atelier Workbench & Fulfillment Queue
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Visual bead-by-bead stringing blueprints, cord calculations, and 5-stage order state machine.
          </p>
        </div>

        {/* Search & Filter */}
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
        </div>
      </div>

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
            Zero-Cost Architecture
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
