import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Clock,
  User,
  Send,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "../data/siteConfig";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: siteConfig.phone,
      href: `https://wa.me/${siteConfig.whatsappNumber}`,
      accent: "text-success",
      accentBg: "bg-success/10",
      note: "Fastest response — 24/7",
    },
    {
      icon: Mail,
      title: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      accent: "text-accent",
      accentBg: "bg-accent-soft",
      note: "Reply within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phoneLink}`,
      accent: "text-star",
      accentBg: "bg-star/10",
      note: "Mon–Sat, 10AM–8PM",
    },
    {
      icon: MapPin,
      title: "Address",
      value: siteConfig.address,
      href: null,
      accent: "text-purple-400",
      accentBg: "bg-purple-400/10",
      note: "Ship across Pakistan",
    },
  ];

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name required";
    if (!form.email.trim()) errs.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Valid email daalein";
    if (!form.message.trim()) errs.message = "Message required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // WhatsApp pe message bhejo
    const msg = `Hi NEXUS!%0A%0AName: ${form.name}%0AEmail: ${form.email}%0A%0A${form.message}`;
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${msg}`;
    window.open(url, "_blank");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 800);
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(0,102,255,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="container-custom py-16 md:py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-2xl mx-auto text-center"
          >
            <motion.p variants={fadeUp} className="section-label mb-4">
              Get in Touch
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold tracking-[-0.04em] leading-[1.05] mb-4"
            >
              We'd love to <span className="text-accent">hear from you.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-body text-text-secondary leading-relaxed"
            >
              Questions, suggestions, or just want to say hi? Reach out — we respond fast.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const content = (
                <div className="group h-full rounded-2xl border border-border bg-bg-tertiary p-5 transition-all duration-300 hover:border-border-hover hover:bg-bg-elevated hover:-translate-y-1">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${method.accentBg} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={22} className={method.accent} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-small font-semibold text-text-primary mb-1">
                    {method.title}
                  </h3>
                  <p className="text-small font-medium text-text-primary mb-1 break-all">
                    {method.value}
                  </p>
                  <p className="text-tiny text-text-muted">{method.note}</p>
                </div>
              );

              return (
                <motion.div key={method.title} variants={fadeUp}>
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-2"
            >
              <motion.p variants={fadeUp} className="section-label mb-4">
                Reach Out
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.1] mb-6"
              >
                Send us a message
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-body text-text-secondary leading-relaxed mb-8"
              >
                Whether it's about an order, a product question, or just feedback — we read every message and reply fast.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/10">
                    <Clock size={16} className="text-success" />
                  </div>
                  <div>
                    <p className="text-small font-medium text-text-primary mb-0.5">
                      Fast response
                    </p>
                    <p className="text-tiny text-text-secondary">
                      Average reply within 2 hours on WhatsApp
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                    <MessageCircle size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-small font-medium text-text-primary mb-0.5">
                      Prefer WhatsApp?
                    </p>
                    <p className="text-tiny text-text-secondary">
                      Click the floating button below or message us directly
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-star/10">
                    <MapPin size={16} className="text-star" />
                  </div>
                  <div>
                    <p className="text-small font-medium text-text-primary mb-0.5">
                      Delivery across Pakistan
                    </p>
                    <p className="text-tiny text-text-secondary">
                      Karachi, Lahore, Islamabad & all major cities
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-3"
            >
              <div className="rounded-3xl border border-border bg-bg-tertiary p-6 md:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-5">
                      <CheckCircle2 size={32} className="text-success" />
                    </div>
                    <h3 className="text-h4 font-semibold mb-2">
                      Message bhej diya! ✨
                    </h3>
                    <p className="text-small text-text-secondary">
                      Hum jaldi hi reply karenge.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <FormField
                      label="Your Name"
                      icon={User}
                      placeholder="Ahmed Khan"
                      value={form.name}
                      onChange={(v) => handleChange("name", v)}
                      error={errors.name}
                    />

                    <FormField
                      label="Email"
                      icon={Mail}
                      placeholder="you@example.com"
                      type="email"
                      value={form.email}
                      onChange={(v) => handleChange("email", v)}
                      error={errors.email}
                    />

                    <div>
                      <label className="text-small font-medium text-text-secondary mb-2 block">
                        Message
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Apna message yahan likhein..."
                        rows={5}
                        className={`w-full rounded-xl border bg-bg-primary px-4 py-3 text-small text-text-primary placeholder:text-text-muted outline-none transition-all duration-300 focus:ring-1 resize-none ${
                          errors.message
                            ? "border-error focus:border-error focus:ring-error/30"
                            : "border-border focus:border-accent focus:ring-accent/30"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-tiny text-error mt-1.5">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-accent w-full group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : (
                        <>
                          Send Message
                          <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function FormField({ label, icon: Icon, placeholder, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="text-small font-medium text-text-secondary mb-2 block">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
        />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-bg-primary pl-11 pr-4 py-3 text-small text-text-primary placeholder:text-text-muted outline-none transition-all duration-300 focus:ring-1 ${
            error
              ? "border-error focus:border-error focus:ring-error/30"
              : "border-border focus:border-accent focus:ring-accent/30"
          }`}
        />
      </div>
      {error && <p className="text-tiny text-error mt-1.5">{error}</p>}
    </div>
  );
}

