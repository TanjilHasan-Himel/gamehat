export default function Footer() {
  return (
    <footer className="bg-[#0b0f17] border-t border-white/10 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Gamehub — Discover indie greatness.</p>
        <p className="text-gray-500">Built for Assignment 9</p>
      </div>
    </footer>
  );
}
