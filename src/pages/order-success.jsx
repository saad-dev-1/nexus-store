import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";
import { orderAPI } from "../services/api";
import { formatPrice } from "../data/products";

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let cancelled = false;

  const run = async () => {
    if (!orderNumber) {
      if (!cancelled) setLoading(false);
      return;
    }

    try {
      const res = await orderAPI.list();
      if (cancelled) return;

      const orders = res.data.data?.data || res.data.data || [];
      const found = orders.find((o) => o.order_number === orderNumber);
      setOrder(found);
    } catch {
      // ignore
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  run();

  return () => {
    cancelled = true;
  };
}, [orderNumber]);

  return (
    <section className="section-padding min-h-[70vh] flex items-center">
      <div className="container-custom max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-border bg-bg-secondary p-8 md:p-12 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/15">
              <CheckCircle size={48} className="text-success" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] mb-3">
            Order Placed Successfully!
          </h1>

          {orderNumber && (
            <p className="text-body text-text-secondary mb-2">
              Order Number:{" "}
              <span className="font-bold text-accent">{orderNumber}</span>
            </p>
          )}

          <p className="text-small text-text-muted mb-8">
            Thank you for shopping with Nexus Store. A confirmation email has been sent to you.
          </p>

          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 size={24} className="animate-spin text-accent" />
            </div>
          ) : order ? (
            <div className="rounded-2xl border border-border bg-bg-tertiary p-5 mb-8 text-left">
              <div className="flex items-center gap-2 mb-4">
                <Package size={18} className="text-accent" />
                <span className="text-small font-semibold text-text-primary">
                  Order Summary
                </span>
              </div>

              <div className="space-y-2 text-small">
                <div className="flex justify-between">
                  <span className="text-text-muted">Total Items</span>
                  <span className="font-medium">{order.items?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Payment Method</span>
                  <span className="font-medium uppercase">
                    {order.payment_method}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 mt-2">
                  <span className="text-text-primary font-semibold">Total</span>
                  <span className="text-accent font-bold text-h4">
                    {formatPrice(Number(order.total))}
                  </span>
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/orders" className="btn-primary inline-flex items-center justify-center gap-2">
              <Package size={16} />
              View My Orders
            </Link>
            <Link to="/shop" className="btn-accent inline-flex items-center justify-center gap-2">
              Continue Shopping
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}