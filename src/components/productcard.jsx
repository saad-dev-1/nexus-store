import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Star, Check } from "lucide-react";
import { formatPrice } from "../data/products";
import { useCart } from "../context/cartcontext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const inCart = items.find((item) => item.id === product.id);
  const [imgError, setImgError] = useState(false);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const badgeColors = {
    BESTSELLER: "bg-accent text-white",
    DEAL: "bg-error text-white",
    NEW: "bg-success text-white",
    "TOP PICK": "bg-star text-bg-primary",
  };

  const accentColors = {
    accent: "text-accent",
    star: "text-star",
    success: "text-success",
    purple: "text-purple-400",
  };

  const glowColors = {
    accent: "bg-accent/25",
    star: "bg-star/25",
    success: "bg-success/25",
    purple: "bg-purple-400/25",
  };

  const Icon = product.icon;
  const hasImages = product.images && product.images.length > 0;
  const primaryImage = hasImages ? product.images[0] : null;
  const hoverImage =
    hasImages && product.images.length > 1 ? product.images[1] : primaryImage;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col rounded-2xl border border-border bg-bg-tertiary overflow-hidden transition-all duration-300 ease-smooth hover:border-border-hover hover:-translate-y-1 hover:shadow-card-hover cursor-pointer"
    >
      {/* Image area */}
      <div className="relative aspect-square bg-gradient-to-br from-bg-elevated to-bg-secondary overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`h-32 w-32 rounded-full ${glowColors[product.accent]} blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-90`}
          />
        </div>

        {/* Image OR Icon fallback */}
        {primaryImage && !imgError ? (
          <>
            <img
              src={primaryImage}
              alt={product.name}
              onError={() => setImgError(true)}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-smooth group-hover:scale-105 group-hover:opacity-0"
            />
            <img
              src={hoverImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-smooth group-hover:opacity-100 group-hover:scale-105"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {Icon && (
              <Icon
                size={80}
                className={`relative ${accentColors[product.accent]} transition-transform duration-500 ease-smooth group-hover:scale-110`}
                strokeWidth={1.3}
              />
            )}
          </div>
        )}

        {/* Gradient overlay bottom */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg-tertiary/80 to-transparent pointer-events-none" />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider z-10 ${
              badgeColors[product.badge] || "bg-accent text-white"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Discount % */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 rounded-full bg-bg-primary/80 backdrop-blur-sm border border-border px-2.5 py-1 text-[10px] font-bold text-text-primary z-10">
            -{discount}%
          </span>
        )}

        {/* In-Cart badge */}
        {inCart && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-success/95 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider z-10">
            <Check size={10} strokeWidth={3} />
            {inCart.quantity} in cart
          </span>
        )}

        {/* Quick add — appears on hover */}
        <button
          onClick={handleAddToCart}
          aria-label="Add to cart"
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-bg-primary opacity-0 translate-y-2 transition-all duration-300 ease-smooth group-hover:opacity-100 group-hover:translate-y-0 hover:bg-accent hover:text-white active:scale-90 z-10"
        >
          <ShoppingBag size={16} />
        </button>
      </div>

      {/* Info area */}
      <div className="flex flex-col p-4">
        <p className="text-tiny uppercase tracking-widest text-text-muted mb-1.5">
          {product.brand}
        </p>
        <h3 className="text-small font-medium text-text-primary leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <Star size={12} className="text-star" fill="currentColor" />
          <span className="text-tiny font-medium text-text-secondary">
            {product.rating}
          </span>
          <span className="text-tiny text-text-muted">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-h4 font-bold text-text-primary">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-tiny text-text-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}