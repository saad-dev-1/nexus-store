import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    // Baad mein API call yahan aayegi
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-bg-tertiary via-bg-secondary to-bg-tertiary px-6 py-14 md:py-20 text-center"
        >
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          </div>

          {/* Pill label */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary/60 backdrop-blur-sm px-4 py-2 mb-6">
            <Sparkles size={14} className="text-accent" />
            <span className="text-tiny font-semibold uppercase tracking-widest text-text-secondary">
              Join the Club
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-h2 font-bold tracking-tight leading-[1.15] mb-4 max-w-2xl mx-auto">
            10% off your first order
          </h2>

          {/* Subtext */}
          <p className="text-body text-text-secondary max-w-xl mx-auto mb-8">
            Get early access to new drops, exclusive deals, and insider-only offers.
          </p>

          {/* Inline form */}
        <form
  onSubmit={handleSubmit}
  className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto w-full px-4"
>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-border bg-bg-primary px-5 py-3 text-small text-text-primary placeholder:text-text-muted outline-none transition-all duration-300 focus:border-accent focus:ring-1 focus:ring-accent/30"
            />
            <button
              type="submit"
              className="btn-accent whitespace-nowrap group"
            >
              {submitted ? "Subscribed ✓" : "Join Free"}
              {!submitted && (
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          {/* Disclaimer */}
          <p className="text-tiny text-text-muted mt-5">
            No spam, unsubscribe any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}