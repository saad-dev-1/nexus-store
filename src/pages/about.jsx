import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target,
  Users,
  Award,
  ShieldCheck,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Quality First",
    description:
      "Every product is hand-picked and verified. No compromises, no fakes.",
  },
  {
    icon: Users,
    title: "Customer Obsessed",
    description:
      "From ordering to delivery — we make sure you're taken care of.",
  },
  {
    icon: Award,
    title: "Honest Pricing",
    description:
      "Fair prices, no hidden charges, no gimmicks. What you see is what you pay.",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "4.9★", label: "Average Rating" },
  { value: "2-4 Days", label: "Delivery Time" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(0,102,255,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="container-custom py-16 md:py-24">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="section-label mb-4">
              About NEXUS
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] leading-[1.05] mb-6"
            >
              Tech accessories,{" "}
              <span className="text-accent">done right.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-body text-text-secondary leading-relaxed max-w-2xl"
            >
              NEXUS was born from a simple frustration — finding genuine,
              high-quality tech accessories in Pakistan was harder than it
              should be. Too many fakes, too many disappointments, too little
              trust.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-body text-text-secondary leading-relaxed max-w-2xl mt-4"
            >
              So we built something better. A store where every product is
              verified, every price is honest, and every customer is treated
              like a friend. Just great gear, delivered fast, all over
              Pakistan.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-bg-secondary">
        <div className="container-custom py-12 md:py-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-small text-text-secondary">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story / Mission */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Image */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="relative aspect-square rounded-3xl border border-border overflow-hidden group"
            >
              {/* Background image */}
              <img
                src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="NEXUS — Modern tech workspace"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* Bottom text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-accent" />
                  <p className="text-tiny font-semibold uppercase tracking-widest text-accent">
                    Est. 2024
                  </p>
                </div>
                <p className="text-h4 font-bold text-white">
                  Built for people who care
                </p>
                <p className="text-small text-white/70 mt-1">
                  Premium gear, honest prices.
                </p>
              </div>
            </motion.div>

            {/* Right — Content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.p variants={fadeUp} className="section-label mb-4">
                Our Mission
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.1] mb-6"
              >
                Make great tech accessible to every Pakistani.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-body text-text-secondary leading-relaxed mb-6"
              >
                We believe you shouldn't have to pay a premium or gamble on
                quality to get reliable tech accessories. Whether you're a
                student, a professional, or a creator — NEXUS is built for you.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                {[
                  "100% original products — sourced from authorized distributors",
                  "Fast delivery — 2-4 days across Pakistan, 1-2 days in major cities",
                  "COD available — pay only when you receive",
                  "7-day returns — no questions asked",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                      <ShieldCheck size={12} className="text-accent" />
                    </span>
                    <span className="text-small text-text-secondary leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-bg-secondary border-y border-border">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
          >
            <p className="section-label mb-4">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.1]">
              Values that guide everything
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-bg-tertiary p-6 transition-all duration-300 hover:border-border-hover hover:bg-bg-elevated"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-soft mb-5 transition-transform duration-300 group-hover:scale-110">
                  <value.icon size={24} className="text-accent" strokeWidth={1.8} />
                </div>

                <h3 className="text-h4 font-semibold mb-2">{value.title}</h3>
                <p className="text-small text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-bg-tertiary via-bg-secondary to-bg-tertiary px-6 py-14 md:py-20 text-center"
          >
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            </div>

            <div className="inline-flex items-center gap-2 mb-4">
              <Heart size={16} className="text-accent" fill="currentColor" />
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.15] mb-4 max-w-2xl mx-auto">
              Ready to upgrade your setup?
            </h2>

            <p className="text-body text-text-secondary max-w-xl mx-auto mb-8">
              Browse our collection and find the perfect gear for you.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/shop" className="btn-accent group">
                Shop Now
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}