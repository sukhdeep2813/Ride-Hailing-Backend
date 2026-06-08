import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import RideBookingWidget from "./RideBookingWidget";
import { Bell, User, Menu } from "lucide-react";
import { useLayout } from "../context/LayoutContext";

import MapDirectionsRenderer from "./MapDirectionsRenderer";

const MapContainer = () => {
  const nsutCoordinates = { lat: 28.609135, lng: 77.035081 };

  //For NavBar
  const { isSearching, routePoints } = useLayout();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1e1e1e]">
      {/* 1. TOP BAR */}
      <div
        className={`absolute top-0 left-0 w-full h-16 bg-white/70 backdrop-blur-xl border-b border-white/20 rounded-b-2xl md:rounded-b-3xl px-4 md:px-8 flex items-center justify-between z-20 shadow-lg transition-transform duration-500 ease-in-out ${isSearching ? "-translate-y-full" : "translate-y-0"}`}
      >
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

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold border border-gray-300 cursor-pointer">
            <User size={18} />
          </div>
        </div>
      </div>

      {/* 2. WIDGET LAYER */}
      {/* Changed pt-16 to pt-20 to clear your rounded header cleanly */}
      <div className="absolute inset-0 pt-20 pointer-events-none z-10 flex flex-col md:block justify-end">
        <div
          className={`pointer-events-auto w-full md:w-105 p-4 md:absolute md:top-4 md:left-8 transition-all duration-500 ease-in-out ${
            isSearching
              ? "-translate-x-[120%] opacity-0 pointer-events-none"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <RideBookingWidget />
          </div>
        </div>
      </div>

      {/* 3. LIVE GOOGLE MAPS LAYER */}

      <div className="absolute inset-0 w-full h-full z-0">
        <Map
          defaultZoom={15}
          defaultCenter={nsutCoordinates}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          // FOR ADVANCED MARKERS: Replace with your actual Google Cloud Map ID
          mapId={"f4bf5c8f8c5e29847dc72a5f"}
        >
          {isSearching && routePoints.pickup && routePoints.destination && (
            <MapDirectionsRenderer
              pickup={routePoints.pickup}
              destination={routePoints.destination}
            />
          )}
          <AdvancedMarker position={nsutCoordinates} title={"NSUT Campus"} />

          {/*Fixed Map Controller */}
        </Map>
      </div>
    </div>
  );
};

export default MapContainer;
