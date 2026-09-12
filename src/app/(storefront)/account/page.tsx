'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Clock, CheckCircle2, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { commerceStore } from '@/lib/commerce-store';
import { formatPrice, formatDate } from '@/lib/utils';
import type { Order } from '@/types';

export default function AccountOverviewPage() {
  const { currentUser, wishlist } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(commerceStore.getOrders());
    const sync = () => setOrders(commerceStore.getOrders());
    window.addEventListener('shuddho_store_sync', sync);
    return () => window.removeEventListener('shuddho_store_sync', sync);
  }, []);

  const totalOrders = orders.length;
  const activeOrders = orders.filter((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;
  const completedOrders = orders.filter((o) => o.status === 'DELIVERED').length;
  const recentOrders = orders.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5922E]">
            Customer Account
          </span>
          <h1 className="text-2xl font-bold text-[#18221B] font-serif">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6D63] mt-0.5">
            Registered Mobile: {currentUser.phone} • Email: {currentUser.email}
          </p>
        </div>
        <Link
          href="/shop"
          className="px-5 py-2.5 rounded-full bg-[#163A29] text-white text-xs font-semibold hover:bg-[#0F291D] transition-colors self-start sm:self-auto"
        >
          Shop Pure Essentials
        </Link>
      </div>

      {/* Real Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#163A29]/10 text-[#163A29] flex items-center justify-center shrink-0">
            <Package size={22} />
          </div>
          <div>
            <p className="text-xs text-[#5F6D63]">Total Orders</p>
            <p className="text-xl font-bold text-[#18221B]">{totalOrders}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-xs text-[#5F6D63]">Active Shipments</p>
            <p className="text-xl font-bold text-[#18221B]">{activeOrders}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-xs text-[#5F6D63]">Delivered Orders</p>
            <p className="text-xl font-bold text-[#18221B]">{completedOrders}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Heart size={22} />
          </div>
          <div>
            <p className="text-xs text-[#5F6D63]">Saved Wishlist</p>
            <p className="text-xl font-bold text-[#18221B]">{wishlist.length}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E8E2D8] flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-[#18221B] font-serif">Recent Orders</h2>
            <p className="text-xs text-[#5F6D63]">Track package status or view consignment receipts</p>
          </div>
          <Link
            href="/account/orders"
            className="text-xs font-semibold text-[#163A29] hover:underline"
          >
            View All ({totalOrders})
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-sm font-semibold text-stone-800">You haven&apos;t placed your first order yet.</p>
            <p className="text-xs text-stone-500">Explore authentic wood-pressed mustard oil and raw honey.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#163A29] hover:underline pt-2"
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#E8E2D8]">
            {recentOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-[#163A29] text-sm">
                      {ord.orderNumber}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      ord.status === 'DELIVERED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ord.status === 'CANCELLED'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-[#5F6D63] mt-1">
                    {formatDate(ord.createdAt)} • {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'} • Payment: {ord.paymentMethod}
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-sm font-bold text-[#18221B]">
                    {formatPrice(ord.total)}
                  </span>
                  <Link
                    href={`/track-order?orderId=${encodeURIComponent(ord.orderNumber)}`}
                    className="px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] hover:bg-stone-100 font-semibold text-[#163A29] transition-colors"
                  >
                    Track Shipment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
