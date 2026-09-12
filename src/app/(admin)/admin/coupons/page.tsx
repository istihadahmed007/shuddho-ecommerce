'use client';

import React, { useState, useEffect } from 'react';
import { Plus, PowerOff, Check, X, Ticket } from 'lucide-react';
import { commerceStore } from '@/lib/commerce-store';
import { formatPrice } from '@/lib/utils';
import type { Coupon } from '@/types';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED' | 'FREE_SHIPPING',
    value: 10,
    minOrderValue: 1000,
    description: '',
  });

  useEffect(() => {
    setCoupons(commerceStore.getCoupons());
    const sync = () => setCoupons(commerceStore.getCoupons());
    window.addEventListener('shuddho_store_sync', sync);
    return () => window.removeEventListener('shuddho_store_sync', sync);
  }, []);

  const handleToggleActive = (id: string) => {
    commerceStore.toggleCouponActive(id);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;

    const created: Coupon = {
      id: `cp-${Date.now()}`,
      code: newCoupon.code.trim().toUpperCase(),
      type: newCoupon.type,
      value: Number(newCoupon.value),
      minOrderValue: Number(newCoupon.minOrderValue),
      description: newCoupon.description || 'Promotional coupon code',
      expiresAt: '2026-12-31T23:59:59Z',
      usageLimit: 1000,
      usedCount: 0,
      isActive: true,
    };

    commerceStore.addCoupon(created);
    setIsCreateOpen(false);
    setNewCoupon({ code: '', type: 'PERCENTAGE', value: 10, minOrderValue: 1000, description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5922E]">
            Promotions & Campaigns
          </span>
          <h1 className="text-2xl font-bold text-[#18221B] font-serif">
            Coupons & Vouchers
          </h1>
          <p className="text-xs text-[#5F6D63] mt-0.5">
            Active server-side validated promotional codes for the checkout engine
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#163A29] text-white text-xs font-semibold hover:bg-[#0F291D] transition-colors self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create New Coupon</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#FAF7F2] text-stone-600 border-b border-[#E8E2D8]">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Coupon Code</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Benefit</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Min. Order</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Total Uses</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-right">Toggle Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D8]">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-xs bg-[#FAF7F2] border border-[#E8E2D8] px-2.5 py-1 rounded-lg text-[#163A29]">
                      {c.code}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-stone-600 font-medium">
                    {c.type}
                  </td>

                  <td className="px-6 py-4 font-bold text-[#163A29]">
                    {c.type === 'PERCENTAGE'
                      ? `${c.value}% OFF`
                      : c.type === 'FREE_SHIPPING'
                      ? 'Free Delivery'
                      : formatPrice(c.value)}
                  </td>

                  <td className="px-6 py-4 text-stone-700">
                    {formatPrice(c.minOrderValue)}
                  </td>

                  <td className="px-6 py-4 text-stone-500">
                    {c.usedCount} used
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {c.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleToggleActive(c.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        c.isActive
                          ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {c.isActive ? 'Disable' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E8E2D8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <h3 className="text-lg font-bold text-[#18221B] font-serif">
                Create Promotion Coupon
              </h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-800 uppercase block mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EIDSPECIAL"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl uppercase font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Discount Type
                  </label>
                  <select
                    value={newCoupon.type}
                    onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed Amount (BDT)</option>
                    <option value="FREE_SHIPPING">Free Shipping</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Value {newCoupon.type === 'PERCENTAGE' ? '(%)' : '(BDT)'}
                  </label>
                  <input
                    type="number"
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 uppercase block mb-1">
                  Minimum Order Amount (BDT)
                </label>
                <input
                  type="number"
                  value={newCoupon.minOrderValue}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minOrderValue: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-stone-800 uppercase block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10% off for festival shopping"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E2D8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8E2D8] font-semibold text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#163A29] text-white font-semibold hover:bg-[#0F291D]"
                >
                  Add Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
