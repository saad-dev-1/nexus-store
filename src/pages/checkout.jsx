import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  MapPin,
  Loader2,
  AlertCircle,
  Plus,
  Check,
  Package,
} from "lucide-react";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/authcontext";
import { addressAPI, orderAPI, couponAPI } from "../services/api";
import { formatPrice } from "../data/products";

const FREE_SHIPPING_THRESHOLD = 2999;
const SHIPPING_COST = 199;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart, loading: cartLoading } = useCart();
  const { user, isAuthenticated } = useAuth();

  // ─── Addresses ───
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [addressLoading, setAddressLoading] = useState(true);

  const [newAddress, setNewAddress] = useState({
    label: "Home",
    full_name: user?.name || "",
    phone: user?.phone || "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "Pakistan",
    is_default: false,
  });

  // ─── Order State ───
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  // ─── Redirect if not logged in ───
  useEffect(() => {
    if (!isAuthenticated && !cartLoading) {
      navigate("/login?redirect=/checkout");
    }
  }, [isAuthenticated, cartLoading, navigate]);

  // ─── Load addresses ───
  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;

    const run = async () => {
      try {
        const res = await addressAPI.list();
        if (cancelled) return;

        const list = res.data.data || [];
        setAddresses(list);

        if (list.length > 0) {
          const defaultAddr = list.find((a) => a.is_default) || list[0];
          setSelectedAddressId(defaultAddr.id);
        } else {
          setShowNewAddress(true);
        }
      } catch (err) {
        console.error("Address load failed:", err);
      } finally {
        if (!cancelled) setAddressLoading(false);
      }
    };

    run();

    return () => { cancelled = true; };
  }, [isAuthenticated]);

  // ─── Totals ───
  const shippingCost =
    totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0 ? 0 : SHIPPING_COST;
  const discount = coupon?.discount || 0;
  const finalTotal = totalPrice + shippingCost - discount;

  // ─── Apply Coupon ───
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setCouponError("");
    setCouponLoading(true);

    try {
      const res = await couponAPI.validate(couponCode.trim(), totalPrice);
      setCoupon(res.data.data);
      setCouponError("");
    } catch (err) {
      setCoupon(null);
      setCouponError(
        err.response?.data?.message || "Invalid or expired coupon"
      );
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // ─── Address form handlers ───
  const handleAddressChange = (field, value) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  };

  // ─── Place Order ───
  const handlePlaceOrder = async () => {
    setError("");

    if (!selectedAddressId && !showNewAddress) {
      setError("Please select a delivery address");
      return;
    }

    if (showNewAddress) {
      const required = ["full_name", "phone", "address_line_1", "city"];
      const missing = required.find((f) => !newAddress[f]?.trim());
      if (missing) {
        setError("Please fill all required address fields");
        return;
      }
    }

    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setPlacing(true);

    try {
      let addressId = selectedAddressId;

      if (showNewAddress && !addressId) {
        const addrRes = await addressAPI.create(newAddress);
        addressId = addrRes.data.data.id;
      }

      const orderRes = await orderAPI.create({
        address_id: addressId,
        payment_method: paymentMethod,
        coupon_code: coupon?.code || null,
        notes: notes || null,
      });

      const order = orderRes.data.data;

      await clearCart();

      if (paymentMethod !== "cod") {
        try {
          const payRes = await orderAPI.pay(order.id, paymentMethod);
          if (payRes.data.success && payRes.data.redirect_url) {
            navigate(`/order-success?order=${order.order_number}`);
            return;
          }
        } catch (payErr) {
          console.warn("Payment initiation failed:", payErr);
        }
      }

      navigate(`/order-success?order=${order.order_number}`);
    } catch (err) {
      console.error("Order failed:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.address_id?.[0] ||
        "Order placement failed. Please try again.";
      setError(msg);
    } finally {
      setPlacing(false);
    }
  };

  // ─── Loading / Empty States ───
  if (cartLoading) {
    return (
      <section className="section-padding min-h-[70vh] flex items-center">
        <div className="container-custom flex justify-center">
          <Loader2 size={40} className="animate-spin text-accent" />
        </div>
      </section>
    );
  }

  if (items.length === 0) {
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

  return (
    <section className="section-padding">
      <div className="container-custom max-w-5xl mx-auto">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-small text-text-secondary hover:text-text-primary transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to Cart
        </Link>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[-0.03em] mb-6 md:mb-8">
          Checkout
        </h1>

        {error && (
          <div className="mb-6 flex items-start gap-2 rounded-xl border border-error/30 bg-error/10 p-3">
            <AlertCircle size={16} className="text-error shrink-0 mt-0.5" />
            <p className="text-tiny text-error">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {/* ─── LEFT — Address + Payment + Notes ─── */}
          <div className="lg:col-span-2 flex flex-col gap-5 md:gap-6 order-2 lg:order-1">
            {/* Address Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl md:rounded-3xl border border-border bg-bg-secondary p-4 sm:p-5 md:p-6"
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-accent" />
                  <h2 className="text-h4 font-bold">Delivery Address</h2>
                </div>
                {addresses.length > 0 && (
                  <button
                    onClick={() => setShowNewAddress(!showNewAddress)}
                    className="flex items-center gap-1 text-tiny text-accent hover:underline font-medium"
                  >
                    {showNewAddress ? (
                      <>
                        <Check size={12} /> Use Saved Address
                      </>
                    ) : (
                      <>
                        <Plus size={12} /> New Address
                      </>
                    )}
                  </button>
                )}
              </div>

              {addressLoading ? (
                <div className="flex justify-center py-6">
                  <Loader2 size={20} className="animate-spin text-accent" />
                </div>
              ) : (
                <>
                  {/* Saved Addresses */}
                  {!showNewAddress && addresses.length > 0 && (
                    <div className="space-y-3">
                      {addresses.map((addr) => (
                        <label
                          key={addr.id}
                          className={`flex items-start gap-3 p-3 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedAddressId === addr.id
                              ? "border-accent bg-accent/5"
                              : "border-border bg-bg-tertiary hover:border-border-hover"
                          }`}
                        >
                          <input
                            type="radio"
                            name="address"
                            value={addr.id}
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="mt-1 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-small font-semibold">
                                {addr.full_name}
                              </span>
                              {addr.label && (
                                <span className="rounded-full bg-accent/15 text-accent px-2 py-0.5 text-[10px] font-bold uppercase">
                                  {addr.label}
                                </span>
                              )}
                              {addr.is_default && (
                                <span className="rounded-full bg-success/15 text-success px-2 py-0.5 text-[10px] font-bold uppercase">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-tiny text-text-secondary">
                              {addr.phone}
                            </p>
                            <p className="text-tiny text-text-secondary mt-0.5 break-words">
                              {addr.address_line_1}
                              {addr.address_line_2 && `, ${addr.address_line_2}`}
                              {`, ${addr.city}`}
                              {addr.postal_code && ` - ${addr.postal_code}`}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* New Address Form */}
                  {showNewAddress && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={newAddress.full_name}
                            onChange={(e) =>
                              handleAddressChange("full_name", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-bg-tertiary px-3 py-2.5 text-small focus:border-accent focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                            Phone *
                          </label>
                          <input
                            type="text"
                            value={newAddress.phone}
                            onChange={(e) =>
                              handleAddressChange("phone", e.target.value)
                            }
                            placeholder="03001234567"
                            className="w-full rounded-xl border border-border bg-bg-tertiary px-3 py-2.5 text-small focus:border-accent focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1">
                          <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                            Label
                          </label>
                          <select
                            value={newAddress.label}
                            onChange={(e) =>
                              handleAddressChange("label", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-bg-tertiary px-3 py-2.5 text-small focus:border-accent focus:outline-none"
                          >
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                            Address Line 1 *
                          </label>
                          <input
                            type="text"
                            value={newAddress.address_line_1}
                            onChange={(e) =>
                              handleAddressChange("address_line_1", e.target.value)
                            }
                            placeholder="House #, Street, Area"
                            className="w-full rounded-xl border border-border bg-bg-tertiary px-3 py-2.5 text-small focus:border-accent focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          value={newAddress.address_line_2}
                          onChange={(e) =>
                            handleAddressChange("address_line_2", e.target.value)
                          }
                          placeholder="Landmark, apartment, etc. (optional)"
                          className="w-full rounded-xl border border-border bg-bg-tertiary px-3 py-2.5 text-small focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                            City *
                          </label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) =>
                              handleAddressChange("city", e.target.value)
                            }
                            placeholder="Lahore"
                            className="w-full rounded-xl border border-border bg-bg-tertiary px-3 py-2.5 text-small focus:border-accent focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                            State
                          </label>
                          <input
                            type="text"
                            value={newAddress.state}
                            onChange={(e) =>
                              handleAddressChange("state", e.target.value)
                            }
                            placeholder="Punjab"
                            className="w-full rounded-xl border border-border bg-bg-tertiary px-3 py-2.5 text-small focus:border-accent focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            value={newAddress.postal_code}
                            onChange={(e) =>
                              handleAddressChange("postal_code", e.target.value)
                            }
                            placeholder="54000"
                            className="w-full rounded-xl border border-border bg-bg-tertiary px-3 py-2.5 text-small focus:border-accent focus:outline-none"
                          />
                        </div>
                      </div>

                      <label className="flex items-center gap-2 text-small cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newAddress.is_default}
                          onChange={(e) =>
                            handleAddressChange("is_default", e.target.checked)
                          }
                        />
                        Set as default address
                      </label>
                    </div>
                  )}
                </>
              )}
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl md:rounded-3xl border border-border bg-bg-secondary p-4 sm:p-5 md:p-6"
            >
              <h2 className="text-h4 font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { value: "cod", label: "Cash on Delivery", desc: "Pay when you receive" },
                  { value: "jazzcash", label: "JazzCash / EasyPaisa", desc: "Pay via mobile wallet" },
                  { value: "stripe", label: "Card Payment", desc: "Visa / Mastercard (International)" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === opt.value
                        ? "border-accent bg-accent/5"
                        : "border-border bg-bg-tertiary hover:border-border-hover"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={paymentMethod === opt.value}
                      onChange={() => setPaymentMethod(opt.value)}
                      className="shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-small font-semibold">{opt.label}</p>
                      <p className="text-tiny text-text-muted">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl md:rounded-3xl border border-border bg-bg-secondary p-4 sm:p-5 md:p-6"
            >
              <h2 className="text-h4 font-bold mb-4">Order Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Any special instructions? (optional)"
                className="w-full rounded-xl border border-border bg-bg-tertiary px-4 py-3 text-small focus:border-accent focus:outline-none resize-none"
              />
            </motion.div>
          </div>

          {/* ─── RIGHT — Order Summary ─── */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl md:rounded-3xl border border-border bg-bg-secondary p-4 sm:p-5 md:p-6 lg:sticky lg:top-24"
            >
              <h2 className="text-h4 font-bold mb-4 md:mb-5">Order Summary</h2>

              {/* Collapsible Items List */}
              <details className="mb-4 md:mb-5 group">
                <summary className="flex items-center justify-between cursor-pointer list-none text-tiny font-medium text-text-secondary hover:text-text-primary transition-colors py-2.5 px-3 rounded-xl bg-bg-tertiary border border-border">
                  <span>
                    {items.length} item{items.length !== 1 ? "s" : ""} in cart
                  </span>
                  <span className="text-accent group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>

                <div className="mt-3 space-y-3 max-h-[240px] overflow-y-auto scrollbar-thin pr-2">
                  {items.map((item) => (
                    <OrderItemRow key={item.id} item={item} />
                  ))}
                </div>
              </details>

              {/* Coupon */}
              <div className="mb-4 md:mb-5 pt-4 border-t border-border">
                {coupon ? (
                  <div className="flex items-center justify-between rounded-xl bg-success/10 border border-success/30 p-3">
                    <div className="min-w-0">
                      <p className="text-tiny font-bold text-success truncate">
                        {coupon.code}
                      </p>
                      <p className="text-tiny text-success">
                        - {formatPrice(coupon.discount)}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-tiny text-error hover:underline font-medium shrink-0 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
                        placeholder="Coupon code"
                        className="flex-1 min-w-0 rounded-xl border border-border bg-bg-tertiary px-3 py-2.5 text-small focus:border-accent focus:outline-none"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={couponLoading || !couponCode.trim()}
                        className="rounded-xl bg-bg-tertiary border border-border px-4 py-2.5 text-small font-medium hover:border-border-hover transition-colors disabled:opacity-50 shrink-0"
                      >
                        {couponLoading ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          "Apply"
                        )}
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-tiny text-error mt-1.5">{couponError}</p>
                    )}
                  </>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 pt-4 border-t border-border text-small">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span className="font-medium">- {formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-secondary">Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-success font-semibold">FREE</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-body font-bold">Total</span>
                  <span className="text-h4 font-black text-accent">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Place Order */}
              <button
                onClick={handlePlaceOrder}
                disabled={placing || (!selectedAddressId && !showNewAddress)}
                className="btn-accent w-full mt-5 md:mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {placing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    Place Order
                  </>
                )}
              </button>

              {/* Trust */}
              <div className="flex flex-col gap-2 mt-4 md:mt-5 pt-4 md:pt-5 border-t border-border">
                <div className="flex items-center gap-2 text-tiny text-text-secondary">
                  <Truck size={12} className="text-accent shrink-0" />
                  <span>Free delivery above Rs. 2,999</span>
                </div>
                <div className="flex items-center gap-2 text-tiny text-text-secondary">
                  <RotateCcw size={12} className="text-accent shrink-0" />
                  <span>7-day easy returns</span>
                </div>
                <div className="flex items-center gap-2 text-tiny text-text-secondary">
                  <ShieldCheck size={12} className="text-accent shrink-0" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Order Item Row Component ───
function OrderItemRow({ item }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = item.images?.[0];
  const showImage = imageUrl && !imgError;

  return (
    <div className="flex items-start gap-3">
      {/* Image / Fallback */}
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-bg-tertiary border border-border overflow-hidden">
        {showImage ? (
          <img
            src={imageUrl}
            alt={item.name}
            onError={() => setImgError(true)}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <Package size={20} className="text-text-muted" />
        )}
      </div>

      {/* Name + Qty */}
      <div className="flex-1 min-w-0">
        <p className="text-tiny font-medium text-text-primary leading-snug text-clamp-2">
          {item.name}
        </p>
        <p className="text-tiny text-text-muted mt-1">
          {item.quantity} × {formatPrice(item.price)}
        </p>
      </div>

      {/* Price */}
      <p className="text-small font-bold text-text-primary whitespace-nowrap pt-0.5 shrink-0">
        {formatPrice(item.price * item.quantity)}
      </p>
    </div>
  );
}