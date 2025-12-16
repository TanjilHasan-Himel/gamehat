import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export default function Register() {
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Gamehub | Register";
  }, []);

  const validatePassword = (pw) => {
    if (pw.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(pw)) return "Password must contain an uppercase letter.";
    if (!/[a-z]/.test(pw)) return "Password must contain a lowercase letter.";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");

    const msg = validatePassword(password);
    if (msg) return setErr(msg);

    setLoading(true);
    try {
      await createUser(email, password);
      await updateUserProfile(name, photoURL);
      navigate("/");
    } catch (error) {
      setErr("Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErr("");
    setLoading(true);
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setErr("Google signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-2xl font-black">Register</h1>
      <p className="text-gray-400 mt-1">Create your account.</p>

      <form onSubmit={handleRegister} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-gray-300">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0b0f17] border border-white/10 outline-none focus:border-green-400"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Photo URL</label>
          <input
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            required
            className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0b0f17] border border-white/10 outline-none focus:border-green-400"
            placeholder="https://..."
          />
        </div>

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
            placeholder="Upper + lower + 6+ chars"
          />
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
          {loading ? "Creating..." : "Create Account"}
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="w-full px-5 py-3 rounded-lg border border-white/15 text-white font-bold hover:bg-white/10 transition disabled:opacity-50"
        >
          Sign up with Google
        </button>

        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-green-300 hover:text-green-200">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
