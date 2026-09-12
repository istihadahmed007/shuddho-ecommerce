'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Check, Droplets, Leaf } from 'lucide-react';
import { products } from '@/lib/data';
import { ProductTiltCard } from './ProductTiltCard';

export const HairCareSection: React.FC = () => {
  // Select authentic hair care products
  const hairProducts = products.filter((p) => p.categoryId === 'cat-hair-oil' || p.categoryId === 'cat-hair-care').slice(0, 3);

  const botanicals = [
    { name: 'Bhringraj (False Daisy)', role: 'Follicle Nourishment' },
    { name: 'Wild Indian Amla', role: 'Vitamin C & Shine' },
    { name: 'Cold-Pressed Sesame', role: 'Deep Scalp Penetration' },
    { name: 'Brahmi & Methi', role: 'Root Strength & Density' },
    { name: 'Barisal Virgin Coconut', role: 'Protein Loss Defense' },
    { name: 'Rosemary Essence', role: 'Scalp Microcirculation' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8E2D8] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#163A29]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          {/* Copywriting & Botanical Ingredients Grid */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163A29]/10 text-[#163A29] text-xs font-semibold">
              <Leaf size={14} className="text-[#1E6B40]" />
              <span>Botanical Scalp & Hair Care</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#18221B] leading-tight">
              Everyday Care,{' '}
              <span className="font-serif italic font-normal text-[#163A29]">
                Naturally Better
              </span>
            </h2>

            <p className="text-[#5F6D63] text-base sm:text-lg leading-relaxed">
              Formulated on the principles of traditional Kshirapak slow infusion. Hand-picked whole herbs are gently decocted over 72 hours in cold-pressed virgin coconut and sesame oils—delivering pure botanical nourishment directly to delicate scalp roots without heavy silicones or petroleum mineral bases.
            </p>

            {/* Key Botanicals Pills Grid */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C5922E] mb-3">
                Signature Active Botanicals
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {botanicals.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white border border-[#E8E2D8] shadow-2xs text-left"
                  >
                    <p className="text-xs font-bold text-[#18221B]">{b.name}</p>
                    <p className="text-[10px] text-[#5F6D63] mt-0.5">{b.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/shop?category=hair-oil"
                className="inline-flex items-center gap-2 bg-[#163A29] hover:bg-[#0F291D] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-sm"
              >
                <span>Explore Hair Elixirs</span>
                <ArrowRight size={16} />
              </Link>
              <div className="flex items-center gap-2 text-xs text-[#5F6D63]">
                <Droplets size={16} className="text-[#1E6B40]" />
                <span>0% Silicones • 0% Mineral Oil</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase with Gentle Floating Animation */}
          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#E8E2D8]">
              <Image
                src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=900&h=700&fit=crop&q=85"
                alt="Herbal botanicals and hair care oil infusion"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#D49B35] font-semibold flex items-center gap-1">
                  <Sparkles size={13} /> 72-Hour Traditional Kshirapak Infusion
                </span>
                <p className="text-lg font-bold">Cold-Pressed Virgin Coconut & 21 Wild Herbs</p>
              </div>
            </div>

            {/* Overlaid Floating Bottle Badge */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-[#E8E2D8] max-w-[260px] hidden sm:flex items-center gap-3">
              <div className="w-12 h-12 relative shrink-0 rounded-lg overflow-hidden bg-[#FAF7F2]">
                <Image
                  src="https://images.unsplash.com/photo-1608248597359-2e069150033e?w=200&h=200&fit=crop&q=80"
                  alt="Bottle thumbnail"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[#18221B]">Comb Applicator Included</p>
                <p className="text-[11px] text-[#5F6D63]">Direct root scalp massage for deeper penetration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hair Care Trio Grid */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-[#18221B]">Hair & Scalp Rituals</h3>
              <p className="text-xs sm:text-sm text-[#5F6D63] mt-0.5">Herbal hair oils, virgin coconut elixir, and sulfate-free cleansers</p>
            </div>
            <Link
              href="/shop?category=hair-oil"
              className="text-xs sm:text-sm font-semibold text-[#163A29] hover:underline"
            >
              View collection ({hairProducts.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hairProducts.map((product) => (
              <ProductTiltCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
