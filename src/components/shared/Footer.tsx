import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#14291E] text-[#D8D0C3] pt-16 pb-12 border-t border-[#1F3D2E]">
      {/* Top Value Propositions */}
      <div className="container-custom mx-auto mb-14 pb-12 border-b border-[#234A35]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#1D3D2C] text-[#C5922E] shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Purity Certified</h4>
              <p className="text-xs text-[#A8A095] mt-1">
                BSTI BDS standard certified and laboratory tested against adulteration.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#1D3D2C] text-[#C5922E] shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Nationwide Delivery</h4>
              <p className="text-xs text-[#A8A095] mt-1">
                Delivering safely to doorsteps across all 64 districts of Bangladesh.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#1D3D2C] text-[#C5922E] shrink-0">
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">7-Day Return Guarantee</h4>
              <p className="text-xs text-[#A8A095] mt-1">
                Zero questions asked replacement if packaging seal is damaged.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#1D3D2C] text-[#C5922E] shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Dedicated Customer Care</h4>
              <p className="text-xs text-[#A8A095] mt-1">
                Speak directly with our Dhaka care desk: +880 9612-SHUDDHO
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#C5922E] flex items-center justify-center text-[#14291E] font-serif font-bold text-lg">
                শুদ্ধ
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                SHUDDHO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A8A095] max-w-sm leading-relaxed">
              Preserving the culinary heritage of Bengal. Handcrafted sun-dried Biulir dal bori, crispy samosas, artisan fish patties, and appetizers—crafted with authentic taste and uncompromising quality.
            </p>
            <div className="pt-2 text-xs text-[#D8D0C3] space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-[#C5922E]" />
                <span>Tejgaon Industrial Area, Dhaka-1208, Bangladesh</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-[#C5922E]" />
                <span>care@shuddho.com.bd</span>
              </p>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4 uppercase text-[11px] text-[#C5922E]">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A095]">
              <li><Link href="/shop" className="hover:text-white transition">All Products</Link></li>
              <li><Link href="/shop?category=food-grocery" className="hover:text-white transition">Food & Pantry (Dal Bori, Kofta, Fish Patties)</Link></li>
              <li><Link href="/shop?category=snacks" className="hover:text-white transition">Snacks & Appetizers (Samosas, Rolls, Mini Pizzas)</Link></li>
              <li><Link href="/shop?category=bakery-dessert" className="hover:text-white transition">Bakery & Desserts (Tiramisu Cups, Custom Cakes)</Link></li>
              <li><Link href="/shop?category=pickles-oils" className="hover:text-white transition">Pickles & Herbal Care (Garlic Pickle, Rosemary Oil)</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4 uppercase text-[11px] text-[#C5922E]">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A095]">
              <li><Link href="/track-order" className="hover:text-white transition font-semibold text-white">Track Your Order</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition">Shipping Policy (64 Districts)</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">Return & Exchange Policy</Link></li>
              <li><Link href="/about" className="hover:text-white transition">Our Purity Standards</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">Frequently Asked Questions</Link></li>
              <li><Link href="/account" className="hover:text-white transition">Customer Account</Link></li>
            </ul>
          </div>

          {/* Payment & Security Assurance */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4 uppercase text-[11px] text-[#C5922E]">
              Payment Options
            </h4>
            <p className="text-xs text-[#A8A095] mb-3">
              We accept safe digital payments and Cash on Delivery across Bangladesh.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <span className="px-2.5 py-1.5 rounded-lg bg-[#1E3D2D] text-stone-200 text-center">Cash on Delivery</span>
              <span className="px-2.5 py-1.5 rounded-lg bg-[#E2136E] text-white text-center">bKash</span>
              <span className="px-2.5 py-1.5 rounded-lg bg-[#F7931E] text-white text-center">Nagad</span>
              <span className="px-2.5 py-1.5 rounded-lg bg-[#8C3494] text-white text-center">Rocket</span>
              <span className="px-2.5 py-1.5 rounded-lg bg-[#1A1F71] text-white text-center">Visa</span>
              <span className="px-2.5 py-1.5 rounded-lg bg-[#EB001B] text-white text-center">Mastercard</span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-[#234A35] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#8E867B]">
          <div>
            &copy; {new Date().getFullYear()} SHUDDHO Naturals & Pantry (শুদ্ধ). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-300">Terms of Service</Link>
            <Link href="/admin" className="hover:text-[#C5922E] font-medium">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
