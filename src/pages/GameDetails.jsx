import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((g) => String(g.id) === String(id));
        setGame(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    document.title = game ? `Gamehub | ${game.title}` : "Gamehub | Game Details";
  }, [game]);

  if (loading) return <div className="text-gray-300">Loading...</div>;

  if (!game) {
    return (
      <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-black">Game not found</h1>
        <p className="text-gray-400 mt-2">The game you’re looking for doesn’t exist.</p>
        <Link
          to="/games"
          className="inline-block mt-5 px-5 py-3 rounded-lg bg-green-400 text-black font-bold hover:opacity-90 transition"
        >
          Back to Games
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Hero */}
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
        <div className="relative">
          <img
            src={game.coverPhoto}
            alt={game.title}
            className="w-full h-[260px] md:h-[360px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute left-5 bottom-5 right-5">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-xs text-green-300 font-bold tracking-wider">
                  {game.category} • {game.developer}
                </p>
                <h1 className="text-3xl md:text-4xl font-black mt-2">{game.title}</h1>
                <p className="text-gray-300 mt-3 max-w-2xl">
                  {game.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3 py-2 rounded-lg bg-white/10 border border-white/10">
                  <p className="text-xs text-gray-300">Rating</p>
                  <p className="text-lg font-black text-green-300">{game.ratings}</p>
                </div>

                <a
                  href={game.downloadLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-lg bg-green-400 text-black font-bold hover:opacity-90 transition"
                >
                  Install / Download
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/10 bg-[#0b0f17] p-4">
            <p className="text-sm text-gray-400">Category</p>
            <p className="font-bold mt-1">{game.category}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0b0f17] p-4">
            <p className="text-sm text-gray-400">Developer</p>
            <p className="font-bold mt-1">{game.developer}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0b0f17] p-4">
            <p className="text-sm text-gray-400">Ratings</p>
            <p className="font-bold mt-1">{game.ratings}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link
          to="/games"
          className="px-5 py-3 rounded-lg border border-white/15 text-white font-bold hover:bg-white/10 transition"
        >
          ← Back to Games
        </Link>

        <a
          href={game.downloadLink}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-3 rounded-lg bg-white/10 border border-white/10 text-white font-bold hover:bg-white/15 transition"
        >
          Visit Official Page →
        </a>
      </div>
    </div>
  );
}
