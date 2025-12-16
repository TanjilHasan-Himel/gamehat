import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export default function UpdateProfile() {
  const { user, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Gamehub | Update Profile";
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    setLoading(true);

    try {
      await updateUserProfile(name, photoURL);
      setMsg("Profile updated successfully!");
      setTimeout(() => navigate("/my-profile"), 800);
    } catch (error) {
      setErr("Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-2xl font-black">Update Profile</h1>
      <p className="text-gray-400 mt-1">Change your name and photo.</p>

      <form onSubmit={handleUpdate} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-gray-300">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0b0f17] border border-white/10 outline-none focus:border-green-400"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Photo URL</label>
          <input
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            required
            className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0b0f17] border border-white/10 outline-none focus:border-green-400"
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
          {loading ? "Updating..." : "Update Information"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/my-profile")}
          className="w-full px-5 py-3 rounded-lg border border-white/15 text-white font-bold hover:bg-white/10 transition"
        >
          Back
        </button>
      </form>
    </div>
  );
}
