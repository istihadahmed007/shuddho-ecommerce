'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Check, CreditCard, Wallet, Truck, MapPin,
  ChevronRight, ShieldCheck, ShoppingBag, ArrowLeft
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import type { Address } from '@/types';

type Step = 1 | 2 | 3 | 4;

const BD_DIVISIONS = [
  'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna',
  'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, discount, total, placeOrder, deliveryArea } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Bangladesh Address State
  const [address, setAddress] = useState<Address>({
    id: 'addr-active',
    fullName: 'Tanvir Ahmed',
    phone: '01712345678',
    country: 'Bangladesh',
    division: deliveryArea === 'outside' ? 'Chittagong' : 'Dhaka',
    city: deliveryArea === 'outside' ? 'Chittagong' : 'Dhaka',
    area: 'Gulshan / Banani',
    street: 'Road 11, House 24, Flat 4B',
    postalCode: '1213',
    isDefault: true,
    label: 'HOME',
  });

  const [deliveryMethod, setDeliveryMethod] = useState(
    deliveryArea === 'outside' ? 'express-outside' : 'standard-dhaka'
  );
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'bKash' | 'Nagad' | 'Card'>('Cash on Delivery');
  const [bkashMobile, setBkashMobile] = useState('');
  const [bkashTrx, setBkashTrx] = useState('');

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="container-custom mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#18221B] font-serif">Your cart is empty</h2>
        <p className="text-xs text-[#5F6D63]">Please add items to your cart before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#163A29] text-white text-xs font-semibold"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // Validate Bangladesh Mobile (01XXXXXXXXX)
  const validatePhone = (num: string) => {
    const clean = num.replace(/\s+/g, '');
    return /^01[3-9]\d{8}$/.test(clean);
  };

  const handleNextStep = () => {
    setFormError('');
    if (currentStep === 1) {
      if (!address.fullName.trim()) {
        setFormError('Please enter your full recipient name');
        return;
      }
      if (!validatePhone(address.phone)) {
        setFormError('Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01712345678)');
        return;
      }
      if (!address.street.trim()) {
        setFormError('Please provide street address, house and apartment number');
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    try {
      const order = placeOrder({
        shippingAddress: address,
        deliveryMethod,
        paymentMethod,
      });
      router.push(`/checkout/confirmation?orderId=${encodeURIComponent(order.orderNumber)}`);
    } catch (e) {
      console.error(e);
      setFormError('Failed to process order. Please try again.');
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, title: 'Delivery Address' },
    { num: 2, title: 'Shipping Method' },
    { num: 3, title: 'Payment Option' },
    { num: 4, title: 'Final Review' },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="container-custom mx-auto max-w-5xl">
        {/* Step Indicator Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F6D63] hover:text-[#163A29]"
            >
              <ArrowLeft size={14} />
              <span>Back to Cart</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-[#18221B] font-serif">
              Secure Checkout
            </h1>
            <div className="flex items-center gap-1 text-xs text-[#1E6B40] font-semibold">
              <ShieldCheck size={16} />
              <span className="hidden sm:inline">256-Bit SSL Encrypted</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {steps.map((s) => (
              <div
                key={s.num}
                className={`flex flex-col items-center text-center p-2 rounded-2xl border transition-all ${
                  currentStep === s.num
                    ? 'border-[#163A29] bg-[#163A29]/5 text-[#163A29]'
                    : currentStep > s.num
                    ? 'border-emerald-200 bg-emerald-50 text-[#1E6B40]'
                    : 'border-[#E8E2D8] text-stone-400'
                }`}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 border border-current">
                  {currentStep > s.num ? <Check size={13} /> : s.num}
                </span>
                <span className="text-[11px] font-bold hidden sm:inline">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        {formError && (
          <div className="p-4 mb-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Step Panel (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-6">
            
            {/* STEP 1: DELIVERY ADDRESS */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-[#18221B] font-serif">
                  Step 1: Recipient & Delivery Information
                </h2>
                <p className="text-xs text-[#5F6D63]">
                  Enter accurate contact information for SMS order updates and courier delivery across Bangladesh.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                      Mobile Number (01XXXXXXXXX) *
                    </label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      placeholder="01712345678"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                      Division *
                    </label>
                    <select
                      value={address.division}
                      onChange={(e) => setAddress({ ...address, division: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
                    >
                      {BD_DIVISIONS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                      City / District *
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="e.g. Dhaka, Chittagong, Sylhet"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                      Area / Thana *
                    </label>
                    <input
                      type="text"
                      value={address.area}
                      onChange={(e) => setAddress({ ...address, area: e.target.value })}
                      placeholder="e.g. Dhanmondi, Banani, Uttara"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      placeholder="e.g. 1209"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                    Street Address, House No, Flat *
                  </label>
                  <textarea
                    rows={2}
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="Road 11, House 34, Apartment 4B"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: SHIPPING METHOD */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-[#18221B] font-serif">
                  Step 2: Select Delivery Speed
                </h2>
                <p className="text-xs text-[#5F6D63]">
                  All shipments are handled by temperature-regulated logistics partners to preserve oil freshness and honey enzyme integrity.
                </p>

                <div className="space-y-3 pt-2">
                  <label
                    onClick={() => setDeliveryMethod('standard-dhaka')}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      deliveryMethod === 'standard-dhaka'
                        ? 'border-[#163A29] bg-[#163A29]/5'
                        : 'border-[#E8E2D8] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="deliv"
                        checked={deliveryMethod === 'standard-dhaka'}
                        onChange={() => setDeliveryMethod('standard-dhaka')}
                        className="mt-1 text-[#163A29]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#18221B]">Inside Dhaka Standard Doorstep Delivery</p>
                        <p className="text-[11px] text-[#5F6D63] mt-0.5">Delivery within 2-3 business days via Pathao Express</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#163A29]">
                      {shipping === 0 ? 'FREE' : '৳60'}
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod('express-outside')}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      deliveryMethod === 'express-outside'
                        ? 'border-[#163A29] bg-[#163A29]/5'
                        : 'border-[#E8E2D8] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="deliv"
                        checked={deliveryMethod === 'express-outside'}
                        onChange={() => setDeliveryMethod('express-outside')}
                        className="mt-1 text-[#163A29]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#18221B]">Outside Dhaka (All 63 Districts)</p>
                        <p className="text-[11px] text-[#5F6D63] mt-0.5">Delivery within 3-5 business days via RedX / Sundarban Courier</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#163A29]">
                      {shipping === 0 ? 'FREE' : '৳120'}
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-[#18221B] font-serif">
                  Step 3: Choose Payment Method
                </h2>
                <p className="text-xs text-[#5F6D63]">
                  Select Cash on Delivery or secure digital payment via bKash, Nagad, or Cards.
                </p>

                <div className="space-y-3 pt-2">
                  {/* Cash on Delivery */}
                  <label
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-[#163A29] bg-[#163A29]/5'
                        : 'border-[#E8E2D8] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'Cash on Delivery'}
                        onChange={() => setPaymentMethod('Cash on Delivery')}
                        className="mt-1 text-[#163A29]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#18221B]">Cash on Delivery (ক্যাশ অন ডেলিভারি)</p>
                        <p className="text-[11px] text-[#5F6D63] mt-0.5">Pay in cash to the courier when receiving your package</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-stone-100 rounded-full text-stone-700">
                      Standard
                    </span>
                  </label>

                  {/* bKash */}
                  <label
                    onClick={() => setPaymentMethod('bKash')}
                    className={`flex flex-col p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'bKash'
                        ? 'border-[#E2136E] bg-pink-50/40'
                        : 'border-[#E8E2D8] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="pay"
                          checked={paymentMethod === 'bKash'}
                          onChange={() => setPaymentMethod('bKash')}
                          className="text-[#E2136E]"
                        />
                        <span className="text-xs font-bold text-[#18221B]">bKash Payment</span>
                      </div>
                      <span className="px-2.5 py-0.5 bg-[#E2136E] text-white text-[10px] font-bold rounded-full">
                        Instant
                      </span>
                    </div>
                    {paymentMethod === 'bKash' && (
                      <div className="mt-3 pt-3 border-t border-pink-200 text-xs space-y-2">
                        <p className="text-[#5F6D63]">
                          Merchant bKash Wallet: <strong>01712-SHUDDHO</strong>. Send exact order amount (<strong>{formatPrice(total)}</strong>) and enter Transaction ID:
                        </p>
                        <input
                          type="text"
                          placeholder="e.g. 9K20AX881L"
                          value={bkashTrx}
                          onChange={(e) => setBkashTrx(e.target.value.toUpperCase())}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#E8E2D8] rounded-xl uppercase font-mono"
                        />
                      </div>
                    )}
                  </label>

                  {/* Nagad */}
                  <label
                    onClick={() => setPaymentMethod('Nagad')}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'Nagad'
                        ? 'border-[#F7931E] bg-amber-50/40'
                        : 'border-[#E8E2D8] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'Nagad'}
                        onChange={() => setPaymentMethod('Nagad')}
                        className="mt-1 text-[#F7931E]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#18221B]">Nagad Payment</p>
                        <p className="text-[11px] text-[#5F6D63] mt-0.5">Direct merchant payment through Nagad gateway</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-[#F7931E] text-white text-[10px] font-bold rounded-full">
                      Nagad
                    </span>
                  </label>

                  {/* Card Gateway */}
                  <label
                    onClick={() => setPaymentMethod('Card')}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-[#163A29] bg-[#163A29]/5'
                        : 'border-[#E8E2D8] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'Card'}
                        onChange={() => setPaymentMethod('Card')}
                        className="mt-1 text-[#163A29]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#18221B]">Credit / Debit Card</p>
                        <p className="text-[11px] text-[#5F6D63] mt-0.5">Visa, Mastercard, DBBL Nexus via SSLCommerz secure checkout</p>
                      </div>
                    </div>
                    <CreditCard size={18} className="text-stone-400" />
                  </label>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & SUBMIT */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-[#18221B] font-serif">
                  Step 4: Final Order Review
                </h2>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="font-bold text-stone-800">Delivery Address:</span>
                    <button onClick={() => setCurrentStep(1)} className="text-[#C5922E] hover:underline">
                      Edit
                    </button>
                  </div>
                  <p className="text-[#5F6D63]">
                    {address.fullName} ({address.phone})<br />
                    {address.street}, {address.area}, {address.city}, {address.division} - {address.postalCode}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="font-bold text-stone-800">Payment Option:</span>
                    <button onClick={() => setCurrentStep(3)} className="text-[#C5922E] hover:underline">
                      Edit
                    </button>
                  </div>
                  <p className="text-[#5F6D63]">
                    {paymentMethod} {bkashTrx ? `(TrxID: ${bkashTrx})` : ''}
                  </p>
                </div>

                {/* Ordered Items Preview */}
                <div className="divide-y divide-[#E8E2D8]">
                  {items.map((it) => (
                    <div key={it.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 relative rounded-xl bg-white shrink-0 overflow-hidden border border-[#E8E2D8]">
                          <Image src={it.product.images[0]?.url || '/placeholder.png'} alt={it.product.name} fill className="object-contain p-1" />
                        </div>
                        <div>
                          <p className="font-bold text-[#18221B]">{it.product.name}</p>
                          <p className="text-[#5F6D63]">Qty: {it.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#163A29]">
                        {formatPrice(it.product.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => (prev - 1) as Step)}
                  className="px-6 py-2.5 rounded-full border border-[#E8E2D8] text-xs font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3 rounded-full bg-[#163A29] hover:bg-[#0F291D] text-white text-xs font-semibold shadow-xs"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-full bg-[#163A29] hover:bg-[#0F291D] text-white text-sm font-bold shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Placing Order...' : `Confirm & Place Order (${formatPrice(total)})`}
                </button>
              )}
            </div>
          </div>

          {/* Right Summary Column (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#18221B] font-serif pb-3 border-b border-[#E8E2D8]">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#5F6D63]">
                <span>Items ({items.reduce((s, it) => s + it.quantity, 0)})</span>
                <span className="font-bold text-stone-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#5F6D63]">
                <span>Delivery</span>
                <span className="font-bold text-stone-900">
                  {shipping === 0 ? <span className="text-[#1E6B40]">FREE</span> : formatPrice(shipping)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#1E6B40] font-bold">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-900 text-sm font-bold pt-3 border-t border-[#E8E2D8]">
                <span>Total Amount</span>
                <span className="text-[#163A29] text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] text-[11px] text-[#5F6D63] space-y-1.5">
              <p className="flex items-center gap-1.5 text-[#163A29] font-bold">
                <ShieldCheck size={14} /> 100% Purity Guarantee
              </p>
              <p>Every product is covered by our 7-day authenticity warranty. Zero risk shopping.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
