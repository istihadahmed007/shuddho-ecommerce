'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { products } from '@/lib/data';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-[#E8E2D8] flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center text-rose-500">
          <Heart size={32} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#18221B] font-serif">Your wishlist is empty</h2>
          <p className="text-xs text-[#5F6D63] mt-1">Save pure food products and botanical hair elixirs you love for later.</p>
        </div>
        <Link
          href="/shop"
          className="px-6 py-2.5 bg-[#163A29] text-white text-xs font-semibold rounded-full hover:bg-[#0F291D] transition-colors"
        >
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-[#E8E2D8] pb-4">
        <h1 className="text-2xl font-bold text-[#18221B] font-serif">Saved Wishlist</h1>
        <span className="bg-[#163A29] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
          {wishlistedProducts.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
          >
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Remove from wishlist"
              className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-rose-50 text-stone-400 hover:text-rose-600 rounded-full z-10 transition-colors shadow-xs"
            >
              <X size={16} />
            </button>

            <div>
              <Link
                href={`/product/${product.slug}`}
                className="block aspect-square relative bg-[#FAF7F2] p-4"
              >
                <Image
                  src={product.images[0]?.url || '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </Link>

              <div className="p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5922E]">
                  {product.category.name}
                </span>
                <Link
                  href={`/product/${product.slug}`}
                  className="block text-sm font-bold text-[#18221B] hover:text-[#163A29] line-clamp-1"
                >
                  {product.name}
                </Link>
                <p className="text-xs font-bold text-[#163A29]">{formatPrice(product.price)}</p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => {
                  addToCart(product, 1);
                  toggleWishlist(product.id);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#163A29] hover:bg-[#0F291D] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag size={14} />
                <span>Move to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
