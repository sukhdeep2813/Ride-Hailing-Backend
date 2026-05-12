import React from "react";
import {
  LayoutDashboard,
  History,
  CreditCard,
  User,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: History, label: "Ride History", path: "/dashboard/history" },
    { icon: CreditCard, label: "Payments", path: "/dashboard/payments" },
    { icon: User, label: "Profile", path: "/dashboard/profile" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  const HandleLogOut = () => {
    console.log("User Log Out ");
    navigate("/");
  };
  return (
    <aside className="w-64 h-screen bg-[#1A1A1A] text-white flex flex-col justify-between py-8">
      <div className="px-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-[#FF5722] p-1.5 rounded-lg">
            <Zap size={24} className="text-white fill-current" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Metro<span className="text-[#FF5722]">Bolt</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#FF5722] text-white shadow-lg shadow-orange-900/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer"
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/*Log Out Button */}
      <div className="px-6">
        <button
          className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all cursor-pointer"
          onClick={HandleLogOut}
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;

/*



import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // For navigation
import { 
  LayoutDashboard, History, CreditCard, User, Settings, LogOut, Zap 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation(); // Checks current URL
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: History, label: 'Ride History', path: '/history' },
    { icon: CreditCard, label: 'Payments', path: '/payments' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-[#1A1A1A] text-white flex flex-col justify-between py-8">
      <div className="px-6">
      
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-[#FF5722] p-1.5 rounded-lg">
            <Zap size={24} className="text-white fill-current" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Metro<span className="text-[#FF5722]">Bolt</span>
          </h1>
        </div>

        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            // Check if this item's path matches the current URL
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#FF5722] text-white shadow-lg shadow-orange-900/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

     
      <div className="px-6">
        <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;





*/
