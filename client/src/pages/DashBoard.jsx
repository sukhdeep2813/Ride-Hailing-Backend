import React from "react";
import SideBar from "../components/SideBar";
import MapContainer from "../components/MapContainer";
import RideBookingWidget from "../components/RideBookingWidget";

const DashBoard = () => {
  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-100">
      <SideBar />
      <main className="relative flex-1">
        <MapContainer />
        <RideBookingWidget />
      </main>
    </div>
  );
};

export default DashBoard;
