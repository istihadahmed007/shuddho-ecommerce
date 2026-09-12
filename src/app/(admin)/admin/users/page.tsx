'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Filter, ShieldCheck, UserCheck } from 'lucide-react';
import { commerceStore } from '@/lib/commerce-store';

const initialUsers = [
  { id: 'USR-001', name: 'SHUDDHO Admin', email: 'admin@shuddho.com.bd', role: 'ADMIN', status: 'Active', joined: 'Jan 15, 2026', phone: '01812345678', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100' },
  { id: 'USR-002', name: 'Tanvir Ahmed', email: 'tanvir.ahmed@example.com', role: 'CUSTOMER', status: 'Active', joined: 'Mar 05, 2026', phone: '01712345678', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
  { id: 'USR-003', name: 'Farhana Rahman', email: 'farhana.r@example.com', role: 'CUSTOMER', status: 'Active', joined: 'Apr 12, 2026', phone: '01912345678', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100' },
  { id: 'USR-004', name: 'Dr. Kazi Mahfuzur Rahman', email: 'dr.kazi@example.com', role: 'CUSTOMER', status: 'Active', joined: 'May 20, 2026', phone: '01612345678', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100' },
  { id: 'USR-005', name: 'Sabrina Mostafa', email: 'sabrina.m@example.com', role: 'CUSTOMER', status: 'Active', joined: 'Jun 08, 2026', phone: '01512345678', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100' },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filtered = initialUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5922E]">
            Account Management
          </span>
          <h1 className="text-2xl font-bold text-[#18221B] font-serif">
            Registered Users ({initialUsers.length})
          </h1>
          <p className="text-xs text-[#5F6D63] mt-0.5">
            Verified consumer accounts and administrator credentials
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#E8E2D8] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name, email, or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#163A29]"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="text-xs p-2 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl font-medium focus:outline-none"
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Administrators</option>
          <option value="CUSTOMER">Customers</option>
        </select>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#FAF7F2] text-stone-600 border-b border-[#E8E2D8]">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">User</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Contact Mobile</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D8]">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden relative bg-stone-200 shrink-0">
                        <Image src={u.avatar} alt={u.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">{u.name}</p>
                        <p className="text-[11px] text-stone-500">{u.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-mono text-stone-700">
                    {u.phone}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === 'ADMIN' ? 'bg-[#163A29] text-white' : 'bg-stone-100 text-stone-800'
                    }`}>
                      {u.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-stone-500">
                    {u.joined}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
