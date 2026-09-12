'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { searchProducts, categories } from '@/lib/data';
import { ProductTiltCard } from '@/components/home/ProductTiltCard';
import type { Product } from '@/types';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (initialQuery.trim()) {
      let res = searchProducts(initialQuery);
      if (selectedCategory) {
        res = res.filter((p) => p.category.slug === selectedCategory);
      }
      setResults(res);
    } else {
      setResults([]);
    }
  }, [initialQuery, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="container-custom mx-auto space-y-8">
        {/* Search Header Form */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5922E]">
            Consumer Products Search
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#18221B] font-serif">
            Search SHUDDHO Essentials
          </h1>

          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              className="w-full pl-11 pr-24 py-3.5 text-sm bg-white border border-[#E8E2D8] rounded-full focus:outline-none focus:ring-2 focus:ring-[#163A29]/20 focus:border-[#163A29] shadow-sm"
              placeholder="Search mustard oil, Sundarbans honey, kasundi, hair oil..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#163A29] text-white text-xs font-semibold rounded-full hover:bg-[#0F291D] transition-colors"
            >
              Search
            </button>
          </form>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                !selectedCategory
                  ? 'bg-[#163A29] text-white border-[#163A29]'
                  : 'bg-white text-stone-600 border-[#E8E2D8] hover:bg-stone-50'
              }`}
            >
              All
            </button>
            {categories.slice(0, 6).map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(selectedCategory === c.slug ? '' : c.slug)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  selectedCategory === c.slug
                    ? 'bg-[#163A29] text-white border-[#163A29]'
                    : 'bg-white text-stone-600 border-[#E8E2D8] hover:bg-stone-50'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs sm:text-sm text-[#5F6D63]">
              {initialQuery ? (
                <>
                  Found <strong className="text-[#18221B]">{results.length}</strong> matching results for &ldquo;{initialQuery}&rdquo;
                </>
              ) : (
                'Enter keywords above to discover pure consumer goods'
              )}
            </p>
          </div>

          {results.length === 0 && initialQuery ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D8] space-y-4">
              <p className="text-base font-bold text-[#18221B]">No products found matching &ldquo;{initialQuery}&rdquo;</p>
              <p className="text-xs text-[#5F6D63] max-w-sm mx-auto">
                Check for spelling mistakes, or browse through our categories like Food & Pantry, Kasundi, or Hair Oil.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#163A29] text-white text-xs font-semibold"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((product) => (
                <ProductTiltCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-custom mx-auto py-20 text-center text-sm">Searching...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
