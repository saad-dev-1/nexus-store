import { motion } from "framer-motion";
import { Headphones, Zap, ShieldCheck, Home } from "lucide-react";
import SectionHeading from "./sectionheading";

const categories = [
  {
    icon: Headphones,
    title: "Audio",
    description: "Headphones, earbuds, speakers and everything sound.",
    href: "/shop",
    accent: "text-accent",
    accentBg: "bg-accent-soft",
  },
  {
    icon: Zap,
    title: "Power",
    description: "Fast chargers, power banks and premium cables.",
    href: "/shop",
    accent: "text-star",
    accentBg: "bg-star/10",
  },
  {
    icon: ShieldCheck,
    title: "Protection",
    description: "Cases, screen guards and sleeves that actually last.",
    href: "/shop",
    accent: "text-success",
    accentBg: "bg-success/10",
  },
  {
    icon: Home,
    title: "Smart Home",
    description: "Lights, plugs and sensors to upgrade your space.",
    href: "/shop",
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

export default function CategoryGuide() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="Shop by Category"
          title="Gear for every setup"
          subtitle="From audio to power, everything you need — in one place."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {categories.map((cat) => (
            <motion.a
              key={cat.title}
              href={cat.href}
              variants={fadeUp}
              className="group rounded-2xl border border-border bg-bg-tertiary p-6 transition-all duration-300 ease-smooth hover:border-border-hover hover:bg-bg-elevated hover:-translate-y-1"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.accentBg} mb-5 transition-transform duration-300 group-hover:scale-110`}
              >
                <cat.icon size={22} className={cat.accent} strokeWidth={1.8} />
              </div>

              <h3 className="text-h4 font-semibold mb-2">{cat.title}</h3>
              <p className="text-small text-text-secondary leading-relaxed">
                {cat.description}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}