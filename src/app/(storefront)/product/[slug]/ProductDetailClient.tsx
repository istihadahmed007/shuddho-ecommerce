'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight, Star, Heart, ShoppingBag, Minus, Plus,
  ShieldCheck, Truck, RotateCcw, Check, Sparkles, MapPin,
  Clock, Award, Droplets, Info
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Product, Review } from '@/types';
import { useCart } from '@/context/CartContext';
import { getProductReviews } from '@/lib/data';
import { Product3DViewer } from '@/components/product/Product3DViewer';
import { ProductTiltCard } from '@/components/home/ProductTiltCard';

export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, getAvailableStock } = useCart();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.length > 0 ? product.variants[0] : null
  );

  const isFavorited = isInWishlist(product.id);
  const liveStock = getAvailableStock(product.id);
  const isOutOfStock = liveStock <= 0;
  const reviews = getProductReviews(product.id);

  // Price adjustment if variant has separate price
  const currentPrice = selectedVariant?.price || product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const variants = selectedVariant
      ? [{ type: selectedVariant.type, value: selectedVariant.value }]
      : [];
    addToCart(product, quantity, variants);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    const variants = selectedVariant
      ? [{ type: selectedVariant.type, value: selectedVariant.value }]
      : [];
    addToCart(product, quantity, variants);
    router.push('/checkout');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20 pt-4">
      {/* Breadcrumb */}
      <div className="container-custom mx-auto mb-6">
        <div className="flex items-center gap-2 text-xs text-[#5F6D63] overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#163A29]">Home</Link>
          <ChevronRight size={13} />
          <Link href="/shop" className="hover:text-[#163A29]">Shop</Link>
          <ChevronRight size={13} />
          <Link href={`/shop?category=${product.category.slug}`} className="hover:text-[#163A29]">
            {product.category.name}
          </Link>
          <ChevronRight size={13} />
          <span className="text-[#18221B] font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="container-custom mx-auto space-y-12">
        {/* Main Product Stage (Gallery + Info) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D8] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Column: Gallery & 3D Viewer (Col 6) */}
            <div className="lg:col-span-6 space-y-4">
              <Product3DViewer
                product={product}
                selectedImageIndex={selectedImageIndex}
              />

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-18 h-18 rounded-2xl overflow-hidden border-2 bg-[#FAF7F2] shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#163A29] shadow-xs scale-102'
                          : 'border-[#E8E2D8] hover:border-stone-400'
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Actions & Buying Info (Col 6) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C5922E]">
                    {product.brand.name} • {product.category.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-stone-900">{product.rating}</span>
                    <span className="text-stone-400">({product.reviewCount} verified reviews)</span>
                  </div>
                </div>

                {/* Product Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-[#18221B] font-serif leading-tight">
                  {product.name}
                </h1>

                {/* Short Description */}
                {product.shortDescription && (
                  <p className="text-sm text-[#5F6D63] leading-relaxed">
                    {product.shortDescription}
                  </p>
                )}

                {/* Pricing & Stock Status */}
                <div className="pt-2 pb-3 border-y border-[#E8E2D8] flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-[#163A29]">
                        {formatPrice(currentPrice)}
                      </span>
                      {product.originalPrice > currentPrice && (
                        <>
                          <span className="text-sm text-stone-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#A44222] text-white">
                            -{product.discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5F6D63] mt-0.5">
                      Inclusive of all applicable government VAT
                    </p>
                  </div>

                  <div className="text-right">
                    {isOutOfStock ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                        Out of Stock
                      </span>
                    ) : liveStock <= 5 ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                        Only {liveStock} Left in Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                        In Stock ({liveStock} available)
                      </span>
                    )}
                  </div>
                </div>

                {/* Size / Variant Options */}
                {product.variants.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#18221B]">
                      Select Packaging Size / Volume
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-4 py-2 rounded-2xl text-xs font-medium border transition-all ${
                            selectedVariant?.id === v.id
                              ? 'bg-[#163A29] text-white border-[#163A29] shadow-xs'
                              : 'bg-[#FAF7F2] text-stone-700 border-[#E8E2D8] hover:border-[#163A29]'
                          }`}
                        >
                          {v.value} {v.price ? `• ${formatPrice(v.price)}` : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#18221B]">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1 || isOutOfStock}
                        className="p-1.5 rounded-xl hover:bg-white text-stone-600 disabled:opacity-40"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="w-12 text-center text-sm font-bold text-[#18221B]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(liveStock, quantity + 1))}
                        disabled={quantity >= liveStock || isOutOfStock}
                        className="p-1.5 rounded-xl hover:bg-white text-stone-600 disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <span className="text-xs text-[#5F6D63]">
                      Max {liveStock} units per order
                    </span>
                  </div>
                </div>

                {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-[#163A29] hover:bg-[#0F291D] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
                  >
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={isOutOfStock}
                    className="py-3.5 px-8 rounded-2xl bg-[#C5922E] hover:bg-[#AF7E21] text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Toggle Wishlist"
                    className={`p-3.5 rounded-2xl border transition-colors flex items-center justify-center shrink-0 ${
                      isFavorited
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-[#E8E2D8] hover:bg-[#FAF7F2] text-stone-600'
                    }`}
                  >
                    <Heart size={20} className={isFavorited ? 'fill-current' : ''} />
                  </button>
                </div>
              </div>

              {/* Trust Features Grid */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-[#E8E2D8] text-xs text-[#5F6D63]">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={18} className="text-[#163A29] shrink-0" />
                  <span>BSTI & Lab Verified Pure</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck size={18} className="text-[#163A29] shrink-0" />
                  <span>Doorstep Delivery (64 Districts)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw size={18} className="text-[#163A29] shrink-0" />
                  <span>7-Day Return Guarantee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles size={18} className="text-[#C5922E] shrink-0" />
                  <span>Cash on Delivery / bKash / Nagad</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D8] shadow-sm">
          {/* Tab Navigation */}
          <div className="flex items-center gap-6 border-b border-[#E8E2D8] pb-3 text-sm">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-2 font-bold transition-all border-b-2 -mb-3.5 ${
                activeTab === 'details'
                  ? 'border-[#163A29] text-[#163A29]'
                  : 'border-transparent text-[#5F6D63] hover:text-[#18221B]'
              }`}
            >
              Product & Botanical Details
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 font-bold transition-all border-b-2 -mb-3.5 ${
                activeTab === 'specs'
                  ? 'border-[#163A29] text-[#163A29]'
                  : 'border-transparent text-[#5F6D63] hover:text-[#18221B]'
              }`}
            >
              Specifications & Origin
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 font-bold transition-all border-b-2 -mb-3.5 flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'border-[#163A29] text-[#163A29]'
                  : 'border-transparent text-[#5F6D63] hover:text-[#18221B]'
              }`}
            >
              <span>Customer Reviews</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF7F2] font-semibold text-[#163A29]">
                {reviews.length}
              </span>
            </button>
          </div>

          {/* Tab 1: Product Story & Food/Care Specifics */}
          {activeTab === 'details' && (
            <div className="pt-8 space-y-8 text-sm">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#18221B] font-serif">
                  Product Overview
                </h3>
                <p className="text-[#5F6D63] leading-relaxed max-w-4xl">
                  {product.description}
                </p>
              </div>

              {/* Food-Specific Information */}
              {product.foodDetails && (
                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#163A29] flex items-center gap-2">
                    <Info size={16} className="text-[#C5922E]" />
                    Pantry & Dietary Facts
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="font-bold text-stone-900">Net Weight / Volume</p>
                      <p className="text-[#5F6D63]">{product.foodDetails.netWeight}</p>
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">Origin / Agro-Basin</p>
                      <p className="text-[#5F6D63]">{product.foodDetails.origin}</p>
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">Shelf Life</p>
                      <p className="text-[#5F6D63]">{product.foodDetails.shelfLife}</p>
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">Storage Instructions</p>
                      <p className="text-[#5F6D63]">{product.foodDetails.storage}</p>
                    </div>
                    {product.foodDetails.allergenInfo && (
                      <div>
                        <p className="font-bold text-stone-900">Allergen Advice</p>
                        <p className="text-[#A44222] font-medium">{product.foodDetails.allergenInfo}</p>
                      </div>
                    )}
                  </div>

                  {/* Nutrition Breakdown if available */}
                  {product.foodDetails.nutrition && (
                    <div className="pt-4 border-t border-[#E8E2D8]">
                      <p className="font-bold text-xs text-stone-900 mb-2">Nutritional Values (Per 100g/ml)</p>
                      <div className="flex flex-wrap gap-3">
                        {Object.entries(product.foodDetails.nutrition).map(([key, val]) => (
                          <div key={key} className="px-3 py-1.5 rounded-xl bg-white border border-[#E8E2D8] text-xs">
                            <span className="font-semibold text-stone-900">{key}:</span>{' '}
                            <span className="text-[#5F6D63]">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Hair/Personal Care Specific Information */}
              {product.careDetails && (
                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#163A29] flex items-center gap-2">
                    <Droplets size={16} className="text-[#1E6B40]" />
                    Botanical Care Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <div>
                      <p className="font-bold text-stone-900 mb-1">Key Botanical Actives</p>
                      <ul className="space-y-1 text-[#5F6D63]">
                        {product.careDetails.keyBotanicals.map((bot, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#163A29]" />
                            <span>{bot}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 mb-1">Directions for Use</p>
                      <ol className="space-y-1.5 text-[#5F6D63] list-decimal list-inside">
                        {product.careDetails.usageInstructions.map((inst, i) => (
                          <li key={i}>{inst}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Specifications */}
          {activeTab === 'specs' && (
            <div className="pt-8">
              <div className="max-w-2xl border border-[#E8E2D8] rounded-2xl overflow-hidden divide-y divide-[#E8E2D8]">
                <div className="grid grid-cols-2 p-3.5 bg-[#FAF7F2] text-xs font-semibold">
                  <span>SKU Identifier</span>
                  <span className="text-[#163A29] font-mono">{product.sku}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 bg-white text-xs">
                  <span className="font-semibold text-stone-900">Brand / Line</span>
                  <span className="text-[#5F6D63]">{product.brand.name}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 bg-[#FAF7F2] text-xs">
                  <span className="font-semibold text-stone-900">Primary Category</span>
                  <span className="text-[#5F6D63]">{product.category.name}</span>
                </div>
                {product.specifications.map((spec) => (
                  <div key={spec.id} className="grid grid-cols-2 p-3.5 bg-white text-xs">
                    <span className="font-semibold text-stone-900">{spec.name}</span>
                    <span className="text-[#5F6D63]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Customer Reviews */}
          {activeTab === 'reviews' && (
            <div className="pt-8 space-y-6">
              {reviews.length === 0 ? (
                <div className="text-center py-8 text-stone-500 text-xs">
                  No verified purchase reviews yet for this batch.
                </div>
              ) : (
                <div className="space-y-4 max-w-3xl">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden relative bg-stone-300">
                            {rev.userAvatar ? (
                              <Image src={rev.userAvatar} alt={rev.userName} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-xs text-white bg-[#163A29]">
                                {rev.userName.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#18221B]">{rev.userName}</p>
                            {rev.isVerifiedPurchase && (
                              <span className="text-[10px] text-[#1E6B40] font-semibold flex items-center gap-1">
                                <Check size={11} /> Verified Buyer • Order #{rev.orderId}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <span key={i} className="text-xs">★</span>
                          ))}
                        </div>
                      </div>

                      {rev.title && (
                        <h4 className="text-xs font-bold text-[#18221B]">{rev.title}</h4>
                      )}
                      <p className="text-xs text-[#5F6D63] leading-relaxed">{rev.comment}</p>

                      {rev.sellerReply && (
                        <div className="mt-3 pl-3 border-l-2 border-[#C5922E] text-xs bg-white p-2.5 rounded-lg">
                          <p className="font-bold text-[#163A29] text-[11px]">SHUDDHO Care Desk Response:</p>
                          <p className="text-[#5F6D63] mt-0.5">{rev.sellerReply.message}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#18221B] font-serif">
                  Complementary Pure Essentials
                </h3>
                <p className="text-xs sm:text-sm text-[#5F6D63] mt-0.5">
                  Frequently enjoyed together from the {product.category.name} collection
                </p>
              </div>
              <Link
                href={`/shop?category=${product.category.slug}`}
                className="text-xs sm:text-sm font-semibold text-[#163A29] hover:underline"
              >
                Browse category →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductTiltCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
