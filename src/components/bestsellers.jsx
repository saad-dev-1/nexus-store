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

export default function BestSellers() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="Bestsellers"
          title="Flying off the shelves"
          subtitle="Live stock, real prices. Tap to add to your cart."
        />

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

        {/* View all button */}
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