'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { categories, products } from '@/lib/data';

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5922E]">
            Product Taxonomies
          </span>
          <h1 className="text-2xl font-bold text-[#18221B] font-serif">
            Categories ({categories.length})
          </h1>
          <p className="text-xs text-[#5F6D63] mt-0.5">
            Organized Bangladeshi consumer product classifications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const actualCount = products.filter((p) => p.categoryId === category.id).length;

          return (
            <div
              key={category.id}
              className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm overflow-hidden group flex flex-col justify-between"
            >
              <div className="h-44 relative bg-[#FAF7F2]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute top-3 left-3 bg-[#163A29] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                  {actualCount} Active SKUs
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-[#18221B]">{category.name}</h3>
                <p className="text-xs text-[#5F6D63] line-clamp-2">
                  {category.description}
                </p>
                <div className="pt-2 text-[11px] font-mono text-stone-400">
                  Slug: /{category.slug}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
