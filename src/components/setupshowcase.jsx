import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { products, formatPrice } from "../data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function SetupShowcase() {
  // Humne yahan 3 specific products select kiye hain jo setup ka hissa hain
  const setupProducts = [
    products.find((p) => p.id === 1), // Headphones
    products.find((p) => p.id === 2), // Power Bank
    products.find((p) => p.id === 4), // LED Strip
  ].filter(Boolean);

  return (
    <section className="section-padding border-t border-border bg-bg-primary">
      <div className="container-custom">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* LEFT — Lifestyle Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden group"
          >
            <img
              src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Ultimate Creator Setup"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Floating Tag */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div>
                <p className="text-tiny font-bold uppercase tracking-widest text-accent mb-1">Curated By NEXUS</p>
                <p className="text-h3 font-extrabold text-white">The Creator Setup</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <ShoppingBag size={20} />
              </span>
            </div>
          </motion.div>

          {/* RIGHT — Product List & Text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col"
          >
            <motion.p variants={fadeUp} className="section-label mb-3">
              Level Up Your Space
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1] mb-4">
              Everything you need, <br className="hidden md:block"/> working in perfect harmony.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body text-text-secondary mb-8 max-w-md">
              We've hand-picked the ultimate gear combo for your desk. Upgrade your audio, keep your devices charged, and set the perfect mood.
            </motion.p>

            {/* Product List */}
            <div className="flex flex-col gap-3 mb-8">
              {setupProducts.map((product) => {
                const Icon = product.icon;
                return (
                  <motion.div key={product.id} variants={fadeUp}>
                    <Link
                      to={`/product/${product.id}`}
                      className="group flex items-center justify-between rounded-2xl border border-border bg-bg-tertiary p-3 transition-all duration-300 hover:border-accent/40 hover:bg-bg-elevated"
                    >
                      <div className="flex items-center gap-4">
                        {/* Thumbnail */}
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-bg-elevated overflow-hidden">
                          <div className="absolute h-8 w-8 rounded-full bg-accent/15 blur-lg" />
                          {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt={product.name} className="relative h-full w-full object-cover" />
                          ) : (
                            <Icon size={24} className="relative text-accent" />
                          )}
                        </div>
                        {/* Info */}
                        <div>
                          <p className="text-small font-semibold text-text-primary group-hover:text-accent transition-colors">
                            {product.name}
                          </p>
                          <p className="text-tiny text-text-muted mt-0.5">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-primary border border-border text-text-secondary group-hover:border-accent group-hover:text-accent transition-colors mr-2">
                        <ArrowRight size={14} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={fadeUp}>
              <Link to="/shop" className="btn-accent group inline-flex">
                Shop The Complete Collection
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}