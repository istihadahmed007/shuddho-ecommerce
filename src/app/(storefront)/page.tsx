import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2,
  Tag, Clock, Award, Leaf, ChevronRight
} from 'lucide-react';
import {
  categories,
  getFeaturedProducts,
  getBestSellers,
  getNewArrivals,
  coupons,
  testimonials,
} from '@/lib/data';
import { Hero3DCanvas } from '@/components/home/Hero3DCanvas';
import { FoodStorySection } from '@/components/home/FoodStorySection';
import { ProductTiltCard } from '@/components/home/ProductTiltCard';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION WITH 3D EXPERIENCE */}
      <Hero3DCanvas />

      {/* 2. CATEGORY DISCOVERY GRID */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E8E2D8]">
        <div className="container-custom mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5922E]">
              Authentic Bengali Collections
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#18221B] mt-1.5 tracking-tight font-serif">
              Explore Our Products
            </h2>
            <p className="text-sm text-[#5F6D63] mt-2">
              From sun-dried handmade Biulir dal bori to artisan snacks and coastal delicacies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative bg-[#FAF7F2] rounded-3xl p-6 border border-[#E8E2D8] hover:border-[#163A29]/30 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5922E]">
                      {cat.productCount} Products
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-stone-400 group-hover:text-[#163A29] group-hover:bg-[#163A29]/10 transition-colors">
                      <ChevronRight size={16} />
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#18221B] group-hover:text-[#163A29] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#5F6D63] mt-1 line-clamp-2 max-w-[280px]">
                    {cat.description}
                  </p>
                </div>

                <div className="relative aspect-[16/10] w-full mt-4 rounded-2xl overflow-hidden bg-white/50 border border-[#E8E2D8]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (DATA-DRIVEN) */}
      <section className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E8E2D8]">
        <div className="container-custom mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5922E]">
                Flagship Essentials
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18221B] mt-1 font-serif">
                Featured Products
              </h2>
              <p className="text-xs sm:text-sm text-[#5F6D63] mt-1">
                Handcrafted snacks, sun-cured bori, and gourmet artisan seafood.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#163A29] hover:text-[#0F291D] group"
            >
              <span>Explore All Products</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <ProductTiltCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOD STORYTELLING SECTION */}
      <FoodStorySection />

      {/* 5. BEST SELLERS SECTION */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E8E2D8]">
        <div className="container-custom mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#A44222]">
                Household Favorites
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18221B] mt-1 font-serif">
                Best Sellers in Bangladesh
              </h2>
              <p className="text-xs sm:text-sm text-[#5F6D63] mt-1">
                Verified favorites based on real repeat customer purchases.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#163A29] hover:underline"
            >
              <span>View More</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {bestSellers.map((product) => (
              <ProductTiltCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. REAL OFFERS & PROMOTIONS (NO FAKE COUNTDOWNS) */}
      <section className="py-14 sm:py-20 bg-[#163A29] text-white relative overflow-hidden">
        {/* Decorative backdrop */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#C5922E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FAF7F2]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D49B35]">
              Active Promotions & Coupons
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mt-1.5 font-serif">
              Transparent Savings for Pure Living
            </h2>
            <p className="text-sm text-[#D8D0C3] mt-2">
              All promotional codes are validated server-side and automatically applied at checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C5922E] text-[#14291E]">
                      {coupon.type === 'PERCENTAGE'
                        ? `${coupon.value}% OFF`
                        : coupon.type === 'FREE_SHIPPING'
                        ? 'FREE DELIVERY'
                        : `৳${coupon.value} FLAT OFF`}
                    </span>
                    <span className="text-[11px] text-[#D8D0C3] flex items-center gap-1">
                      <Clock size={12} /> Valid in 2026
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-mono tracking-wider text-white mb-2">
                    {coupon.code}
                  </h3>
                  <p className="text-xs text-[#D8D0C3] leading-relaxed">
                    {coupon.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#D49B35]">
                    Min. Order ৳{coupon.minOrderValue}
                  </span>
                  <Link
                    href="/shop"
                    className="text-xs font-bold text-white hover:text-[#D49B35] transition-colors flex items-center gap-1"
                  >
                    <span>Use Coupon</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEW ARRIVALS */}
      <section className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E8E2D8]">
        <div className="container-custom mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5922E]">
                Seasonal Harvest
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#18221B] mt-1 font-serif">
                Fresh Harvest & New Arrivals
              </h2>
              <p className="text-xs sm:text-sm text-[#5F6D63] mt-1">
                Recently milled grains, cold-pressed small batches, and seasonal spice cures.
              </p>
            </div>
            <Link
              href="/shop?category=new-arrivals"
              className="text-xs sm:text-sm font-semibold text-[#163A29] hover:underline"
            >
              See All Arrivals →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductTiltCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. CUSTOMER TRUST & TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#163A29]">
              Customer Confidence
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#18221B] mt-1.5 font-serif">
              Trusted in Homes Across Bangladesh
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-[#E8E2D8] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#18221B] leading-relaxed italic">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[#E8E2D8] flex items-center gap-3">
                  <div className="w-10 h-10 relative rounded-full overflow-hidden bg-stone-200 shrink-0">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#18221B]">{t.name}</h4>
                    <p className="text-[11px] text-[#5F6D63]">{t.location}</p>
                    {t.productBought && (
                      <p className="text-[10px] text-[#C5922E] font-medium mt-0.5">
                        Purchased: {t.productBought}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
