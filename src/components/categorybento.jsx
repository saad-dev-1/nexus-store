import { motion } from "framer-motion";
import { ArrowUpRight, Headphones, Zap, ShieldCheck, Lightbulb, Cable } from "lucide-react";
import SectionHeading from "./sectionheading";

const categories = [
  {
    title: "Audio",
    description: "Headphones, earbuds and speakers for every mood.",
    href: "/shop",
    size: "large",
    gradient: "from-blue-500/15 via-blue-500/5 to-transparent",
    border: "hover:border-blue-500/30",
    image: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1200",
    fallbackIcon: Headphones,
  },
  {
    title: "Power",
    description: "Fast chargers and banks",
    href: "/shop",
    size: "small",
    gradient: "from-star/10 via-star/5 to-transparent",
    border: "hover:border-star/30",
    image: "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=600",
    fallbackIcon: Zap,
  },
  {
    title: "Protection",
    description: "Cases and guards",
    href: "/shop",
    size: "small",
    gradient: "from-success/10 via-success/5 to-transparent",
    border: "hover:border-success/30",
    image: "https://picsum.photos/seed/protection/600/600",
    fallbackIcon: ShieldCheck,
  },
  {
    title: "Smart Home",
    description: "Lights, plugs, sensors",
    href: "/shop",
    size: "small",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    border: "hover:border-purple-500/30",
    image: "https://picsum.photos/seed/smarthome/600/600",
    fallbackIcon: Lightbulb,
  },
  {
    title: "Accessories",
    description: "Cables, stands and more",
    href: "/shop",
    size: "small",
    gradient: "from-pink-500/10 via-pink-500/5 to-transparent",
    border: "hover:border-pink-500/30",
    image: "https://images.pexels.com/photos/4219862/pexels-photo-4219862.jpeg?auto=compress&cs=tinysrgb&w=600",
    fallbackIcon: Cable,
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

export default function CategoryBento() {
  const large = categories.find((c) => c.size === "large");
  const smalls = categories.filter((c) => c.size === "small");

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="Explore"
          title="Whatever you're building"
          subtitle="Browse by category and find exactly what you need."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5"
        >
          {/* Large featured card */}
          <motion.a
            variants={fadeUp}
            href={large.href}
            className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-border min-h-[340px] lg:min-h-full transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover ${large.border}`}
          >
            <img
              src={large.image}
              alt={large.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
            <div className={`absolute inset-0 bg-gradient-to-br ${large.gradient} opacity-60`} />

            <div className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:rotate-45 z-10">
              <ArrowUpRight size={18} className="text-white" />
            </div>

            <div className="relative z-10 p-8">
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] mb-3 text-white">
                {large.title}
              </h3>
              <p className="text-body text-white/80 max-w-md leading-relaxed">
                {large.description}
              </p>
            </div>
          </motion.a>

          {/* 4 small cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {smalls.map((cat) => {
              const FallbackIcon = cat.fallbackIcon;
              return (
                <motion.a
                  key={cat.title}
                  variants={fadeUp}
                  href={cat.href}
                  className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border min-h-[180px] transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card ${cat.border}`}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-50`} />

                  <div className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 z-10">
                    <FallbackIcon size={16} className="text-white" strokeWidth={1.8} />
                  </div>

                  <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:rotate-45 z-10">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>

                  <div className="relative z-10 p-5">
                    <h3 className="text-h4 font-semibold mb-1.5 text-white">
                      {cat.title}
                    </h3>
                    <p className="text-small text-white/75 leading-snug">
                      {cat.description}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}