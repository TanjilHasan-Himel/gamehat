import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export default function MyProfile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Gamehub | My Profile";
  }, []);

  return (
    <div className="max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-2xl font-black">My Profile</h1>
      <p className="text-gray-400 mt-1">Your account details.</p>

      <div className="mt-6 flex flex-col sm:flex-row gap-5 sm:items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10">
          <img
            src={user?.photoURL || "https://i.ibb.co/2kRZfQF/user.png"}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <p className="text-sm text-gray-400">Name</p>
          <p className="text-lg font-black">{user?.displayName || "N/A"}</p>

          <p className="text-sm text-gray-400 mt-3">Email</p>
          <p className="text-white">{user?.email || "N/A"}</p>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate("/update-profile")}
          className="px-5 py-3 rounded-lg bg-green-400 text-black font-bold hover:opacity-90 transition"
        >
          Update Information
        </button>
      </div>
    </div>
  );
}
