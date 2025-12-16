import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


export default function Home() {
  const slides = useMemo(
    () => [
      {
        title: "Discover indie games that hit different.",
        subtitle: "Support developers. Save favorites. Install instantly.",
        img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1600&auto=format&fit=crop",
      },
      {
        title: "Neon streets. Urban energy.",
        subtitle: "A vibrant library experience built for game lovers.",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop",
      },
      {
        title: "Your next obsession is one click away.",
        subtitle: "Browse categories, ratings, and developer highlights.",
        img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [games, setGames] = useState([]);

  useEffect(() => {
    document.title = "Gamehub | Home";
  }, []);

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
      {/* HERO / SLIDER (Animated) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-2xl border border-white/10"
      >
        {/* Background image with fade animation on slide change */}
        <motion.div
          key={active}
          initial={{ opacity: 0.4, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slides[active].img}
            alt="banner"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070a10] via-[#070a10]/70 to-transparent" />
        </motion.div>

        <div className="relative p-6 md:p-12 min-h-[320px] flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-green-300"
          >
            <span className="w-2 h-2 rounded-full bg-green-400" />
            GAMEHUB LIBRARY
          </motion.p>

          <motion.h1
            key={`title-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-4 text-3xl md:text-5xl font-black leading-tight"
          >
            {slides[active].title}
          </motion.h1>

          <motion.p
            key={`sub-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="mt-3 text-gray-300 max-w-2xl"
          >
            {slides[active].subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="mt-6 flex flex-wrap gap-3"
          >
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
          </motion.div>

          {/* Dots */}
          <div className="mt-8 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  active === i ? "w-10 bg-green-400" : "w-4 bg-white/20"
                }`}
                aria-label={`slide-${i + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* POPULAR GAMES */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">Popular Games</h2>
            <p className="text-gray-400 mt-1">Top picks sorted by rating</p>
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
            <motion.div
              key={g.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={`/game/${g.id}`}
                className="block group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition"
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-widest text-green-300">
                NEWSLETTER
              </p>
              <h2 className="text-3xl font-black mt-2">
                Get fresh game drops in your inbox
              </h2>
              <p className="text-gray-400 mt-2 max-w-xl">
                Weekly indie highlights, deals, and dev stories. No spam.
                Unsubscribe anytime.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                alert(`Subscribed: ${email}`);
                e.target.reset();
              }}
              className="w-full md:w-[420px]"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="flex-1 px-4 py-3 rounded-lg bg-[#0b0f17] border border-white/10 outline-none focus:border-green-400"
                />
                <button className="px-5 py-3 rounded-lg bg-green-400 text-black font-bold hover:opacity-90 transition">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                By subscribing, you agree to receive updates from Gamehub.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
