import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import SectionHeading from "./sectionheading";
import ProductCard from "./productcard";
import { productAPI } from "../services/api";
import { adaptProducts } from "../utils/productAdapter";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const res = await productAPI.list({ featured: true, per_page: 4 });
        if (cancelled) return;
        const raw = res.data.data?.data || res.data.data || [];
        setProducts(adaptProducts(raw));
      } catch (err) {
        if (cancelled) return;
        console.error("Featured products fetch failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
  label="Featured"
  title="Top picks this month"
  subtitle="Our current favourite products. Tap to add to your cart."

        />

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={32} className="animate-spin text-accent" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No featured products available
          </div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link to="/shop" className="btn-outline group">
            View All Products
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}