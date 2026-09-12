'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DollarSign, ShoppingCart, Users, Package, AlertTriangle,
  ArrowRight, ShieldCheck, CheckCircle2, Clock, Plus
} from 'lucide-react';
import { commerceStore } from '@/lib/commerce-store';
import { products } from '@/lib/data';
import { formatPrice, formatDate } from '@/lib/utils';
import type { Order } from '@/types';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stockOverrides, setStockOverrides] = useState<Record<string, number>>({});

  useEffect(() => {
    setOrders(commerceStore.getOrders());
    setStockOverrides(commerceStore.getStockOverrides());

    const sync = () => {
      setOrders(commerceStore.getOrders());
      setStockOverrides(commerceStore.getStockOverrides());
    };
    window.addEventListener('shuddho_store_sync', sync);
    return () => window.removeEventListener('shuddho_store_sync', sync);
  }, []);

  // Compute REAL metrics from persistent data layer
  const totalRevenue = orders.reduce((sum, o) => {
    return sum + (o.status !== 'CANCELLED' ? o.total : 0);
  }, 0);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'PENDING' || o.status === 'PROCESSING').length;
  
  // Real inventory items with stock <= 15
  const lowStockItems = products.map((p) => ({
    ...p,
    currentStock: stockOverrides[p.id] !== undefined ? stockOverrides[p.id] : p.stock,
  })).filter((p) => p.currentStock <= 25);

  const handleQuickRestock = (productId: string) => {
    commerceStore.adjustStock(productId, 20);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5922E]">
            Executive Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#18221B] font-serif">
            SHUDDHO Business Performance
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6D63] mt-0.5">
            Real-time verified consumer sales, live inventory reserves, and dispatch pipeline
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#163A29] text-white text-xs font-semibold hover:bg-[#0F291D] transition-colors shadow-xs"
          >
            <Plus size={15} />
            <span>Manage Inventory</span>
          </Link>
        </div>
      </div>

      {/* Real Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5F6D63] uppercase tracking-wider">Gross Sales</span>
            <div className="w-10 h-10 rounded-xl bg-[#163A29]/10 text-[#163A29] flex items-center justify-center font-bold">
              ৳
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#18221B] font-serif">
            {formatPrice(totalRevenue)}
          </p>
          <p className="text-[11px] text-emerald-700 font-semibold">
            From {totalOrders} verified orders
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5F6D63] uppercase tracking-wider">Total Consignments</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShoppingCart size={18} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#18221B] font-serif">
            {totalOrders}
          </p>
          <p className="text-[11px] text-stone-500 font-medium">
            {pendingOrders} active in dispatch pipeline
          </p>
        </div>

        {/* Live Catalog Size */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5F6D63] uppercase tracking-wider">Live SKUs</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Package size={18} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#18221B] font-serif">
            {products.length}
          </p>
          <p className="text-[11px] text-stone-500 font-medium">
            Across 9 certified food & care categories
          </p>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5F6D63] uppercase tracking-wider">Stock Alerts</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#18221B] font-serif">
            {lowStockItems.length}
          </p>
          <p className="text-[11px] text-amber-800 font-medium">
            Products under low-stock threshold
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Real Orders Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E8E2D8] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#18221B] font-serif">
                Recent Customer Orders
              </h2>
              <p className="text-xs text-[#5F6D63]">Real customer checkouts awaiting fulfillment</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#163A29] hover:underline"
            >
              Manage Orders ({orders.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#FAF7F2] text-stone-600 border-b border-[#E8E2D8]">
                <tr>
                  <th className="px-6 py-3.5 font-bold uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3.5 font-bold uppercase tracking-wider">Recipient</th>
                  <th className="px-6 py-3.5 font-bold uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3.5 font-bold uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3.5 font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 font-bold uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D8]">
                {orders.slice(0, 6).map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-[#163A29]">
                      {ord.orderNumber}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-stone-900">{ord.shippingAddress.fullName}</p>
                      <p className="text-[11px] text-stone-500">{ord.shippingAddress.division}</p>
                    </td>
                    <td className="px-6 py-4 text-stone-600">
                      {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                    </td>
                    <td className="px-6 py-4 font-bold text-stone-900">
                      {formatPrice(ord.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'CANCELLED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/orders`}
                        className="text-xs font-semibold text-[#163A29] hover:underline"
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Watchlist (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
            <div>
              <h2 className="text-base font-bold text-[#18221B] font-serif">
                Stock Watchlist
              </h2>
              <p className="text-[11px] text-[#5F6D63]">Items requiring production replenishment</p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-[#163A29] hover:underline"
            >
              All
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockItems.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D8] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white relative overflow-hidden shrink-0 border border-[#E8E2D8]">
                    <Image
                      src={p.images[0]?.url || '/placeholder.png'}
                      alt={p.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-stone-900 truncate max-w-[140px]">{p.name}</p>
                    <p className="text-[11px] text-amber-800 font-semibold">
                      Stock: {p.currentStock} units
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleQuickRestock(p.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#163A29] text-white text-[10px] font-bold hover:bg-[#0F291D] shrink-0"
                >
                  +20 Stock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
