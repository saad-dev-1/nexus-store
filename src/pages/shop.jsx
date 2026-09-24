import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, Check } from "lucide-react";
import SectionHeading from "../components/sectionheading";
import ProductCard from "../components/productcard";
import { products } from "../data/products";

const categories = ["All", "Audio", "Power", "Protection", "Smart Home"];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);

  // Filter + Sort (no duplicates)
  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="All Products"
          title="Shop everything"
          subtitle="Browse our complete collection of premium tech accessories."
        />

        {/* Filter Bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-small font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-accent text-white"
                    : "border border-border bg-bg-tertiary text-text-secondary hover:border-border-hover hover:text-text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative shrink-0 self-end md:self-auto">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 rounded-full border border-border bg-bg-tertiary px-4 py-2 text-small font-medium text-text-secondary hover:border-border-hover hover:text-text-primary transition-colors"
            >
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">
                {sortOptions.find((o) => o.value === sortBy)?.label}
              </span>
              <span className="sm:hidden">Sort</span>
            </button>

            <AnimatePresence>
              {sortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setSortOpen(false)}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 z-50 min-w-[200px] rounded-2xl border border-border bg-bg-secondary p-1.5 shadow-2xl"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setSortOpen(false);
                        }}
                        className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-small transition-colors ${
                          sortBy === option.value
                            ? "bg-accent-soft text-accent"
                            : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                        }`}
                      >
                        {option.label}
                        {sortBy === option.value && (
                          <Check size={14} className="text-accent" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Result Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-small text-text-muted">
            <span className="text-text-primary font-medium">
              {filtered.length}
            </span>{" "}
            product{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && (
              <span>
                {" "}
                in <span className="text-accent">{activeCategory}</span>
              </span>
            )}
          </p>

          {activeCategory !== "All" && (
            <button
              onClick={() => setActiveCategory("All")}
              className="flex items-center gap-1 text-tiny text-text-muted hover:text-text-primary transition-colors"
            >
              <X size={12} />
              Clear filter
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <div className="rounded-3xl border border-border bg-bg-tertiary p-16 text-center">
            <p className="text-h4 font-semibold mb-2">No products found</p>
            <p className="text-small text-text-secondary mb-6">
              Try a different category
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="btn-accent"
            >
              Show All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}