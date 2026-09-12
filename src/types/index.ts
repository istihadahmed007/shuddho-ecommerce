// ============================================================================
// SHUDDHO (শুদ্ধ) Type Definitions
// ============================================================================

// --- User & Auth ---
export type UserRole =
  | "CUSTOMER"
  | "SELLER"
  | "SELLER_STAFF"
  | "DELIVERY_STAFF"
  | "SUPPORT_STAFF"
  | "ADMIN"
  | "SUPER_ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
}

// --- Category ---
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  icon: string;
  parentId?: string;
  productCount: number;
  children?: Category[];
}

// --- Brand ---
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description?: string;
  productCount: number;
  isFeatured: boolean;
}

// --- Product ---
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: number;
  originalPrice: number;
  discount: number;
  currency: string;
  images: ProductImage[];
  category: Category;
  categoryId: string;
  brand: Brand;
  brandId: string;
  seller: Seller;
  sellerId: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  stock: number;
  variants: ProductVariant[];
  specifications: ProductSpecification[];
  features: string[];
  tags: string[];
  isFeatured: boolean;
  isFlashSale: boolean;
  flashSalePrice?: number;
  flashSaleEndsAt?: string;
  shippingFee: number;
  freeShipping: boolean;
  estimatedDelivery: string;
  warranty?: string;
  returnPolicy: string;
  foodDetails?: {
    netWeight: string;
    ingredients: string[];
    origin: string;
    shelfLife: string;
    storage: string;
    nutrition?: Record<string, string>;
    allergenInfo?: string;
    bstiCertified?: boolean;
    organicCertified?: boolean;
  };
  careDetails?: {
    volume: string;
    keyBotanicals: string[];
    suitableFor: string;
    usageInstructions: string[];
    benefits: string[];
    isOrganic?: boolean;
    dermatologicallyTested?: boolean;
  };
  asset3d?: {
    type: "3d" | "2.5d" | "standard";
    modelUrl?: string;
    depthLayerUrl?: string;
    badgeText?: string;
  };
  status: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK" | "DISCONTINUED";
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: "color" | "size" | "storage" | "material" | "style";
  value: string;
  price?: number;
  stock: number;
  sku?: string;
  image?: string;
  colorHex?: string;
}

export interface ProductSpecification {
  id: string;
  name: string;
  value: string;
  group?: string;
}

// --- Seller ---
export interface Seller {
  id: string;
  userId: string;
  storeName: string;
  storeSlug: string;
  storeLogo?: string;
  storeBanner?: string;
  description?: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  followerCount: number;
  isVerified: boolean;
  joinedAt: string;
  location?: string;
  responseRate?: number;
  responseTime?: string;
}

// --- Cart ---
export interface CartItem {
  id: string;
  product: Product;
  productId: string;
  quantity: number;
  selectedVariants: { type: string; value: string }[];
  price: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
}

// --- Order ---
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "PACKED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED"
  | "REFUNDED";

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  trackingNumber?: string;
  courier?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
  selectedVariants: { type: string; value: string }[];
  status: OrderStatus;
}

export interface OrderTracking {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

// --- Address ---
export interface Address {
  id: string;
  fullName: string;
  phone: string;
  country: string;
  division: string;
  city: string;
  area: string;
  street: string;
  postalCode: string;
  isDefault: boolean;
  label?: "HOME" | "OFFICE" | "OTHER";
}

// --- Review ---
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  orderId?: string;
  rating: number;
  title?: string;
  comment: string;
  images: string[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
  sellerReply?: {
    message: string;
    createdAt: string;
  };
}

export interface RatingDistribution {
  star: number;
  count: number;
  percentage: number;
}

// --- Wishlist ---
export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
  priceWhenAdded: number;
  priceChanged: boolean;
}

// --- Coupon ---
export interface Coupon {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED" | "FREE_SHIPPING";
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  expiresAt: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  applicableCategories?: string[];
  applicableProducts?: string[];
  applicableSellers?: string[];
}

// --- Notification ---
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "ORDER" | "PROMOTION" | "PRICE_DROP" | "STOCK" | "SYSTEM" | "REVIEW";
  isRead: boolean;
  link?: string;
  image?: string;
  createdAt: string;
}

// --- Support ---
export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  category: string;
  subject: string;
  message: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  orderId?: string;
  attachments: string[];
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "CUSTOMER" | "SUPPORT" | "ADMIN";
  message: string;
  attachments: string[];
  createdAt: string;
}

// --- Loyalty ---
export type LoyaltyTier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";

export interface LoyaltyAccount {
  userId: string;
  points: number;
  tier: LoyaltyTier;
  totalEarned: number;
  totalRedeemed: number;
  nextTierPoints: number;
}

// --- Analytics ---
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueGrowth: number;
  orderGrowth: number;
  averageOrderValue: number;
  conversionRate: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  previousValue?: number;
}

// --- Banner ---
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  mobileImage?: string;
  link: string;
  buttonText?: string;
  position: "HERO" | "PROMOTIONAL" | "CATEGORY" | "SIDEBAR";
  isActive: boolean;
  startDate: string;
  endDate: string;
  order: number;
}

// --- Delivery ---
export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  estimatedDays: string;
  price: number;
  isFree: boolean;
}

// --- Search ---
export interface SearchSuggestion {
  type: "product" | "category" | "brand" | "query";
  text: string;
  image?: string;
  slug?: string;
  count?: number;
}

// --- Testimonial ---
export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  location?: string;
  productBought?: string;
}

// --- Flash Sale ---
export interface FlashSale {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  products: Product[];
  isActive: boolean;
}

// --- Filter ---
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface ProductFilters {
  categories: FilterOption[];
  brands: FilterOption[];
  priceRange: { min: number; max: number };
  ratings: FilterOption[];
  colors: FilterOption[];
  sizes: FilterOption[];
  sellers: FilterOption[];
  availability: FilterOption[];
  discount: FilterOption[];
}

// --- Pagination ---
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
