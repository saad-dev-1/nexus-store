import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(0,102,255,0.08) 0%, transparent 55%)",
        }}
      />

      <div className="container-custom py-4 md:py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* LEFT — Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 flex flex-col items-start"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 mb-5"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-star" fill="currentColor" />
                ))}
              </div>
              <span className="text-tiny text-text-secondary font-medium">
                Rated 4.9 • 10,000+ customers
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] leading-[1.03] mb-5"
            >
              Gear that{" "}
              <span className="text-accent">keeps up</span>{" "}
              with you.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-body text-text-secondary max-w-xl mb-7"
            >
              Premium tech accessories, curated for Pakistan. Fast delivery,
              Cash on Delivery, and a 1-year warranty on everything we sell.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <Link to="/shop" className="btn-accent group">
                Shop Bestsellers
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link to="/shop" className="btn-outline">
                Explore Categories
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {[
                { icon: Truck, text: "Free delivery above Rs. 2,999" },
                { icon: ShieldCheck, text: "COD all over Pakistan" },
                { icon: RotateCcw, text: "7-day easy returns" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon size={16} className="text-accent" />
                  <span className="text-small text-text-secondary">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — 5-Tile Grid (Over Version) */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 relative"
          >
            <div className="relative grid grid-cols-12 grid-rows-12 gap-3 h-[400px] md:h-[480px] lg:h-[500px]">

              {/* Audio image */}
              <motion.div
                variants={fadeUp}
                className="col-span-7 row-span-7 rounded-3xl border border-border overflow-hidden relative group"
              >
                <img
                  src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Audio Collection"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <p className="text-tiny font-semibold uppercase tracking-widest text-accent mb-1">
                    Featured
                  </p>
                  <p className="text-h4 font-bold text-white">Audio Collection</p>
                  <p className="text-tiny text-white/70 mt-0.5">Headphones • Earbuds</p>
                </div>
              </motion.div>

              {/* Power image */}
              <motion.div
                variants={fadeUp}
                className="col-span-5 row-span-4 rounded-3xl border border-border overflow-hidden relative group"
              >
                <img
                  src="https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Power Gear"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <p className="text-small font-bold text-white">Power Gear</p>
                  <p className="text-tiny text-white/70 mt-0.5">Chargers • Banks</p>
                </div>
              </motion.div>

              {/* 500+ badge */}
              <motion.div
                variants={fadeUp}
                className="col-span-5 row-span-3 rounded-3xl border border-border bg-gradient-to-br from-bg-tertiary to-bg-secondary p-4 flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-accent/20 blur-2xl" />
                <p className="text-h3 font-extrabold text-accent relative leading-none">
                  500+
                </p>
                <p className="text-tiny text-text-muted mt-1 relative">
                  Products in stock
                </p>
              </motion.div>

              {/* Protection image */}
              <motion.div
                variants={fadeUp}
                className="col-span-7 row-span-5 rounded-3xl border border-border overflow-hidden relative group"
              >
                <img
                  src="https://picsum.photos/seed/protection1/800/600"
                  alt="Protection Range"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <p className="text-small font-bold text-white">Protection Range</p>
                  <p className="text-tiny text-white/70 mt-0.5">Cases • Guards</p>
                </div>
              </motion.div>

              {/* 1 Year badge */}
              <motion.div
                variants={fadeUp}
                className="col-span-5 row-span-5 rounded-3xl border border-border bg-gradient-to-br from-success/10 via-bg-tertiary to-bg-secondary p-4 flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-success/20 blur-2xl" />
                <p className="text-h3 font-extrabold text-success relative leading-none">
                  1 Year
                </p>
                <p className="text-tiny text-text-muted mt-1 relative">
                  Warranty included
                </p>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}