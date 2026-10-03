import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Loader2,
  AlertCircle,
  MapPin,
  CreditCard,
  Truck,
  XCircle,
  Download,
} from "lucide-react";
import { useAuth } from "../context/authcontext";
import { orderAPI } from "../services/api";
import { formatPrice } from "../data/products";

// ─── API Base URL ───
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        const res = await orderAPI.show(id);
        if (cancelled) return;
        setOrder(res.data.data);
      } catch (err) {
        if (cancelled) return;
        console.error("Order fetch failed:", err);
        setError("Order not found");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [id, isAuthenticated, navigate]);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    setCancelling(true);
    try {
      const res = await orderAPI.cancel(order.id);
      setOrder(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    } finally {
      setCancelling(false);
    }
  };

  const handleDownloadInvoice = async () => {
    setDownloadingInvoice(true);

    try {
      const token = localStorage.getItem("auth_token");

      const response = await fetch(
        `${API_BASE_URL}/orders/${order.id}/invoice`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/pdf",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${order.order_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Invoice download failed:", err);
      alert("Invoice download failed. Please try again.");
    } finally {
      setDownloadingInvoice(false);
    }
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom flex justify-center py-20">
          <Loader2 size={40} className="animate-spin text-accent" />
        </div>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="section-padding">
        <div className="container-custom max-w-2xl mx-auto text-center py-20">
          <AlertCircle size={48} className="text-error mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold mb-3">Order Not Found</h1>
          <p className="text-small text-text-secondary mb-6">{error}</p>
          <Link to="/orders" className="btn-accent">
            Back to Orders
          </Link>
        </div>
      </section>
    );
  }

  const canCancel = ["pending", "confirmed"].includes(order.status);

  return (
    <section className="section-padding">
      <div className="container-custom max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-small text-text-secondary hover:text-text-primary transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Back to Orders
          </Link>

          {/* Header */}
          <div className="rounded-3xl border border-border bg-bg-secondary p-6 md:p-8 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Package size={20} className="text-accent" />
                  <h1 className="text-2xl font-extrabold">
                    {order.order_number}
                  </h1>
                </div>
                <p className="text-tiny text-text-muted">
                  Placed on{" "}
                  {new Date(order.created_at).toLocaleDateString("en-PK", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <span className="rounded-full bg-accent/15 text-accent px-3 py-1.5 text-tiny font-bold uppercase tracking-wider">
                  {order.status}
                </span>
                <span
                  className={`rounded-full px-3 py-1.5 text-tiny font-bold uppercase tracking-wider ${
                    order.payment_status === "paid"
                      ? "bg-success/15 text-success"
                      : "bg-yellow-500/15 text-yellow-500"
                  }`}
                >
                  {order.payment_status}
                </span>
              </div>
            </div>

            {canCancel && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex items-center gap-2 rounded-full border border-error/30 bg-error/10 px-4 py-2 text-small text-error hover:bg-error/20 transition-colors disabled:opacity-50"
              >
                {cancelling ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <XCircle size={14} />
                )}
                Cancel Order
              </button>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl border border-border bg-bg-secondary p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-accent" />
                <h3 className="text-small font-semibold">Shipping Address</h3>
              </div>
              <p className="text-small font-medium mb-1">{order.customer_name}</p>
              <p className="text-tiny text-text-secondary">
                {order.customer_phone}
              </p>
              <p className="text-tiny text-text-secondary mt-1">
                {order.shipping_address}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-bg-secondary p-5">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard size={16} className="text-accent" />
                <h3 className="text-small font-semibold">Payment</h3>
              </div>
              <p className="text-tiny text-text-secondary">
                Method:{" "}
                <span className="font-medium text-text-primary uppercase">
                  {order.payment_method}
                </span>
              </p>
              <p className="text-tiny text-text-secondary mt-1">
                Status:{" "}
                <span className="font-medium text-text-primary capitalize">
                  {order.payment_status}
                </span>
              </p>
              {order.payment?.transaction_id && (
                <p className="text-tiny text-text-muted mt-1">
                  Txn: {order.payment.transaction_id}
                </p>
              )}
            </div>
          </div>

          {/* Shipment */}
          {order.shipment && (
            <div className="rounded-2xl border border-border bg-bg-secondary p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Truck size={16} className="text-accent" />
                <h3 className="text-small font-semibold">Shipment Tracking</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 text-tiny">
                <div>
                  <p className="text-text-muted">Courier</p>
                  <p className="font-medium uppercase">{order.shipment.courier}</p>
                </div>
                <div>
                  <p className="text-text-muted">Tracking #</p>
                  <p className="font-medium">
                    {order.shipment.tracking_number || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">Status</p>
                  <p className="font-medium capitalize">{order.shipment.status}</p>
                </div>
              </div>
            </div>
          )}

          {/* Items */}
          <div className="rounded-2xl border border-border bg-bg-secondary overflow-hidden mb-6">
            <div className="p-5 border-b border-border">
              <h3 className="text-small font-semibold">Items</h3>
            </div>

            <div className="divide-y divide-border">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="p-5 flex justify-between items-start gap-4"
                >
                  <div className="flex-1">
                    <p className="text-small font-medium mb-1">
                      {item.product_name}
                    </p>
                    <p className="text-tiny text-text-muted">
                      {item.product_sku && `SKU: ${item.product_sku} · `}
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-small font-semibold">
                      {formatPrice(Number(item.subtotal))}
                    </p>
                    <p className="text-tiny text-text-muted">
                      {formatPrice(Number(item.price))} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-bg-tertiary space-y-2 text-small">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span>{formatPrice(Number(order.subtotal))}</span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>- {formatPrice(Number(order.discount))}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping</span>
                <span>{formatPrice(Number(order.shipping_charges))}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-h4 font-bold">
                <span>Total</span>
                <span className="text-accent">
                  {formatPrice(Number(order.total))}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleDownloadInvoice}
              disabled={downloadingInvoice}
              className="rounded-full border border-border bg-bg-tertiary px-4 py-2 text-small hover:border-border-hover transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {downloadingInvoice ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={14} />
                  Download Invoice
                </>
              )}
            </button>
            <Link to="/shop" className="btn-accent">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}