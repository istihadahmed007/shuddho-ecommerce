'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Package,
  Grid3X3,
  ShoppingCart,
  Ticket,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navigation = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Products & Stock', href: '/admin/products', icon: Package },
  { name: 'Customer Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Categories', href: '/admin/categories', icon: Grid3X3 },
  { name: 'Coupons & Promos', href: '/admin/coupons', icon: Ticket },
  { name: 'Registered Users', href: '/admin/users', icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { currentUser, switchUserRole } = useCart();

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col md:flex-row">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#14291E] text-white transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:static'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#234A35]">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5922E] flex items-center justify-center text-[#14291E] font-serif font-bold text-sm">
              শু
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base tracking-tight text-white">SHUDDHO</span>
              <span className="text-[9px] uppercase tracking-wider text-[#C5922E]">Admin Console</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-stone-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#1D3D2C] text-[#C5922E]'
                    : 'text-[#D8D0C3] hover:bg-[#1D3D2C]/60 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Storefront Link */}
        <div className="p-4 border-t border-[#234A35] space-y-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
          >
            <ExternalLink size={14} />
            <span>View Live Store</span>
          </Link>
          <button
            onClick={() => switchUserRole('CUSTOMER')}
            className="w-full py-2 text-[11px] text-[#C5922E] hover:underline text-center font-medium"
          >
            Switch to Customer Mode
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Mobile Bar */}
        <div className="md:hidden bg-white border-b border-[#E8E2D8] p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 text-stone-700 hover:text-[#163A29]"
          >
            <Menu size={24} />
          </button>
          <span className="font-serif font-bold text-sm text-[#163A29]">SHUDDHO Admin</span>
          <Link href="/" className="text-xs text-[#163A29] font-semibold">Live Store</Link>
        </div>

        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
