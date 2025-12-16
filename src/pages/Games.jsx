import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Games() {
  const [games, setGames] = useState([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("high");

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch(() => setGames([]));
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    const list = games.filter((g) =>
      g.title.toLowerCase().includes(query)
    );

    list.sort((a, b) => {
      const ra = parseFloat(a.ratings);
      const rb = parseFloat(b.ratings);
      return sort === "high" ? rb - ra : ra - rb;
    });

    return list;
  }, [games, q, sort]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Games</h1>
          <p className="text-gray-400 mt-1">
            Browse the library, search, and sort by rating.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search games..."
            className="w-full sm:w-72 px-4 py-3 rounded-lg bg-[#0b0f17] border border-white/10 outline-none focus:border-green-400"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#0b0f17] border border-white/10 outline-none focus:border-green-400"
          >
            <option value="high">Rating: High → Low</option>
            <option value="low">Rating: Low → High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((g) => (
          <Link
            key={g.id}
            to={`/game/${g.id}`}
            className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <div className="h-44 overflow-hidden">
              <img
                src={g.coverPhoto}
                alt={g.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-black">{g.title}</h3>
                <span className="text-xs px-2 py-1 rounded-md bg-green-400 text-black font-bold">
                  {g.ratings}
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {g.description}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                {g.category} • {g.developer}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-400">No games found.</p>
      )}
    </div>
  );
}
