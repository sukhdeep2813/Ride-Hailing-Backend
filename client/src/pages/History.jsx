import React from "react";
import { Search, ChevronDown, MapPin } from "lucide-react";

const History = () => {
  const rideHistory = [
    {
      date: "May 20, 2026, 03:30 PM",
      pickup: "NSUT Main Gate, New Delhi",
      destination: "Connaught Place, New Delhi",
      vehicle: "BoltSedan",
      cost: "₹230",
      status: "Completed",
    },
    {
      date: "May 20, 2026, 03:30 PM",
      pickup: "Near Admin Block, NSUT",
      destination: "IGI Airport, T3",
      vehicle: "BoltMini",
      cost: "₹180",
      status: "Completed",
    },
    {
      date: "May 20, 2026, 03:00 PM",
      pickup: "Near Admin Block, NSUT",
      destination: "Dwarka Sector 10 Metro",
      vehicle: "BoltBike",
      cost: "₹85",
      status: "Cancelled",
    },
    {
      date: "May 20, 2026, 03:30 PM",
      pickup: "NSUT Main Gate, New Delhi",
      destination: "IGI Airport, T3",
      vehicle: "BoltMini",
      cost: "₹160",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen  bg-black text-white p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Ride History</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex items-center flex-1 sm:w-64">
            <Search size={18} className="absolute left-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search history..."
              className="bg-[#111] border border-white/10 outline-none w-full pl-11 pr-4 py-3 rounded-xl text-sm placeholder:text-zinc-500 focus:border-orange-500/50 transition-all"
            />
          </div>
          {/*Filter */}
          {/* Filter */}
          <button className="flex items-center justify-center gap-2 bg-[#111] border border-white/10 rounded-xl px-5 py-3 text-sm hover:bg-[#151515] transition">
            Filter by Date
            <ChevronDown size={16} className="text-zinc-400" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10"></div>

      <div className="min-w-[1000px] bg-linear-to-br from-[#151515] to-black">
        <div className="grid grid-cols-6 px-6 py-5 border-b border-white/10 text-sm font-semibold text-zinc-300 ml-6">
          <p>Date & Time</p>
          <p>Pickup Location</p>
          <p>Destination</p>
          <p>Vehicle Type</p>
          <p>Cost</p>
          <p>Status</p>
        </div>

        {rideHistory.map((ride, index) => (
          <div
            key={index}
            className="border-b border-white/10 hover:bg-white/[0.03] transition"
          >
            <div className="grid grid-cols-6 items-center px-6 py-5 gap-4 ">
              {/* Date */}
              <p className="text-sm text-zinc-300 leading-6">{ride.date}</p>

              {/* Pickup */}
              <div>
                <p className="text-sm text-white">{ride.pickup}</p>

                <p className="text-xs text-zinc-500 mt-1">
                  NSUT Roaise, Landmark
                </p>
              </div>

              {/* Destination */}
              <div>
                <p className="text-xs text-zinc-500 mb-1">To</p>

                <p className="text-sm text-white">{ride.destination}</p>
              </div>
              {/* Vehicle */}
              <p className="text-sm text-zinc-300">{ride.vehicle}</p>

              <p className="text-sm font-medium text-white">{ride.cost}</p>

              <div className="justify-center item-center ">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-medium ${
                    ride.status === "Completed"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {ride.status}
                </span>
              </div>
            </div>

            {/* Status */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
