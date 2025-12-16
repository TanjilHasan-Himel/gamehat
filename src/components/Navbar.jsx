import { NavLink, Link } from "react-router-dom";

const navClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-semibold transition ${
    isActive ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"
  }`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0b0f17]/90 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gradient-to-tr from-green-400 to-cyan-400" />
          <span className="text-lg font-black tracking-wide text-white">GAMEHUB</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/games" className={navClass}>Games</NavLink>
          <NavLink to="/extra" className={navClass}>Extra</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <NavLink to="/login" className={navClass}>Login</NavLink>
            <NavLink to="/register" className={navClass}>Register</NavLink>
          </div>

          {/* Mobile */}
          <details className="md:hidden relative">
            <summary className="list-none cursor-pointer px-3 py-2 rounded-md bg-white/10 text-white">
              ☰
            </summary>
            <div className="absolute right-0 mt-2 w-52 rounded-lg border border-white/10 bg-[#0b0f17] p-2 shadow-xl">
              <NavLink to="/" className={({isActive}) => `block ${navClass({isActive})}`}>Home</NavLink>
              <NavLink to="/games" className={({isActive}) => `block ${navClass({isActive})}`}>Games</NavLink>
              <NavLink to="/extra" className={({isActive}) => `block ${navClass({isActive})}`}>Extra</NavLink>
              <div className="my-2 border-t border-white/10" />
              <NavLink to="/login" className={({isActive}) => `block ${navClass({isActive})}`}>Login</NavLink>
              <NavLink to="/register" className={({isActive}) => `block ${navClass({isActive})}`}>Register</NavLink>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
