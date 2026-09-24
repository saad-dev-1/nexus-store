/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { products } from "../data/products";

// ...baaki code same

const CartContext = createContext();

const MAX_QUANTITY = 10;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("nexus_cart");
      const parsed = saved ? JSON.parse(saved) : [];
      // Only keep id and quantity (strip old format — icons/images don't serialize)
      return parsed
        .filter((item) => item && item.id && item.quantity)
        .map((item) => ({ id: item.id, quantity: item.quantity }));
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("nexus_cart", JSON.stringify(items));
  }, [items]);

  // Enrich cart items with fresh product data from products.js
  const enrichedItems = items
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (!product) return null; // Product removed — skip
      return { ...product, quantity: cartItem.quantity };
    })
    .filter(Boolean);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, MAX_QUANTITY);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [
        ...prev,
        { id: product.id, quantity: Math.min(quantity, MAX_QUANTITY) },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    const clamped = Math.min(quantity, MAX_QUANTITY);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: clamped } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = enrichedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = enrichedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    items: enrichedItems, // ← enriched with full product data
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
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