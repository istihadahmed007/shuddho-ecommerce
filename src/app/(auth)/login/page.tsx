'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { commerceStore } from '@/lib/commerce-store';

export default function LoginPage() {
  const router = useRouter();
  const { switchUserRole } = useCart();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('tanvir.ahmed@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isAdmin = email.toLowerCase().includes('admin');
    const role = isAdmin ? 'ADMIN' : 'CUSTOMER';
    
    commerceStore.setUser({
      id: isAdmin ? 'usr-admin-01' : 'usr-customer-01',
      name: isAdmin ? 'Shuddho Admin (শুদ্ধ)' : 'Tanvir Ahmed',
      email,
      phone: '01712345678',
      role,
    });
    switchUserRole(role);

    if (isAdmin) {
      router.push('/admin');
    } else {
      router.push('/account');
    }
  };

  const handleQuickCustomer = () => {
    commerceStore.setUser({
      id: 'usr-customer-01',
      name: 'Tanvir Ahmed',
      email: 'tanvir.ahmed@example.com',
      phone: '01712345678',
      role: 'CUSTOMER',
    });
    switchUserRole('CUSTOMER');
    router.push('/account');
  };

  const handleQuickAdmin = () => {
    commerceStore.setUser({
      id: 'usr-admin-01',
      name: 'Shuddho Flagship Admin',
      email: 'admin@shuddho.com.bd',
      phone: '01812345678',
      role: 'ADMIN',
    });
    switchUserRole('ADMIN');
    router.push('/admin');
  };

  return (
    <div className="p-8 sm:p-10 space-y-6">
      <div className="text-center space-y-1">
        <div className="w-10 h-10 rounded-xl bg-[#163A29] flex items-center justify-center text-white font-serif font-bold text-lg mx-auto mb-3">
          শু
        </div>
        <h1 className="text-2xl font-bold text-[#18221B] font-serif">Welcome Back</h1>
        <p className="text-xs text-[#5F6D63]">Sign in to your SHUDDHO account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block" htmlFor="password">
              Password
            </label>
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-[#163A29] hover:bg-[#0F291D] text-white font-semibold text-xs transition-colors shadow-sm"
        >
          Sign In
        </button>
      </form>

      {/* Quick Test Login Helpers */}
      <div className="pt-4 border-t border-[#E8E2D8] space-y-2">
        <p className="text-[11px] font-semibold text-center uppercase tracking-wider text-[#C5922E]">
          1-Click Instant Testing
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleQuickCustomer}
            className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] hover:bg-stone-100 text-[11px] font-bold text-[#18221B] text-center"
          >
            Log in as Customer
          </button>
          <button
            type="button"
            onClick={handleQuickAdmin}
            className="p-2 rounded-xl bg-[#163A29] hover:bg-[#0F291D] text-[11px] font-bold text-white text-center"
          >
            Log in as Admin
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-[#5F6D63]">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[#163A29] font-bold hover:underline">
          Create one here
        </Link>
      </div>
    </div>
  );
}
