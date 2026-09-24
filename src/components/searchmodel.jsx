import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, TrendingUp } from "lucide-react";
import { products, formatPrice } from "../data/products";

const popularSearches = ["Headphones", "Power Bank", "Case", "LED", "Charger"];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Wrapper — query reset + parent's onClose dono call kare
  const handleClose = () => {
    setQuery("");
    onClose();
  };

  // Auto-focus input + body scroll lock
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const showResults = query.trim().length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-0 right-0 z-[90] px-4 pt-6 md:pt-10"
          >
            <div className="container-custom max-w-3xl mx-auto">
              <div className="rounded-3xl border border-border bg-bg-secondary shadow-2xl overflow-hidden">
                {/* Search input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                  <Search size={20} className="text-text-muted shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products, brands, categories..."
                    className="flex-1 bg-transparent text-body text-text-primary placeholder:text-text-muted outline-none"
                  />
                  <button
                    onClick={handleClose}
                    aria-label="Close search"
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-bg-tertiary transition-colors shrink-0"
                  >
                    <X size={18} className="text-text-secondary" />
                  </button>
                </div>

                {/* Results / Popular */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {!showResults ? (
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={14} className="text-accent" />
                        <p className="text-tiny font-semibold uppercase tracking-widest text-text-muted">
                          Popular Searches
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="rounded-full border border-border bg-bg-tertiary px-4 py-2 text-small text-text-secondary hover:border-accent hover:text-accent hover:bg-accent-soft transition-all duration-200"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : filtered.length > 0 ? (
                    <div className="p-2">
                      <p className="px-3 py-2 text-tiny uppercase tracking-widest text-text-muted">
                        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                      </p>
                      {filtered.map((product) => {
                        const Icon = product.icon;
                        return (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={handleClose}
                            className="group flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-bg-tertiary transition-colors"
                          >
                            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-bg-elevated overflow-hidden">
                              <div className="absolute h-8 w-8 rounded-full bg-accent/15 blur-lg" />
                              {Icon && (
                                <Icon
                                  size={22}
                                  className="relative text-accent"
                                  strokeWidth={1.5}
                                />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-tiny uppercase tracking-widest text-text-muted mb-0.5">
                                {product.brand}
                              </p>
                              <p className="text-small font-medium text-text-primary truncate group-hover:text-accent transition-colors">
                                {product.name}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-small font-bold text-text-primary hidden sm:block">
                                {formatPrice(product.price)}
                              </span>
                              <ArrowRight
                                size={14}
                                className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
                              />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-bg-tertiary mb-4">
                        <Search size={22} className="text-text-muted" />
                      </div>
                      <p className="text-small font-medium text-text-primary mb-1">
                        No results for "{query}"
                      </p>
                      <p className="text-tiny text-text-secondary">
                        Try a different keyword
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer hint */}
                <div className="border-t border-border px-5 py-3 flex items-center justify-between text-tiny text-text-muted">
                  <span className="hidden sm:block">
                    <kbd className="rounded border border-border bg-bg-tertiary px-1.5 py-0.5 font-mono text-[10px]">
                      ESC
                    </kbd>{" "}
                    to close
                  </span>
                  <span>Search across 500+ products</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}