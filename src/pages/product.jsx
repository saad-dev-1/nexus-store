import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";
import { products, formatPrice } from "../data/products";
import { useCart } from "../context/cartcontext";
import ProductCard from "../components/productcard";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  // State hooks (always called — even if product not found)
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [prevId, setPrevId] = useState(id);

  // Reset state when product changes (React recommended pattern)
  if (id !== prevId) {
    setPrevId(id);
    setActiveImage(0);
    setQuantity(1);
    setImageError(false);
  }

  // Invalid product ID → 404 view
  if (!product) {
    return (
      <section className="section-padding">
        <div className="container-custom text-center py-20">
          <p className="text-tiny font-semibold uppercase tracking-widest text-accent mb-4">
            Product Not Found
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.04em] mb-4">
            This product is not available
          </h1>
          <p className="text-body text-text-secondary mb-8 max-w-md mx-auto">
            This product may have been removed or the link is incorrect.
          </p>
          <Link
            to="/shop"
            className="btn-accent inline-flex items-center gap-2 group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  const Icon = product.icon;
  const images = product.images || [];
  const hasImages = images.length > 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Related products — same category, then fill with others
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const others = products.filter(
    (p) => p.category !== product.category && p.id !== product.id
  );
  const relatedProducts = [...sameCategory, ...others].slice(0, 4);

  return (
    <>
      <section className="section-padding">
        <div className="container-custom">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-small text-text-secondary hover:text-text-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* LEFT — Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              {/* Main image */}
              <div className="relative aspect-square rounded-3xl border border-border bg-gradient-to-br from-bg-tertiary to-bg-secondary overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
                </div>

                {hasImages && !imageError ? (
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={images[activeImage]}
                    alt={product.name}
                    onError={() => setImageError(true)}
                    className="relative h-full w-full object-cover"
                  />
                ) : (
                  <div className="relative flex h-full items-center justify-center">
                    {Icon && (
                      <Icon size={160} className="text-accent" strokeWidth={0.9} />
                    )}
                  </div>
                )}

                {discount > 0 && (
                  <span className="absolute top-4 left-4 rounded-full bg-error text-white px-3 py-1.5 text-tiny font-bold uppercase tracking-wider">
                    -{discount}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {hasImages && images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative h-20 w-20 shrink-0 rounded-2xl border overflow-hidden transition-all duration-300 ${
                        activeImage === i
                          ? "border-accent ring-2 ring-accent/30"
                          : "border-border hover:border-border-hover"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* RIGHT — Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col"
            >
              <p className="text-tiny uppercase tracking-widest text-text-muted mb-2">
                {product.brand}
              </p>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-star" fill="currentColor" />
                  ))}
                </div>
                <span className="text-small text-text-secondary">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-body text-text-muted line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              {/* COD Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 mb-6 self-start">
                <ShieldCheck size={14} className="text-success" />
                <span className="text-tiny font-semibold text-success uppercase tracking-wider">
                  COD Available
                </span>
              </div>

              {/* Description */}
              <p className="text-body text-text-secondary leading-relaxed mb-8">
                Premium quality {product.category.toLowerCase()} accessory, sourced from authorized
                distributors. Backed by a 1-year warranty and 7-day easy returns.
              </p>

              {/* Quantity + CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {/* Quantity selector */}
                <div className="flex items-center gap-1 rounded-full border border-border bg-bg-tertiary px-2 self-start sm:self-auto">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-bg-elevated transition-colors"
                  >
                    <Minus size={14} className="text-text-secondary" />
                  </button>
                  <span className="w-8 text-center text-small font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(q + 1, 10))}
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-bg-elevated transition-colors"
                  >
                    <Plus size={14} className="text-text-secondary" />
                  </button>
                </div>

                <button onClick={handleAddToCart} className="btn-accent flex-1">
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="btn-primary flex-1">
                  Buy Now
                </button>
              </div>

              {/* Trust lines */}
              <div className="flex flex-col gap-2 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-small text-text-secondary">
                  <Truck size={14} className="text-accent" />
                  Free delivery on orders above Rs. 2,999
                </div>
                <div className="flex items-center gap-2 text-small text-text-secondary">
                  <RotateCcw size={14} className="text-accent" />
                  7-day easy returns, no questions asked
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding border-t border-border bg-bg-secondary">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p className="section-label mb-3">You May Also Like</p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.03em]">
                Related Products
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}