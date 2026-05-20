import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const DashBoard = () => {
  return (
    // h-screen and w-full fixes the dimensions so nothing leaks out
    // bg-[#121212] ensures if anything does peek, it stays dark
    <div className="flex h-screen w-full overflow-hidden bg-[#121212]">
      {/* 1. Left Sidebar stays locked at full height */}
      <SideBar />

      {/* 2. Right viewport handles its own scrolling independently */}
      <main className="flex-1 h-full overflow-y-auto bg-black">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoard;
