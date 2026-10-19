import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./sectionheading";
import ProductCard from "./productcard";
import { products } from "../data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Bestsellers() {
  // Hum direct pehle 4 products le rahe hain taake kabhi khali na dikhe
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="Featured"
          title="Top picks this month"
          subtitle="Our current favourite products. Tap to add to your cart."
        />

        {featuredProducts.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                {/* ProductCard tumhari products.js wali exact images use karega */}
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-3xl border border-border bg-bg-tertiary p-16 text-center">
            <p className="text-h4 font-semibold mb-2">No featured products available</p>
            <p className="text-small text-text-secondary">
              Check back later for new drops.
            </p>
          </div>
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