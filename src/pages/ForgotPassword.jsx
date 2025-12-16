import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.config";

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Gamehub | Forgot Password";
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    if (!email) return setErr("Please enter your email.");

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Reset email sent. Redirecting to Gmail...");
      setTimeout(() => {
        window.location.href = "https://mail.google.com/";
      }, 800);
    } catch (error) {
      setErr("Failed to send reset email. Check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-2xl font-black">Forgot Password</h1>
      <p className="text-gray-400 mt-1">We’ll send a reset link to your email.</p>

      <form onSubmit={handleReset} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0b0f17] border border-white/10 outline-none focus:border-green-400"
            placeholder="you@example.com"
          />
        </div>

        {err && (
          <p className="text-sm text-red-300 border border-red-500/20 bg-red-500/10 rounded-lg p-3">
            {err}
          </p>
        )}
        {msg && (
          <p className="text-sm text-green-200 border border-green-500/20 bg-green-500/10 rounded-lg p-3">
            {msg}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full px-5 py-3 rounded-lg bg-green-400 text-black font-bold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full px-5 py-3 rounded-lg border border-white/15 text-white font-bold hover:bg-white/10 transition"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}
