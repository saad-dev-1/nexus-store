/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { cartAPI } from "../services/api";
import { iconMap } from "../utils/productAdapter";

const CartContext = createContext();
const MAX_QUANTITY = 10;

const isAuthenticated = () => !!localStorage.getItem("auth_token");

// Strip non-serializable fields (icon is React component)
// eslint-disable-next-line no-unused-vars
const stripIcon = ({ icon, ...rest }) => rest;

// Re-attach icon based on category
const attachIcon = (item) => {
  const categoryName =
    typeof item.category === "string"
      ? item.category
      : item.category?.name || "";
  return {
    ...item,
    icon: iconMap[categoryName.toLowerCase()] || iconMap.general,
  };
};

// ─── Adapt API cart item to frontend shape ───
const adaptApiCartItem = (apiItem) => {
  const product = apiItem.product || {};

  // Collect all image paths (handle objects AND strings)
  const allImages = [];

  // 1. primary_image (snake_case)
  if (product.primary_image?.image_path) {
    allImages.push(product.primary_image.image_path);
  }

  // 2. primaryImage (camelCase)
  if (product.primaryImage?.image_path) {
    allImages.push(product.primaryImage.image_path);
  }

  // 3. images array (objects with image_path OR plain strings)
  if (Array.isArray(product.images)) {
    product.images.forEach((img) => {
      const path = typeof img === "string" ? img : img?.image_path;
      if (path && !allImages.includes(path)) {
        allImages.push(path);
      }
    });
  }

  // 4. single image field
  if (
    product.image &&
    typeof product.image === "string" &&
    !allImages.includes(product.image)
  ) {
    allImages.push(product.image);
  }

  const adapted = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand || "NEXUS",
    category: product.category,
    price: Number(apiItem.price),
    sale_price: product.sale_price ? Number(product.sale_price) : null,
    oldPrice: null,
    images: allImages,
    quantity: apiItem.quantity,
    cartItemId: apiItem.id,
    inStock: true,
  };

  return attachIcon(adapted);
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ─── LocalStorage Helpers (Guest) ───
  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem("nexus_cart");
      const parsed = saved ? JSON.parse(saved) : [];
      const withIcons = parsed.map(attachIcon);
      setItems(withIcons);
    } catch {
      setItems([]);
    }
  };

  const saveToLocalStorage = (newItems) => {
    try {
      const serializable = newItems.map(stripIcon);
      localStorage.setItem("nexus_cart", JSON.stringify(serializable));
    } catch (err) {
      console.error("LocalStorage save failed:", err);
    }
  };

  // ─── Load Cart (logged in) ───
  const loadCart = async () => {
    setLoading(true);

    if (isAuthenticated()) {
      try {
        const res = await cartAPI.get();
        const cartData = res.data.data;
        const apiItems = cartData?.items || [];
        const adapted = apiItems
          .filter((item) => item.product)
          .map(adaptApiCartItem);
        setItems(adapted);
      } catch (err) {
        console.error("Cart load failed:", err);
        loadFromLocalStorage();
      } finally {
        setLoading(false);
      }
    } else {
      loadFromLocalStorage();
      setLoading(false);
    }
  };

  // ─── Initial Load ───
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);

      if (isAuthenticated()) {
        try {
          const res = await cartAPI.get();
          if (cancelled) return;
          const cartData = res.data.data;
          const apiItems = cartData?.items || [];
          const adapted = apiItems
            .filter((item) => item.product)
            .map(adaptApiCartItem);
          setItems(adapted);
        } catch (err) {
          if (cancelled) return;
          console.error("Cart load failed:", err);
          loadFromLocalStorage();
        } finally {
          if (!cancelled) setLoading(false);
        }
      } else {
        loadFromLocalStorage();
        setLoading(false);
      }
    };

    run();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Add to Cart ───
  const addToCart = async (product, quantity = 1) => {
    if (isAuthenticated()) {
      try {
        await cartAPI.add({ product_id: product.id, quantity });
        await loadCart();
      } catch (err) {
        console.error("Add to cart failed:", err);
      }
    } else {
      setItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        let newItems;

        if (existing) {
          newItems = prev.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + quantity, MAX_QUANTITY),
                }
              : item
          );
        } else {
          newItems = [
            ...prev,
            { ...product, quantity: Math.min(quantity, MAX_QUANTITY) },
          ];
        }

        saveToLocalStorage(newItems);
        return newItems;
      });
    }
    setIsCartOpen(true);
  };

  // ─── Remove ───
  const removeFromCart = async (id) => {
    if (isAuthenticated()) {
      const item = items.find((i) => i.id === id);
      if (!item?.cartItemId) return;

      try {
        await cartAPI.remove(item.cartItemId);
        await loadCart();
      } catch (err) {
        console.error("Remove failed:", err);
      }
    } else {
      setItems((prev) => {
        const newItems = prev.filter((item) => item.id !== id);
        saveToLocalStorage(newItems);
        return newItems;
      });
    }
  };

  // ─── Update Quantity ───
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      return removeFromCart(id);
    }

    const clamped = Math.min(quantity, MAX_QUANTITY);

    if (isAuthenticated()) {
      const item = items.find((i) => i.id === id);
      if (!item?.cartItemId) return;

      try {
        await cartAPI.update(item.cartItemId, { quantity: clamped });
        await loadCart();
      } catch (err) {
        console.error("Update failed:", err);
      }
    } else {
      setItems((prev) => {
        const newItems = prev.map((item) =>
          item.id === id ? { ...item, quantity: clamped } : item
        );
        saveToLocalStorage(newItems);
        return newItems;
      });
    }
  };

  // ─── Clear ───
  const clearCart = async () => {
    if (isAuthenticated()) {
      try {
        await cartAPI.clear();
        setItems([]);
      } catch (err) {
        console.error("Clear failed:", err);
      }
    } else {
      setItems([]);
      saveToLocalStorage([]);
    }
  };

  // ─── Sync Guest Cart to API (after login) ───
  const syncGuestCart = async () => {
    if (!isAuthenticated()) return;

    try {
      const saved = localStorage.getItem("nexus_cart");
      const guestItems = saved ? JSON.parse(saved) : [];

      if (guestItems.length === 0) {
        await loadCart();
        return;
      }

      for (const item of guestItems) {
        try {
          await cartAPI.add({ product_id: item.id, quantity: item.quantity });
        } catch (err) {
          console.warn(`Failed to sync item ${item.id}:`, err);
        }
      }

      localStorage.removeItem("nexus_cart");
      await loadCart();
    } catch (err) {
      console.error("Cart sync failed:", err);
    }
  };

  // ─── Cart UI Controls ───
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // ─── Computed Values ───
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const value = {
    items,
    isCartOpen,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    loadCart,
    syncGuestCart,
    totalItems,
    totalPrice,
    MAX_QUANTITY,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}