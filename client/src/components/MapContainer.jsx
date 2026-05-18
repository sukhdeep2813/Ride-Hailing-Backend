import RideBookingWidget from "./RideBookingWidget";
import { Bell, User, Menu } from "lucide-react"; // Added Menu icon for mobile toggle

const MapContainer = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1e1e1e] ">
      {/* 1.  TOP BAR */}
      <div className="absolute top-0 left-0 w-full h-13 bg-white/20 backdrop-blur-xl border border-white/20 rounded-b-2xl md:rounded-b-3xl px-4 md:px-8 flex items-center justify-between z-20 shadow-lg">
        <button className="md:hidden text-gray-700 hover:text-gray-900 cursor-pointer">
          <Menu size={24} />
        </button>

        <div className="text-sm font-semibold text-gray-500 hidden md:block">
          {/* Desktop Spacer */}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <span className="font-semibold text-gray-800 text-sm hidden sm:block">
            Sukhdeep
          </span>

          <button className="relative text-gray-600 hover:text-gray-900 transition cursor-pointer">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF5722] rounded-full"></span>
          </button>

          {/* User Avatar  */}
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold border border-gray-300 cursor-pointer">
            <User size={18} />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pt-16 pointer-events-none z-10 flex flex-col md:block justify-end">
        <div className="pointer-events-auto w-full md:w-[420px] p-4 md:absolute md:top-8 md:left-8">
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-xl border border-gray-100 overflow-hidden mt-5">
            <RideBookingWidget />
          </div>
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center bg-[#eaeaea] z-0">
        <div className="text-gray-400 font-mono text-sm select-none">
          [ Responsive Map Layer ]
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
