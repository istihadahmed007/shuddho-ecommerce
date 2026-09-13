// ============================================================================
// SHUDDHO (শুদ্ধ) Consumer Products Catalog
// Pure • Authentic • Everyday Essentials of Bengal
// ============================================================================

import type {
  Category, Brand, Product, ProductImage, ProductVariant,
  ProductSpecification, Seller, Review, Coupon, Banner,
  Testimonial, Order, Address, Notification, FlashSale,
  WishlistItem, DeliveryOption,
} from "@/types";

// ============================================================================
// CATEGORIES
// ============================================================================
export const categories: Category[] = [
  {
    id: "cat-food-grocery",
    name: "Food & Pantry",
    slug: "food-grocery",
    description: "Authentic handmade Biulir dal bori, ocean fish patties, and spiced meatball koftas.",
    image: "/products/dal-bori.jpg",
    icon: "Utensils",
    productCount: 3,
  },
  {
    id: "cat-snacks",
    name: "Snacks & Appetizers",
    slug: "snacks",
    description: "Crispy cocktail samosas, golden breadcrumbed rolls, and artisan mini pan pizzas.",
    image: "/products/crispy-samosa-pack.jpg",
    icon: "Cookie",
    productCount: 3,
  },
  {
    id: "cat-bakery-dessert",
    name: "Bakery & Desserts",
    slug: "bakery-dessert",
    description: "Mini mousse tiramisu dessert cups and custom handcrafted chocolate drip cakes.",
    image: "/products/dessert-tiramisu-cups.jpg",
    icon: "Sparkles",
    productCount: 2,
  },
  {
    id: "cat-pickles-oils",
    name: "Pickles, Sauces & Oils",
    slug: "pickles-oils",
    description: "Traditional garlic pickles, crushed chili garlic dipping sauce, and herbal hair oils.",
    image: "/products/chili-garlic-sauce.jpg",
    icon: "Flame",
    productCount: 3,
  },
];

// ============================================================================
// BRANDS / PRODUCT LINES
// ============================================================================
export const brands: Brand[] = [
  { id: "br-pantry", name: "Shuddho Pantry", slug: "shuddho-pantry", logo: "https://ui-avatars.com/api/?name=SP&background=163A29&color=FAF7F2&size=100", productCount: 48, isFeatured: true },
  { id: "br-botanics", name: "Shuddho Botanics", slug: "shuddho-botanics", logo: "https://ui-avatars.com/api/?name=SB&background=1E6B40&color=FAF7F2&size=100", productCount: 36, isFeatured: true },
  { id: "br-heritage", name: "Shuddho Heritage", slug: "shuddho-heritage", logo: "https://ui-avatars.com/api/?name=SH&background=C5922E&color=FAF7F2&size=100", productCount: 28, isFeatured: true },
  { id: "br-organics", name: "Shuddho Organics", slug: "shuddho-organics", logo: "https://ui-avatars.com/api/?name=SO&background=2A362C&color=FAF7F2&size=100", productCount: 24, isFeatured: true },
];

// ============================================================================
// PRIMARY STORE SELLER
// ============================================================================
export const sellers: Seller[] = [
  {
    id: "sel-shuddho",
    userId: "u-admin-1",
    storeName: "SHUDDHO Official Flagship",
    storeSlug: "shuddho-official",
    storeLogo: "/shuddho-logo.png",
    description: "Certified pure Bangladeshi consumer goods directly from verified agro-farms and laboratory facilities.",
    rating: 4.9,
    reviewCount: 4892,
    productCount: 78,
    followerCount: 24300,
    isVerified: true,
    joinedAt: "2023-01-01",
    location: "Tejgaon Industrial Area, Dhaka, Bangladesh",
    responseRate: 99,
    responseTime: "Within 30 minutes",
  },
];

// ============================================================================
// PRODUCT FACTORY HELPER
// ============================================================================
function createProduct(overrides: Partial<Product> & {
  id: string;
  name: string;
  slug: string;
  price: number;
  categoryId: string;
  brandId: string;
}): Product {
  const category = categories.find(c => c.id === overrides.categoryId) || categories[0];
  const brand = brands.find(b => b.id === overrides.brandId) || brands[0];
  const seller = sellers[0];
  const originalPrice = overrides.originalPrice || overrides.price;
  const discount = originalPrice > overrides.price
    ? Math.round(((originalPrice - overrides.price) / originalPrice) * 100)
    : 0;

  const base: Product = {
    id: overrides.id,
    name: overrides.name,
    slug: overrides.slug,
    description: overrides.description || "",
    shortDescription: overrides.shortDescription || "",
    sku: overrides.sku || `SHD-${overrides.id.toUpperCase()}`,
    price: overrides.price,
    originalPrice,
    discount,
    currency: "BDT",
    images: overrides.images || [],
    category,
    categoryId: overrides.categoryId,
    brand,
    brandId: overrides.brandId,
    seller,
    sellerId: seller.id,
    rating: overrides.rating ?? 4.8,
    reviewCount: overrides.reviewCount ?? 84,
    soldCount: overrides.soldCount ?? 420,
    stock: overrides.stock ?? 35,
    variants: overrides.variants || [],
    specifications: overrides.specifications || [],
    features: overrides.features || [],
    tags: overrides.tags || [],
    isFeatured: overrides.isFeatured ?? false,
    isFlashSale: overrides.isFlashSale ?? false,
    shippingFee: 60,
    freeShipping: false,
    estimatedDelivery: "2-3 business days in Dhaka, 3-5 days across Bangladesh",
    returnPolicy: "7-Day Authenticity Guarantee & Easy Return",
    foodDetails: overrides.foodDetails,
    careDetails: overrides.careDetails,
    asset3d: overrides.asset3d,
    status: "ACTIVE",
    createdAt: overrides.createdAt || "2024-03-01T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  };

  return base;
}

// ============================================================================
// REALISTIC BANGLADESH CONSUMER PRODUCTS
// ============================================================================
export const products: Product[] = [
  // User Uploaded Product 1: Artisan Biulir Dal Bori
  createProduct({
    id: "prod-bori-01",
    name: "Handcrafted Artisan Biulir Dal Bori (ঐতিহ্যবাহী হাতে তৈরি বিউলির ডাল বড়ি)",
    slug: "handcrafted-artisan-biulir-dal-bori",
    price: 240,
    originalPrice: 280,
    categoryId: "cat-food-grocery",
    brandId: "br-heritage",
    description: "Sun-dried artisanal lentil dumplings handcrafted from stone-ground black gram (Biulir dal / Mashkalai) whipped by hand until light and airy. Sun-cured on fine muslin cloth under the bright winter sun of rural Bengal. Drops crisp texture and deeply comforting nutty savor into fish curries, bottle gourd shukto, and vegetable stews.",
    shortDescription: "Traditional sun-dried handmade Biulir dal dumplings for authentic Bengali curries.",
    rating: 4.95,
    reviewCount: 164,
    soldCount: 890,
    stock: 45,
    isFeatured: true,
    isFlashSale: false,
    images: [
      { id: "img-bori-1", url: "/products/dal-bori.jpg", alt: "Handcrafted Artisan Biulir Dal Bori on wooden board", isPrimary: true, order: 1 },
    ],
    variants: [
      { id: "v-bori-250", name: "250 g Eco Pouch", type: "size", value: "250 g", price: 240, stock: 25 },
      { id: "v-bori-500", name: "500 g Eco Pouch", type: "size", value: "500 g", price: 450, stock: 20 },
    ],
    specifications: [
      { id: "sp-bori-1", name: "Lentil Type", value: "100% Deshi Mashkalai / Biulir Dal" },
      { id: "sp-bori-2", name: "Curing Method", value: "Pure Natural Sun-Cured (Zero Artificial Heating)" },
      { id: "sp-bori-3", name: "Texture", value: "Porous & Crisp, melts into hot broth" },
      { id: "sp-bori-4", name: "Preservatives", value: "0% Artificial Additives or Color" },
    ],
    features: [
      "Whipped with hing and ginger water for superior airy fluffiness",
      "Traditional recipe passed down across generations of village women artisans",
      "Packed in vacuum-sealed food grade pouches to lock freshness and crispness",
    ],
    tags: ["Dal Bori", "Biulir Dal", "Handmade", "Bengali Cuisine", "Food & Pantry", "Traditional"],
    foodDetails: {
      netWeight: "250 g / 500 g",
      ingredients: ["Biulir Dal (Black Gram Lentil)", "Asafoetida (Hing)", "Kalonji (Black Cumin)", "Himalayan Pink Salt"],
      origin: "Kushtia & Rajshahi, Bangladesh",
      shelfLife: "9 Months from packaging",
      storage: "Store in a clean, airtight container away from moisture. Fry lightly in mustard oil or ghee before adding to broth.",
      nutrition: {
        "Calories": "341 kcal per 100g",
        "Protein": "24 g",
        "Dietary Fiber": "18 g",
        "Fat": "1.4 g",
      },
      allergenInfo: "Contains Legumes. Made in a vegetarian processing facility.",
      bstiCertified: true,
      organicCertified: true,
    },
    createdAt: "2024-03-10T10:00:00Z",
  }),

  // User Uploaded Product 2: Crispy Samosa Trio Pack
  createProduct({
    id: "prod-samosa-01",
    name: "Golden Crispy Cocktail Samosa Pack (মচমচে স্পেশাল সামোসা প্যাক)",
    slug: "golden-crispy-cocktail-samosa-pack",
    price: 320,
    originalPrice: 380,
    categoryId: "cat-snacks",
    brandId: "br-heritage",
    description: "Crispy, flaky triangular pastry pockets packed in airtight clear protective pouches. Filled with slow-cooked spiced minced filling, roasted cumin, and fresh cilantro leaves. Pre-portioned in convenient snack-ready bundles for quick afternoon tea time or family gatherings.",
    shortDescription: "Ultra-crispy golden samosa triangles, freshly sealed for maximum crunch.",
    rating: 4.88,
    reviewCount: 245,
    soldCount: 1350,
    stock: 55,
    isFeatured: true,
    isFlashSale: false,
    images: [
      { id: "img-samosa-1", url: "/products/crispy-samosa-pack.jpg", alt: "Golden Crispy Cocktail Samosas in protective pouch", isPrimary: true, order: 1 },
    ],
    variants: [
      { id: "v-sam-12", name: "12 Pieces Pack", type: "size", value: "12 pcs", price: 320, stock: 35 },
      { id: "v-sam-24", name: "24 Pieces Party Pack", type: "size", value: "24 pcs", price: 590, stock: 20 },
    ],
    specifications: [
      { id: "sp-sam-1", name: "Crust", value: "Multi-layered thin flaky pastry" },
      { id: "sp-sam-2", name: "Packaging", value: "Nitrogen sealed food-grade pouch" },
      { id: "sp-sam-3", name: "Spice Level", value: "Medium Bengali Savory" },
    ],
    features: [
      "Light, non-greasy crust that retains crispness for hours",
      "Ready to air-fry or deep fry in minutes for golden perfection",
      "Perfect pairing with Shuddho Kasundi and sweet Tamarind dip",
    ],
    tags: ["Samosa", "Snacks", "Tea Time", "Bengali Savouries", "Party Food"],
    foodDetails: {
      netWeight: "350 g / 700 g",
      ingredients: ["Wheat Flour", "Spiced Savory Potato & Vegetable Filling", "Coriander", "Cumin", "Cold-Pressed Oil"],
      origin: "Dhaka, Bangladesh",
      shelfLife: "3 Months frozen / 15 Days ambient sealed",
      storage: "Keep in a cool dry place or freeze. Air-fry at 180°C for 8-10 mins or deep fry until golden.",
      nutrition: {
        "Calories": "260 kcal per 100g",
        "Protein": "6 g",
        "Total Fat": "11 g",
      },
      allergenInfo: "Contains Wheat (Gluten).",
      bstiCertified: true,
    },
    createdAt: "2024-03-08T10:00:00Z",
  }),

  // User Uploaded Product 3: Crispy Golden Crumbed Spring Rolls
  createProduct({
    id: "prod-rolls-01",
    name: "Crispy Golden Crumbed Appetizer Rolls (খাস্তা ব্রেডক্রাম্বড স্প্রিং রোল)",
    slug: "crispy-golden-crumbed-appetizer-rolls",
    price: 350,
    originalPrice: 420,
    categoryId: "cat-snacks",
    brandId: "br-heritage",
    description: "Premium handcrafted breadcrumb-coated golden savory rolls. Stuffed with seasoned filling, shredded cabbage, carrots, bell peppers, and house spices. Perfectly uniform cylindrical shape that fries to an irresistible crackling golden-brown crunch.",
    shortDescription: "Breadcrumbed crispy savory rolls with delicious aromatic vegetable and herb filling.",
    rating: 4.9,
    reviewCount: 198,
    soldCount: 940,
    stock: 40,
    isFeatured: true,
    isFlashSale: false,
    images: [
      { id: "img-roll-1", url: "/products/crispy-chicken-rolls.jpg", alt: "Crispy Golden Crumbed Appetizer Rolls served on platter", isPrimary: true, order: 1 },
    ],
    variants: [
      { id: "v-roll-10", name: "10 Pieces Family Pack", type: "size", value: "10 pcs", price: 350, stock: 25 },
      { id: "v-roll-20", name: "20 Pieces Value Pack", type: "size", value: "20 pcs", price: 650, stock: 15 },
    ],
    specifications: [
      { id: "sp-roll-1", name: "Coating", value: "Triple toasted panko golden breadcrumbs" },
      { id: "sp-roll-2", name: "Preparation", value: "Deep fry or Oven bake / Air-fry" },
      { id: "sp-roll-3", name: "Texture", value: "Crackling exterior, juicy flavorful interior" },
    ],
    features: [
      "Zero preservatives or artificial MSG flavoring",
      "Flash-frozen to preserve farm-fresh vegetable flavor and crispness",
      "Stays crisp long after frying without getting soggy",
    ],
    tags: ["Rolls", "Snacks", "Appetizers", "Breadcrumbs", "Party Munchies"],
    foodDetails: {
      netWeight: "400 g / 800 g",
      ingredients: ["Spring Roll Wrappers", "Seasoned Fresh Vegetables & Herbs", "Panko Breadcrumbs", "Natural Sea Salt"],
      origin: "Dhaka, Bangladesh",
      shelfLife: "3 Months frozen",
      storage: "Store frozen at -18°C. Fry directly from frozen in medium-hot oil for 4-5 minutes.",
      nutrition: {
        "Calories": "235 kcal per 100g",
        "Protein": "7 g",
        "Total Fat": "9 g",
      },
      allergenInfo: "Contains Wheat (Gluten).",
      bstiCertified: true,
    },
    createdAt: "2024-03-05T10:00:00Z",
  }),

  // User Uploaded Product 4: Ocean's Bounty Artisan Fish Patties
  createProduct({
    id: "prod-patty-01",
    name: "Ocean's Bounty Artisan Fish Patties with Chili & Scallion (আর্টিসান ফিশ কাবাব ও প্যাটিস)",
    slug: "oceans-bounty-artisan-fish-patties",
    price: 480,
    originalPrice: 560,
    categoryId: "cat-food-grocery",
    brandId: "br-heritage",
    description: "Premium seafood medallions crafted from fresh wild-caught fish, infused with chopped green scallions, bird's eye chilies, and cold-pressed ginger-garlic essence. Gluten-free, delicately seasoned, and served on slate for fine pan-searing or grilling. Packaged with pride in 250g portions.",
    shortDescription: "Artisan gluten-free fish patties seasoned with fresh chili and spring scallions.",
    rating: 4.96,
    reviewCount: 310,
    soldCount: 1560,
    stock: 35,
    isFeatured: true,
    isFlashSale: false,
    images: [
      { id: "img-patty-1", url: "/products/artisan-fish-patties.jpg", alt: "Ocean's Bounty Artisan Fish Patties on black slate with spring onions", isPrimary: true, order: 1 },
    ],
    variants: [
      { id: "v-patty-250", name: "250 g Pack (8 Patties)", type: "size", value: "250 g", price: 480, stock: 20 },
      { id: "v-patty-500", name: "500 g Pack (16 Patties)", type: "size", value: "500 g", price: 920, stock: 15 },
    ],
    specifications: [
      { id: "sp-patty-1", name: "Catch Source", value: "Bay of Bengal & Coastal Estuaries" },
      { id: "sp-patty-2", name: "Gluten Status", value: "100% Certified Gluten-Free" },
      { id: "sp-patty-3", name: "Seasoning", value: "Fresh Chopped Green Chili & Scallions" },
    ],
    features: [
      "High protein, lean omega-3 rich wild fish meat",
      "No flour binders or starch fillers — 100% genuine fish texture",
      "Pan-sear with a dash of mustard oil in just 3-4 minutes per side",
    ],
    tags: ["Fish Patties", "Seafood", "Kebab", "Gluten-Free", "High Protein", "Food & Pantry"],
    foodDetails: {
      netWeight: "250 g / 500 g",
      ingredients: ["Fresh Wild Fish Fillet", "Spring Onion Scallions", "Green Chilies", "Ginger", "Garlic", "Sea Salt"],
      origin: "Chattogram & Cox's Bazar Coastal Catch, Bangladesh",
      shelfLife: "4 Months frozen",
      storage: "Keep frozen at -18°C. Thaw for 10 minutes before pan-searing or grilling.",
      nutrition: {
        "Calories": "165 kcal per 100g",
        "Protein": "22 g",
        "Omega-3": "1.8 g",
        "Total Fat": "4.5 g",
      },
      allergenInfo: "Contains Fish.",
      bstiCertified: true,
      organicCertified: true,
    },
    createdAt: "2024-03-02T10:00:00Z",
  }),

  // User Uploaded Product 5: Stone-Oven Mini Pan Pizza Stack Pack
  createProduct({
    id: "prod-pizza-01",
    name: "Artisanal Cheese & Herb Mini Pan Pizza Stack (হাতে গড়া মিনি প্যান পিৎজা প্যাক)",
    slug: "artisanal-cheese-herb-mini-pan-pizza-stack",
    price: 390,
    originalPrice: 480,
    categoryId: "cat-snacks",
    brandId: "br-heritage",
    description: "Stack of 4 individually vacuum-wrapped artisanal mini pan pizzas. Layered with rich slow-simmered tomato oregano sauce, shredded pure mozzarella cheese, sweet onion rings, and fresh herbs over hand-tossed fermented sourdough crusts. Ready to heat in an oven, pan, or air-fryer in minutes.",
    shortDescription: "Stack of 4 handcrafted mini pan pizzas with pure mozzarella cheese and herbs.",
    rating: 4.92,
    reviewCount: 220,
    soldCount: 1180,
    stock: 30,
    isFeatured: true,
    isFlashSale: false,
    images: [
      { id: "img-pizza-1", url: "/products/mini-pan-pizza-pack.jpg", alt: "Artisanal Cheese & Herb Mini Pan Pizza Stack individually wrapped", isPrimary: true, order: 1 },
    ],
    variants: [
      { id: "v-piz-4", name: "Pack of 4 Mini Pizzas", type: "size", value: "4 pcs", price: 390, stock: 20 },
      { id: "v-piz-8", name: "Pack of 8 Party Stack", type: "size", value: "8 pcs", price: 740, stock: 10 },
    ],
    specifications: [
      { id: "sp-piz-1", name: "Crust Type", value: "24-Hour Fermented Hand-Tossed Sourdough" },
      { id: "sp-piz-2", name: "Cheese", value: "100% Real Cow Milk Mozzarella" },
      { id: "sp-piz-3", name: "Packaging", value: "Individually film-sealed for maximum hygiene" },
    ],
    features: [
      "Individual wrap allows cooking 1 pizza at a time without breaking seal of others",
      "Crispy base with gooey golden cheese melt in 7 minutes",
      "Made with real Italian herbs and farm-fresh Bengali ingredients",
    ],
    tags: ["Pizza", "Cheese", "Mini Pizza", "Snacks", "Quick Meal", "Italian-Bengali"],
    foodDetails: {
      netWeight: "480 g (120g x 4)",
      ingredients: ["Sourdough Flour Crust", "Mozzarella Cheese", "San Marzano Style Tomato Sauce", "Oregano", "Basil", "Olive Oil"],
      origin: "Dhaka, Bangladesh",
      shelfLife: "3 Months frozen",
      storage: "Keep frozen. Bake at 200°C for 6-8 minutes until cheese is bubbly and crust edges are golden.",
      nutrition: {
        "Calories": "270 kcal per pizza",
        "Protein": "11 g",
        "Carbohydrates": "32 g",
        "Fat": "8.5 g",
      },
      allergenInfo: "Contains Wheat (Gluten) and Milk (Dairy).",
      bstiCertified: true,
    },
    createdAt: "2024-03-01T10:00:00Z",
  }),

  // User Uploaded Product 6: Artisanal Dessert Mousse & Tiramisu Cups Party Pack
  createProduct({
    id: "prod-tiramisu-01",
    name: "Artisanal Dessert Mousse & Tiramisu Cups (হ্যান্ডমেড তিরামিসু ও চকলেট মাউস কাপ)",
    slug: "artisanal-dessert-mousse-tiramisu-cups",
    price: 450,
    originalPrice: 520,
    categoryId: "cat-bakery-dessert",
    brandId: "br-heritage",
    description: "Delightful assortment of individual dessert cups featuring two irresistible signature flavors: rich Dutch cocoa dusted espresso chocolate mousse and velvety whipped mascarpone vanilla cream. Pre-portioned in hygienic clear mini cups with leak-proof lids, perfect for dessert catering, parties, or everyday sweet cravings.",
    shortDescription: "Individual party cups of rich chocolate tiramisu and smooth whipped vanilla mousse.",
    rating: 4.95,
    reviewCount: 184,
    soldCount: 920,
    stock: 40,
    isFeatured: true,
    isFlashSale: false,
    images: [
      { id: "img-tiramisu-1", url: "/products/dessert-tiramisu-cups.jpg", alt: "Artisanal Dessert Mousse and Tiramisu Cups in individual party containers", isPrimary: true, order: 1 },
    ],
    variants: [
      { id: "v-tira-6", name: "Pack of 6 Cups (Assorted)", type: "size", value: "6 cups", price: 450, stock: 25 },
      { id: "v-tira-12", name: "Party Box of 12 Cups", type: "size", value: "12 cups", price: 850, stock: 15 },
    ],
    specifications: [
      { id: "sp-tira-1", name: "Flavors", value: "Cocoa Tiramisu & Vanilla Mousse" },
      { id: "sp-tira-2", name: "Packaging", value: "Individual 100ml food-grade cups with lids" },
      { id: "sp-tira-3", name: "Texture", value: "Silky, light, and aerated" },
    ],
    features: [
      "No artificial gelatin or gelatinous gums used",
      "Ready to serve chilled directly from the container",
      "Ideal dessert portion for gatherings, iftar, and dinner parties",
    ],
    tags: ["Tiramisu", "Mousse", "Dessert", "Chocolate", "Bakery & Desserts", "Party Pack"],
    foodDetails: {
      netWeight: "600 g (6 x 100g) / 1.2 kg",
      ingredients: ["Fresh Cream", "Mascarpone Cheese", "Dutch Processed Cocoa", "Espresso", "Organic Sugar", "Vanilla Extract"],
      origin: "Dhaka Artisanal Bakery Studio, Bangladesh",
      shelfLife: "7 Days refrigerated (0-4°C)",
      storage: "Keep refrigerated between 2°C to 4°C. Serve chilled.",
      nutrition: {
        "Calories": "190 kcal per cup",
        "Protein": "3.5 g",
        "Carbohydrates": "21 g",
        "Fat": "10 g",
      },
      allergenInfo: "Contains Milk (Dairy) and traces of Egg.",
      bstiCertified: true,
    },
    createdAt: "2024-03-12T10:00:00Z",
  }),

  // User Uploaded Product 7: Handcrafted Gourmet Chocolate Drip Rosette Cake
  createProduct({
    id: "prod-cake-01",
    name: "Handcrafted Gourmet Chocolate Drip Rosette Cake (কাস্টমাইজড চকলেট ড্রিপ রোজেট কেক)",
    slug: "handcrafted-gourmet-chocolate-drip-rosette-cake",
    price: 850,
    originalPrice: 990,
    categoryId: "cat-bakery-dessert",
    brandId: "br-heritage",
    description: "Artisanal celebratory cake prepared with decadent dark chocolate ganache drip, piped vanilla-coffee buttercream rosettes, and personalized celebration lettering. Hand-baked in small batches using premium butter, pure cocoa, and weighed with precision (verified ~560g net weight).",
    shortDescription: "Decadent dark chocolate drip cake with piped buttercream rosettes.",
    rating: 4.98,
    reviewCount: 142,
    soldCount: 680,
    stock: 20,
    isFeatured: true,
    isFlashSale: false,
    images: [
      { id: "img-cake-1", url: "/products/custom-chocolate-cake.jpg", alt: "Gourmet Chocolate Drip Rosette Cake on digital precision scale", isPrimary: true, order: 1 },
    ],
    variants: [
      { id: "v-cake-500", name: "Standard 500g Cake", type: "size", value: "500 g", price: 850, stock: 15 },
      { id: "v-cake-1000", name: "Grand 1000g Cake", type: "size", value: "1 kg", price: 1600, stock: 5 },
    ],
    specifications: [
      { id: "sp-cake-1", name: "Net Weight", value: "560 g Verified Precision Scaled" },
      { id: "sp-cake-2", name: "Frosting", value: "Dark Chocolate Mirror Ganache & Coffee Buttercream" },
      { id: "sp-cake-3", name: "Base", value: "Moist Dark Cocoa Sponge" },
    ],
    features: [
      "Custom name piping available on advance notice",
      "Packed in reinforced luxury cake box with cake knife and candle",
      "Baked fresh on the day of delivery",
    ],
    tags: ["Cake", "Chocolate Cake", "Celebration", "Bakery", "Birthday", "Dessert"],
    foodDetails: {
      netWeight: "560 g / 1000 g",
      ingredients: ["Flour", "Dark Cocoa", "Fresh Cow Butter", "Brown Sugar", "Dark Chocolate Ganache", "Coffee Essence"],
      origin: "Dhaka Bakery Atelier, Bangladesh",
      shelfLife: "5 Days refrigerated",
      storage: "Store in refrigerator. Bring to ambient room temperature 15 minutes before cutting.",
      nutrition: {
        "Calories": "340 kcal per 100g",
        "Protein": "5 g",
        "Carbohydrates": "48 g",
        "Fat": "15 g",
      },
      allergenInfo: "Contains Wheat (Gluten), Dairy, and Eggs.",
      bstiCertified: true,
    },
    createdAt: "2024-03-11T10:00:00Z",
  }),

  // User Uploaded Product 8: Traditional Bengali Mustard Garlic Pickle
  createProduct({
    id: "prod-garlic-pickle-01",
    name: "Aged Mustard Garlic Pickle Jar (ঐতিহ্যবাহী রোদে জাড়ানো খাঁটি রসুন ও সরিষার আচার)",
    slug: "aged-mustard-garlic-pickle-jar",
    price: 340,
    originalPrice: 400,
    categoryId: "cat-pickles-oils",
    brandId: "br-heritage",
    description: "Sun-aged traditional whole garlic pickle suspended in 100% cold-pressed wood-milled mustard oil, infused with nigella seeds (kalijira), fenugreek, and tart green mango shreds. Slow-fermented naturally under natural sunlight for months to soften the garlic cloves into melt-in-mouth savory drops of flavor.",
    shortDescription: "Whole cloves of aged garlic pickled in wood-pressed mustard oil with heritage spices.",
    rating: 4.96,
    reviewCount: 310,
    soldCount: 1450,
    stock: 45,
    isFeatured: true,
    isFlashSale: false,
    images: [
      { id: "img-gpickle-1", url: "/products/garlic-pickle-jar.jpg", alt: "Aged Mustard Garlic Pickle in glass jar with yellow lid", isPrimary: true, order: 1 },
    ],
    variants: [
      { id: "v-gp-400", name: "400 g Glass Jar", type: "size", value: "400 g", price: 340, stock: 30 },
      { id: "v-gp-800", name: "800 g Family Jar", type: "size", value: "800 g", price: 620, stock: 15 },
    ],
    specifications: [
      { id: "sp-gp-1", name: "Garlic Variety", value: "Indigenous Deshi Small Clove Garlic" },
      { id: "sp-gp-2", name: "Oil Medium", value: "100% Pure Cold Wood-Pressed Mustard Oil" },
      { id: "sp-gp-3", name: "Curing", value: "60-Day Natural Sun Fermentation" },
    ],
    features: [
      "Softens whole garlic into mild, aromatic, buttery cloves",
      "Known throughout Bengali households for digestive health and joint vitality",
      "Zero artificial preservatives, colorings, or synthetic vinegar",
    ],
    tags: ["Pickle", "Garlic Pickle", "Mustard Oil", "Bengali Food", "Achar", "Condiments"],
    foodDetails: {
      netWeight: "400 g / 800 g",
      ingredients: ["Whole Deshi Garlic Cloves", "Raw Mustard Oil", "Nigella Sativa (Kalijira)", "Fennel", "Fenugreek", "Mustard Paste", "Rock Salt"],
      origin: "Natore & Pabna Agro Basin, Bangladesh",
      shelfLife: "18 Months (Improves with natural aging)",
      storage: "Keep lid tightly closed. Ensure garlic cloves remain covered in oil. Use a clean dry spoon.",
      nutrition: {
        "Calories": "220 kcal per 100g",
        "Total Fat": "18 g",
        "Allicin Content": "Active Natural Allicin",
      },
      allergenInfo: "Contains Mustard.",
      bstiCertified: true,
    },
    createdAt: "2024-03-09T10:00:00Z",
  }),

  // User Uploaded Product 9: Slow-Infused Botanical Rosemary & Herbal Hair Elixir
  createProduct({
    id: "prod-herb-oil-01",
    name: "Slow-Infused Rosemary & Botanical Herbal Hair Oil (রোদে সেদ্ধ রোজমেরি ও ভেষজ হেয়ার অয়েল)",
    slug: "slow-infused-rosemary-botanical-hair-oil",
    price: 460,
    originalPrice: 550,
    categoryId: "cat-pickles-oils",
    brandId: "br-botanics",
    description: "Clear whole-herb suspended botanical hair elixir crafted by sun-infusing whole wild rosemary sprigs, fenugreek, and medicinal herbs into virgin golden carrier oils. Visibly floating herbs continuously release potent plant nutrients, polyphenols, and essential oils to invigorate the scalp and prevent hair shedding.",
    shortDescription: "Sun-infused clear bottle with real suspended rosemary sprigs for hair strength.",
    rating: 4.94,
    reviewCount: 290,
    soldCount: 1680,
    stock: 35,
    isFeatured: true,
    isFlashSale: false,
    images: [
      { id: "img-hoil-1", url: "/products/infused-herbal-oil.jpg", alt: "Slow-Infused Rosemary and Botanical Herbal Hair Oil bottle with visible herbs", isPrimary: true, order: 1 },
    ],
    variants: [
      { id: "v-ho-250", name: "250 ml Precision Bottle", type: "size", value: "250 ml", price: 460, stock: 25 },
      { id: "v-ho-500", name: "500 ml Value Bottle", type: "size", value: "500 ml", price: 850, stock: 10 },
    ],
    specifications: [
      { id: "sp-ho-1", name: "Infusion Process", value: "30-Day Slow Solar Herb Steep" },
      { id: "sp-ho-2", name: "Herbs", value: "Whole Rosemary Sprigs, Methi, and Black Seed" },
      { id: "sp-ho-3", name: "Purity", value: "0% Mineral Oil, 0% Silicones, 0% Added Fragrance" },
    ],
    features: [
      "Visible whole botanicals continuously steep inside the bottle",
      "Stimulates blood flow to hair follicles for enhanced growth",
      "Lightweight, fast-absorbing botanical lipid profile that rinses out easily",
    ],
    tags: ["Hair Oil", "Rosemary", "Herbal", "Botanical", "Hair Care", "Organic"],
    careDetails: {
      volume: "250 ml / 500 ml",
      keyBotanicals: ["Whole Rosemary Sprigs (Rosmarinus officinalis)", "Virgin Coconut Oil", "Cold-Pressed Sesame", "Methi Seeds"],
      suitableFor: "All hair types, thinning hair, dry scalp, and hair fall control",
      usageInstructions: [
        "Dispense a few drops into palms",
        "Massage into scalp with fingertips for 5 minutes",
        "Leave for 1-2 hours or overnight before washing",
        "Use 3 times weekly for best results",
      ],
      benefits: ["Nourishes roots and promotes noticeably fuller, denser hair."],
      isOrganic: true,
      dermatologicallyTested: true,
    },
    asset3d: {
      type: "3d",
      badgeText: "Herb Suspended",
    },
    createdAt: "2024-03-07T10:00:00Z",
  }),

  // User Uploaded Product 10: Artisan Spiced Meatball Koftas
  createProduct({
    id: "prod-kofta-01",
    name: "Artisan Spiced Homestyle Meatball Koftas (হাতে গড়া স্পেশাল মাংসের কোফতা ও মিটবল)",
    slug: "artisan-spiced-homestyle-meatball-koftas",
    price: 490,
    originalPrice: 580,
    categoryId: "cat-food-grocery",
    brandId: "br-heritage",
    description: "Tender, succulent meatballs handcrafted from freshly minced prime meat, seasoned with roasted garam masala, toasted coriander, crushed brown onions (beresta), and black pepper. Pre-rolled and ready to simmer in rich tomato gravy, roast on skewers, or fry as appetizers.",
    shortDescription: "Succulent hand-rolled spiced meatball koftas seasoned with traditional beresta and spices.",
    rating: 4.93,
    reviewCount: 210,
    soldCount: 1150,
    stock: 35,
    isFeatured: true,
    isFlashSale: false,
    images: [
      { id: "img-kofta-1", url: "/products/spiced-meatballs-kofta.jpg", alt: "Artisan Spiced Meatball Koftas served on vintage porcelain plate", isPrimary: true, order: 1 },
    ],
    variants: [
      { id: "v-kof-24", name: "Platter of 24 Pieces (450g)", type: "size", value: "24 pcs", price: 490, stock: 20 },
      { id: "v-kof-48", name: "Party Platter of 48 Pieces (900g)", type: "size", value: "48 pcs", price: 920, stock: 15 },
    ],
    specifications: [
      { id: "sp-kof-1", name: "Meat Quality", value: "Fresh Prime Trimmed Mince (85/15 Lean Ratio)" },
      { id: "sp-kof-2", name: "Seasoning", value: "Roasted Garam Masala & Golden Beresta" },
      { id: "sp-kof-3", name: "Texture", value: "Juicy, tender, non-crumbly" },
    ],
    features: [
      "Hand-shaped into uniform bite-sized spheres for even cooking",
      "Ready to add directly into simmering korma or curry sauce",
      "Vacuum-sealed in freezer-safe hygienic packaging",
    ],
    tags: ["Meatballs", "Kofta", "Curry", "Food & Pantry", "Gourmet Meat", "Handmade"],
    foodDetails: {
      netWeight: "450 g / 900 g",
      ingredients: ["Fresh Minced Meat", "Fried Crispy Onions (Beresta)", "Roasted Cumin", "Cardamom", "Ginger", "Garlic", "Sea Salt"],
      origin: "Dhaka, Bangladesh",
      shelfLife: "3 Months frozen (-18°C)",
      storage: "Keep frozen. Add directly to hot gravy or shallow fry on medium heat for 6-8 minutes.",
      nutrition: {
        "Calories": "210 kcal per 100g",
        "Protein": "19 g",
        "Total Fat": "12 g",
      },
      allergenInfo: "Halal Certified.",
      bstiCertified: true,
    },
    createdAt: "2024-03-04T10:00:00Z",
  }),

  // User Uploaded Product 11: Handcrafted Crushed Chili Garlic Dip & Condiment Sauce
  createProduct({
    id: "prod-sauce-01",
    name: "Handcrafted Crushed Chili Garlic Dipping Sauce (হাতে তৈরি কাঁচা মরিচ ও রসুন সস)",
    slug: "handcrafted-crushed-chili-garlic-dipping-sauce",
    price: 280,
    originalPrice: 340,
    categoryId: "cat-pickles-oils",
    brandId: "br-heritage",
    description: "Fiery, tangy, and intensely aromatic artisanal dipping sauce made from coarsely crushed fresh red bird-eye chilies, minced fresh garlic cloves, tangy citrus vinegar, and Himalayan rock salt. Bottled in a calibrated 250ml squeeze jar with leak-proof loop cap. The ultimate condiment for samosas, crispy rolls, fish patties, and dumplings.",
    shortDescription: "Coarsely crushed fresh red chili and minced garlic savory dipping sauce in 250ml calibrated bottle.",
    rating: 4.97,
    reviewCount: 175,
    soldCount: 840,
    stock: 50,
    isFeatured: true,
    isFlashSale: false,
    images: [
      { id: "img-sauce-1", url: "/products/chili-garlic-sauce.jpg", alt: "Handcrafted Crushed Chili Garlic Dipping Sauce in calibrated 250ml loop bottle", isPrimary: true, order: 1 },
    ],
    variants: [
      { id: "v-sauce-250", name: "250 ml Precision Loop Bottle", type: "size", value: "250 ml", price: 280, stock: 35 },
      { id: "v-sauce-500", name: "Twin Pack (2 x 250ml)", type: "size", value: "500 ml", price: 520, stock: 15 },
    ],
    specifications: [
      { id: "sp-sc-1", name: "Chili Base", value: "Fresh Ripe Red Bird-Eye Deshi Chilies" },
      { id: "sp-sc-2", name: "Texture", value: "Chunky Crushed Chili & Minced Garlic Pulp" },
      { id: "sp-sc-3", name: "Bottle", value: "250ml Calibrated Measurement Loop-Cap Bottle" },
    ],
    features: [
      "Zero artificial food colors, zero synthetic thickening starch",
      "Calibrated bottle lines (50ml to 250ml) for exact recipe measurement",
      "Essential pairing for momos, samosas, pizza crusts, and fried appetizers",
    ],
    tags: ["Chili Sauce", "Garlic Sauce", "Dipping Sauce", "Condiment", "Spicy", "Handcrafted"],
    foodDetails: {
      netWeight: "250 ml / 500 ml",
      ingredients: ["Fresh Red Chilies", "Minced Garlic", "Natural Cane Vinegar", "Himalayan Rock Salt", "Raw Cane Sugar"],
      origin: "Dhaka, Bangladesh",
      shelfLife: "9 Months",
      storage: "Shake well before dispensing. Refrigerate after opening to preserve lively zest.",
      nutrition: {
        "Calories": "68 kcal per 100ml",
        "Protein": "1.8 g",
        "Carbohydrates": "14 g",
        "Fat": "0.4 g",
      },
      allergenInfo: "Pungent & Spicy.",
      bstiCertified: true,
    },
    asset3d: {
      type: "3d",
      badgeText: "250ml Calibrated",
    },
    createdAt: "2024-03-13T10:00:00Z",
  }),
];

// ============================================================================
// REAL REVIEWS (VERIFIED PURCHASE ONLY)
// ============================================================================
export const reviews: Review[] = [
  {
    id: "rev-1",
    userId: "u-cus-1",
    userName: "Farhana Rahman",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
    productId: "prod-bori-01",
    orderId: "SHD-10291-BD",
    rating: 5,
    title: "Crisp and airy Biulir dal bori, just like home!",
    comment: "The bori melts into the fish curry broth while keeping a lovely crisp bite. Truly handmade quality with zero artificial additives.",
    images: [],
    isVerifiedPurchase: true,
    helpfulCount: 42,
    createdAt: "2026-08-14T14:20:00Z",
  },
  {
    id: "rev-2",
    userId: "u-cus-2",
    userName: "Tanvir Ahmed",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
    productId: "prod-samosa-01",
    orderId: "SHD-10314-BD",
    rating: 5,
    title: "Super crunchy samosas for evening tea",
    comment: "Air-fried in 8 minutes and they came out perfectly crispy and golden. Great spiced filling.",
    images: [],
    isVerifiedPurchase: true,
    helpfulCount: 38,
    createdAt: "2026-08-20T18:45:00Z",
  },
  {
    id: "rev-3",
    userId: "u-cus-3",
    userName: "Nusrat Jahan",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80",
    productId: "prod-patty-01",
    orderId: "SHD-10389-BD",
    rating: 5,
    title: "Delicious wild fish flavor with genuine scallions",
    comment: "Real fish texture without flour fillers. Seared in mustard oil on a tawa and my family loved it.",
    images: [],
    isVerifiedPurchase: true,
    helpfulCount: 29,
    createdAt: "2026-08-28T11:15:00Z",
  },
];

// ============================================================================
// REAL DISCOUNT COUPONS
// ============================================================================
export const coupons: Coupon[] = [
  {
    id: "cp-1",
    code: "SHUDDHO10",
    type: "PERCENTAGE",
    value: 10,
    minOrderValue: 1000,
    maxDiscount: 300,
    description: "10% off on all organic food and botanical care (Min order ৳1,000)",
    expiresAt: "2026-12-31T23:59:59Z",
    usageLimit: 5000,
    usedCount: 412,
    isActive: true,
  },
  {
    id: "cp-2",
    code: "PURE50",
    type: "FIXED",
    value: 50,
    minOrderValue: 600,
    description: "Flat ৳50 discount on your daily pantry items",
    expiresAt: "2026-12-31T23:59:59Z",
    usageLimit: 3000,
    usedCount: 890,
    isActive: true,
  },
  {
    id: "cp-3",
    code: "FREESHIP",
    type: "FREE_SHIPPING",
    value: 60,
    minOrderValue: 1500,
    description: "Free doorstep delivery across Bangladesh on orders over ৳1,500",
    expiresAt: "2026-12-31T23:59:59Z",
    usageLimit: 10000,
    usedCount: 1240,
    isActive: true,
  },
];

// ============================================================================
// DYNAMIC ANNOUNCEMENT BAR & BANNERS
// ============================================================================
export const announcements = [
  "🌿 100% Certified Pure & BSTI Tested Consumer Goods • Delivered Nationwide",
  "🚚 Free Delivery across Bangladesh on orders over ৳1,999",
  "⭐ Authentic Sundarbans Honey, Ghani Mustard Oil & Botanical Hair Oils",
  "🎁 Use coupon SHUDDHO10 for 10% off your order today!",
];

export const banners: Banner[] = [
  {
    id: "ban-1",
    title: "Pure Living, Handcrafted from Bengal's Finest Soil",
    subtitle: "Discover slow wood-pressed oils, Sundarbans wild honey, and 21-herb botanical hair elixirs.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1600&h=800&fit=crop&q=85",
    link: "/shop",
    buttonText: "Explore Collection",
    position: "HERO",
    isActive: true,
    startDate: "2024-01-01",
    endDate: "2026-12-31",
    order: 1,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Dr. Kazi Mahfuzur Rahman",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80",
    rating: 5,
    review: "In a market flooded with chemically adulterated spices and mineral hair oils, Shuddho stands as a beacon of genuine purity. The cold-pressed mustard oil and turmeric have become non-negotiable staples in our household.",
    location: "Dhanmondi, Dhaka",
    productBought: "Wood-Pressed Mustard Oil & Rajshahi Turmeric",
  },
  {
    id: "t-2",
    name: "Sabrina Mostafa",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&q=80",
    rating: 5,
    review: "The 21-Herb Botanical Hair Oil actually delivered on its promise. My hair breakage stopped, and the packaging in amber glass feels like a true luxury heritage brand.",
    location: "Nasirabad, Chittagong",
    productBought: "21-Herb Botanical Hair Oil",
  },
  {
    id: "t-3",
    name: "Rezwanul Haque",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
    rating: 5,
    review: "Pabna Bilona ghee on hot Kalijira rice took me straight back to my grandmother's cooking. Fast delivery in Sylhet and excellent protective eco-packaging.",
    location: "Upashahar, Sylhet",
    productBought: "Bilona Cow Ghee & Chinigura Rice",
  },
];

// ============================================================================
// HELPER LOOKUP FUNCTIONS
// ============================================================================
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "new-arrivals") {
    return getNewArrivals();
  }
  return products.filter((p) => p.category.slug === categorySlug);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter((p) => p.brand.slug === brandSlug);
}

export function getProductsBySeller(sellerId: string): Product[] {
  return products.filter((p) => p.sellerId === sellerId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getFlashSaleProducts(): Product[] {
  return products.filter((p) => p.isFlashSale);
}

export function getTrendingProducts(): Product[] {
  return [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 12);
}

export function getNewArrivals(): Product[] {
  return [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 12);
}

export function getBestSellers(): Product[] {
  return [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 8);
}

export function getRecommendedProducts(): Product[] {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, 12);
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return products.filter((p) => p.id !== productId && p.categoryId === product.categoryId).slice(0, 6);
}

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.brand.name.toLowerCase().includes(q) ||
      p.category.name.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSellerBySlug(slug: string): Seller | undefined {
  return sellers.find((s) => s.storeSlug === slug);
}
