'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Save, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { commerceStore } from '@/lib/commerce-store';

export default function ProfilePage() {
  const { currentUser, switchUserRole } = useCart();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...currentUser,
      name,
      email,
      phone,
    };
    commerceStore.setUser(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5922E]">
          Account Credentials
        </span>
        <h1 className="text-2xl font-bold text-[#18221B] font-serif">
          Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#5F6D63] mt-0.5">
          Manage your contact information and SMS delivery update preferences
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-[#E8E2D8]">
          <div className="w-16 h-16 rounded-full overflow-hidden relative bg-[#163A29] flex items-center justify-center text-white font-bold text-xl shrink-0">
            {currentUser.avatar ? (
              <Image src={currentUser.avatar} alt={currentUser.name} fill className="object-cover" />
            ) : (
              <span>{name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h2 className="text-base font-bold text-[#18221B]">{name}</h2>
            <p className="text-xs text-[#5F6D63]">Role: {currentUser.role} • Verified Buyer</p>
          </div>
        </div>

        {isSaved && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 size={16} />
            <span>Profile information updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-stone-800 uppercase block">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-stone-800 uppercase block">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-stone-800 uppercase block">Mobile Number (BD)</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-stone-800 uppercase block">Preferred Division</label>
              <input
                type="text"
                defaultValue="Dhaka"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#163A29] hover:bg-[#0F291D] text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
