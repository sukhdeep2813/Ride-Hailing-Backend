import React from "react";

const Glassmorphism = () => {
  return (
    <section id="tech" className="max-w-7xl mx-auto px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white/3 border border-white/8 backdrop-blur-sm hover:border-blue-500/50 transition">
          <h3 className="text-xl font-bold mb-4">Socket.io Engine</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Experience zero-latency driver tracking. Our WebSocket
            implementation ensures you see the car moving in real-time.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-white/3 border border-white/8 backdrop-blur-sm hover:border-blue-500/50 transition">
          <h3 className="text-xl font-bold mb-4">Redis Caching</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Lightning-fast driver matching. We use Redis to cache driver
            locations, reducing database load by 80%.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-white/3 border border-white/8 backdrop-blur-sm hover:border-blue-500/50 transition">
          <h3 className="text-xl font-bold mb-4">Geospatial Index</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Optimized for Delhi's density. Advanced 2dsphere indexing to find
            your nearest ride in under 100ms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Glassmorphism;
