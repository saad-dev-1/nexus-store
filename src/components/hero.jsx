import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";

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
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(0,102,255,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="container-custom pt-2 pb-4 md:pt-4 md:pb-6 lg:pt-6 lg:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* LEFT — Premium Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 flex flex-col items-start relative z-10 lg:pt-2"
          >
            <motion.div
              variants={fadeUp}
              className="group inline-flex items-center gap-2 rounded-full border border-accent/20 bg-bg-secondary/40 backdrop-blur-md pl-3 pr-4 py-1.5 mb-5 transition-all duration-300 hover:border-accent/40 hover:bg-bg-secondary/60 cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-[11px] text-text-secondary font-semibold tracking-wider uppercase group-hover:text-text-primary transition-colors">
                New Arrivals Dropping Weekly
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-[3.8rem] font-extrabold tracking-[-0.04em] leading-[1.05] mb-5 text-white"
            >
              Gear that{" "}
              <span className="bg-gradient-to-r from-accent via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,102,255,0.3)]">
                keeps up
              </span>{" "}
              with you.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-text-secondary max-w-[480px] mb-7 leading-relaxed font-light"
            >
              Premium tech accessories, curated for Pakistan. Fast delivery,
              Cash on Delivery, and a 1-year warranty on everything we sell.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 w-full sm:w-auto"
            >
              <Link 
                to="/shop" 
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white text-bg-primary px-7 py-3.5 text-small font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Shop Bestsellers
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link 
                to="/shop" 
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-bg-secondary/30 px-7 py-3.5 text-small font-semibold text-text-primary transition-all duration-300 hover:border-accent hover:bg-accent/5 hover:text-accent"
              >
                Explore Categories
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-5 border-t border-border/40 w-full"
            >
              {[
                { icon: Truck, text: "Free delivery above Rs. 2,999" },
                { icon: ShieldCheck, text: "COD all over Pakistan" },
                { icon: RotateCcw, text: "7-day easy returns" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 group cursor-default">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-tertiary border border-border/60 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300">
                    <Icon size={12} className="text-accent transition-transform group-hover:scale-110" />
                  </div>
                  <span className="text-[13px] font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                    {text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — 5-Tile Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 relative"
          >
            <div className="relative grid grid-cols-12 grid-rows-12 gap-3 h-[400px] md:h-[480px] lg:h-[500px]">

              {/* Audio image */}
              <motion.div variants={fadeUp} className="col-span-7 row-span-7">
                <Link
                  to="/shop?category=audio"
                  className="group block h-full rounded-3xl border border-border overflow-hidden relative shadow-2xl shadow-black/50"
                >
                  <img
                    src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Audio Collection"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Base dark overlay + gradient to tone down brightness */}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                    <p className="text-tiny font-semibold uppercase tracking-widest text-accent mb-1">
                      Featured
                    </p>
                    <p className="text-h4 font-bold text-white">Audio Collection</p>
                    <p className="text-tiny text-white/70 mt-0.5">Headphones • Earbuds</p>
                  </div>
                </Link>
              </motion.div>

              {/* Power image */}
              <motion.div variants={fadeUp} className="col-span-5 row-span-4">
                <Link
                  to="/shop?category=power"
                  className="group block h-full rounded-3xl border border-border overflow-hidden relative shadow-2xl shadow-black/50"
                >
                  <img
                    src="https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Power Gear"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                    <p className="text-small font-bold text-white">Power Gear</p>
                    <p className="text-tiny text-white/70 mt-0.5">Chargers • Banks</p>
                  </div>
                </Link>
              </motion.div>

              {/* 100% badge — depth & subtle border added */}
              <motion.div
                variants={fadeUp}
                className="col-span-5 row-span-3 rounded-3xl border border-accent/20 bg-bg-tertiary/80 backdrop-blur-md p-4 flex flex-col justify-center relative overflow-hidden group shadow-lg shadow-black/40"
              >
                <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-accent/20 blur-2xl transition-all duration-500 group-hover:bg-accent/40" />
                <p className="text-h3 font-bold text-accent relative leading-none drop-shadow-md">
                  100%
                </p>
                <p className="text-tiny text-text-secondary mt-1 relative font-medium">
                  Original products
                </p>
              </motion.div>

              {/* Protection image */}
              <motion.div variants={fadeUp} className="col-span-7 row-span-5">
                <Link
                  to="/shop?category=protection"
                  className="group block h-full rounded-3xl border border-border overflow-hidden relative shadow-2xl shadow-black/50"
                >
                  <img
                    src="https://picsum.photos/seed/protection1/800/600"
                    alt="Protection Range"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                    <p className="text-small font-bold text-white">Protection Range</p>
                    <p className="text-tiny text-white/70 mt-0.5">Cases • Guards</p>
                  </div>
                </Link>
              </motion.div>

              {/* 1 Year badge — color changed to Amber/Gold & depth added */}
              <motion.div
                variants={fadeUp}
                className="col-span-5 row-span-5 rounded-3xl border border-amber-400/20 bg-bg-tertiary/80 backdrop-blur-md p-4 flex flex-col justify-center relative overflow-hidden group shadow-lg shadow-black/40"
              >
                <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-amber-400/20 blur-2xl transition-all duration-500 group-hover:bg-amber-400/40" />
                <p className="text-h3 font-bold text-amber-400 relative leading-none drop-shadow-md">
                  1 Year
                </p>
                <p className="text-tiny text-text-secondary mt-1 relative font-medium">
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