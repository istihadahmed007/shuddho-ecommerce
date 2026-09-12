'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Grid, List, ChevronRight, Filter, X, Star,
  SlidersHorizontal, Check, RefreshCw
} from 'lucide-react';
import { products, categories, brands } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { ProductTiltCard } from '@/components/home/ProductTiltCard';
import type { Product } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('Featured');
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceLimit, setPriceLimit] = useState<number>(2000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyCertified, setOnlyCertified] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>(initialQuery);

  // Derive products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search query
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory && selectedCategory !== 'all') {
      if (selectedCategory === 'new-arrivals') {
        // Sort by newest
        list = [...list].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        list = list.filter((p) => p.category.slug === selectedCategory);
      }
    }

    // Brand / Product line
    if (selectedBrand) {
      list = list.filter((p) => p.brand.slug === selectedBrand);
    }

    // Price
    list = list.filter((p) => p.price <= priceLimit);

    // Availability
    if (onlyInStock) {
      list = list.filter((p) => p.stock > 0);
    }

    // BSTI / Organic Certified
    if (onlyCertified) {
      list = list.filter((p) => p.foodDetails?.bstiCertified || p.careDetails?.isOrganic);
    }

    // Sort
    switch (sortBy) {
      case 'Price: Low to High':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'Best Rated':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'Popular':
        list.sort((a, b) => b.soldCount - a.soldCount);
        break;
      case 'Newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'Featured':
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [searchFilter, selectedCategory, selectedBrand, priceLimit, onlyInStock, onlyCertified, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceLimit(2000);
    setOnlyInStock(false);
    setOnlyCertified(false);
    setSearchFilter('');
    setSortBy('Featured');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="container-custom mx-auto">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#5F6D63] mb-2">
            <Link href="/" className="hover:text-[#163A29]">Home</Link>
            <span>/</span>
            <span className="text-[#18221B] font-medium">Shop</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="capitalize text-[#C5922E]">
                  {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-[#18221B] font-serif">
                Authentic Consumer Goods
              </h1>
              <p className="text-xs sm:text-sm text-[#5F6D63] mt-1">
                Showing {filteredProducts.length} verified pure items
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#E8E2D8] text-xs font-semibold text-stone-800 shadow-xs"
              >
                <Filter size={14} />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
              <h3 className="font-bold text-sm text-[#18221B] flex items-center gap-2">
                <SlidersHorizontal size={16} /> Filters
              </h3>
              {(selectedCategory || selectedBrand || priceLimit < 2000 || onlyInStock || onlyCertified || searchFilter) && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#C5922E] hover:underline font-medium"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Search within shop */}
            <div>
              <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider block mb-2">
                Keyword Search
              </label>
              <input
                type="text"
                placeholder="e.g. mustard, honey, hair oil"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider block mb-2.5">
                Categories
              </label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    !selectedCategory ? 'bg-[#163A29] text-white font-semibold' : 'text-stone-700 hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug ? 'bg-[#163A29] text-white font-semibold' : 'text-stone-700 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span>{cat.productCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                <span>Max Price</span>
                <span className="text-[#163A29] font-bold">{formatPrice(priceLimit)}</span>
              </div>
              <input
                type="range"
                min="150"
                max="2000"
                step="50"
                value={priceLimit}
                onChange={(e) => setPriceLimit(Number(e.target.value))}
                className="w-full accent-[#163A29] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                <span>৳150</span>
                <span>৳2,000</span>
              </div>
            </div>

            {/* Product Lines */}
            <div>
              <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider block mb-2">
                Product Line
              </label>
              <div className="space-y-1.5 text-xs">
                {brands.map((b) => (
                  <label key={b.id} className="flex items-center gap-2 cursor-pointer text-stone-700">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === b.slug}
                      onChange={() => setSelectedBrand(selectedBrand === b.slug ? '' : b.slug)}
                      className="text-[#163A29] focus:ring-0"
                    />
                    <span>{b.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quality & Stock Checkboxes */}
            <div className="pt-2 border-t border-[#E8E2D8] space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#163A29] focus:ring-0"
                />
                <span>In Stock Only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700">
                <input
                  type="checkbox"
                  checked={onlyCertified}
                  onChange={(e) => setOnlyCertified(e.target.checked)}
                  className="rounded text-[#163A29] focus:ring-0"
                />
                <span>BSTI / Organic Certified</span>
              </label>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID & CONTROLS */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8E2D8] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#5F6D63]">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-medium bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#163A29]"
                >
                  <option>Featured</option>
                  <option>Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Rated</option>
                  <option>Newest</option>
                </select>
              </div>

              {/* View mode */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg border ${
                    viewMode === 'grid' ? 'bg-[#163A29] text-white border-[#163A29]' : 'border-[#E8E2D8] text-stone-500'
                  }`}
                  aria-label="Grid View"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg border ${
                    viewMode === 'list' ? 'bg-[#163A29] text-white border-[#163A29]' : 'border-[#E8E2D8] text-stone-500'
                  }`}
                  aria-label="List View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D8] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center mx-auto text-stone-400">
                  <Filter size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#18221B]">No matching products found</h3>
                  <p className="text-xs text-[#5F6D63] max-w-sm mx-auto mt-1">
                    Try adjusting your filters, clearing keyword searches, or broadening your price range.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#163A29] text-white text-xs font-semibold"
                >
                  <RefreshCw size={13} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductTiltCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              /* List Mode */
              <div className="space-y-4">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-2xl p-4 border border-[#E8E2D8] flex flex-col sm:flex-row items-center gap-5 hover:shadow-md transition-shadow"
                  >
                    <Link
                      href={`/product/${prod.slug}`}
                      className="w-full sm:w-36 aspect-square relative rounded-xl bg-[#FAF7F2] shrink-0 overflow-hidden"
                    >
                      <Image
                        src={prod.images[0]?.url || '/placeholder.png'}
                        alt={prod.name}
                        fill
                        className="object-contain p-2"
                      />
                    </Link>
                    <div className="flex-1 text-left">
                      <span className="text-[10px] font-bold uppercase text-[#C5922E]">
                        {prod.category.name}
                      </span>
                      <Link
                        href={`/product/${prod.slug}`}
                        className="block font-bold text-[#18221B] hover:text-[#163A29] text-base mt-0.5"
                      >
                        {prod.name}
                      </Link>
                      <p className="text-xs text-[#5F6D63] line-clamp-2 mt-1">
                        {prod.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs">
                        <div className="flex items-center text-amber-500">
                          <Star size={13} className="fill-current" />
                          <span className="font-bold text-stone-900 ml-1">{prod.rating}</span>
                        </div>
                        <span className="text-stone-300">•</span>
                        <span className="text-[#163A29] font-medium">
                          {prod.stock > 0 ? `${prod.stock} in stock` : 'Out of stock'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right sm:border-l sm:border-[#E8E2D8] sm:pl-6 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end gap-3">
                      <div>
                        <span className="text-lg font-bold text-[#163A29]">
                          {formatPrice(prod.price)}
                        </span>
                        {prod.originalPrice > prod.price && (
                          <span className="block text-xs text-stone-400 line-through">
                            {formatPrice(prod.originalPrice)}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/product/${prod.slug}`}
                        className="px-4 py-2 rounded-xl bg-[#163A29] text-white text-xs font-semibold hover:bg-[#0F291D]"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full ml-auto shadow-2xl z-10 flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
              <h3 className="font-bold text-sm text-[#18221B]">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-stone-500 hover:bg-stone-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-4 space-y-6 flex-1">
              <div>
                <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider block mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8E2D8] bg-[#FAF7F2]"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider block mb-2">
                  Max Price: {formatPrice(priceLimit)}
                </label>
                <input
                  type="range"
                  min="150"
                  max="2000"
                  step="50"
                  value={priceLimit}
                  onChange={(e) => setPriceLimit(Number(e.target.value))}
                  className="w-full accent-[#163A29]"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={onlyCertified}
                    onChange={(e) => setOnlyCertified(e.target.checked)}
                  />
                  <span>BSTI / Organic Certified</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E2D8] space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 bg-[#163A29] text-white font-semibold text-xs rounded-xl"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full py-2 text-stone-600 text-xs hover:underline"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-custom mx-auto py-16 text-center text-sm">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
