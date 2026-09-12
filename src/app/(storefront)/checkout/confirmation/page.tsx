'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Check, Package, ArrowRight, ShoppingBag, Truck,
  MapPin, ShieldCheck, Clock, Phone
} from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';
import { commerceStore } from '@/lib/commerce-store';
import type { Order } from '@/types';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      const found = commerceStore.getOrderById(orderId);
      if (found) {
        setOrder(found);
      }
    } else {
      // Get the latest order
      const all = commerceStore.getOrders();
      if (all.length > 0) {
        setOrder(all[0]);
      }
    }
    setIsLoading(false);
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="container-custom mx-auto py-20 text-center text-stone-500 text-sm">
        Loading verified order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-custom mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#18221B]">Order Not Found</h2>
        <p className="text-xs text-[#5F6D63]">We could not retrieve the requested order details.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#163A29] text-white text-xs font-semibold"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-16">
      <div className="container-custom mx-auto max-w-3xl space-y-8">
        {/* Success Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D8] shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-[#163A29] rounded-full flex items-center justify-center mx-auto text-[#FAF7F2] shadow-md animate-scale-in">
            <Check size={32} strokeWidth={3} className="text-[#C5922E]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5922E]">
              Order Placed Successfully
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#18221B] font-serif">
              Thank You for Choosing Pure Living
            </h1>
            <p className="text-xs sm:text-sm text-[#5F6D63] max-w-md mx-auto">
              Your order has been recorded in our dispatch system. We will contact you via SMS for dispatch confirmation.
            </p>
          </div>

          {/* Key Info Cards Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E8E2D8] text-left">
            <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D8]">
              <p className="text-[11px] font-semibold text-[#5F6D63]">Order Number</p>
              <p className="text-xs font-bold font-mono text-[#163A29] mt-0.5">{order.orderNumber}</p>
            </div>
            <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D8]">
              <p className="text-[11px] font-semibold text-[#5F6D63]">Payment Status</p>
              <p className="text-xs font-bold text-[#18221B] mt-0.5">
                {order.paymentMethod} •{' '}
                <span className={order.paymentStatus === 'PAID' ? 'text-[#1E6B40]' : 'text-amber-700'}>
                  {order.paymentStatus}
                </span>
              </p>
            </div>
            <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D8]">
              <p className="text-[11px] font-semibold text-[#5F6D63]">Estimated Delivery</p>
              <p className="text-xs font-bold text-[#18221B] mt-0.5">{order.estimatedDelivery || '2-4 business days'}</p>
            </div>
          </div>
        </div>

        {/* Order Details Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-6">
          <h2 className="text-base font-bold text-[#18221B] font-serif pb-3 border-b border-[#E8E2D8]">
            Items in This Order
          </h2>

          <div className="divide-y divide-[#E8E2D8]">
            {order.items.map((it) => (
              <div key={it.id} className="py-4 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3.5">
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
                      className="font-bold text-[#18221B] hover:text-[#163A29] text-sm line-clamp-1"
                    >
                      {it.product.name}
                    </Link>
                    <p className="text-[#5F6D63] text-xs">
                      Quantity: {it.quantity}{' '}
                      {it.selectedVariants && it.selectedVariants.length > 0
                        ? `(${it.selectedVariants[0].value})`
                        : ''}
                    </p>
                  </div>
                </div>

                <span className="font-bold text-sm text-[#163A29]">
                  {formatPrice(it.totalPrice)}
                </span>
              </div>
            ))}
          </div>

          {/* Delivery Address & Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E8E2D8] text-xs">
            <div className="space-y-1">
              <p className="font-bold text-stone-900 flex items-center gap-1.5">
                <MapPin size={14} className="text-[#163A29]" /> Shipping Address
              </p>
              <p className="text-[#5F6D63] leading-relaxed">
                {order.shippingAddress.fullName} ({order.shippingAddress.phone})<br />
                {order.shippingAddress.street}, {order.shippingAddress.area}<br />
                {order.shippingAddress.city}, {order.shippingAddress.division} - {order.shippingAddress.postalCode}
              </p>
            </div>

            <div className="space-y-1.5 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E2D8]">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping Fee</span>
                <span className="font-semibold text-stone-900">{formatPrice(order.shipping)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#1E6B40] font-semibold">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-[#E8E2D8]">
                <span>Total Paid / Due</span>
                <span className="text-[#163A29] text-base">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Next Actions */}
          <div className="pt-6 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/track-order?orderId=${encodeURIComponent(order.orderNumber)}`}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#163A29] text-white text-xs font-semibold hover:bg-[#0F291D] transition-colors flex items-center justify-center gap-2"
            >
              <Truck size={15} />
              <span>Track This Order</span>
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto px-7 py-3 rounded-full border border-[#E8E2D8] text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="container-custom mx-auto py-20 text-center text-sm">Loading confirmation...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
