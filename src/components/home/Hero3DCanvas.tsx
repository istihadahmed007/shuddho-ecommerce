'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Lock, Truck, Sparkles, ChevronDown } from 'lucide-react';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [targetCoords, setTargetCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  // Detect reduced motion & hover support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(motionQuery.matches);
      const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      motionQuery.addEventListener('change', handleMotionChange);

      const hoverQuery = window.matchMedia('(hover: hover)');
      setSupportsHover(hoverQuery.matches);
      const handleHoverChange = (e: MediaQueryListEvent) => setSupportsHover(e.matches);
      hoverQuery.addEventListener('change', handleHoverChange);

      return () => {
        motionQuery.removeEventListener('change', handleMotionChange);
        hoverQuery.removeEventListener('change', handleHoverChange);
      };
    }
  }, []);

  // Smooth lerp damping loop for mouse parallax
  useEffect(() => {
    if (prefersReducedMotion || !supportsHover) return;

    let animId: number;
    const lerp = () => {
      setCoords((prev) => {
        const factor = isHovered ? 0.08 : 0.05;
        const dx = targetCoords.x - prev.x;
        const dy = targetCoords.y - prev.y;
        if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
          return targetCoords;
        }
        return {
          x: prev.x + dx * factor,
          y: prev.y + dy * factor,
        };
      });
      animId = requestAnimationFrame(lerp);
    };

    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [targetCoords, isHovered, prefersReducedMotion, supportsHover]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !supportsHover || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setTargetCoords({
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY)),
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTargetCoords({ x: 0, y: 0 });
  };

  const scrollToExplore = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: window.innerHeight * 0.85,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE6] to-[#FAF7F2] border-b border-[#E8E2D8] select-none"
    >
      {/* ---------------- LAYER 1: CINEMATIC STUDIO LIGHTING & RADIAL WASH ---------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Warm Radial Sunlight from top right */}
        <div
          style={{
            transform: prefersReducedMotion
              ? 'none'
              : `translate3d(${coords.x * -18}px, ${coords.y * -14}px, 0)`,
            transition: 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)',
          }}
          className="absolute -top-32 right-[-5%] w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] rounded-full bg-gradient-to-br from-[#F5DFB3]/45 via-[#E6D2B5]/30 to-transparent blur-3xl"
        />

        {/* Deep Botanical Glow from bottom-left corner */}
        <div
          style={{
            transform: prefersReducedMotion
              ? 'none'
              : `translate3d(${coords.x * 12}px, ${coords.y * 10}px, 0)`,
            transition: 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)',
          }}
          className="absolute -bottom-24 -left-20 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#163A29]/10 via-[#1E6B40]/06 to-transparent blur-3xl"
        />

        {/* Ambient Subtle Studio Grid Texture for Editorial Depth */}
        <div
          className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#163A29_1px,transparent_1px)] [background-size:28px_28px]"
        />
      </div>

      {/* ---------------- HERO CORE CONTENT CONTAINER ---------------- */}
      <div className="relative z-10 container-custom mx-auto pt-10 sm:pt-14 lg:pt-16 pb-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ---------------- LEFT COLUMN (40% Desktop): EDITORIAL STORYTELLING ---------------- */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Editorial Category Pill with Official Logo */}
            <div
              style={{ animationDelay: '0.1s' }}
              className="animate-fade-in inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#E8E2D8] shadow-xs backdrop-blur-xs text-xs font-semibold tracking-wide text-[#163A29]"
            >
              <div className="relative w-5 h-5 rounded-md overflow-hidden shrink-0">
                <Image
                  src="/shuddho-logo.png"
                  alt="Shuddho Pure & Authentic"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="uppercase tracking-widest text-[11px] text-[#8C6D23] font-bold">
                Shuddho Pure Collection
              </span>
            </div>

            {/* Editorial Main Headline */}
            <div className="space-y-3">
              <h1
                style={{ animationDelay: '0.2s' }}
                className="animate-slide-up text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#18221B] leading-[1.12]"
              >
                Quality Products for{' '}
                <span className="font-serif italic font-normal text-[#163A29] block sm:inline">
                  Everyday Life
                </span>
              </h1>
              
              {/* Supporting Subtext */}
              <p
                style={{ animationDelay: '0.4s' }}
                className="animate-slide-up text-base sm:text-lg text-[#556358] max-w-lg leading-relaxed pt-1"
              >
                Discover carefully selected food, hair care, personal care, and everyday essentials—all in one trusted store.
              </p>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div
              style={{ animationDelay: '0.6s' }}
              className="animate-slide-up flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1 w-full sm:w-auto"
            >
              {/* Primary CTA */}
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#163A29] hover:bg-[#0F291D] text-[#FAF7F2] text-sm font-semibold tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
              >
                <span>Shop Now</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#18221B] border border-[#D8D0C3] hover:border-[#163A29] text-sm font-semibold tracking-wide shadow-2xs hover:shadow-xs transition-all duration-200"
              >
                <span>Explore Categories</span>
              </Link>
            </div>

            {/* Subtle Credibility Tagline */}
            <p
              style={{ animationDelay: '0.8s' }}
              className="animate-fade-in text-xs font-medium text-[#7C887F] tracking-wide pt-2"
            >
              Authentic products • Secure shopping • Fast delivery
            </p>
          </div>

          {/* ---------------- RIGHT COLUMN (60% Desktop): CINEMATIC 3D PRODUCT COMPOSITION ---------------- */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[540px]">
            
            {/* Visual Multi-Layer Depth Stage */}
            <div className="relative w-full max-w-[560px] aspect-[4/3] sm:aspect-square flex items-center justify-center">
              
              {/* BACK LAYER: Soft Organic Halo Disc */}
              <div
                style={{
                  transform: prefersReducedMotion
                    ? 'none'
                    : `translate3d(${coords.x * -14}px, ${coords.y * -14}px, 0)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="absolute w-[280px] sm:w-[400px] lg:w-[450px] h-[280px] sm:h-[400px] lg:h-[450px] rounded-full bg-gradient-to-tr from-[#E7DEC8] via-[#FAF7F2] to-[#E2D6BE] shadow-inner opacity-90 border border-white/60 pointer-events-none"
              />

              {/* SECONDARY FLOATING ACCENT 1: Left Background (Dal Bori - Food Heritage) */}
              <div
                style={{
                  transform: prefersReducedMotion
                    ? 'none'
                    : `translate3d(${coords.x * -24}px, ${coords.y * -20}px, 0) rotate(${coords.x * -4}deg)`,
                  transition: 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)',
                }}
                className="absolute -left-2 sm:-left-6 top-8 sm:top-12 w-28 sm:w-40 aspect-square rounded-2xl p-2.5 bg-white/90 backdrop-blur-md border border-[#E8E2D8]/90 shadow-lg pointer-events-none z-10 transition-transform hidden xs:block"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#FAF7F2]">
                  <Image
                    src="/products/dal-bori.jpg"
                    alt="Handcrafted Dal Bori Heritage"
                    fill
                    sizes="(max-width: 768px) 120px, 160px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] font-bold text-white tracking-tight leading-none">
                      Handcrafted Bori
                    </span>
                  </div>
                </div>
              </div>

              {/* SECONDARY FLOATING ACCENT 2: Right Background (Artisan Chili Garlic Sauce) */}
              <div
                style={{
                  transform: prefersReducedMotion
                    ? 'none'
                    : `translate3d(${coords.x * 26}px, ${coords.y * -22}px, 0) rotate(${coords.x * 5}deg)`,
                  transition: 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)',
                }}
                className="absolute -right-2 sm:-right-4 bottom-14 sm:bottom-16 w-32 sm:w-44 aspect-square rounded-2xl p-2.5 bg-white/90 backdrop-blur-md border border-[#E8E2D8]/90 shadow-lg pointer-events-none z-10 transition-transform hidden xs:block"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#FAF7F2]">
                  <Image
                    src="/products/chili-garlic-sauce.jpg"
                    alt="Artisan Chili Garlic Sauce"
                    fill
                    sizes="(max-width: 768px) 140px, 180px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] font-bold text-white tracking-tight leading-none">
                      Chili Garlic Sauce
                    </span>
                  </div>
                </div>
              </div>

              {/* FOCAL HERO PRODUCT: Central Botanical Hair Oil with Premium Glass Lighting */}
              <div
                style={{
                  transform: prefersReducedMotion
                    ? 'none'
                    : `translate3d(${coords.x * 32}px, ${coords.y * 24}px, 0) scale(${isHovered ? 1.025 : 1})`,
                  transition: 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
                }}
                className="relative z-20 w-64 sm:w-80 lg:w-96 aspect-square flex items-center justify-center cursor-pointer group"
              >
                {/* Floating Contact Shadow on Ground Plane */}
                <div
                  style={{
                    transform: prefersReducedMotion
                      ? 'none'
                      : `translate3d(${coords.x * -16}px, ${coords.y * -8}px, 0) scale(${isHovered ? 1.08 : 1})`,
                    transition: 'transform 0.3s ease-out',
                  }}
                  className="absolute -bottom-6 w-3/4 h-8 bg-[#18221B]/15 rounded-full blur-xl pointer-events-none"
                />

                {/* Main Hero Card Stage */}
                <div className="relative w-full h-full rounded-3xl p-3 sm:p-4 bg-white/95 backdrop-blur-md border border-[#E8E2D8] shadow-2xl overflow-hidden flex flex-col justify-between group-hover:border-[#C5922E]/40 transition-all duration-300">
                  {/* Top Badge Overlay */}
                  <div className="flex items-center justify-between z-10 px-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] text-[11px] font-semibold text-[#163A29]">
                      <Sparkles size={12} className="text-[#C5922E]" />
                      Cold-Pressed Botanicals
                    </span>
                    <span className="text-[11px] font-bold text-[#163A29] px-2.5 py-0.5 rounded-full bg-[#163A29]/10">
                      Featured
                    </span>
                  </div>

                  {/* High Quality Product Visual */}
                  <div className="relative w-full flex-1 my-2 rounded-2xl overflow-hidden bg-[#FAF7F2]/80 flex items-center justify-center">
                    <Image
                      src="/products/infused-herbal-oil.jpg"
                      alt="Botanical Infused Restorative Hair Oil"
                      fill
                      priority
                      sizes="(max-width: 768px) 280px, (max-width: 1200px) 380px, 420px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    
                    {/* Subtle Luxury Specular Lighting Reflection Across Lens */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom Editorial Meta Strip */}
                  <div className="px-2 pb-1 pt-1 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-[#18221B] leading-snug">
                        Botanical Infused Hair Oil
                      </h2>
                      <p className="text-[11px] text-[#7C887F] font-medium">
                        Pure cold-pressed coconut & herbal elixir
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm sm:text-base font-extrabold text-[#163A29]">৳460</span>
                      <Link
                        href="/product/slow-infused-rosemary-botanical-hair-oil"
                        className="block text-[11px] font-semibold text-[#C5922E] hover:underline"
                      >
                        View Product →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ---------------- BOTTOM SECTION: 3 TRUST SIGNALS + SCROLL PROMPT ---------------- */}
      <div className="relative z-10 w-full border-t border-[#E8E2D8]/80 bg-white/60 backdrop-blur-md">
        <div className="container-custom mx-auto py-4 sm:py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* 3 Compact Trust Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-8 w-full md:w-auto">
              
              {/* Signal 1: Authentic Products */}
              <div className="flex items-center gap-2.5 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-full bg-[#163A29]/10 text-[#163A29] flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div className="text-left">
                  <h4 className="text-xs sm:text-sm font-bold text-[#18221B] leading-tight">
                    Authentic Products
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#7C887F] hidden xs:block">
                    100% verified & genuine
                  </p>
                </div>
              </div>

              {/* Signal 2: Secure Checkout */}
              <div className="flex items-center gap-2.5 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-full bg-[#163A29]/10 text-[#163A29] flex items-center justify-center shrink-0">
                  <Lock size={16} />
                </div>
                <div className="text-left">
                  <h4 className="text-xs sm:text-sm font-bold text-[#18221B] leading-tight">
                    Secure Checkout
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#7C887F] hidden xs:block">
                    Encrypted transactions
                  </p>
                </div>
              </div>

              {/* Signal 3: Fast Delivery */}
              <div className="flex items-center gap-2.5 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-full bg-[#163A29]/10 text-[#163A29] flex items-center justify-center shrink-0">
                  <Truck size={16} />
                </div>
                <div className="text-left">
                  <h4 className="text-xs sm:text-sm font-bold text-[#18221B] leading-tight">
                    Fast Delivery
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#7C887F] hidden xs:block">
                    Nationwide doorstep service
                  </p>
                </div>
              </div>

            </div>

            {/* Scroll to Explore Downward Cue */}
            <button
              onClick={scrollToExplore}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-medium text-[#7C887F] hover:text-[#163A29] transition-colors py-1 cursor-pointer group"
              aria-label="Scroll down to explore products"
            >
              <span>Scroll to explore</span>
              <ChevronDown
                size={14}
                className="group-hover:translate-y-0.5 transition-transform duration-200 animate-bounce"
              />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};
