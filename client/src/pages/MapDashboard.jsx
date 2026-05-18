import React from "react";
import MapContainer from "../components/MapContainer";
import RideBookingWidget from "../components/RideBookingWidget";

const MapDashboard = () => {
  return (
    <div className="w-full h-full relative">
      {/* Full-screen map background */}
      <MapContainer />

      {/* Floating UI overlay container */}
      <div className="absolute top-6 left-6 z-10 w-full max-w-sm">
        <RideBookingWidget />
      </div>
    </div>
  );
};

export default MapDashboard;
