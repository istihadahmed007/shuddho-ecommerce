'use client';

import type { Order, OrderStatus, Product, Coupon, Address } from '@/types';
import { products, coupons as initialCoupons } from '@/lib/data';
import { generateOrderNumber } from '@/lib/utils';

export interface ActiveUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'CUSTOMER' | 'ADMIN';
  avatar?: string;
}

const DEFAULT_USER: ActiveUser = {
  id: 'usr-customer-01',
  name: 'Tanvir Ahmed',
  email: 'tanvir.ahmed@example.com',
  phone: '01712345678',
  role: 'CUSTOMER',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
};

// Initial realistic verified orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'SHD-20260908-1042',
    orderNumber: 'SHD-20260908-1042',
    userId: 'usr-customer-01',
    status: 'DELIVERED',
    subtotal: 1140,
    shipping: 60,
    tax: 0,
    discount: 114,
    total: 1086,
    couponCode: 'SHUDDHO10',
    paymentMethod: 'bKash',
    paymentStatus: 'PAID',
    trackingNumber: 'REDX-DH-892144',
    courier: 'RedX Express Logistics',
    estimatedDelivery: 'Sep 10, 2026',
    deliveredAt: '2026-09-10T14:30:00Z',
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Tanvir Ahmed',
      phone: '01712345678',
      country: 'Bangladesh',
      division: 'Dhaka',
      city: 'Dhaka',
      area: 'Banani',
      street: 'Road 11, House 42, Apt 4B',
      postalCode: '1213',
      isDefault: true,
      label: 'HOME',
    },
    items: [
      {
        id: 'item-1',
        product: products[0], // Artisan Biulir Dal Bori
        productId: products[0].id,
        quantity: 2,
        price: products[0].price,
        totalPrice: products[0].price * 2,
        selectedVariants: [{ type: 'size', value: '250 g' }],
        status: 'DELIVERED',
      },
      {
        id: 'item-2',
        product: products[1], // Golden Crispy Samosas
        productId: products[1].id,
        quantity: 2,
        price: products[1].price,
        totalPrice: products[1].price * 2,
        selectedVariants: [{ type: 'size', value: '12 pcs' }],
        status: 'DELIVERED',
      },
    ],
    createdAt: '2026-09-08T09:15:00Z',
    updatedAt: '2026-09-10T14:30:00Z',
  },
  {
    id: 'SHD-20260911-8931',
    orderNumber: 'SHD-20260911-8931',
    userId: 'usr-customer-01',
    status: 'PROCESSING',
    subtotal: 960,
    shipping: 60,
    tax: 0,
    discount: 0,
    total: 1020,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'PENDING',
    trackingNumber: 'PATHAO-BD-44219',
    courier: 'Pathao Courier Dhaka',
    estimatedDelivery: 'Sep 14, 2026',
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Tanvir Ahmed',
      phone: '01712345678',
      country: 'Bangladesh',
      division: 'Dhaka',
      city: 'Dhaka',
      area: 'Banani',
      street: 'Road 11, House 42, Apt 4B',
      postalCode: '1213',
      isDefault: true,
      label: 'HOME',
    },
    items: [
      {
        id: 'item-3',
        product: products[3], // Ocean's Bounty Fish Patties
        productId: products[3].id,
        quantity: 2,
        price: products[3].price,
        totalPrice: products[3].price * 2,
        selectedVariants: [{ type: 'size', value: '250 g' }],
        status: 'PROCESSING',
      },
    ],
    createdAt: '2026-09-11T16:20:00Z',
    updatedAt: '2026-09-11T16:20:00Z',
  },
];

class CommerceStore {
  private isClient = typeof window !== 'undefined';

  private notify() {
    if (this.isClient) {
      window.dispatchEvent(new Event('shuddho_store_sync'));
    }
  }

  // --- Orders ---
  getOrders(): Order[] {
    if (!this.isClient) return INITIAL_ORDERS;
    try {
      const stored = localStorage.getItem('shuddho_orders');
      if (!stored) {
        localStorage.setItem('shuddho_orders', JSON.stringify(INITIAL_ORDERS));
        return INITIAL_ORDERS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load orders', e);
      return INITIAL_ORDERS;
    }
  }

  getOrderById(orderNumber: string): Order | undefined {
    const orders = this.getOrders();
    const cleanId = orderNumber.trim().toUpperCase();
    return orders.find(
      (o) => o.orderNumber.toUpperCase() === cleanId || o.id.toUpperCase() === cleanId
    );
  }

  createOrder(data: {
    items: { product: Product; quantity: number; selectedVariants: { type: string; value: string }[] }[];
    shippingAddress: Address;
    deliveryMethod: string;
    paymentMethod: string;
    couponCode?: string;
    discount?: number;
    shippingFee?: number;
  }): Order {
    const orders = this.getOrders();
    const orderNumber = generateOrderNumber();
    const subtotal = data.items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
    const shipping = data.shippingFee !== undefined ? data.shippingFee : (subtotal >= 1999 ? 0 : 60);
    const discount = data.discount || 0;
    const total = Math.max(0, subtotal + shipping - discount);

    const isOnlinePaid = data.paymentMethod === 'bKash' || data.paymentMethod === 'Nagad' || data.paymentMethod === 'Card';

    const newOrder: Order = {
      id: orderNumber,
      orderNumber,
      userId: this.getUser().id,
      status: 'CONFIRMED',
      subtotal,
      shipping,
      tax: 0,
      discount,
      total,
      couponCode: data.couponCode,
      paymentMethod: data.paymentMethod,
      paymentStatus: isOnlinePaid ? 'PAID' : 'PENDING',
      shippingAddress: data.shippingAddress,
      trackingNumber: `BD-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      courier: data.shippingAddress.division === 'Dhaka' ? 'Pathao Home Express' : 'eCourier Bangladesh Express',
      estimatedDelivery: '2-4 business days',
      items: data.items.map((it, idx) => ({
        id: `item-${Date.now()}-${idx}`,
        product: it.product,
        productId: it.product.id,
        quantity: it.quantity,
        price: it.product.price,
        totalPrice: it.product.price * it.quantity,
        selectedVariants: it.selectedVariants,
        status: 'CONFIRMED',
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Deduct stock
    data.items.forEach((it) => {
      this.adjustStock(it.product.id, -it.quantity);
    });

    const updatedOrders = [newOrder, ...orders];
    if (this.isClient) {
      localStorage.setItem('shuddho_orders', JSON.stringify(updatedOrders));
      this.notify();
    }
    return newOrder;
  }

  updateOrderStatus(orderNumber: string, status: OrderStatus, paymentStatus?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'): boolean {
    const orders = this.getOrders();
    const idx = orders.findIndex((o) => o.orderNumber === orderNumber || o.id === orderNumber);
    if (idx === -1) return false;

    orders[idx].status = status;
    if (paymentStatus) {
      orders[idx].paymentStatus = paymentStatus;
    }
    orders[idx].updatedAt = new Date().toISOString();

    if (this.isClient) {
      localStorage.setItem('shuddho_orders', JSON.stringify(orders));
      this.notify();
    }
    return true;
  }

  // --- Real Stock Engine ---
  getStockOverrides(): Record<string, number> {
    if (!this.isClient) return {};
    try {
      const stored = localStorage.getItem('shuddho_stock_overrides');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  getProductStock(productId: string): number {
    const overrides = this.getStockOverrides();
    if (overrides[productId] !== undefined) {
      return overrides[productId];
    }
    const p = products.find((prod) => prod.id === productId);
    return p ? p.stock : 0;
  }

  setProductStock(productId: string, newStock: number) {
    const overrides = this.getStockOverrides();
    overrides[productId] = Math.max(0, newStock);
    if (this.isClient) {
      localStorage.setItem('shuddho_stock_overrides', JSON.stringify(overrides));
      this.notify();
    }
  }

  adjustStock(productId: string, delta: number) {
    const current = this.getProductStock(productId);
    this.setProductStock(productId, current + delta);
  }

  // --- Wishlist ---
  getWishlist(): string[] {
    if (!this.isClient) return [];
    try {
      const stored = localStorage.getItem('shuddho_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  toggleWishlist(productId: string): boolean {
    const list = this.getWishlist();
    const exists = list.includes(productId);
    const updated = exists ? list.filter((id) => id !== productId) : [...list, productId];
    if (this.isClient) {
      localStorage.setItem('shuddho_wishlist', JSON.stringify(updated));
      this.notify();
    }
    return !exists;
  }

  isInWishlist(productId: string): boolean {
    return this.getWishlist().includes(productId);
  }

  // --- Coupons ---
  getCoupons(): Coupon[] {
    if (!this.isClient) return initialCoupons;
    try {
      const stored = localStorage.getItem('shuddho_coupons');
      if (!stored) {
        localStorage.setItem('shuddho_coupons', JSON.stringify(initialCoupons));
        return initialCoupons;
      }
      return JSON.parse(stored);
    } catch {
      return initialCoupons;
    }
  }

  validateCoupon(code: string, subtotal: number): { valid: boolean; discount: number; message: string; coupon?: Coupon } {
    const coupons = this.getCoupons();
    const clean = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code.toUpperCase() === clean && c.isActive);

    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid or expired coupon code' };
    }

    if (new Date(coupon.expiresAt).getTime() < Date.now()) {
      return { valid: false, discount: 0, message: 'This coupon has expired' };
    }

    if (subtotal < coupon.minOrderValue) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order amount for ${coupon.code} is ৳${coupon.minOrderValue}`,
      };
    }

    let discount = 0;
    if (coupon.type === 'PERCENTAGE') {
      discount = Math.round((subtotal * coupon.value) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else if (coupon.type === 'FIXED') {
      discount = coupon.value;
    } else if (coupon.type === 'FREE_SHIPPING') {
      discount = 60; // Standard shipping
    }

    return { valid: true, discount, message: `Coupon applied! Saved ৳${discount}`, coupon };
  }

  addCoupon(coupon: Coupon) {
    const coupons = this.getCoupons();
    const updated = [coupon, ...coupons];
    if (this.isClient) {
      localStorage.setItem('shuddho_coupons', JSON.stringify(updated));
      this.notify();
    }
  }

  toggleCouponActive(couponId: string) {
    const coupons = this.getCoupons();
    const updated = coupons.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c));
    if (this.isClient) {
      localStorage.setItem('shuddho_coupons', JSON.stringify(updated));
      this.notify();
    }
  }

  // --- Current User ---
  getUser(): ActiveUser {
    if (!this.isClient) return DEFAULT_USER;
    try {
      const stored = localStorage.getItem('shuddho_user');
      return stored ? JSON.parse(stored) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  }

  setUser(user: ActiveUser) {
    if (this.isClient) {
      localStorage.setItem('shuddho_user', JSON.stringify(user));
      this.notify();
    }
  }

  logout() {
    if (this.isClient) {
      localStorage.removeItem('shuddho_user');
      this.notify();
    }
  }
}

export const commerceStore = new CommerceStore();
