import React from "react";
import SideBar from "../components/SideBar";
import MapContainer from "../components/MapContainer";
import RideBookingWidget from "../components/RideBookingWidget";
import Setting from "./Setting";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-100">
      <SideBar />
      <main className="relative flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoard;
