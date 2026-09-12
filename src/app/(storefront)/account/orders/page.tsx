'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ChevronRight, Truck, ExternalLink } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';
import { commerceStore } from '@/lib/commerce-store';
import type { Order } from '@/types';

export default function OrdersPage() {
  const [filter, setFilter] = useState('All');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(commerceStore.getOrders());
    const sync = () => setOrders(commerceStore.getOrders());
    window.addEventListener('shuddho_store_sync', sync);
    return () => window.removeEventListener('shuddho_store_sync', sync);
  }, []);

  const filteredOrders = filter === 'All'
    ? orders
    : orders.filter((o) => {
        if (filter === 'Active') return o.status !== 'DELIVERED' && o.status !== 'CANCELLED';
        if (filter === 'Completed') return o.status === 'DELIVERED';
        if (filter === 'Cancelled') return o.status === 'CANCELLED';
        return true;
      });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#18221B] font-serif">Order History</h1>
          <p className="text-xs sm:text-sm text-[#5F6D63] mt-0.5">
            Manage your past and active pure product orders
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E8E2D8] rounded-2xl">
          {['All', 'Active', 'Completed', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filter === f
                  ? 'bg-[#163A29] text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D8] space-y-3">
          <Package size={36} className="text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-[#18221B]">No {filter.toLowerCase()} orders found</h3>
          <p className="text-xs text-[#5F6D63]">You have no recorded orders in this status category.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#163A29] hover:underline pt-2"
          >
            <span>Explore Collection</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E2D8] gap-2 text-xs">
                <div>
                  <span className="font-mono font-bold text-[#163A29] text-sm">
                    {order.orderNumber}
                  </span>
                  <span className="text-stone-400 mx-2">•</span>
                  <span className="text-stone-500">Placed {formatDate(order.createdAt)}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    order.status === 'DELIVERED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.status === 'CANCELLED'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {order.status}
                  </span>
                  <span className="text-stone-400">|</span>
                  <span className="font-bold text-[#18221B] text-sm">{formatPrice(order.total)}</span>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-[#E8E2D8]/60">
                {order.items.map((it) => (
                  <div key={it.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative rounded-xl bg-[#FAF7F2] overflow-hidden shrink-0 border border-[#E8E2D8]">
                        <Image
                          src={it.product.images[0]?.url || '/placeholder.png'}
                          alt={it.product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/product/${it.product.slug}`}
                          className="font-bold text-[#18221B] hover:text-[#163A29]"
                        >
                          {it.product.name}
                        </Link>
                        <p className="text-stone-500">
                          Qty: {it.quantity} • {formatPrice(it.price)} each
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-stone-900">{formatPrice(it.totalPrice)}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-stone-500">
                  Payment: {order.paymentMethod} ({order.paymentStatus}) • Courier: {order.courier || 'Pathao Express'}
                </span>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/track-order?orderId=${encodeURIComponent(order.orderNumber)}`}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#163A29] text-white font-semibold hover:bg-[#0F291D] transition-colors"
                  >
                    <Truck size={14} />
                    <span>Track Shipment</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
