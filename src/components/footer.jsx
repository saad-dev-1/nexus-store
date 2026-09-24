import { Link } from "react-router-dom";
import { Zap, MessageCircle, Mail, MapPin } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Audio", href: "/categories/audio" },
    { label: "Power", href: "/categories/power" },
    { label: "Protection", href: "/categories/protection" },
    { label: "New Arrivals", href: "/new" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Track Order", href: "/track" },
    { label: "FAQ", href: "/faq" },
  ],
  company: [
    { label: "About NEXUS", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Blog", href: "/blog" },
  ],
};

const socials = [
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: siteConfig.social.twitter,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${siteConfig.whatsappNumber}`,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </svg>
    ),
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
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-tertiary text-text-secondary transition-all duration-300 hover:bg-accent hover:border-accent hover:text-white"
                >
                  {social.svg}
                </a>
              ))}
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
              Verified by 10,000+ customers
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-border">
          <p className="text-tiny text-text-muted">
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="text-tiny text-text-muted hover:text-text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-tiny text-text-muted hover:text-text-primary transition-colors"
            >
              Terms
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
