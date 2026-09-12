'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Heart, User, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { getCartCount, wishlist, currentUser } = useCart();
  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  // Do not show bottom nav on checkout or admin pages
  if (pathname?.startsWith('/checkout') || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E2D8] lg:hidden">
      <div className="grid grid-cols-5 h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center transition-colors ${
            pathname === '/' ? 'text-[#163A29] font-bold' : 'text-stone-500'
          }`}
        >
          <Home size={20} />
          <span className="text-[10px] mt-1">Home</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center transition-colors ${
            pathname?.startsWith('/shop') ? 'text-[#163A29] font-bold' : 'text-stone-500'
          }`}
        >
          <Search size={20} />
          <span className="text-[10px] mt-1">Explore</span>
        </Link>

        <Link
          href="/cart"
          className={`flex flex-col items-center justify-center relative transition-colors ${
            pathname === '/cart' ? 'text-[#163A29] font-bold' : 'text-stone-500'
          }`}
        >
          <div className="relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#C5922E] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-scale-in">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1">Cart</span>
        </Link>

        <Link
          href="/account/wishlist"
          className={`flex flex-col items-center justify-center relative transition-colors ${
            pathname?.startsWith('/account/wishlist') ? 'text-[#163A29] font-bold' : 'text-stone-500'
          }`}
        >
          <div className="relative">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#163A29] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1">Wishlist</span>
        </Link>

        <Link
          href={currentUser.role === 'ADMIN' ? '/admin' : '/account'}
          className={`flex flex-col items-center justify-center transition-colors ${
            pathname?.startsWith('/account') || pathname?.startsWith('/admin')
              ? 'text-[#163A29] font-bold'
              : 'text-stone-500'
          }`}
        >
          <User size={20} />
          <span className="text-[10px] mt-1">{currentUser.role === 'ADMIN' ? 'Admin' : 'Account'}</span>
        </Link>
      </div>
    </nav>
  );
};
