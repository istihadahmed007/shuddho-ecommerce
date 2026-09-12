'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package, Truck, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';
import { commerceStore } from '@/lib/commerce-store';
import type { Order } from '@/types';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.id;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const found = commerceStore.getOrderById(orderId);
    if (found) {
      setOrder(found);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-[#E8E2D8] text-center space-y-4">
        <Package size={36} className="text-stone-400 mx-auto" />
        <h2 className="text-xl font-bold text-[#18221B]">Order Not Found</h2>
        <p className="text-xs text-[#5F6D63]">Could not find order #{orderId}.</p>
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#163A29] text-white text-xs font-semibold"
        >
          <ArrowLeft size={14} /> Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/account/orders"
          className="p-2 rounded-full border border-[#E8E2D8] hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[#18221B] font-serif">
            Order #{order.orderNumber}
          </h1>
          <p className="text-xs text-[#5F6D63]">Placed on {formatDate(order.createdAt)}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-6">
        {/* Status bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
          <div>
            <p className="text-xs text-[#5F6D63]">Current Fulfillment Status</p>
            <p className="text-base font-bold text-[#18221B] mt-0.5">{order.status}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/track-order?orderId=${encodeURIComponent(order.orderNumber)}`}
              className="px-4 py-2 rounded-xl bg-[#163A29] text-white text-xs font-semibold hover:bg-[#0F291D] transition-colors flex items-center gap-1.5"
            >
              <Truck size={14} /> Track Timeline
            </Link>
          </div>
        </div>

        {/* Items List */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#18221B] mb-3">
            Items in Consignment
          </h3>
          <div className="divide-y divide-[#E8E2D8]">
            {order.items.map((it) => (
              <div key={it.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 relative rounded-xl bg-[#FAF7F2] overflow-hidden shrink-0 border border-[#E8E2D8]">
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
                    <p className="text-[#5F6D63]">
                      Qty: {it.quantity} • {formatPrice(it.price)} each
                    </p>
                  </div>
                </div>
                <span className="font-bold text-sm text-[#163A29]">
                  {formatPrice(it.totalPrice)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8E2D8] text-xs">
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D8] space-y-1">
            <p className="font-bold text-[#18221B] flex items-center gap-1.5">
              <MapPin size={14} className="text-[#163A29]" /> Destination Address
            </p>
            <p className="text-[#5F6D63] leading-relaxed">
              {order.shippingAddress.fullName} ({order.shippingAddress.phone})<br />
              {order.shippingAddress.street}, {order.shippingAddress.area}<br />
              {order.shippingAddress.city}, {order.shippingAddress.division} - {order.shippingAddress.postalCode}
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D8] space-y-1.5">
            <div className="flex justify-between text-[#5F6D63]">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#5F6D63]">
              <span>Delivery Fee</span>
              <span className="font-semibold text-stone-900">{formatPrice(order.shipping)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#1E6B40] font-semibold">
                <span>Coupon Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-[#E8E2D8]">
              <span>Total Amount</span>
              <span className="text-[#163A29] text-base">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
