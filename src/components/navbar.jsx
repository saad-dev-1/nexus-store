import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, Zap, User, LogOut, Package } from "lucide-react";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/authcontext";
import SearchModal from "./searchmodal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { openCart, totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClick = () => setUserMenuOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [userMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

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
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
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
              className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg-tertiary transition-colors"
            >
              <Search size={18} className="text-text-secondary" />
            </button>

            {/* User menu (desktop) */}
            <div className="hidden lg:block relative">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!userMenuOpen);
                    }}
                    aria-label="User menu"
                    className="flex items-center gap-1.5 h-9 px-3 rounded-full hover:bg-bg-tertiary transition-colors"
                  >
                    <User size={18} className="text-text-secondary" />
                    <span className="text-small font-medium text-text-secondary max-w-[80px] truncate">
                      {user?.name?.split(" ")[0]}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-full mt-2 min-w-[180px] rounded-2xl border border-border bg-bg-secondary p-1.5 shadow-2xl z-50"
                    >
                      <div className="px-3 py-2 border-b border-border mb-1">
                        <p className="text-tiny font-semibold text-text-primary truncate">
                          {user?.name}
                        </p>
                        <p className="text-tiny text-text-muted truncate">
                          {user?.email}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-small text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors"
                      >
                        <User size={14} />
                        My Profile
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-small text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors"
                      >
                        <Package size={14} />
                        My Orders
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-small text-error hover:bg-error/10 transition-colors"
                      >
                        <LogOut size={14} />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  aria-label="Login"
                  className="flex items-center gap-1.5 h-9 px-3 rounded-full hover:bg-bg-tertiary transition-colors"
                >
                  <User size={18} className="text-text-secondary" />
                  <span className="text-small font-medium text-text-secondary">
                    Login
                  </span>
                </Link>
              )}
            </div>

            {/* Cart button */}
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
              className="hidden lg:inline-flex btn-primary !py-2 !px-5 text-small"
            >
              Shop Now
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg-tertiary transition-colors"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden container-custom mt-2">
          <div className="rounded-2xl bg-bg-secondary border border-border p-3 shadow-card backdrop-blur-xl">
            <ul className="flex flex-col gap-1">
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

              {/* Auth (mobile) */}
              {isAuthenticated ? (
                <>
                  <li className="border-t border-border pt-2 mt-1">
                    <div className="px-4 py-2">
                      <p className="text-tiny font-semibold text-text-primary truncate">
                        {user?.name}
                      </p>
                      <p className="text-tiny text-text-muted truncate">
                        {user?.email}
                      </p>
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-small font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
                    >
                      <User size={16} />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-small font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
                    >
                      <Package size={16} />
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-small font-medium text-error hover:bg-error/10 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="border-t border-border pt-2 mt-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-small font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
                  >
                    <User size={16} />
                    Login / Register
                  </Link>
                </li>
              )}

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