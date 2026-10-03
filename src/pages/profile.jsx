import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Loader2, AlertCircle, Check, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { authAPI } from "../services/api";

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser, logout } = useAuth();

  // Lazy initializer — no effect needed
  const [form, setForm] = useState(() => ({
    name: user?.name || "",
    phone: user?.phone || "",
  }));

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Track user changes (React 19 pattern — no setState in effect)
  const [prevUser, setPrevUser] = useState(user);
  if (user !== prevUser) {
    setPrevUser(user);
    setForm({
      name: user?.name || "",
      phone: user?.phone || "",
    });
  }

  // Redirect if not authenticated (only navigate — no setState)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await authAPI.updateProfile(form);
      updateUser(res.data.data);
      setSuccess("Profile updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.name?.[0] ||
        "Update failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordForm.password !== passwordForm.password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    if (passwordForm.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setPasswordLoading(true);

    try {
      await authAPI.updateProfile(passwordForm);
      setSuccess("Password changed successfully");
      setPasswordForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.current_password?.[0] ||
        "Password change failed";
      setError(msg);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!isAuthenticated) return null;

  return (
    <section className="section-padding">
      <div className="container-custom max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-[-0.03em] mb-1">
                My Profile
              </h1>
              <p className="text-small text-text-secondary">
                Manage your account settings
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-border bg-bg-tertiary px-4 py-2 text-small text-error hover:bg-error/10 transition-colors"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 flex items-start gap-2 rounded-xl border border-error/30 bg-error/10 p-3">
              <AlertCircle size={16} className="text-error shrink-0 mt-0.5" />
              <p className="text-tiny text-error">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 flex items-start gap-2 rounded-xl border border-success/30 bg-success/10 p-3">
              <Check size={16} className="text-success shrink-0 mt-0.5" />
              <p className="text-tiny text-success">{success}</p>
            </div>
          )}

          {/* Profile Info Card */}
          <div className="rounded-3xl border border-border bg-bg-secondary p-6 md:p-8 mb-6">
            <h2 className="text-h4 font-bold mb-6">Account Information</h2>

            <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
              <div>
                <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full rounded-xl border border-border bg-bg-tertiary pl-10 pr-4 py-3 text-small text-text-primary focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

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
                    value={user?.email || ""}
                    disabled
                    className="w-full rounded-xl border border-border bg-bg-tertiary/50 pl-10 pr-4 py-3 text-small text-text-muted cursor-not-allowed"
                  />
                </div>
                <p className="text-tiny text-text-muted mt-1.5">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                  Phone
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="03001234567"
                    className="w-full rounded-xl border border-border bg-bg-tertiary pl-10 pr-4 py-3 text-small text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-accent self-start flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>

          {/* Password Card */}
          <div className="rounded-3xl border border-border bg-bg-secondary p-6 md:p-8">
            <h2 className="text-h4 font-bold mb-6">Change Password</h2>

            <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
              <div>
                <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.current_password}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      current_password: e.target.value,
                    })
                  }
                  required
                  className="w-full rounded-xl border border-border bg-bg-tertiary px-4 py-3 text-small text-text-primary focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.password}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, password: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-border bg-bg-tertiary px-4 py-3 text-small text-text-primary focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-tiny font-medium text-text-secondary mb-1.5 block">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.password_confirmation}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        password_confirmation: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-border bg-bg-tertiary px-4 py-3 text-small text-text-primary focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={passwordLoading}
                className="btn-primary self-start flex items-center gap-2 disabled:opacity-50"
              >
                {passwordLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/orders"
              className="rounded-full border border-border bg-bg-tertiary px-4 py-2 text-small text-text-secondary hover:border-border-hover hover:text-text-primary transition-colors"
            >
              My Orders
            </Link>
            <Link
              to="/shop"
              className="rounded-full border border-border bg-bg-tertiary px-4 py-2 text-small text-text-secondary hover:border-border-hover hover:text-text-primary transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}