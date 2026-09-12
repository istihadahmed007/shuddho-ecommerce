'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { products } from '@/lib/data';
import { ProductTiltCard } from '@/components/home/ProductTiltCard';

export default function CartPage() {
  const {
    items, subtotal, shipping, discount, total, appliedCoupon,
    updateQuantity, removeFromCart, getCartCount,
    applyCoupon, removeCoupon, deliveryArea, setDeliveryArea,
    getAvailableStock
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const cartCount = getCartCount();
  const recommended = products.slice(0, 4);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput.trim());
    if (!res.valid) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-custom mx-auto py-16 sm:py-24">
        <div className="max-w-md mx-auto text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E2D8] shadow-sm">
          <div className="w-20 h-20 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto text-[#163A29]">
            <ShoppingBag size={40} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#18221B] font-serif">
              Your cart is waiting for something pure.
            </h1>
            <p className="text-xs sm:text-sm text-[#5F6D63]">
              Discover raw mustard oils, Sundarbans honey, artisanal kasundi, and botanical hair elixirs.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#163A29] text-white text-sm font-semibold hover:bg-[#0F291D] transition-colors shadow-sm"
          >
            Explore Pure Essentials
          </Link>
        </div>

        {/* Recommended Items */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-[#18221B] font-serif mb-6 text-center">
            Popular Handcrafted Essentials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommended.map((p) => (
              <ProductTiltCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="container-custom mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#18221B] font-serif">
            Shopping Cart
          </h1>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#163A29] text-white">
            {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items Table (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm overflow-hidden divide-y divide-[#E8E2D8]">
            {items.map((item) => {
              const liveStock = getAvailableStock(item.product.id);
              const isOverStock = item.quantity > liveStock;

              return (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="w-20 h-20 relative rounded-2xl bg-[#FAF7F2] overflow-hidden shrink-0 border border-[#E8E2D8]"
                    >
                      <Image
                        src={item.product.images[0]?.url || '/placeholder.png'}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </Link>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5922E]">
                        {item.product.category.name}
                      </span>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="block text-sm sm:text-base font-bold text-[#18221B] hover:text-[#163A29] line-clamp-1"
                      >
                        {item.product.name}
                      </Link>

                      {item.selectedVariants && item.selectedVariants.length > 0 && (
                        <div className="flex items-center gap-2 text-xs text-[#5F6D63]">
                          <span>Size: {item.selectedVariants[0].value}</span>
                        </div>
                      )}

                      <div className="text-xs font-bold text-[#163A29]">
                        {formatPrice(item.product.price)} each
                      </div>

                      {isOverStock && (
                        <p className="text-[11px] text-rose-600 font-semibold">
                          Only {liveStock} available in stock. Please adjust quantity.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Item Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E8E2D8]">
                    <div className="inline-flex items-center rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-xl hover:bg-white text-stone-600"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-9 text-center text-xs font-bold text-[#18221B]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= liveStock}
                        className="p-1 rounded-xl hover:bg-white text-stone-600 disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <span className="text-base font-bold text-[#18221B]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary & Delivery Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-[#18221B] font-serif pb-3 border-b border-[#E8E2D8]">
                Order Summary
              </h2>

              {/* Delivery Zone Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  Delivery Destination
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryArea('dhaka')}
                    className={`p-3 rounded-2xl text-xs font-semibold border transition-all text-left ${
                      deliveryArea === 'dhaka'
                        ? 'bg-[#163A29] text-white border-[#163A29]'
                        : 'bg-[#FAF7F2] text-stone-700 border-[#E8E2D8]'
                    }`}
                  >
                    <p className="font-bold">Inside Dhaka</p>
                    <p className="text-[11px] opacity-80 mt-0.5">৳60 (2-3 days)</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryArea('outside')}
                    className={`p-3 rounded-2xl text-xs font-semibold border transition-all text-left ${
                      deliveryArea === 'outside'
                        ? 'bg-[#163A29] text-white border-[#163A29]'
                        : 'bg-[#FAF7F2] text-stone-700 border-[#E8E2D8]'
                    }`}
                  >
                    <p className="font-bold">Outside Dhaka</p>
                    <p className="text-[11px] opacity-80 mt-0.5">৳120 (3-5 days)</p>
                  </button>
                </div>
                {subtotal >= 1999 && (
                  <p className="text-[11px] text-[#1E6B40] font-semibold mt-1">
                    🎉 Free delivery unlocked (Order over ৳1,999)
                  </p>
                )}
              </div>

              {/* Coupon Form */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  Promotional Coupon
                </label>
                {appliedCoupon ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                        <Check size={14} /> {appliedCoupon.code} Applied
                      </p>
                      <p className="text-[11px] text-emerald-700">
                        Saved ৳{discount} on this purchase
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SHUDDHO10, PURE50"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29] uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#163A29] text-white text-xs font-semibold rounded-xl hover:bg-[#0F291D]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 pt-3 border-t border-[#E8E2D8] text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-stone-900">
                    {shipping === 0 ? <span className="text-[#1E6B40]">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#1E6B40] font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>VAT / Tax</span>
                  <span className="font-semibold text-stone-900">৳0 (Included)</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#18221B] pt-3 border-t border-[#E8E2D8]">
                  <span>Total Payable</span>
                  <span className="text-[#163A29] text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full py-4 rounded-2xl bg-[#163A29] hover:bg-[#0F291D] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#5F6D63]">
                <ShieldCheck size={14} className="text-[#1E6B40]" />
                <span>100% Secure Checkout • Cash on Delivery Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
