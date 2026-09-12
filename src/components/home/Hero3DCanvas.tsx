'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Award, ArrowRight, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [activeProductTab, setActiveProductTab] = useState<'bori' | 'fishpatty' | 'samosa'>('bori');

  const productsData = {
    bori: {
      tag: '100% Handcrafted • Sun-Cured',
      title: 'Artisan Biulir Dal Bori',
      bangla: 'ঐতিহ্যবাহী হাতে তৈরি বিউলির ডাল বড়ি',
      desc: 'Sun-dried lentil dumplings handcrafted from stone-ground black gram (Mashkalai) whipped by hand and cured under the Bengal winter sun. Crisp and porous.',
      image: '/products/dal-bori.jpg',
      badge: 'Traditional Bengal Heritage',
      price: '৳240',
      slug: 'handcrafted-artisan-biulir-dal-bori',
    },
    fishpatty: {
      tag: 'Wild Catch • Gluten-Free',
      title: "Ocean's Bounty Fish Patties",
      bangla: 'আর্টিসান ফিশ কাবাব ও প্যাটিস',
      desc: 'Wild-caught coastal fish medallions infused with fresh bird-eye chilies, ginger, and scallions. Zero flour binders, high protein.',
      image: '/products/artisan-fish-patties.jpg',
      badge: '100% Gluten-Free • High Protein',
      price: '৳480',
      slug: 'oceans-bounty-artisan-fish-patties',
    },
    samosa: {
      tag: 'Ultra-Crisp • Freshly Sealed',
      title: 'Golden Cocktail Samosa Pack',
      bangla: 'মচমচে স্পেশাল সামোসা প্যাক',
      desc: 'Flaky golden pastry triangles filled with aromatic spiced potatoes, cumin, and fresh herbs. Nitrogen sealed for maximum crunch.',
      image: '/products/crispy-samosa-pack.jpg',
      badge: 'Ready to Crisp • Tea Time Delight',
      price: '৳320',
      slug: 'golden-crispy-cocktail-samosa-pack',
    },
  };

  const active = productsData[activeProductTab];

  // Mouse move parallax calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    if (isDragging) {
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      setRotation((prev) => ({
        x: Math.max(-25, Math.min(25, prev.x - deltaY * 0.1)),
        y: Math.max(-35, Math.min(35, prev.y + deltaX * 0.15)),
      }));
      setStartPos({ x: e.clientX, y: e.clientY });
    } else {
      // Gentle parallax tilt
      setRotation({
        x: -(y / rect.height) * 12,
        y: (x / rect.width) * 16,
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDragging(false);
    // Smooth reset
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2ECE1]/70 via-[#FAF7F2] to-[#FAF7F2] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8E2D8]">
      {/* Subtle organic background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5922E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#163A29]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Storytelling & Headline */}
          <div className="lg:col-span-7 space-y-6 lg:pr-4 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163A29]/10 text-[#163A29] text-xs font-semibold tracking-wide">
              <ShieldCheck size={15} className="text-[#C5922E]" />
              <span>Certified Pure & Authentic Bangladeshi Consumer Brand</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#18221B] leading-[1.15]">
                Quality Products for{' '}
                <span className="font-serif italic font-normal text-[#163A29] underline decoration-[#C5922E]/50 underline-offset-8">
                  Everyday Life
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#5F6D63] max-w-xl mx-auto lg:mx-0 leading-relaxed pt-2">
                Discover carefully selected food, cold-pressed oils, hair care, personal care, and everyday essentials—crafted without compromise in purity.
              </p>
            </div>

            {/* Product Switcher Pills */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
              <button
                onClick={() => setActiveProductTab('bori')}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 border ${
                  activeProductTab === 'bori'
                    ? 'bg-[#163A29] text-[#FAF7F2] border-[#163A29] shadow-sm'
                    : 'bg-white text-[#5F6D63] border-[#E8E2D8] hover:border-[#163A29]/40'
                }`}
              >
                Heritage: Biulir Dal Bori
              </button>
              <button
                onClick={() => setActiveProductTab('fishpatty')}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 border ${
                  activeProductTab === 'fishpatty'
                    ? 'bg-[#163A29] text-[#FAF7F2] border-[#163A29] shadow-sm'
                    : 'bg-white text-[#5F6D63] border-[#E8E2D8] hover:border-[#163A29]/40'
                }`}
              >
                Gourmet: Artisan Fish Patties
              </button>
              <button
                onClick={() => setActiveProductTab('samosa')}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 border ${
                  activeProductTab === 'samosa'
                    ? 'bg-[#163A29] text-[#FAF7F2] border-[#163A29] shadow-sm'
                    : 'bg-white text-[#5F6D63] border-[#E8E2D8] hover:border-[#163A29]/40'
                }`}
              >
                Snacks: Cocktail Samosa
              </button>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/shop">
                <Button size="lg" className="bg-[#163A29] hover:bg-[#0F291D] text-white px-7 py-3 rounded-full text-sm font-semibold shadow-md flex items-center gap-2 group">
                  <span>Shop Now</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="border-[#D8D0C3] text-[#18221B] hover:bg-white px-6 py-3 rounded-full text-sm font-semibold">
                  Explore Categories
                </Button>
              </Link>
            </div>

            {/* Trust Highlights Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8E2D8]/80 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#163A29]">100%</p>
                <p className="text-xs text-[#5F6D63] mt-0.5">Raw & Adulteration Free</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#163A29]">BSTI</p>
                <p className="text-xs text-[#5F6D63] mt-0.5">Tested & Lab Verified</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#163A29]">64 Districts</p>
                <p className="text-xs text-[#5F6D63] mt-0.5">Fast Doorstep Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D / 2.5D Depth Interactive Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className="relative w-full max-w-[420px] aspect-square select-none cursor-grab active:cursor-grabbing perspective-1000"
            >
              {/* Subtle ambient shadow under floating object */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/10 rounded-full blur-xl transform transition-transform duration-300 scale-95" />

              {/* 3D Depth Card Stage */}
              <div
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transition: isHovered && !isDragging ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
                }}
                className="w-full h-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#E8E2D8] flex flex-col items-center justify-between relative preserve-3d"
              >
                {/* Floating Interactive Badge */}
                <div className="w-full flex items-center justify-between text-xs text-[#5F6D63] mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] font-medium text-[#163A29]">
                    <Sparkles size={13} className="text-[#C5922E]" />
                    {active.tag}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-[#5F6D63]">
                    <RotateCw size={12} className="animate-spin-slow" />
                    Drag to rotate
                  </span>
                </div>

                {/* 3D Product Image with Depth Layer */}
                <div className="relative w-full flex-1 my-2 flex items-center justify-center">
                  {/* Outer glow ring */}
                  <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-[#C5922E]/15 to-[#163A29]/10 blur-xl pointer-events-none" />

                  <div
                    style={{
                      transform: 'translateZ(35px)',
                    }}
                    className="relative w-56 h-56 sm:w-64 sm:h-64 transition-transform duration-300"
                  >
                    <Image
                      src={active.image}
                      alt={active.title}
                      fill
                      priority
                      className="object-contain drop-shadow-2xl animate-float-slow"
                    />
                  </div>
                </div>

                {/* Bottom Card Summary */}
                <div
                  style={{ transform: 'translateZ(20px)' }}
                  className="w-full bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E2D8] flex items-center justify-between"
                >
                  <div className="text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#C5922E]">
                      {active.badge}
                    </p>
                    <h2 className="text-base font-bold text-[#18221B] leading-tight">
                      {active.title}
                    </h2>
                    <p className="text-xs text-[#5F6D63] mt-0.5">{active.bangla}</p>
                  </div>
                  <div className="text-right pl-3">
                    <span className="text-lg font-bold text-[#163A29]">{active.price}</span>
                    <Link
                      href={`/product/${active.slug}`}
                      className="block text-xs text-[#C5922E] font-medium hover:underline mt-0.5"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
