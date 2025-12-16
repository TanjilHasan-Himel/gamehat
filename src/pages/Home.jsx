import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const slides = useMemo(
    () => [
      {
        title: "Discover indie games that hit different.",
        subtitle: "Support developers. Save favorites. Install instantly.",
        img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1600&auto=format&fit=crop",
      },
      {
        title: "Urban vibes. Neon energy.",
        subtitle: "A game library inspired by Epic-style experience.",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop",
      },
      {
        title: "Your next obsession is one click away.",
        subtitle: "Browse by category, rating, and developer.",
        img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, 3500);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch(() => setGames([]));
  }, []);

  const popular = [...games]
    .sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings))
    .slice(0, 3);

  return (
    <div className="space-y-12">
      {/* HERO / SLIDER */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10">
        <div className="absolute inset-0">
          <img
            src={slides[active].img}
            alt="banner"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070a10] via-[#070a10]/70 to-transparent" />
        </div>

        <div className="relative p-6 md:p-12 min-h-[320px] flex flex-col justify-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-green-300">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            GAMEHUB LIBRARY
          </p>

          <h1 className="mt-4 text-3xl md:text-5xl font-black leading-tight">
            {slides[active].title}
          </h1>

          <p className="mt-3 text-gray-300 max-w-2xl">
            {slides[active].subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/games"
              className="px-5 py-3 rounded-lg bg-green-400 text-black font-bold hover:opacity-90 transition"
            >
              Browse Games
            </Link>
            <Link
              to="/extra"
              className="px-5 py-3 rounded-lg border border-white/15 text-white font-bold hover:bg-white/10 transition"
            >
              Explore More
            </Link>
          </div>

          {/* dots */}
          <div className="mt-8 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  active === i ? "w-10 bg-green-400" : "w-4 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR GAMES */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">Popular Games</h2>
            <p className="text-gray-400 mt-1">
              Top picks sorted by rating (from your JSON data)
            </p>
          </div>
          <Link
            to="/games"
            className="text-sm font-bold text-green-300 hover:text-green-200"
          >
            View all →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {popular.map((g) => (
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
      </section>

      {/* NEWSLETTER */}
      <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-6 md:p-10">
        <h3 className="text-2xl font-black">Get weekly game drops</h3>
        <p className="text-gray-400 mt-2 max-w-2xl">
          Subscribe to our newsletter for new indie releases, top-rated picks, and developer highlights.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Subscribed! (UI demo)");
          }}
          className="mt-5 flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-4 py-3 rounded-lg bg-[#0b0f17] border border-white/10 outline-none focus:border-green-400"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-lg bg-green-400 text-black font-bold hover:opacity-90 transition"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
