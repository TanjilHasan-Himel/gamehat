import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export default function Login() {
  const { signInUser, googleSignIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    document.title = "Gamehub | Login";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signInUser(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setErr("Login failed. Check email/password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErr("");
    setLoading(true);
    try {
      await googleSignIn();
      navigate(from, { replace: true });
    } catch (error) {
      setErr("Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-2xl font-black">Login</h1>
      <p className="text-gray-400 mt-1">Welcome back.</p>

      <form onSubmit={handleLogin} className="mt-6 space-y-4">
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

        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0b0f17] border border-white/10 outline-none focus:border-green-400"
            placeholder="••••••"
          />
        </div>

        <div className="flex items-center justify-between">
          <Link
            to="/forgot-password"
            state={{ email }}
            className="text-sm font-semibold text-green-300 hover:text-green-200"
          >
            Forgot password?
          </Link>
          <Link to="/register" className="text-sm font-semibold text-gray-300 hover:text-white">
            Register
          </Link>
        </div>

        {err && (
          <p className="text-sm text-red-300 border border-red-500/20 bg-red-500/10 rounded-lg p-3">
            {err}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full px-5 py-3 rounded-lg bg-green-400 text-black font-bold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="w-full px-5 py-3 rounded-lg border border-white/15 text-white font-bold hover:bg-white/10 transition disabled:opacity-50"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
