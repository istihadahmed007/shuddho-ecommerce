'use client';

import { useState } from 'react';
import { Search, Filter, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const sampleOrders = [
  { id: 'ORD-8932', customer: 'Sarah Jenkins', items: 3, total: 1299.00, status: 'Pending', date: 'Sep 09, 2026, 10:24 AM' },
  { id: 'ORD-8931', customer: 'Michael Chen', items: 1, total: 348.00, status: 'Processing', date: 'Sep 09, 2026, 09:12 AM' },
  { id: 'ORD-8930', customer: 'Emma Watson', items: 2, total: 1199.99, status: 'Shipped', date: 'Sep 08, 2026, 04:45 PM' },
  { id: 'ORD-8929', customer: 'David Smith', items: 1, total: 99.99, status: 'Shipped', date: 'Sep 08, 2026, 02:30 PM' },
  { id: 'ORD-8928', customer: 'Lisa Wong', items: 4, total: 1099.00, status: 'Delivered', date: 'Sep 07, 2026, 11:20 AM' },
  { id: 'ORD-8927', customer: 'James Wilson', items: 1, total: 54.50, status: 'Delivered', date: 'Sep 07, 2026, 09:15 AM' },
  { id: 'ORD-8926', customer: 'Amanda Clark', items: 2, total: 299.00, status: 'Cancelled', date: 'Sep 06, 2026, 03:50 PM' },
  { id: 'ORD-8925', customer: 'Robert Taylor', items: 1, total: 149.99, status: 'Delivered', date: 'Sep 06, 2026, 01:10 PM' },
];

const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function SellerOrdersPage() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex px-4 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === tab 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sampleOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.items} items</td>
                  <td className="px-6 py-4 font-medium text-gray-900">৳{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <select 
                      className={cn(
                        "text-xs font-medium rounded-full px-2.5 py-1 border-0 focus:ring-2 cursor-pointer outline-none appearance-none pr-8 bg-no-repeat",
                        order.status === 'Pending' && "bg-gray-100 text-gray-800 focus:ring-gray-500",
                        order.status === 'Processing' && "bg-amber-100 text-amber-800 focus:ring-amber-500",
                        order.status === 'Shipped' && "bg-blue-100 text-blue-800 focus:ring-blue-500",
                        order.status === 'Delivered' && "bg-green-100 text-green-800 focus:ring-green-500",
                        order.status === 'Cancelled' && "bg-red-100 text-red-800 focus:ring-red-500"
                      )}
                      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.25rem center', backgroundSize: '1.25em 1.25em' }}
                      defaultValue={order.status}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-medium transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-white text-sm">
          <div className="text-gray-500">
            Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">8</span> of <span className="font-medium text-gray-900">234</span> orders
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
