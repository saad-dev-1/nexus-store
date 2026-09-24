import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, Zap } from "lucide-react";
import { useCart } from "../context/cartcontext";
import SearchModal from "./searchmodal";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openCart, totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container-custom">
        <nav
          className={`mt-4 flex items-center justify-between rounded-full px-4 md:px-6 py-3 border transition-all duration-300 ease-smooth ${
            scrolled
              ? "bg-bg-secondary/95 backdrop-blur-xl border-border-hover shadow-card"
              : "bg-bg-secondary/70 backdrop-blur-md border-border"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <Zap size={18} className="text-white" fill="white" />
            </span>
            <span className="text-h4 font-bold tracking-tight">NEXUS</span>
          </Link>

          {/* Center Links — Desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-small font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-0.5 md:gap-2">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg-tertiary transition-colors"
            >
              <Search size={18} className="text-text-secondary" />
            </button>

            {/* Cart button — opens drawer */}
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg-tertiary transition-colors"
            >
              <ShoppingBag size={18} className="text-text-secondary" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Shop Now button */}
            <Link
              to="/shop"
              className="hidden md:inline-flex btn-primary !py-2 !px-5 text-small"
            >
              Shop Now
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg-tertiary transition-colors"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden container-custom mt-2">
          <div className="rounded-2xl bg-bg-secondary border border-border p-3 shadow-card backdrop-blur-xl">
            <ul className="flex flex-col gap-1">
              {/* Mobile search button */}
              <li>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-small font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
                >
                  <Search size={16} />
                  Search products
                </button>
              </li>

              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-small font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="pt-1">
                <Link
                  to="/shop"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full"
                >
                  Shop Now
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}