import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Gamehub | Not Found";
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-green-300 font-bold tracking-widest text-xs">ERROR 404</p>
        <h1 className="text-4xl font-black mt-3">Page not found</h1>
        <p className="text-gray-400 mt-3">
          The page you’re trying to open doesn’t exist. Go back home or browse games.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-3 rounded-lg bg-green-400 text-black font-bold hover:opacity-90 transition"
          >
            Go Home
          </Link>
          <Link
            to="/games"
            className="px-5 py-3 rounded-lg border border-white/15 text-white font-bold hover:bg-white/10 transition"
          >
            Browse Games
          </Link>
        </div>
      </div>
    </div>
  );
}
