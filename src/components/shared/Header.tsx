'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search, Heart, User, ShoppingBag, Menu, X, ChevronRight,
  ShieldCheck, ArrowRight, Sparkles, MapPin, Phone
} from 'lucide-react';
import { announcements, categories, searchProducts } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

export const Header: React.FC = () => {
  const router = useRouter();
  const { getCartCount, wishlist, currentUser, switchUserRole } = useCart();
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  useEffect(() => {
    if (!announcements?.length) return;
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search autocomplete
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = searchProducts(searchQuery).slice(0, 5);
      setSearchSuggestions(results);
      setIsSearchOpen(true);
    } else {
      setSearchSuggestions([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  // Click outside to close search suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={`w-full bg-[#FAF7F2] flex flex-col z-40 transition-all duration-200 ${isScrolled ? 'sticky top-0 shadow-md' : ''}`}>
      {/* Dynamic Announcement Bar */}
      {announcements && announcements.length > 0 && (
        <div className="bg-[#163A29] text-[#FAF7F2] text-[11px] sm:text-xs font-medium py-2 px-4 text-center transition-all duration-500 border-b border-[#0F291D]">
          <div className="container-custom mx-auto flex items-center justify-between">
            <span className="hidden md:inline-flex items-center gap-1 text-[#D49B35]">
              <ShieldCheck size={13} /> 100% Pure & Lab Tested
            </span>
            <p className="mx-auto text-center truncate">{announcements[currentAnnouncement]}</p>
            <div className="hidden md:flex items-center gap-3 text-[11px] text-[#D8D0C3]">
              <Link href="/track-order" className="hover:text-white transition-colors">
                Track Order
              </Link>
              <span>•</span>
              <button
                onClick={() => switchUserRole(currentUser.role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN')}
                className="hover:text-[#D49B35] font-semibold transition-colors"
                title="Switch customer/admin view"
              >
                Role: {currentUser.role}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header Container */}
      <div className="border-b border-[#E8E2D8] bg-white/95 backdrop-blur-md">
        <div className="container-custom mx-auto py-3.5 sm:py-4 flex items-center justify-between gap-4 sm:gap-6">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-1.5 text-stone-700 hover:text-[#163A29]"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <Menu size={24} />
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-xl overflow-hidden bg-[#FAF7F2] p-0.5 border border-[#E8E2D8] shadow-xs group-hover:border-[#163A29]/40 transition-colors shrink-0">
              <Image
                src="/shuddho-logo.png"
                alt="Shuddho - Pure & Authentic"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#163A29] leading-none font-serif">
                SHUDDHO
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C5922E] font-semibold mt-0.5">
                Pure & Authentic
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar with Instant Autocomplete */}
          <div ref={searchRef} className="hidden lg:flex flex-1 max-w-xl mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search mustard oil, honey, spices, hair oil..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchSuggestions.length > 0) setIsSearchOpen(true);
                  }}
                  className="w-full pl-10 pr-10 py-2 text-sm bg-[#FAF7F2] border border-[#E8E2D8] rounded-full focus:outline-none focus:ring-2 focus:ring-[#163A29]/20 focus:border-[#163A29] transition-all"
                />
                <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {isSearchOpen && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#E8E2D8] overflow-hidden z-50 animate-scale-in">
                <div className="p-2 border-b border-[#E8E2D8] bg-[#FAF7F2] text-[11px] font-semibold uppercase tracking-wider text-[#5F6D63]">
                  Suggested Products
                </div>
                <div className="divide-y divide-[#E8E2D8]/60">
                  {searchSuggestions.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/product/${prod.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-3 hover:bg-[#FAF7F2] transition-colors group"
                    >
                      <div className="w-10 h-10 relative bg-stone-50 rounded-lg overflow-hidden shrink-0 border border-[#E8E2D8]">
                        <Image
                          src={prod.images[0]?.url || '/placeholder.png'}
                          alt={prod.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-xs font-semibold text-stone-900 group-hover:text-[#163A29] truncate">
                          {prod.name}
                        </p>
                        <p className="text-[10px] text-[#5F6D63]">{prod.category.name}</p>
                      </div>
                      <span className="text-xs font-bold text-[#163A29]">
                        {formatPrice(prod.price)}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="p-2.5 bg-stone-50 text-center border-t border-[#E8E2D8]">
                  <Link
                    href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="text-xs font-semibold text-[#163A29] hover:underline"
                  >
                    View all results for &quot;{searchQuery}&quot; →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Admin Switcher indicator badge */}
            {currentUser.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#163A29] text-[#C5922E] border border-[#C5922E]/40"
              >
                <span>Admin Suite</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="hidden sm:flex flex-col items-center text-stone-700 hover:text-[#163A29] transition relative group"
            >
              <div className="relative">
                <Heart size={22} className="group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C5922E] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-scale-in">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 font-medium">Wishlist</span>
            </Link>

            {/* Account */}
            <Link
              href={currentUser.role === 'ADMIN' ? '/admin' : '/account'}
              className="hidden sm:flex flex-col items-center text-stone-700 hover:text-[#163A29] transition group"
            >
              <User size={22} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] mt-0.5 font-medium">
                {currentUser.role === 'ADMIN' ? 'Admin' : 'Account'}
              </span>
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#163A29] text-white hover:bg-[#0F291D] transition-all shadow-xs group"
            >
              <div className="relative">
                <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C5922E] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden sm:inline">
                Cart {cartCount > 0 ? `(${cartCount})` : ''}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar - Visible on small screens */}
        <div className="lg:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search pure food, hair oil, spices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-full focus:outline-none focus:border-[#163A29]"
            />
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          </form>
        </div>

        {/* Desktop Category Navigation Menu */}
        <nav className="hidden lg:block border-t border-[#E8E2D8]/70 bg-[#FAF7F2]/60">
          <div className="container-custom mx-auto flex items-center justify-between text-xs font-medium text-stone-700 py-2.5">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-[#163A29] font-bold hover:text-[#C5922E] transition-colors">
                Home
              </Link>
              <Link href="/shop" className="hover:text-[#163A29] transition-colors">
                All Products
              </Link>
              <Link href="/shop?category=food-grocery" className="hover:text-[#163A29] transition-colors">
                Food & Pantry
              </Link>
              <Link href="/shop?category=snacks" className="hover:text-[#163A29] transition-colors">
                Snacks & Appetizers
              </Link>
              <Link href="/shop?category=bakery-dessert" className="hover:text-[#163A29] transition-colors">
                Bakery & Desserts
              </Link>
              <Link href="/shop?category=pickles-oils" className="hover:text-[#163A29] transition-colors">
                Pickles, Sauces & Oils
              </Link>
            </div>
            <div className="flex items-center gap-4 text-[#5F6D63]">
              <Link href="/track-order" className="hover:text-[#163A29] flex items-center gap-1">
                <MapPin size={12} /> Track Order
              </Link>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-[#163A29]">
                <Phone size={12} /> +880 9612-SHUDDHO
              </span>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-[#E8E2D8] flex items-center justify-between bg-[#FAF7F2]">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white p-0.5 border border-[#E8E2D8] shrink-0">
                  <Image
                    src="/shuddho-logo.png"
                    alt="Shuddho Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-base text-[#163A29] leading-tight">SHUDDHO</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#C5922E] font-semibold">Pure & Authentic</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4 flex-1">
              <div className="space-y-1 text-sm font-medium">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-[#163A29] font-bold hover:bg-[#FAF7F2]"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-stone-700 hover:bg-[#FAF7F2]"
                >
                  All Products
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-stone-700 hover:bg-[#FAF7F2]"
                >
                  Track Order
                </Link>
              </div>

              <div className="pt-2 border-t border-[#E8E2D8]">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-[#C5922E] mb-2">
                  Categories
                </p>
                <div className="space-y-1 text-sm">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-stone-700 hover:bg-[#FAF7F2]"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight size={14} className="text-stone-400" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8E2D8] space-y-2">
                <Link
                  href={currentUser.role === 'ADMIN' ? '/admin' : '/account'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-[#FAF7F2]"
                >
                  <span>My Account</span>
                  <User size={16} />
                </Link>
                <Link
                  href="/account/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-[#FAF7F2]"
                >
                  <span>Wishlist ({wishlistCount})</span>
                  <Heart size={16} />
                </Link>
              </div>
            </div>

            <div className="p-4 border-t border-[#E8E2D8] bg-[#FAF7F2]">
              <button
                onClick={() => {
                  switchUserRole(currentUser.role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-[#163A29] text-white"
              >
                Switch to {currentUser.role === 'ADMIN' ? 'Customer Mode' : 'Admin Suite'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
