const HeroSection = () => {
  return (
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
        <p className="text-sm text-gray-500 ml-2">Trusted by 2,000+ students</p>
      </div>
    </header>
  );
};

export default HeroSection;
