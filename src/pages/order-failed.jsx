import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

export default function OrderFailed() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");

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
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error/15">
              <XCircle size={48} className="text-error" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] mb-3">
            Payment Failed
          </h1>

          {orderNumber && (
            <p className="text-body text-text-secondary mb-2">
              Order Number:{" "}
              <span className="font-bold text-accent">{orderNumber}</span>
            </p>
          )}

          <p className="text-small text-text-muted mb-8">
            Your payment could not be processed. Please try again or choose a
            different payment method.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/checkout"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              Try Again
            </Link>
            <Link
              to="/cart"
              className="btn-accent inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Cart
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}