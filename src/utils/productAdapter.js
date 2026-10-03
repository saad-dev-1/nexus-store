import {
  Headphones,
  BatteryCharging,
  Shield,
  Lightbulb,
  Camera,
  Speaker,
  Cable,
  Watch,
} from "lucide-react";

// Category → Icon mapping (exported so cart can use)
export const iconMap = {
  audio: Headphones,
  power: BatteryCharging,
  protection: Shield,
  "smart home": Lightbulb,
  camera: Camera,
  speaker: Speaker,
  cables: Cable,
  watches: Watch,
  general: Headphones,
};

const accentMap = {
  audio: "accent",
  power: "star",
  protection: "success",
  "smart home": "purple",
  camera: "accent",
  speaker: "accent",
  cables: "star",
  watches: "purple",
  general: "accent",
};

// Get safe category name from various shapes
const getCategoryName = (category) => {
  if (!category) return "General";
  if (typeof category === "string") return category;
  return category.name || "General";
};

const getCategorySlug = (category) => {
  if (!category) return null;
  if (typeof category === "string") return category.toLowerCase();
  return category.slug || null;
};

export function adaptProduct(apiProduct) {
  if (!apiProduct) return null;

  const categoryName = getCategoryName(apiProduct.category);
  const categorySlug = getCategorySlug(apiProduct.category);
  const categoryLower = categoryName.toLowerCase();
  const icon = iconMap[categoryLower] || iconMap.general;

  // Handle price vs sale_price
  const hasSale =
    apiProduct.sale_price &&
    Number(apiProduct.sale_price) < Number(apiProduct.price);
  const currentPrice = hasSale
    ? Number(apiProduct.sale_price)
    : Number(apiProduct.price);
  const oldPrice = hasSale ? Number(apiProduct.price) : null;

  // Handle images (backend returns array of objects)
  const images = (apiProduct.images || []).map((img) =>
    typeof img === "string" ? img : img.image_path
  );

  const primaryImage =
    apiProduct.primary_image?.image_path ||
    (images.length ? images[0] : null);

  const allImages = primaryImage
    ? [primaryImage, ...images.filter((i) => i !== primaryImage)]
    : images;

  // Stock
  const inStock = apiProduct.manage_stock
    ? (apiProduct.stock_quantity || 0) > 0
    : true;

  return {
    id: apiProduct.id,
    slug: apiProduct.slug,
    name: apiProduct.name,
    brand: apiProduct.brand || "NEXUS",
    category: categoryName,
    categorySlug: categorySlug,
    price: currentPrice,
    oldPrice: oldPrice,
    description: apiProduct.description,
    shortDescription: apiProduct.short_description,
    rating: Number(apiProduct.average_rating) || 0,
    reviews: apiProduct.approved_reviews_count || 0,
    badge: apiProduct.is_featured ? "FEATURED" : null,
    icon,
    accent: accentMap[categoryLower] || "accent",
    images: allImages,
    inStock,
    stockQuantity: apiProduct.stock_quantity,
    sku: apiProduct.sku,
  };
}

export function adaptProducts(apiProducts) {
  if (!Array.isArray(apiProducts)) return [];
  return apiProducts.map(adaptProduct);
}