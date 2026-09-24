import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function SectionHeading({ label, title, subtitle }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 md:mb-16"
    >
      {label && <p className="section-label mb-4">{label}</p>}

      <h2 className="text-3xl md:text-4xl lg:text-h2 font-bold tracking-tight leading-[1.15] mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-body text-text-secondary">{subtitle}</p>
      )}
    </motion.div>
  );
}