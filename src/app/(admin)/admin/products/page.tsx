'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Search, Filter, Plus, Edit2, Trash2, Check,
  AlertTriangle, RefreshCw, X, Eye
} from 'lucide-react';
import { products, categories } from '@/lib/data';
import { commerceStore } from '@/lib/commerce-store';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stockOverrides, setStockOverrides] = useState<Record<string, number>>({});
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form
  const [newProd, setNewProd] = useState({
    name: '',
    price: 350,
    stock: 40,
    categoryId: 'cat-food-grocery',
    shortDescription: '',
  });

  useEffect(() => {
    setStockOverrides(commerceStore.getStockOverrides());
    const sync = () => setStockOverrides(commerceStore.getStockOverrides());
    window.addEventListener('shuddho_store_sync', sync);
    return () => window.removeEventListener('shuddho_store_sync', sync);
  }, []);

  const productList = products.map((p) => ({
    ...p,
    liveStock: stockOverrides[p.id] !== undefined ? stockOverrides[p.id] : p.stock,
  })).filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = !selectedCategory || p.categoryId === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSaveStock = (productId: string) => {
    commerceStore.setProductStock(productId, Math.max(0, tempStockValue));
    setEditingStockId(null);
  };

  const handleQuickAdjust = (productId: string, delta: number) => {
    commerceStore.adjustStock(productId, delta);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name.trim()) return;

    const id = `prod-custom-${Date.now()}`;
    const slug = newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const cat = categories.find((c) => c.id === newProd.categoryId) || categories[0];

    const created: Product = {
      id,
      name: newProd.name,
      slug,
      sku: `SHD-${Date.now().toString().slice(-4)}`,
      price: Number(newProd.price),
      originalPrice: Number(newProd.price),
      discount: 0,
      currency: 'BDT',
      images: [
        {
          id: `img-${Date.now()}`,
          url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop&q=80',
          alt: newProd.name,
          isPrimary: true,
          order: 1,
        },
      ],
      category: cat,
      categoryId: cat.id,
      brand: { id: 'br-pantry', name: 'Shuddho Pantry', slug: 'shuddho-pantry', logo: '', productCount: 1, isFeatured: false },
      brandId: 'br-pantry',
      seller: {
        id: 'sel-shuddho',
        userId: 'u-admin-1',
        storeName: 'SHUDDHO Official',
        storeSlug: 'shuddho-official',
        rating: 4.9,
        reviewCount: 4890,
        productCount: 80,
        followerCount: 24000,
        isVerified: true,
        joinedAt: '2023-01-01',
      },
      sellerId: 'sel-shuddho',
      rating: 5,
      reviewCount: 0,
      soldCount: 0,
      stock: Number(newProd.stock),
      variants: [],
      specifications: [],
      features: [],
      tags: [cat.name],
      isFeatured: true,
      isFlashSale: false,
      shippingFee: 60,
      freeShipping: false,
      estimatedDelivery: '2-3 business days',
      returnPolicy: '7-Day Purity Guarantee',
      description: newProd.shortDescription || 'Freshly processed batch crafted with authentic purity.',
      shortDescription: newProd.shortDescription,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.unshift(created);
    commerceStore.setProductStock(created.id, created.stock);
    setIsAddModalOpen(false);
    setNewProd({ name: '', price: 350, stock: 40, categoryId: 'cat-food-grocery', shortDescription: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5922E]">
            Inventory & Catalog
          </span>
          <h1 className="text-2xl font-bold text-[#18221B] font-serif">
            Product Management
          </h1>
          <p className="text-xs text-[#5F6D63] mt-0.5">
            Manage live warehouse stock, unit prices, and catalog publication
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#163A29] text-white text-xs font-semibold hover:bg-[#0F291D] transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E8E2D8] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs p-2 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl font-medium focus:outline-none focus:border-[#163A29]"
          >
            <option value="">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#FAF7F2] text-stone-600 border-b border-[#E8E2D8]">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Product Info</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Price (BDT)</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Live Warehouse Stock</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D8]">
              {productList.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 relative rounded-xl bg-[#FAF7F2] overflow-hidden shrink-0 border border-[#E8E2D8]">
                        <Image
                          src={product.images[0]?.url || '/placeholder.png'}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[#18221B] max-w-[220px] truncate">
                          {product.name}
                        </p>
                        <p className="text-[10px] font-mono text-stone-400">
                          SKU: {product.sku}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-stone-600">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#FAF7F2] border border-[#E8E2D8]">
                      {product.category.name}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-bold text-[#18221B]">
                    {formatPrice(product.price)}
                  </td>

                  {/* Live Stock cell */}
                  <td className="px-6 py-4">
                    {editingStockId === product.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={tempStockValue}
                          onChange={(e) => setTempStockValue(Number(e.target.value))}
                          className="w-16 px-2 py-1 text-xs border border-[#163A29] rounded-lg font-bold"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveStock(product.id)}
                          className="p-1 rounded bg-[#163A29] text-white"
                        >
                          <Check size={13} />
                        </button>
                        <button
                          onClick={() => setEditingStockId(null)}
                          className="p-1 rounded bg-stone-200 text-stone-700"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold font-mono text-xs ${
                            product.liveStock <= 0
                              ? 'text-rose-600'
                              : product.liveStock <= 15
                              ? 'text-amber-600'
                              : 'text-stone-900'
                          }`}
                        >
                          {product.liveStock} units
                        </span>
                        <button
                          onClick={() => {
                            setEditingStockId(product.id);
                            setTempStockValue(product.liveStock);
                          }}
                          className="text-stone-400 hover:text-stone-700 p-0.5"
                          title="Edit Stock"
                        >
                          <Edit2 size={12} />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        product.liveStock > 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {product.liveStock > 0 ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>

                  {/* Stock Quick buttons */}
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleQuickAdjust(product.id, -5)}
                        disabled={product.liveStock <= 0}
                        className="px-2 py-1 rounded bg-[#FAF7F2] border border-[#E8E2D8] hover:bg-stone-100 text-[11px] font-bold disabled:opacity-40"
                      >
                        -5
                      </button>
                      <button
                        onClick={() => handleQuickAdjust(product.id, 10)}
                        className="px-2 py-1 rounded bg-[#163A29] text-white hover:bg-[#0F291D] text-[11px] font-bold"
                      >
                        +10
                      </button>
                      <button
                        onClick={() => handleQuickAdjust(product.id, 50)}
                        className="px-2 py-1 rounded bg-[#C5922E] text-white hover:bg-[#AF7E21] text-[11px] font-bold"
                      >
                        +50
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E8E2D8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <h3 className="text-lg font-bold text-[#18221B] font-serif">
                Add New Consumer Product
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-800 uppercase block mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shuddho Amla & Neem Hair Tonic"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Price (BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Initial Stock *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 uppercase block mb-1">
                  Category *
                </label>
                <select
                  value={newProd.categoryId}
                  onChange={(e) => setNewProd({ ...newProd, categoryId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-800 uppercase block mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Key features and purity information..."
                  value={newProd.shortDescription}
                  onChange={(e) => setNewProd({ ...newProd, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E2D8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8E2D8] font-semibold text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#163A29] text-white font-semibold hover:bg-[#0F291D]"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
