import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  User,
  Phone,
  MapPin,
  Mail,
  MessageCircle,
  Home,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "../context/cartcontext";
import { formatPrice } from "../data/products";

const STORE_WHATSAPP = "923424960779";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();

  // Lazy init — localStorage se auto-fill
  const [form, setForm] = useState(() => {
    const defaults = {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      notes: "",
    };
    try {
      const saved = localStorage.getItem("nexus_customer");
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch {
      return defaults;
    }
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const FREE_SHIPPING_THRESHOLD = 2999;
  const shippingCost =
    totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0 ? 0 : 199;
  const finalTotal = totalPrice + shippingCost;

  // ─── EMPTY CART VIEW ───
  if (items.length === 0 && !orderPlaced) {
    return (
      <section className="section-padding">
        <div className="container-custom text-center py-20">
          <h1 className="text-h2 font-bold mb-4">Your cart is empty</h1>
          <p className="text-body text-text-secondary mb-8">
            Add some items before checkout.
          </p>
          <Link to="/shop" className="btn-accent inline-flex">
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  // ─── ORDER SUCCESS VIEW ───
  if (orderPlaced) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto rounded-3xl border border-border bg-bg-tertiary p-10 md:p-16 text-center"
          >
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-success/10 mb-6">
              <CheckCircle2 size={40} className="text-success" />
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] mb-4">
              Order Confirmed! 🎉
            </h1>

            <p className="text-body text-text-secondary mb-2">
              Thank you,{" "}
              <span className="text-text-primary font-medium">
                {form.fullName}
              </span>
              !
            </p>
            <p className="text-body text-text-secondary mb-8">
              Your order{" "}
              <span className="text-accent font-medium">#{orderId}</span>{" "}
              has been confirmed. We will contact you shortly at{" "}
              <span className="text-accent font-medium">{form.phone}</span> pe
              .
            </p>

            <div className="rounded-2xl border border-border bg-bg-secondary p-5 mb-8 text-left">
              <p className="text-tiny uppercase tracking-widest text-text-muted mb-3">
                Order Summary
              </p>
              <div className="flex items-center justify-between mb-2 text-small">
                <span className="text-text-secondary">Order ID</span>
                <span className="font-medium">#{orderId}</span>
              </div>
              <div className="flex items-center justify-between mb-2 text-small">
                <span className="text-text-secondary">Payment</span>
                <span className="font-medium">
                  {paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2 text-small">
                <span className="text-text-secondary">Delivery to</span>
                <span className="font-medium">{form.city}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="font-semibold">Total</span>
                <span className="text-h4 font-bold text-accent">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            <p className="text-small text-text-muted mb-6">
              Order details have also been sent to WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop" className="btn-accent">
                Continue Shopping
              </Link>
              <a
                href={`https://wa.me/${STORE_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <MessageCircle size={16} />
                Chat with Store
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // ─── VALIDATION (Negative Testing) ───
  const validate = () => {
    const errs = {};

    // FULL NAME: only letters, spaces, hyphens, apostrophes, dots
    const name = form.fullName.trim();
    if (!name) {
      errs.fullName = "Full name required";
    } else if (name.length < 3) {
      errs.fullName = "Name must be at least 3 characters";
    } else if (!/^[a-zA-Z\s'.-]+$/.test(name)) {
      errs.fullName =
        "Name can only contain letters (numbers not allowed)";
    }

    // PHONE: valid Pakistani format
    const phone = form.phone.replace(/[\s-]/g, "");
    if (!phone) {
      errs.phone = "Phone number required";
    } else if (!/^(\+92|92|0)?3\d{9}$/.test(phone)) {
      errs.phone = "Enter a valid Pakistani number (03001234567)";
    } else if (/^(\d)\1{9,}$/.test(phone)) {
      errs.phone = "This number doesn't look valid";
    }

    // EMAIL (optional but if provided, must be valid)
    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      errs.email = "Enter a valid email address";
    }

    // ADDRESS: min length + at least 1 letter
    const address = form.address.trim();
    if (!address) {
      errs.address = "Address required";
    } else if (address.length < 10) {
      errs.address = "Enter a complete address (house #, street, area)";
    } else if (!/[a-zA-Z]/.test(address)) {
      errs.address = "Address must contain letters too";
    }

    // CITY: only letters, min 2 chars
    const city = form.city.trim();
    if (!city) {
      errs.city = "City required";
    } else if (city.length < 2) {
      errs.city = "Enter a valid city name";
    } else if (!/^[a-zA-Z\s-]+$/.test(city)) {
      errs.city = "City can only contain letters";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ─── REAL-TIME INPUT FILTERING ───
  const handleChange = (field, value) => {
    let cleaned = value;

    if (field === "fullName") {
      cleaned = value.replace(/[^a-zA-Z\s'.-]/g, "");
    }
    if (field === "phone") {
      cleaned = value.replace(/[^\d+\s-]/g, "");
    }
    if (field === "city") {
      cleaned = value.replace(/[^a-zA-Z\s-]/g, "");
    }

    setForm((prev) => ({ ...prev, [field]: cleaned }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // ─── GENERATE ORDER ID ───
  const generateOrderId = () => {
    const timestamp = Date.now().toString().slice(-6);
    return `NX${timestamp}`;
  };

  // ─── BUILD WHATSAPP MESSAGE ───
  const buildWhatsAppMessage = (id) => {
    const paymentLabel =
      paymentMethod === "cod"
        ? "Cash on Delivery"
        : paymentMethod === "jazzcash"
          ? "JazzCash / EasyPaisa"
          : "Bank Transfer";

    let msg = `🛒 *NEW ORDER — NEXUS*%0A%0A`;
    msg += `*Order ID:* #${id}%0A`;
    msg += `*Customer:* ${form.fullName}%0A`;
    msg += `*Phone:* ${form.phone}%0A`;
    if (form.email) msg += `*Email:* ${form.email}%0A`;
    msg += `%0A*📦 DELIVERY ADDRESS*%0A`;
    msg += `${form.address}%0A`;
    msg += `${form.city}${form.postalCode ? ", " + form.postalCode : ""}%0A`;
    msg += `%0A*💳 PAYMENT:* ${paymentLabel}%0A`;
    msg += `%0A*🛍️ ITEMS (${items.length})*%0A`;

    items.forEach((item) => {
      msg += `• ${item.name}%0A`;
      msg += `   Qty: ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(
        item.price * item.quantity,
      )}%0A`;
    });

    msg += `%0A*Subtotal:* ${formatPrice(totalPrice)}%0A`;
    msg += `*Shipping:* ${
      shippingCost === 0 ? "FREE" : formatPrice(shippingCost)
    }%0A`;
    msg += `*TOTAL:* ${formatPrice(finalTotal)}%0A`;

    if (form.notes) {
      msg += `%0A*📝 NOTES*%0A${form.notes}%0A`;
    }

    msg += `%0A%0AThank you! 🙌`;
    return msg;
  };

  // ─── SUBMIT HANDLER ───
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    // Save customer info for next order (auto-fill)
    localStorage.setItem("nexus_customer", JSON.stringify(form));

    // Build WhatsApp URL
    const message = buildWhatsAppMessage(newOrderId);
    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP}?text=${message}`;

    // Open WhatsApp IMMEDIATELY
    const whatsappWindow = window.open(whatsappUrl, "_blank");

    if (!whatsappWindow) {
      alert(
        "WhatsApp could not open. Please disable popup blocker, or send your order directly on WhatsApp: +92 342 4960779",
      );
    }

    // UI update
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-small text-text-secondary hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Cart
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] mb-2">
            Checkout
          </h1>
          <p className="text-body text-text-secondary">
            Fill in your details and place your order.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Contact Info */}
              <div className="rounded-3xl border border-border bg-bg-tertiary p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft">
                    <User size={16} className="text-accent" />
                  </div>
                  <h2 className="text-h4 font-semibold">Contact Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Full Name"
                    icon={User}
                    placeholder="Ahmed Khan"
                    value={form.fullName}
                    onChange={(v) => handleChange("fullName", v)}
                    error={errors.fullName}
                  />
                  <FormInput
                    label="Phone Number"
                    icon={Phone}
                    placeholder="03001234567"
                    value={form.phone}
                    onChange={(v) => handleChange("phone", v)}
                    error={errors.phone}
                  />
                  <div className="md:col-span-2">
                    <FormInput
                      label="Email (optional)"
                      icon={Mail}
                      placeholder="you@example.com"
                      type="email"
                      value={form.email}
                      onChange={(v) => handleChange("email", v)}
                      error={errors.email}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="rounded-3xl border border-border bg-bg-tertiary p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft">
                    <MapPin size={16} className="text-accent" />
                  </div>
                  <h2 className="text-h4 font-semibold">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <FormInput
                      label="Street Address"
                      icon={Home}
                      placeholder="House #, Street, Area"
                      value={form.address}
                      onChange={(v) => handleChange("address", v)}
                      error={errors.address}
                    />
                  </div>
                  <FormInput
                    label="City"
                    icon={Building2}
                    placeholder="Karachi"
                    value={form.city}
                    onChange={(v) => handleChange("city", v)}
                    error={errors.city}
                  />
                  <FormInput
                    label="Postal Code (optional)"
                    icon={MapPin}
                    placeholder="75500"
                    value={form.postalCode}
                    onChange={(v) => handleChange("postalCode", v)}
                  />
                  <div className="md:col-span-2">
                    <label className="text-small font-medium text-text-secondary mb-2 block">
                      Order Notes (optional)
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      placeholder="Any special instructions?"
                      rows={3}
                      className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-small text-text-primary placeholder:text-text-muted outline-none transition-all duration-300 focus:border-accent focus:ring-1 focus:ring-accent/30 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-3xl border border-border bg-bg-tertiary p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft">
                    <ShieldCheck size={16} className="text-accent" />
                  </div>
                  <h2 className="text-h4 font-semibold">Payment Method</h2>
                </div>

                <div className="flex flex-col gap-3">
                  <PaymentOption
                    label="Cash on Delivery"
                    description="Pay when you receive — available all over Pakistan"
                    selected={paymentMethod === "cod"}
                    onSelect={() => setPaymentMethod("cod")}
                    badge="RECOMMENDED"
                  />
                  <PaymentOption
                    label="JazzCash / EasyPaisa"
                    description="Mobile wallet payment (details sent on WhatsApp)"
                    selected={paymentMethod === "jazzcash"}
                    onSelect={() => setPaymentMethod("jazzcash")}
                  />
                  <PaymentOption
                    label="Bank Transfer"
                    description="Direct bank transfer (Meezan, HBL, UBL)"
                    selected={paymentMethod === "bank"}
                    onSelect={() => setPaymentMethod("bank")}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT — Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-3xl border border-border bg-bg-tertiary p-6">
                <h2 className="text-h4 font-semibold mb-5">Order Summary</h2>

                <div className="flex flex-col gap-3 pb-5 mb-5 border-b border-border max-h-60 overflow-y-auto">
                  {items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-bg-elevated overflow-hidden">
                          <div className="absolute h-8 w-8 rounded-full bg-accent/15 blur-lg" />
                          {Icon && (
                            <Icon
                              size={20}
                              className="relative text-accent"
                              strokeWidth={1.5}
                            />
                          )}
                          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-[10px] font-bold text-white flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-tiny font-medium text-text-primary truncate">
                            {item.name}
                          </p>
                          <p className="text-tiny text-text-muted">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-3 pb-5 border-b border-border">
                  <div className="flex items-center justify-between text-small">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="font-medium">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-small">
                    <span className="text-text-secondary">Shipping</span>
                    <span
                      className={`font-medium ${
                        shippingCost === 0 ? "text-success" : ""
                      }`}
                    >
                      {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-5">
                  <span className="text-body font-semibold">Total</span>
                  <span className="text-h4 font-bold">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-accent w-full mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </button>

                <p className="text-tiny text-text-muted text-center mb-4">
                  Order details will be sent to WhatsApp
                </p>

                <div className="flex flex-col gap-2 pt-5 border-t border-border">
                  <div className="flex items-center gap-2 text-tiny text-text-secondary">
                    <ShieldCheck size={14} className="text-success" />
                    COD available
                  </div>
                  <div className="flex items-center gap-2 text-tiny text-text-secondary">
                    <Truck size={14} className="text-accent" />
                    Delivery in 2-4 days
                  </div>
                  <div className="flex items-center gap-2 text-tiny text-text-secondary">
                    <RotateCcw size={14} className="text-star" />
                    7-day returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function FormInput({
  label,
  icon: Icon,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}) {
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

function PaymentOption({ label, description, selected, onSelect, badge }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
        selected
          ? "border-accent bg-accent-soft"
          : "border-border bg-bg-secondary hover:border-border-hover"
      }`}
    >
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 mt-0.5 transition-colors ${
          selected ? "border-accent bg-accent" : "border-border-strong"
        }`}
      >
        {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="text-small font-semibold text-text-primary">
            {label}
          </span>
          {badge && (
            <span className="rounded-full bg-success/15 text-success px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
        <p className="text-tiny text-text-secondary">{description}</p>
      </div>
    </button>
  );
}
