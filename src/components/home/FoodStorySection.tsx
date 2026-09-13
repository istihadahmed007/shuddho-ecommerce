'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export const FoodStorySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E8E2D8] overflow-hidden">
      <div className="container-custom mx-auto">
        {/* Editorial Two-Column Header Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          {/* Visual Storytelling Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#E8E2D8]">
              <Image
                src="/products/dal-bori.jpg"
                alt="Authentic traditional handmade Biulir dal bori"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Origin Tag Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#D49B35] font-semibold flex items-center gap-1">
                    <MapPin size={13} /> Kushtia & Rajshahi Heritage
                  </span>
                  <p className="text-lg font-bold">Hand-Whipped Sun-Dried Biulir Dal Bori</p>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 font-medium">
                    100% Handcrafted
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Authenticity Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl shadow-lg border border-[#E8E2D8] max-w-[240px] hidden sm:flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#163A29] text-white shrink-0">
                <ShieldCheck size={20} className="text-[#C5922E]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#18221B]">Traditional Artisan Curing</p>
                <p className="text-[11px] text-[#5F6D63] mt-0.5">Slow sun-dried under natural winter sunshine for unmatched crispness.</p>
              </div>
            </div>
          </div>

          {/* Copywriting Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5922E]">
              <span>Pantry Craftsmanship</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#18221B] leading-tight">
              Good Food Starts With{' '}
              <span className="font-serif italic font-normal text-[#163A29]">
                Good Ingredients
              </span>
            </h2>

            <p className="text-[#5F6D63] text-base sm:text-lg leading-relaxed">
              Every handmade delicacy, crispy snack pack, and coastal catch patty carries the authentic home-style flavors of Bengal. From stone-ground Mashkalai dal whipped by village women artisans to crispy golden cocktail samosas and wild fish patties, we bring pure flavor to your kitchen table.
            </p>

            <ul className="space-y-3.5 pt-2 text-sm text-[#18221B]">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#163A29] shrink-0 mt-0.5" />
                <span><strong>No artificial additives:</strong> Clean recipes with authentic herbs and traditional seasonings.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#163A29] shrink-0 mt-0.5" />
                <span><strong>Fresh artisanal batches:</strong> Crafted in small batches for peak texture and maximum crunch.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#163A29] shrink-0 mt-0.5" />
                <span><strong>Airtight protective packaging:</strong> Moisture-barrier sealed pouches ensuring long-lasting crispness.</span>
              </li>
            </ul>

            <div className="pt-3">
              <Link
                href="/shop?category=food-grocery"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#163A29] hover:text-[#0F291D] group"
              >
                <span>Browse All Food & Pantry Items</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
