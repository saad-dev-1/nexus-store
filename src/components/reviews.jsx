import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import SectionHeading from "./sectionheading";

const reviews = [
  {
    rating: 5,
    text: "Ordered at 9pm, delivery next day in Karachi. Original product, sealed packaging. Highly recommended.",
    name: "Ahmed K.",
    city: "Karachi",
  },
  {
    rating: 5,
    text: "Prices are honest and quality is top-notch. COD option made it easy. Will definitely order again.",
    name: "Fatima S.",
    city: "Lahore",
  },
  {
    rating: 5,
    text: "Customer service on WhatsApp was quick and helpful. Product arrived in 2 days. Genuine experience.",
    name: "Hassan M.",
    city: "Islamabad",
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

export default function Reviews() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="Reviews"
          title="10,000 customers. One standard."
          subtitle="Real words from verified Pakistani customers."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-border bg-bg-tertiary p-6 transition-all duration-300 ease-smooth hover:border-border-hover hover:bg-bg-elevated"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} size={14} className="text-star" fill="currentColor" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-body text-text-primary leading-relaxed mb-6 flex-1">
                "{review.text}"
              </p>

              {/* Divider */}
              <div className="divider mb-5" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 size={16} className="text-success" />
                </div>
                <div>
                  <p className="text-small font-semibold text-text-primary">
                    {review.name}
                  </p>
                  <p className="text-tiny text-text-muted">
                    Verified buyer • {review.city}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}