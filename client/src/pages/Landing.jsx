import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-blue-500/30">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-black tracking-tighter">
          METRO<span className="text-blue-500">BOLT</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          <a href="#tech" className="hover:text-white transition">
            Technology
          </a>
        </div>
        <div className="space-x-4">
          <button
            className="text-sm font-semibold text-gray-300 hover:text-white transition cursor-pointer "
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-8 py-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
          Live in New Delhi & NCR
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          Hyper-Local <br /> Ride Hailing
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          The ultimate transport layer for **Dwarka, Janakpuri, and Rohini**.
          Built by engineers for the streets of Delhi.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <button className="w-full md:w-auto bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition transform hover:-translate-y-1 cursor-pointer">
            Book a Ride
          </button>
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-gray-800 flex items-center justify-center text-[10px]">
              NSUT
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-gray-800 flex items-center justify-center text-[10px]">
              DTU
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-gray-800 flex items-center justify-center text-[10px]">
              IITD
            </div>
          </div>
          <p className="text-sm text-gray-500 ml-2">
            Trusted by 2,000+ students
          </p>
        </div>
      </header>

      {/* Glassmorphism Feature Grid */}
      <section id="tech" className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:border-blue-500/50 transition">
            <h3 className="text-xl font-bold mb-4">Socket.io Engine</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience zero-latency driver tracking. Our WebSocket
              implementation ensures you see the car moving in real-time.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:border-blue-500/50 transition">
            <h3 className="text-xl font-bold mb-4">Redis Caching</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Lightning-fast driver matching. We use Redis to cache driver
              locations, reducing database load by 80%.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:border-blue-500/50 transition">
            <h3 className="text-xl font-bold mb-4">Geospatial Index</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Optimized for Delhi's density. Advanced 2dsphere indexing to find
              your nearest ride in under 100ms.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Network Section */}
      <footer className="text-center py-12 border-t border-white/5">
        <p className="text-gray-600 text-xs">
          Built with ❤️ at Netaji Subhas University of Technology, Delhi.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
