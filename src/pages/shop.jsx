import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, Check, Loader2 } from "lucide-react";
import SectionHeading from "../components/sectionheading";
import ProductCard from "../components/productcard";
import { productAPI, categoryAPI } from "../services/api";
import { adaptProducts } from "../utils/productAdapter";

const sortOptions = [
  { value: "latest", label: "Featured" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A-Z" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read category from URL on mount (and when it changes)
  const urlCategory = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(() => urlCategory || "All");
  const [sortBy, setSortBy] = useState("latest");
  const [sortOpen, setSortOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ name: "All", slug: null }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync URL → activeCategory when URL changes externally
  const [prevUrlCategory, setPrevUrlCategory] = useState(urlCategory);
  if (urlCategory !== prevUrlCategory) {
    setPrevUrlCategory(urlCategory);
    setActiveCategory(urlCategory || "All");
  }

  // Track param changes (React 19 recommended pattern)
  const [prevKey, setPrevKey] = useState(`${activeCategory}-${sortBy}`);
  const currentKey = `${activeCategory}-${sortBy}`;

  if (currentKey !== prevKey) {
    setPrevKey(currentKey);
    setLoading(true);
    setError(null);
  }

  // Fetch categories once
  useEffect(() => {
    let cancelled = false;

    categoryAPI.list()
      .then((res) => {
        if (cancelled) return;
        const apiCats = res.data.data || [];
        setCategories([
          { name: "All", slug: null },
          ...apiCats.map((c) => ({ name: c.name, slug: c.slug })),
        ]);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Categories fetch failed:", err);
      });

    return () => { cancelled = true; };
  }, []);

  // Fetch products when category or sort changes
  useEffect(() => {
    let cancelled = false;

    const params = { sort: sortBy, per_page: 50 };
    if (activeCategory !== "All") params.category = activeCategory;

    productAPI.list(params)
      .then((res) => {
        if (cancelled) return;
        const raw = res.data.data?.data || res.data.data || [];
        setProducts(adaptProducts(raw));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Products fetch failed:", err);
        setError("Failed to load products. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [activeCategory, sortBy]);

  // Category button click handler — updates BOTH state and URL
  const handleCategoryClick = (slug) => {
    const newCategory = slug || "All";
    setActiveCategory(newCategory);

    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

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
            {categories.map((cat) => {
              const isActive =
                (cat.slug === null && activeCategory === "All") ||
                activeCategory === cat.slug;

              return (
                <button
                  key={cat.slug || "all"}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`shrink-0 rounded-full px-4 py-2 text-small font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-white"
                      : "border border-border bg-bg-tertiary text-text-secondary hover:border-border-hover hover:text-text-primary"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
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
              {products.length}
            </span>{" "}
            product{products.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && (
              <span>
                {" "}
                in{" "}
                <span className="text-accent">
                  {categories.find((c) => c.slug === activeCategory)?.name ||
                    activeCategory}
                </span>
              </span>
            )}
          </p>

          {activeCategory !== "All" && (
            <button
              onClick={() => handleCategoryClick(null)}
              className="flex items-center gap-1 text-tiny text-text-muted hover:text-text-primary transition-colors"
            >
              <X size={12} />
              Clear filter
            </button>
          )}
        </div>

        {/* Content States */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={40} className="animate-spin text-accent" />
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-border bg-bg-tertiary p-16 text-center">
            <p className="text-h4 font-semibold mb-2">Oops!</p>
            <p className="text-small text-text-secondary mb-6">{error}</p>
            <button onClick={() => setPrevKey("")} className="btn-accent">
              Try Again
            </button>
          </div>
        ) : products.length > 0 ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {products.map((product) => (
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
              onClick={() => handleCategoryClick(null)}
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