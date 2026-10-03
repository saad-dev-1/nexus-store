import { useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/authcontext";
import { useCart } from "../context/cartcontext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const { syncGuestCart } = useCart();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);
      await syncGuestCart();

      const redirectTo =
        location.state?.from ||
        searchParams.get("redirect") ||
        "/";

      navigate(redirectTo);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.email?.[0] ||
        "Login failed. Check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding min-h-[80vh] flex items-center">
      <div className="container-custom max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-border bg-bg-secondary p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-[-0.03em] mb-2">
              Welcome back
            </h1>
            <p className="text-small text-text-secondary">
              Login to continue shopping
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-2 rounded-xl border border-error/30 bg-error/10 p-3">
              <AlertCircle size={16} className="text-error shrink-0 mt-0.5" />
              <p className="text-tiny text-error">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-border bg-bg-tertiary pl-10 pr-4 py-3 text-small text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-border bg-bg-tertiary pl-10 pr-4 py-3 text-small text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-accent w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-small text-text-secondary text-center mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-accent font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}