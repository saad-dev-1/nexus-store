import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Package, Loader2, AlertCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/authcontext";
import { orderAPI } from "../services/api";
import { formatPrice } from "../data/products";

const statusColors = {
  pending: "bg-yellow-500/15 text-yellow-500",
  confirmed: "bg-blue-500/15 text-blue-500",
  processing: "bg-accent/15 text-accent",
  shipped: "bg-purple-400/15 text-purple-400",
  delivered: "bg-success/15 text-success",
  cancelled: "bg-error/15 text-error",
  returned: "bg-bg-tertiary text-text-muted",
};

export default function Orders() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        const res = await orderAPI.list();
        if (cancelled) return;
        const raw = res.data.data?.data || res.data.data || [];
        setOrders(raw);
      } catch (err) {
        if (cancelled) return;
        console.error("Orders fetch failed:", err);
        setError("Failed to load orders");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <section className="section-padding">
      <div className="container-custom max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-[-0.03em] mb-1">
              My Orders
            </h1>
            <p className="text-small text-text-secondary">
              Track and manage your orders
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={40} className="animate-spin text-accent" />
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-error/30 bg-error/5 p-12 text-center">
              <AlertCircle size={40} className="text-error mx-auto mb-4" />
              <p className="text-h4 font-semibold mb-2">Oops!</p>
              <p className="text-small text-text-secondary mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-accent"
              >
                Try Again
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-3xl border border-border bg-bg-tertiary p-16 text-center">
              <ShoppingBag size={48} className="text-text-muted mx-auto mb-4" />
              <h2 className="text-h4 font-semibold mb-2">No orders yet</h2>
              <p className="text-small text-text-secondary mb-6">
                Start shopping to see your orders here
              </p>
              <Link to="/shop" className="btn-accent inline-flex items-center gap-2">
                Start Shopping
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border bg-bg-secondary p-5 hover:border-border-hover transition-colors"
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Package size={16} className="text-accent" />
                        <span className="text-small font-bold text-text-primary">
                          {order.order_number}
                        </span>
                      </div>
                      <p className="text-tiny text-text-muted">
                        {new Date(order.created_at).toLocaleDateString("en-PK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-tiny font-bold uppercase tracking-wider ${
                          statusColors[order.status] || statusColors.pending
                        }`}
                      >
                        {order.status}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-tiny font-bold uppercase tracking-wider ${
                          order.payment_status === "paid"
                            ? "bg-success/15 text-success"
                            : "bg-yellow-500/15 text-yellow-500"
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </div>
                  </div>

                  {/* Info Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-tiny">
                    <div>
                      <p className="text-text-muted mb-0.5">Items</p>
                      <p className="font-semibold text-text-primary">
                        {order.items?.length || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-muted mb-0.5">Payment</p>
                      <p className="font-semibold text-text-primary uppercase">
                        {order.payment_method || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-muted mb-0.5">Delivery</p>
                      <p className="font-semibold text-text-primary">
                        {order.shipment?.status || "Pending"}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-muted mb-0.5">Total</p>
                      <p className="font-bold text-accent">
                        {formatPrice(Number(order.total))}
                      </p>
                    </div>
                  </div>

                  {/* Product Preview */}
                  {order.items && order.items.length > 0 && (
                    <div className="border-t border-border pt-3 mb-4">
                      <p className="text-tiny text-text-muted">
                        {order.items
                          .slice(0, 2)
                          .map((i) => `${i.product_name} × ${i.quantity}`)
                          .join(", ")}
                        {order.items.length > 2 &&
                          ` +${order.items.length - 2} more`}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      to={`/orders/${order.id}`}
                      className="rounded-full border border-border bg-bg-tertiary px-4 py-2 text-tiny font-medium text-text-secondary hover:border-border-hover hover:text-text-primary transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}