import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "./sectionheading";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Reviews() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="Reviews"
          title="Customer reviews coming soon"
          subtitle="We're collecting verified reviews from our customers. Check back soon."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto rounded-3xl border border-border bg-bg-tertiary p-10 md:p-14 text-center"
        >
          <div className="flex justify-center mb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <MessageSquare size={28} className="text-accent" />
            </div>
          </div>

          <div className="flex justify-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className="text-text-muted"
                fill="currentColor"
              />
            ))}
          </div>

          <h3 className="text-h4 font-semibold mb-3">
            Be the first to share your experience
          </h3>

          <p className="text-body text-text-secondary mb-7 max-w-md mx-auto">
            Bought something from us? We'd love to hear what you think.
            Your feedback helps other customers make better choices.
          </p>

          <Link to="/shop" className="btn-accent inline-flex">
            Start Shopping
          </Link>
        </motion.div>
      </div>
    </section>
  );
}