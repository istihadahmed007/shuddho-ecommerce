'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search, Package, Truck, CheckCircle2, Clock,
  MapPin, AlertCircle, Phone, ArrowRight, ShieldCheck
} from 'lucide-react';
import { commerceStore } from '@/lib/commerce-store';
import { formatPrice, formatDate } from '@/lib/utils';
import type { Order, OrderStatus } from '@/types';

const STATUS_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
  { status: 'PENDING', label: 'Order Placed', desc: 'Order received and logged in system' },
  { status: 'CONFIRMED', label: 'Confirmed', desc: 'Verified by Dhaka dispatch desk' },
  { status: 'PROCESSING', label: 'Processing & Packed', desc: 'Bottled, quality checked, and sealed' },
  { status: 'SHIPPED', label: 'Shipped', desc: 'Handed to temperature-controlled courier' },
  { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', desc: 'Courier agent on the way to your doorstep' },
  { status: 'DELIVERED', label: 'Delivered', desc: 'Safely delivered to customer' },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';
  const [searchQuery, setSearchQuery] = useState(initialOrderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = (id: string) => {
    if (!id.trim()) return;
    setHasSearched(true);
    const found = commerceStore.getOrderById(id.trim());
    setOrder(found || null);
  };

  useEffect(() => {
    if (initialOrderId) {
      performSearch(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const getStepIndex = (status: OrderStatus) => {
    if (status === 'CANCELLED') return -1;
    const idx = STATUS_STEPS.findIndex((s) => s.status === status);
    return idx >= 0 ? idx : 1;
  };

  const currentStepIdx = order ? getStepIndex(order.status) : 0;

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="container-custom mx-auto max-w-3xl space-y-8">
        
        {/* Header Search Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D8] shadow-sm text-center space-y-4">
          <div className="w-14 h-14 bg-[#163A29]/10 rounded-2xl flex items-center justify-center mx-auto text-[#163A29]">
            <Truck size={28} />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#18221B] font-serif">
              Track Your Pure Living Order
            </h1>
            <p className="text-xs sm:text-sm text-[#5F6D63] max-w-md mx-auto">
              Enter your unique order number (e.g. SHD-20260908-1042) to track your delivery status in real time.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto flex gap-2 pt-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="SHD-20260908-1042"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                className="w-full pl-9 pr-4 py-3 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8E2D8] rounded-2xl focus:outline-none focus:border-[#163A29] uppercase font-mono"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#163A29] hover:bg-[#0F291D] text-white text-xs font-semibold rounded-2xl transition-colors shadow-xs"
            >
              Track
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="text-[11px] text-[#5F6D63] pt-1">
            Try demo tracking: <button onClick={() => { setSearchQuery('SHD-20260908-1042'); performSearch('SHD-20260908-1042'); }} className="text-[#163A29] font-mono font-bold hover:underline">SHD-20260908-1042</button> or <button onClick={() => { setSearchQuery('SHD-20260911-8931'); performSearch('SHD-20260911-8931'); }} className="text-[#163A29] font-mono font-bold hover:underline">SHD-20260911-8931</button>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && !order && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D8] text-center space-y-3">
            <AlertCircle size={32} className="text-amber-600 mx-auto" />
            <h3 className="text-base font-bold text-[#18221B]">No Order Found</h3>
            <p className="text-xs text-[#5F6D63] max-w-sm mx-auto">
              We couldn&apos;t find an active order with the identifier &quot;{searchQuery}&quot;. Please verify the order number on your SMS receipt or check your customer account.
            </p>
          </div>
        )}

        {order && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D8] shadow-sm space-y-8">
            
            {/* Top Order Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5922E]">
                  Verified Order
                </span>
                <h2 className="text-xl font-bold font-mono text-[#18221B]">
                  {order.orderNumber}
                </h2>
                <p className="text-xs text-[#5F6D63] mt-0.5">
                  Placed on {formatDate(order.createdAt)} • Courier: {order.courier || 'Pathao Express'}
                </p>
              </div>

              <div className="text-right">
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold ${
                  order.status === 'DELIVERED'
                    ? 'bg-emerald-100 text-emerald-900'
                    : order.status === 'CANCELLED'
                    ? 'bg-rose-100 text-rose-900'
                    : 'bg-amber-100 text-amber-900'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current" />
                  Status: {order.status}
                </span>
                <p className="text-xs text-stone-500 mt-1">
                  Est. Delivery: {order.estimatedDelivery || '2-4 business days'}
                </p>
              </div>
            </div>

            {/* Visual Step Timeline */}
            {order.status === 'CANCELLED' ? (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                This order was marked as cancelled. Any advanced online payment has been initiated for refund.
              </div>
            ) : (
              <div className="py-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-6">
                  Delivery Progress Pipeline
                </h3>

                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E2D8]">
                  {STATUS_STEPS.map((step, idx) => {
                    const isPassed = currentStepIdx >= idx;
                    const isCurrent = currentStepIdx === idx;

                    return (
                      <div key={step.status} className="relative flex items-start gap-4">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-6 sm:-left-8 w-5 sm:w-7 h-5 sm:h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                            isPassed
                              ? 'bg-[#163A29] border-[#163A29] text-white shadow-xs'
                              : 'bg-white border-[#E8E2D8] text-stone-300'
                          }`}
                        >
                          {isPassed ? <CheckCircle2 size={13} /> : <span className="text-[10px]">{idx + 1}</span>}
                        </div>

                        <div>
                          <p className={`text-xs font-bold ${isCurrent ? 'text-[#163A29]' : isPassed ? 'text-stone-900' : 'text-stone-400'}`}>
                            {step.label} {isCurrent && <span className="text-[10px] font-semibold text-[#C5922E] ml-1">(Current Stage)</span>}
                          </p>
                          <p className="text-[11px] text-[#5F6D63] mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="pt-6 border-t border-[#E8E2D8]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-4">
                Products in Consignment
              </h3>
              <div className="divide-y divide-[#E8E2D8]">
                {order.items.map((it) => (
                  <div key={it.id} className="py-3 flex items-center justify-between gap-4 text-xs">
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
                        <Link href={`/product/${it.product.slug}`} className="font-bold text-[#18221B] hover:text-[#163A29]">
                          {it.product.name}
                        </Link>
                        <p className="text-[#5F6D63]">Quantity: {it.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#163A29]">{formatPrice(it.totalPrice)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination & Payment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8E2D8] text-xs">
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D8] space-y-1">
                <p className="font-bold text-stone-900 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#163A29]" /> Destination
                </p>
                <p className="text-[#5F6D63] leading-relaxed">
                  {order.shippingAddress.fullName} ({order.shippingAddress.phone})<br />
                  {order.shippingAddress.street}, {order.shippingAddress.area}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.division}
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D8] space-y-1">
                <p className="font-bold text-stone-900">Payment & Bill Details</p>
                <p className="text-[#5F6D63]">
                  Method: <strong>{order.paymentMethod}</strong><br />
                  Payment Status: <strong className={order.paymentStatus === 'PAID' ? 'text-[#1E6B40]' : 'text-amber-800'}>{order.paymentStatus}</strong><br />
                  Total Bill: <strong className="text-[#163A29]">{formatPrice(order.total)}</strong>
                </p>
              </div>
            </div>

            {/* Support Callout */}
            <div className="p-4 rounded-2xl bg-[#163A29]/5 border border-[#163A29]/15 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <Phone size={15} className="text-[#163A29]" />
                <span>Need assistance with this delivery? Reach Dhaka Dispatch Desk:</span>
              </div>
              <span className="font-bold text-[#163A29]">+880 9612-SHUDDHO</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="container-custom mx-auto py-20 text-center text-sm">Loading tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
