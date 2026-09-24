import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/cartcontext";
import { formatPrice } from "../data/products";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeCart();
    };

    if (isCartOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-bg-secondary border-l border-border flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-accent" />
                <h2 className="text-h4 font-semibold">
                  Your Cart
                  {totalItems > 0 && (
                    <span className="ml-2 text-small text-text-muted font-normal">
                      ({totalItems})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg-tertiary transition-colors"
              >
                <X size={18} className="text-text-secondary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {items.length === 0 ? (
                <EmptyState onClose={closeCart} />
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdate={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-5 py-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-small text-text-secondary">Subtotal</span>
                  <span className="text-h4 font-bold">{formatPrice(totalPrice)}</span>
                </div>

                <div className="text-tiny text-text-muted mb-4 flex items-center gap-2">
                  <span className="text-success">✓</span>
                  COD available • Free delivery above Rs. 2,999
                </div>

                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="btn-accent w-full mb-2"
                >
                  Checkout
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-small text-text-secondary hover:text-text-primary py-2 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyState({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-bg-tertiary mb-5">
        <ShoppingBag size={26} className="text-text-muted" />
      </div>
      <h3 className="text-h4 font-semibold mb-2">Cart khali hai</h3>
      <p className="text-small text-text-secondary mb-6">
        Kuch products add karo aur yahan dekho!
      </p>
      <Link to="/shop" onClick={onClose} className="btn-accent">
        Start Shopping
      </Link>
    </div>
  );
}

function CartItem({ item, onUpdate, onRemove }) {
  const Icon = item.icon;
  const [imgError, setImgError] = useState(false);
  const hasImage = item.images && item.images.length > 0 && !imgError;

  return (
    <li className="flex gap-4 rounded-2xl border border-border bg-bg-tertiary p-3">
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-bg-elevated overflow-hidden">
        {hasImage ? (
          <img
            src={item.images[0]}
            alt={item.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="absolute h-12 w-12 rounded-full bg-accent/15 blur-xl" />
            {Icon && (
              <Icon
                size={32}
                className="relative text-accent"
                strokeWidth={1.4}
              />
            )}
          </>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <p className="text-tiny uppercase tracking-widest text-text-muted mb-0.5">
          {item.brand}
        </p>
        <h4 className="text-small font-medium text-text-primary leading-snug line-clamp-1 mb-1.5">
          {item.name}
        </h4>
        <p className="text-small font-bold text-text-primary mb-2">
          {formatPrice(item.price * item.quantity)}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 rounded-full border border-border bg-bg-secondary px-1">
            <button
              onClick={() => onUpdate(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-bg-elevated transition-colors"
            >
              <Minus size={12} className="text-text-secondary" />
            </button>
            <span className="w-6 text-center text-small font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdate(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-bg-elevated transition-colors"
            >
              <Plus size={12} className="text-text-secondary" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
            className="flex h-7 w-7 items-center justify-center rounded-full text-text-muted hover:text-error hover:bg-error/10 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </li>
  );
}