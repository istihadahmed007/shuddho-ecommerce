'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Heart, Star, MapPin, User, Shield, LayoutDashboard, LogOut, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/account', icon: LayoutDashboard },
    { name: 'My Orders', href: '/account/orders', icon: Package },
    { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
    { name: 'My Reviews', href: '/account/reviews', icon: Star },
    { name: 'Addresses', href: '/account/addresses', icon: MapPin },
    { name: 'Profile Settings', href: '/account/profile', icon: User },
    { name: 'Security', href: '/account/security', icon: Shield },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-medium">My Account</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                    JD
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Jane Doe</h2>
                    <p className="text-xs text-gray-500">jane.doe@example.com</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-3">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <li key={item.name}>
                        <Link 
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActive 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <Icon size={18} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors">
                    <LogOut size={18} className="text-red-500" />
                    Sign Out
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
