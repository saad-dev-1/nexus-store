import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useCart } from "../context/cartcontext";
import { formatPrice } from "../data/products";

export default function Cart() {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  // Shipping calculation
  const FREE_SHIPPING_THRESHOLD = 2999;
  const shippingCost =
    totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0 ? 0 : 199;
  const finalTotal = totalPrice + shippingCost;
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - totalPrice;

  // Empty state
  if (items.length === 0) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] mb-8">
            Your Cart
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border bg-bg-tertiary p-12 md:p-20 text-center"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-bg-elevated mb-5">
              <ShoppingBag size={28} className="text-text-muted" />
            </div>
            <h2 className="text-h4 font-semibold mb-2">Cart khali hai</h2>
            <p className="text-small text-text-secondary mb-6">
              Shop karo aur apna cart bharo!
            </p>
            <Link to="/shop" className="btn-accent group inline-flex">
              Start Shopping
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  // Cart with items
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] mb-1">
              Your Cart
            </h1>
            <p className="text-small text-text-secondary">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-small text-text-muted hover:text-error transition-colors flex items-center gap-2"
          >
            <Trash2 size={14} />
            Clear cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT — Items list */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <CartItemRow
                  item={item}
                  onUpdate={updateQuantity}
                  onRemove={removeFromCart}
                />
              </motion.div>
            ))}

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-small text-text-secondary hover:text-text-primary transition-colors mt-4 self-start"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* RIGHT — Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-border bg-bg-tertiary p-6">
              <h2 className="text-h4 font-semibold mb-5">Order Summary</h2>

              {/* Free shipping progress */}
              {remainingForFreeShipping > 0 && (
                <div className="rounded-xl bg-bg-elevated border border-border p-3 mb-5">
                  <p className="text-tiny text-text-secondary mb-2">
                    Add{" "}
                    <span className="text-accent font-semibold">
                      {formatPrice(remainingForFreeShipping)}
                    </span>{" "}
                    more for free delivery
                  </p>
                  <div className="h-1 rounded-full bg-bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (totalPrice / FREE_SHIPPING_THRESHOLD) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Price breakdown */}
              <div className="flex flex-col gap-3 pb-5 border-b border-border">
                <div className="flex items-center justify-between text-small">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-small">
                  <span className="text-text-secondary">Shipping</span>
                  <span
                    className={`font-medium ${
                      shippingCost === 0 ? "text-success" : ""
                    }`}
                  >
                    {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between py-5">
                <span className="text-body font-semibold">Total</span>
                <span className="text-h4 font-bold">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              {/* Checkout button */}
              <button
                onClick={() => navigate("/checkout")}
                className="btn-accent w-full mb-3 group"
              >
                Proceed to Checkout
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              {/* Trust indicators */}
              <div className="flex flex-col gap-2 pt-5 border-t border-border">
                <div className="flex items-center gap-2 text-tiny text-text-secondary">
                  <ShieldCheck size={14} className="text-success" />
                  COD available all over Pakistan
                </div>
                <div className="flex items-center gap-2 text-tiny text-text-secondary">
                  <Truck size={14} className="text-accent" />
                  Dispatch in 24 hours
                </div>
                <div className="flex items-center gap-2 text-tiny text-text-secondary">
                  <RotateCcw size={14} className="text-star" />
                  7-day easy returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Single cart item row
function CartItemRow({ item, onUpdate, onRemove }) {
  const Icon = item.icon;
  const [imgError, setImgError] = useState(false);
  const hasImage = item.images && item.images.length > 0 && !imgError;

  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-bg-tertiary p-4 transition-colors hover:border-border-hover">
      {/* Image */}
      <Link
        to={`/product/${item.id}`}
        className="relative flex h-24 w-24 md:h-28 md:w-28 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-bg-elevated to-bg-secondary overflow-hidden"
      >
        {hasImage ? (
          <img
            src={item.images[0]}
            alt={item.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="absolute h-16 w-16 rounded-full bg-accent/15 blur-2xl" />
            {Icon && (
              <Icon
                size={44}
                className="relative text-accent opacity-90"
                strokeWidth={1.3}
              />
            )}
          </>
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p className="text-tiny uppercase tracking-widest text-text-muted mb-1">
            {item.brand}
          </p>
          <Link
            to={`/product/${item.id}`}
            className="text-small font-medium text-text-primary leading-snug line-clamp-2 hover:text-accent transition-colors mb-1"
          >
            {item.name}
          </Link>
          <p className="text-tiny text-text-muted">
            {formatPrice(item.price)} each
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
          {/* Quantity */}
          <div className="flex items-center gap-1 rounded-full border border-border bg-bg-secondary px-1">
            <button
              onClick={() => onUpdate(item.id, item.quantity - 1)}
              aria-label="Decrease"
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-bg-elevated transition-colors"
            >
              <Minus size={12} className="text-text-secondary" />
            </button>
            <span className="w-6 text-center text-small font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdate(item.id, item.quantity + 1)}
              aria-label="Increase"
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-bg-elevated transition-colors"
            >
              <Plus size={12} className="text-text-secondary" />
            </button>
          </div>

          {/* Line total */}
          <span className="text-h4 font-bold text-text-primary">
            {formatPrice(item.price * item.quantity)}
          </span>

          {/* Remove */}
          <button
            onClick={() => onRemove(item.id)}
            aria-label="Remove"
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:text-error hover:bg-error/10 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}