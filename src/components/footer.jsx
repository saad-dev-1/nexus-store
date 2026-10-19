import { Link } from "react-router-dom";
import { Zap, MessageCircle, Mail, MapPin } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
// Real brand icons import kiye hain
import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Audio", href: "/shop?category=audio" },
    { label: "Power", href: "/shop?category=power" },
    { label: "Protection", href: "/shop?category=protection" },
    { label: "Smart Home", href: "/shop?category=smart-home" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "About NEXUS", href: "/about" },
    { label: "My Orders", href: "/orders" },
    { label: "My Profile", href: "/profile" },
  ],
  company: [
    { label: "About NEXUS", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Shop All", href: "/shop" },
  ],
};

// Ab yahan real icons use ho rahe hain
const socials = [
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    icon: FaFacebookF,
  },
  {
    label: "Twitter",
    href: siteConfig.social.twitter,
    icon: FaTwitter,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${siteConfig.whatsappNumber}`,
    icon: FaWhatsapp,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="container-custom py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                <Zap size={18} className="text-white" fill="white" />
              </span>
              <span className="text-h4 font-bold tracking-tight">
                {siteConfig.brandName}
              </span>
            </Link>

            <p className="text-small text-text-secondary leading-relaxed mb-5 max-w-xs">
              {siteConfig.description}
            </p>

            <p className="text-tiny text-text-muted italic mb-6">
              "{siteConfig.taglineRoman}"
            </p>

            <div className="flex flex-col gap-2 mb-6">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-small text-text-secondary hover:text-text-primary transition-colors"
              >
                <MessageCircle size={14} className="text-success" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-small text-text-secondary hover:text-text-primary transition-colors break-all"
              >
                <Mail size={14} className="text-accent" />
                {siteConfig.email}
              </a>
              <p className="flex items-center gap-2 text-small text-text-secondary">
                <MapPin size={14} className="text-star" />
                {siteConfig.address}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-tertiary text-text-secondary transition-all duration-300 hover:bg-accent hover:border-accent hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-tiny font-semibold uppercase tracking-widest text-text-primary mb-4">
              Shop
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-small text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-tiny font-semibold uppercase tracking-widest text-text-primary mb-4">
              Support
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-small text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-tiny font-semibold uppercase tracking-widest text-text-primary mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-small text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2">
            <h4 className="text-tiny font-semibold uppercase tracking-widest text-text-primary mb-4">
              Newsletter
            </h4>
            <p className="text-small text-text-secondary mb-4">
              Deals, drops, and early access. Straight to your inbox.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-full border border-border bg-bg-primary px-4 py-2.5 text-small text-text-primary placeholder:text-text-muted outline-none transition-all duration-300 focus:border-accent focus:ring-1 focus:ring-accent/30"
              />
              <button className="btn-accent w-full !py-2.5 text-small">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-t border-border">
          <div>
            <p className="text-tiny font-semibold uppercase tracking-widest text-text-muted mb-3">
              Secure Payment Methods
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {siteConfig.payments.map((method) => (
                <span
                  key={method}
                  className="rounded-lg border border-border bg-bg-tertiary px-3 py-1.5 text-tiny font-medium text-text-secondary"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right">
            <p className="text-tiny font-semibold uppercase tracking-widest text-text-muted mb-1">
              100% Original
            </p>
            <p className="text-small text-text-secondary">
              Sourced from authorized distributors
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-border">
          <p className="text-tiny text-text-muted">
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/about"
              className="text-tiny text-text-muted hover:text-text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-tiny text-text-muted hover:text-text-primary transition-colors"
            >
              Contact
            </Link>
            <span className="text-tiny text-text-muted">
              Made in Pakistan 🇵🇰
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}