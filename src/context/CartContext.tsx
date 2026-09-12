'use client';

import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
import type { Product, Coupon, Address, Order } from '@/types';
import { commerceStore, type ActiveUser } from '@/lib/commerce-store';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariants: { type: string; value: string }[];
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  appliedCoupon: Coupon | null;
  deliveryArea: 'dhaka' | 'outside';
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; selectedVariants: { type: string; value: string }[] } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'APPLY_COUPON'; payload: { coupon: Coupon; discount: number } }
  | { type: 'REMOVE_COUPON' }
  | { type: 'SET_DELIVERY_AREA'; payload: 'dhaka' | 'outside' }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: { items: CartItem[]; coupon: Coupon | null; deliveryArea: 'dhaka' | 'outside' } };

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number, selectedVariants?: { type: string; value: string }[]) => { success: boolean; message?: string };
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  applyCoupon: (code: string) => { valid: boolean; message: string };
  removeCoupon: () => void;
  setDeliveryArea: (area: 'dhaka' | 'outside') => void;
  // Commerce integrations
  wishlist: string[];
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  currentUser: ActiveUser;
  switchUserRole: (role: 'CUSTOMER' | 'ADMIN') => void;
  placeOrder: (orderData: {
    shippingAddress: Address;
    deliveryMethod: string;
    paymentMethod: string;
  }) => Order;
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  getAvailableStock: (productId: string) => number;
}

const calculateTotals = (
  items: CartItem[],
  coupon: Coupon | null,
  deliveryArea: 'dhaka' | 'outside'
) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  let baseShipping = deliveryArea === 'dhaka' ? 60 : 120;
  if (subtotal >= 1999 || (coupon && coupon.type === 'FREE_SHIPPING')) {
    baseShipping = 0;
  }
  const shipping = subtotal > 0 ? baseShipping : 0;
  const tax = 0; // Standard retail prices are VAT inclusive in BD

  let discount = 0;
  if (coupon && subtotal >= coupon.minOrderValue) {
    if (coupon.type === 'PERCENTAGE') {
      discount = Math.round((subtotal * coupon.value) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else if (coupon.type === 'FIXED') {
      discount = coupon.value;
    }
  }

  const total = Math.max(0, subtotal + shipping - discount);
  return { subtotal, shipping, tax, discount, total };
};

const initialState: CartState = {
  items: [],
  subtotal: 0,
  shipping: 60,
  tax: 0,
  discount: 0,
  total: 0,
  appliedCoupon: null,
  deliveryArea: 'dhaka',
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, selectedVariants } = action.payload;
      const variantString = JSON.stringify(selectedVariants || []);
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id && JSON.stringify(item.selectedVariants) === variantString
      );

      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        const id = `${product.id}-${Date.now()}`;
        newItems = [...state.items, { id, product, quantity, selectedVariants: selectedVariants || [] }];
      }

      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems, state.appliedCoupon, state.deliveryArea),
      };
    }
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems, state.appliedCoupon, state.deliveryArea),
      };
    }
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems, state.appliedCoupon, state.deliveryArea),
      };
    }
    case 'APPLY_COUPON': {
      return {
        ...state,
        appliedCoupon: action.payload.coupon,
        ...calculateTotals(state.items, action.payload.coupon, state.deliveryArea),
      };
    }
    case 'REMOVE_COUPON': {
      return {
        ...state,
        appliedCoupon: null,
        ...calculateTotals(state.items, null, state.deliveryArea),
      };
    }
    case 'SET_DELIVERY_AREA': {
      return {
        ...state,
        deliveryArea: action.payload,
        ...calculateTotals(state.items, state.appliedCoupon, action.payload),
      };
    }
    case 'CLEAR_CART': {
      return {
        ...initialState,
        deliveryArea: state.deliveryArea,
      };
    }
    case 'LOAD_CART': {
      const { items, coupon, deliveryArea } = action.payload;
      return {
        ...state,
        items,
        appliedCoupon: coupon,
        deliveryArea,
        ...calculateTotals(items, coupon, deliveryArea),
      };
    }
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<ActiveUser>(commerceStore.getUser());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync with store on mount
  useEffect(() => {
    const sync = () => {
      setWishlist(commerceStore.getWishlist());
      setCurrentUser(commerceStore.getUser());
    };
    sync();

    // Load saved cart
    try {
      const saved = localStorage.getItem('shuddho_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.items)) {
          dispatch({
            type: 'LOAD_CART',
            payload: {
              items: parsed.items,
              coupon: parsed.appliedCoupon || null,
              deliveryArea: parsed.deliveryArea || 'dhaka',
            },
          });
        }
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }

    window.addEventListener('shuddho_store_sync', sync);
    return () => window.removeEventListener('shuddho_store_sync', sync);
  }, []);

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem(
        'shuddho_cart',
        JSON.stringify({
          items: state.items,
          appliedCoupon: state.appliedCoupon,
          deliveryArea: state.deliveryArea,
        })
      );
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [state.items, state.appliedCoupon, state.deliveryArea]);

  const getAvailableStock = useCallback((productId: string) => {
    return commerceStore.getProductStock(productId);
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity = 1, selectedVariants: { type: string; value: string }[] = []) => {
      const available = commerceStore.getProductStock(product.id);
      
      const currentCartQty = state.items
        .filter((item) => item.product.id === product.id)
        .reduce((sum, item) => sum + item.quantity, 0);

      if (available <= 0) {
        addToast(`"${product.name}" is currently out of stock`, 'warning');
        return { success: false, message: 'Out of stock' };
      }

      if (currentCartQty + quantity > available) {
        addToast(`Only ${available} units available in stock`, 'warning');
        return { success: false, message: `Only ${available} available` };
      }

      dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, selectedVariants } });
      addToast(`Added "${product.name}" to your cart`, 'success');
      return { success: true };
    },
    [state.items, addToast]
  );

  const removeFromCart = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
    addToast('Item removed from cart', 'info');
  }, [addToast]);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
        return;
      }
      const item = state.items.find((i) => i.id === id);
      if (item) {
        const available = commerceStore.getProductStock(item.product.id);
        if (quantity > available) {
          addToast(`Maximum available stock is ${available}`, 'warning');
          return;
        }
      }
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    },
    [state.items, addToast]
  );

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const getCartCount = useCallback(() => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  }, [state.items]);

  const applyCoupon = useCallback(
    (code: string) => {
      const result = commerceStore.validateCoupon(code, state.subtotal);
      if (result.valid && result.coupon) {
        dispatch({
          type: 'APPLY_COUPON',
          payload: { coupon: result.coupon, discount: result.discount },
        });
        addToast(result.message, 'success');
        return { valid: true, message: result.message };
      } else {
        addToast(result.message, 'warning');
        return { valid: false, message: result.message };
      }
    },
    [state.subtotal, addToast]
  );

  const removeCoupon = useCallback(() => {
    dispatch({ type: 'REMOVE_COUPON' });
    addToast('Coupon removed', 'info');
  }, [addToast]);

  const setDeliveryArea = useCallback((area: 'dhaka' | 'outside') => {
    dispatch({ type: 'SET_DELIVERY_AREA', payload: area });
  }, []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      const added = commerceStore.toggleWishlist(productId);
      setWishlist(commerceStore.getWishlist());
      addToast(added ? 'Saved to your wishlist' : 'Removed from wishlist', 'info');
      return added;
    },
    [addToast]
  );

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.includes(productId);
    },
    [wishlist]
  );

  const switchUserRole = useCallback((role: 'CUSTOMER' | 'ADMIN') => {
    const updated: ActiveUser = {
      ...currentUser,
      role,
      name: role === 'ADMIN' ? 'Shuddho Admin (শুদ্ধ অ্যাডমিন)' : 'Tanvir Ahmed (কাস্টমার)',
      email: role === 'ADMIN' ? 'admin@shuddho.com.bd' : 'tanvir.ahmed@example.com',
    };
    commerceStore.setUser(updated);
    setCurrentUser(updated);
    addToast(`Switched active view to ${role}`, 'info');
  }, [currentUser, addToast]);

  const placeOrder = useCallback(
    (orderData: {
      shippingAddress: Address;
      deliveryMethod: string;
      paymentMethod: string;
    }) => {
      const order = commerceStore.createOrder({
        items: state.items,
        shippingAddress: orderData.shippingAddress,
        deliveryMethod: orderData.deliveryMethod,
        paymentMethod: orderData.paymentMethod,
        couponCode: state.appliedCoupon?.code,
        discount: state.discount,
        shippingFee: state.shipping,
      });
      clearCart();
      return order;
    },
    [state.items, state.appliedCoupon, state.discount, state.shipping, clearCart]
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        applyCoupon,
        removeCoupon,
        setDeliveryArea,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentUser,
        switchUserRole,
        placeOrder,
        toasts,
        removeToast,
        getAvailableStock,
      }}
    >
      {children}
      {/* Global Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 transform translate-y-0 ${
              toast.type === 'success'
                ? 'bg-[#163A29] text-white border border-[#23583F]'
                : toast.type === 'warning'
                ? 'bg-amber-800 text-white'
                : 'bg-stone-800 text-white'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-white/70 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useCommerce = () => {
  return useCart();
};
