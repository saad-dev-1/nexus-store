// Single source of truth for site configuration
// Update all site-wide info here

export const siteConfig = {
  // Brand
  brandName: "NEXUS",
  tagline: "Premium Tech Accessories",
  taglineRoman: "Delivered across Pakistan. Order from home.",
  description:
    "Premium tech accessories for modern Pakistan. Original products, fast delivery, honest prices.",
  address: "Sargodha, Pakistan",
  since: "2024",

  // Contact - use same number everywhere to avoid confusion
  phone: "+92 342 4960779",
  phoneLink: "+923424960779",
  whatsappNumber: "923424960779", // WhatsApp: no +, no spaces
  email: "sa1717595@gmail.com",

  // Social - full URLs
  social: {
    instagram: "https://www.instagram.com/saadahm__x",
    facebook: "https://www.facebook.com/share/1EHYdxkVJC/",
    twitter: "",
  },

  // Payment methods (displayed in footer)
  payments: ["COD", "JazzCash", "EasyPaisa", "Bank Transfer"],

  // Shipping
  freeShippingThreshold: 2999,
  shippingCost: 199,

  // Announcement bar messages
  announcements: [
    "Cash on Delivery Available All Over Pakistan",
    "Free Delivery on Orders Above Rs. 2,999",
    "Same-Day Dispatch Before 3PM",
    "Flat 10% Off on First Order",
    "Order Online, Delivered Home",
  ],
};