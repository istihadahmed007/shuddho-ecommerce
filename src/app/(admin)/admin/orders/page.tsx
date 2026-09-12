'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Eye, Check, X, Truck, Clock, ShieldCheck,
  ChevronRight, ExternalLink
} from 'lucide-react';
import { commerceStore } from '@/lib/commerce-store';
import { formatPrice, formatDate } from '@/lib/utils';
import type { Order, OrderStatus } from '@/types';

const tabs: OrderStatus[] = [
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(commerceStore.getOrders());
    const sync = () => setOrders(commerceStore.getOrders());
    window.addEventListener('shuddho_store_sync', sync);
    return () => window.removeEventListener('shuddho_store_sync', sync);
  }, []);

  const filteredOrders = orders.filter((o) => {
    const matchesTab = activeTab === 'ALL' || o.status === activeTab;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.phone.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const handleUpdateStatus = (orderNumber: string, newStatus: OrderStatus, paymentStatus?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED') => {
    commerceStore.updateOrderStatus(orderNumber, newStatus, paymentStatus);
    if (selectedOrder && selectedOrder.orderNumber === orderNumber) {
      setSelectedOrder(commerceStore.getOrderById(orderNumber) || null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5922E]">
            Fulfillment Desk
          </span>
          <h1 className="text-2xl font-bold text-[#18221B] font-serif">
            Customer Orders
          </h1>
          <p className="text-xs text-[#5F6D63] mt-0.5">
            Process consignments, update courier stages, and audit payments
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search order ID, recipient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E2D8]">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 ${
            activeTab === 'ALL'
              ? 'bg-[#163A29] text-white'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-[#E8E2D8]'
          }`}
        >
          All Orders ({orders.length})
        </button>
        {tabs.map((tab) => {
          const count = orders.filter((o) => o.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                activeTab === tab
                  ? 'bg-[#163A29] text-white'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-[#E8E2D8]'
              }`}
            >
              {tab} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="text-sm font-bold text-stone-800">No orders match your filter</p>
            <p className="text-xs text-stone-500">Try selecting a different status tab or clearing search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#FAF7F2] text-stone-600 border-b border-[#E8E2D8]">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Customer & Phone</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Bill Total</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D8]">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-[#163A29]">
                      {ord.orderNumber}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-bold text-stone-900">{ord.shippingAddress.fullName}</p>
                      <p className="text-[11px] text-stone-500">{ord.shippingAddress.phone} • {ord.shippingAddress.division}</p>
                    </td>

                    <td className="px-6 py-4 text-stone-600">
                      {ord.items.length} items
                    </td>

                    <td className="px-6 py-4 font-bold text-[#18221B]">
                      {formatPrice(ord.total)}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-stone-800">{ord.paymentMethod}</p>
                      <span className={`text-[10px] font-bold ${
                        ord.paymentStatus === 'PAID' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {ord.paymentStatus}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord.orderNumber, e.target.value as OrderStatus)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border border-current bg-transparent focus:outline-none ${
                          ord.status === 'DELIVERED'
                            ? 'text-emerald-800 bg-emerald-50'
                            : ord.status === 'CANCELLED'
                            ? 'text-rose-800 bg-rose-50'
                            : 'text-amber-800 bg-amber-50'
                        }`}
                      >
                        {tabs.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#163A29] hover:underline"
                      >
                        <Eye size={13} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inspect Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E8E2D8] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5922E]">Consignment Details</span>
                <h3 className="text-xl font-bold font-mono text-[#18221B]">{selectedOrder.orderNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Status Modifiers */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-3 text-xs">
              <p className="font-bold text-stone-900">Update Shipment Stage:</p>
              <div className="flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleUpdateStatus(selectedOrder.orderNumber, t)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                      selectedOrder.status === t
                        ? 'bg-[#163A29] text-white'
                        : 'bg-white border border-[#E8E2D8] text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    Mark {t}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[#E8E2D8] flex items-center justify-between">
                <span className="font-semibold text-stone-700">Payment Status:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.orderNumber, selectedOrder.status, 'PAID')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold ${
                      selectedOrder.paymentStatus === 'PAID'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    Mark PAID
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.orderNumber, selectedOrder.status, 'REFUNDED')}
                    className="px-3 py-1 rounded-lg text-[11px] font-bold bg-stone-100 text-stone-700"
                  >
                    Mark REFUNDED
                  </button>
                </div>
              </div>
            </div>

            {/* Consignment Items */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800">Items</h4>
              <div className="divide-y divide-[#E8E2D8]">
                {selectedOrder.items.map((it) => (
                  <div key={it.id} className="py-2.5 flex justify-between text-xs">
                    <div>
                      <p className="font-bold text-stone-900">{it.product.name}</p>
                      <p className="text-stone-500">Qty: {it.quantity}</p>
                    </div>
                    <span className="font-bold text-[#163A29]">{formatPrice(it.totalPrice)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient Address */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D8] text-xs space-y-1">
              <p className="font-bold text-stone-900">Destination Address</p>
              <p className="text-[#5F6D63]">
                {selectedOrder.shippingAddress.fullName} ({selectedOrder.shippingAddress.phone})<br />
                {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.area}<br />
                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.division}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#E8E2D8]">
              <Link
                href={`/track-order?orderId=${encodeURIComponent(selectedOrder.orderNumber)}`}
                target="_blank"
                className="px-4 py-2 rounded-xl bg-[#163A29] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Live Customer Tracking View</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
