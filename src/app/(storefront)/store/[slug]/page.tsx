'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Calendar, MessageSquare, ShieldCheck, Grid, Info } from 'lucide-react';
import { products } from '@/lib/data';

// Mock data for the seller
const sellerInfo = {
  id: 'seller-1',
  name: 'TechHaven Official',
  slug: 'techhaven',
  logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
  banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=300&fit=crop',
  description: 'Premium electronics and accessories for the modern professional. We specialize in high-quality gadgets that enhance your productivity and lifestyle.',
  rating: 4.8,
  reviews: 1245,
  followers: '12.5k',
  joinedDate: 'March 2021',
  location: 'San Francisco, CA',
  responseRate: '98%',
  responseTime: 'under 2 hours',
  isVerified: true,
};

const getProductsBySeller = (sellerId: string) => {
  return products.filter(p => p.sellerId === sellerId);
};

export default function StorePage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState<'products' | 'about' | 'reviews'>('products');
  const storeProducts = getProductsBySeller(sellerInfo.id) || products.slice(0, 8); // Fallback to some products if none match

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-12">
      {/* Store Banner */}
      <div className="relative w-full h-48 md:h-64 lg:h-80 bg-gray-200">
        <Image
          src={sellerInfo.banner}
          alt={`${sellerInfo.name} banner`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Store Header Info */}
        <div className="relative -mt-16 sm:-mt-24 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <div className="relative h-32 w-32 rounded-xl overflow-hidden border-4 border-white shadow-md flex-shrink-0 bg-white">
              <Image
                src={sellerInfo.logo}
                alt={sellerInfo.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl font-bold text-[#1a1a2e]">{sellerInfo.name}</h1>
                {sellerInfo.isVerified && (
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-medium text-[#1a1a2e]">{sellerInfo.rating}</span>
                  <span>({sellerInfo.reviews} reviews)</span>
                </div>
                <span>•</span>
                <div>{storeProducts.length} Products</div>
                <span>•</span>
                <div>{sellerInfo.followers} Followers</div>
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Follow
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-xl mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'products', label: 'Products', icon: Grid },
              { id: 'about', label: 'About Store', icon: Info },
              { id: 'reviews', label: 'Reviews', icon: MessageSquare },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-600 hover:text-[#1a1a2e] hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">All Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {storeProducts.map((product) => (
                    <Link key={product.id} href={`/product/${product.slug}`} className="group">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative aspect-square">
                          <Image
                            src={product.images[0]?.url || '/placeholder.png'}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-medium text-[#1a1a2e] line-clamp-2 mb-1 group-hover:text-blue-600">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-lg font-bold text-[#1a1a2e]">${product.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="max-w-3xl">
                <h2 className="text-xl font-bold text-[#1a1a2e] mb-4">About {sellerInfo.name}</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {sellerInfo.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-[#1a1a2e]">Location</div>
                      <div className="text-sm text-gray-600">{sellerInfo.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-[#1a1a2e]">Joined</div>
                      <div className="text-sm text-gray-600">{sellerInfo.joinedDate}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-[#1a1a2e]">Response Rate</div>
                      <div className="text-sm text-gray-600">{sellerInfo.responseRate} (Replies {sellerInfo.responseTime})</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-[#1a1a2e]">Verified Seller</div>
                      <div className="text-sm text-gray-600">Identity and business verified</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#1a1a2e] mb-2">Store Reviews</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Detailed store reviews will appear here. Currently, reviews are only available on individual product pages.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
