'use client';

import { Save, Upload } from 'lucide-react';
import Image from 'next/image';

export default function SellerSettingsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Store Information</h2>
          <p className="text-sm text-gray-500">Update your store's public profile and details.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors relative overflow-hidden group cursor-pointer">
                  <Image 
                    src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200&auto=format&fit=crop" 
                    alt="Logo" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-6 h-6 text-white mb-1" />
                    <span className="text-xs font-medium text-white">Change</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center">Recommended: 400x400px<br/>Max size: 2MB</p>
              </div>
            </div>
            
            <div className="sm:w-2/3 space-y-4">
              <div>
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                <input 
                  type="text" 
                  id="storeName" 
                  defaultValue="TechVault Electronics"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  defaultValue="Dhaka, Bangladesh"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
                <textarea 
                  id="description" 
                  rows={4}
                  defaultValue="Premium electronics and accessories store offering the best gadgets at competitive prices."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Business Information</h2>
          <p className="text-sm text-gray-500">Private details for billing and administrative purposes.</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Legal Business Name</label>
            <input 
              type="text" 
              id="businessName" 
              defaultValue="TechVault Ltd."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">Tax ID / TIN</label>
            <input 
              type="text" 
              id="taxId" 
              defaultValue="123-456-789"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
            <input 
              type="email" 
              id="email" 
              defaultValue="contact@techvault.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Business Phone</label>
            <input 
              type="tel" 
              id="phone" 
              defaultValue="+880 1712-345678"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Shipping Settings</h2>
          <p className="text-sm text-gray-500">Configure your default shipping rates.</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="shippingFee" className="block text-sm font-medium text-gray-700 mb-1">Default Shipping Fee (৳)</label>
            <input 
              type="number" 
              id="shippingFee" 
              defaultValue="60"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="freeShipping" className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold (৳)</label>
            <input 
              type="number" 
              id="freeShipping" 
              defaultValue="5000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
