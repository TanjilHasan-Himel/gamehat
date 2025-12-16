import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#070a10] text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 md:px-10 py-10 min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
