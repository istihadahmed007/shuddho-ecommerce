'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface ProductTiltCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductTiltCard: React.FC<ProductTiltCardProps> = ({ product, priority = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist, getAvailableStock } = useCart();

  const isFavorited = isInWishlist(product.id);
  const stock = getAvailableStock(product.id);
  const isOutOfStock = stock <= 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only tilt on larger desktop screens
    if (window.innerWidth < 1024 || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setTilt({
      x: -(y / rect.height) * 8, // gentle max 8 deg
      y: (x / rect.width) * 8,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || isAdding) return;

    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-[#E8E2D8] hover:border-[#C5922E]/40 hover:shadow-lg transition-all duration-300 overflow-hidden perspective-1000"
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.3s' : 'transform 0.4s ease-out, box-shadow 0.3s',
      }}
    >
      {/* Top badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {product.discount > 0 && (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#A44222] text-white shadow-xs">
            -{product.discount}% OFF
          </span>
        )}
        {product.foodDetails?.bstiCertified && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#163A29] text-white tracking-wide shadow-xs">
            BSTI Certified
          </span>
        )}
        {product.careDetails?.isOrganic && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1E6B40] text-white tracking-wide shadow-xs">
            100% Herbal
          </span>
        )}
      </div>

      {/* Wishlist button */}
      <button
        onClick={handleWishlist}
        aria-label="Save to Wishlist"
        className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-xs transition-colors duration-200 ${
          isFavorited
            ? 'bg-rose-50 text-rose-600'
            : 'bg-white/90 text-stone-400 hover:text-rose-600 hover:bg-white'
        }`}
      >
        <Heart size={16} className={isFavorited ? 'fill-current' : ''} />
      </button>

      {/* Product Image Stage */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full bg-[#FAF7F2] overflow-hidden flex items-center justify-center p-6"
      >
        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
          <Image
            src={product.images[0]?.url || 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop&q=80'}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain"
          />
        </div>
      </Link>

      {/* Product Content Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs text-[#5F6D63] mb-1.5">
          <span className="font-medium text-[#C5922E] tracking-wide uppercase text-[10px]">
            {product.category.name}
          </span>
          <div className="flex items-center gap-1">
            <Star size={13} className="text-amber-500 fill-amber-500" />
            <span className="font-semibold text-stone-800 text-[11px]">{product.rating}</span>
            <span className="text-stone-400 text-[10px]">({product.reviewCount})</span>
          </div>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="font-semibold text-[#18221B] hover:text-[#163A29] text-sm sm:text-base line-clamp-2 transition-colors mb-2 min-h-[44px]"
        >
          {product.name}
        </Link>

        {product.shortDescription && (
          <p className="text-xs text-[#5F6D63] line-clamp-1 mb-3">
            {product.shortDescription}
          </p>
        )}

        {/* Stock indication */}
        <div className="mb-3 text-[11px]">
          {isOutOfStock ? (
            <span className="text-rose-600 font-medium">Temporarily Out of Stock</span>
          ) : stock <= 5 ? (
            <span className="text-amber-700 font-medium">Only {stock} left in stock</span>
          ) : (
            <span className="text-emerald-700 font-medium">In Stock • Fresh Batch</span>
          )}
        </div>

        {/* Bottom Price & Add Action */}
        <div className="mt-auto pt-3 border-t border-[#E8E2D8] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-bold text-[#163A29]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-xs ${
              isOutOfStock
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : isAdding
                ? 'bg-emerald-700 text-white scale-95'
                : 'bg-[#163A29] hover:bg-[#0F291D] text-white active:scale-95'
            }`}
          >
            {isAdding ? (
              <>
                <Check size={14} className="animate-scale-in" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
