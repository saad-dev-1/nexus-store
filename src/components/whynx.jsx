import { motion } from "framer-motion";
import { Package, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import SectionHeading from "./sectionheading";

const features = [
  {
    icon: Package,
    title: "100% Original Products",
    description: "Sourced from authorized distributors. Real products, real warranty.",
    accent: "text-accent",
    accentBg: "bg-accent-soft",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day dispatch before 3PM. 2-4 days across Pakistan.",
    accent: "text-star",
    accentBg: "bg-star/10",
  },
  {
    icon: ShieldCheck,
    title: "COD Available",
    description: "Pay when you receive. Available in every city of Pakistan.",
    accent: "text-success",
    accentBg: "bg-success/10",
  },
  {
    icon: RotateCcw,
    title: "7-Day Returns",
    description: "No questions asked. Easy returns on all eligible orders.",
    accent: "text-purple-400",
    accentBg: "bg-purple-400/10",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function WhyNx() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="Why NEXUS"
          title="Built for people who care about their gear"
          subtitle="Original products, fast delivery, honest prices. No gimmicks."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="group rounded-2xl border border-border bg-bg-tertiary p-6 transition-all duration-300 ease-smooth hover:border-border-hover hover:bg-bg-elevated"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${feature.accentBg} mb-5 transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon size={24} className={feature.accent} strokeWidth={1.8} />
              </div>

              <h3 className="text-h4 font-semibold mb-2">{feature.title}</h3>
              <p className="text-small text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}