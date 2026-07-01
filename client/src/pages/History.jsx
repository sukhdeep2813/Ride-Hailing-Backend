import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Car,
  Bike,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { api } from "../api/api";
import { toast } from "react-hot-toast";

const History = () => {
  const [rideHistory, setRideHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  //side effect fetching ride history from backend
  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        setLoading(true);
        const response = await api.getRideHistory();
        if (response.success) {
          setRideHistory(response.history);
        } else {
          toast.error(response.message || "Could not retrieve ride logs.");
        }
      } catch (error) {
        console.error("Failed loading data pipeline:", error);
        toast.error("Network error fetching persistent ride data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRideHistory();
  }, []);

  const filteredRides = rideHistory.filter((ride) => {
    const searchString = searchQuery.toLowerCase();
    return (
      ride.pickupLoc.toLowerCase().includes(searchString) ||
      ride.dropoffLoc.toLowerCase().includes(searchString) ||
      ride.vehicleType.toLowerCase().includes(searchString) ||
      ride.status.toLowerCase().includes(searchString)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-orange-500" size={32} />
        <p className="text-sm font-medium text-zinc-400">
          Loading your MetroBolt logs...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header Container Area */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Ride History
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex items-center flex-1 sm:w-64">
            <Search size={18} className="absolute left-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history..."
              className="bg-[#111] border border-white/10 outline-none w-full pl-11 pr-4 py-3 rounded-xl text-sm placeholder:text-zinc-500 focus:border-orange-500/50 transition-all text-white"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-[#111] border border-white/10 rounded-xl px-5 py-3 text-sm hover:bg-[#151515] transition text-zinc-300">
            Filter by Date
            <ChevronDown size={16} className="text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Main Table Content Block Wrapper */}
      {filteredRides.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl py-16 px-4 bg-[#0a0a0a] text-center">
          <AlertCircle className="text-zinc-600 mb-3" size={36} />
          <h3 className="text-base font-semibold text-zinc-300">
            No journeys documented
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-xs">
            {searchQuery
              ? "No matches found for that query."
              : "Your completed database trips will populate right here automatically."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-gradient-to-br from-[#111] to-black">
          {/* Minimum width set defensively to prevent layout squishing on mobile views */}
          <div className="min-w-[900px]">
            {/* Table Header Fields */}
            <div className="grid grid-cols-6 px-6 py-5 border-b border-white/10 text-sm font-semibold text-zinc-400 bg-white/1 sticky top-0 z-10">
              <p>Date & Time</p>
              <p>Pickup Location</p>
              <p>Destination</p>
              <p>Vehicle Type</p>
              <p>Cost</p>
              <p>Status</p>
            </div>

            {/* Loop rendering rows fetched from Prisma */}
            <div className="max-h-[500px] overflow-y-auto">
              {filteredRides.map((ride) => {
                // Parse timestamp dynamically into clean Indian Standard time strings
                const formattedDate = new Date(
                  ride.createdAt,
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const isBike = ride.vehicleType === "BoltBike";

                return (
                  <div
                    key={ride.id}
                    className="grid grid-cols-6 items-center px-6 py-5 gap-4 border-b border-white/10 hover:bg-white/[0.02] transition-all"
                  >
                    {/* Date Column */}
                    <p className="text-sm text-zinc-300 leading-6">
                      {formattedDate}
                    </p>

                    {/* Pickup Column */}
                    <div className="truncate pr-2">
                      <p
                        className="text-sm text-white font-medium truncate"
                        title={ride.pickupLoc}
                      >
                        {ride.pickupLoc}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-0.5 truncate">
                        MetroBolt Hub Point
                      </p>
                    </div>

                    {/* Destination Column */}
                    <div className="truncate pr-2">
                      <p
                        className="text-sm text-white font-medium truncate"
                        title={ride.dropoffLoc}
                      >
                        {ride.dropoffLoc}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-0.5 truncate">
                        Drop Gateway
                      </p>
                    </div>

                    {/* Vehicle Column */}
                    <div className="flex items-center gap-2">
                      {isBike ? (
                        <Bike size={15} className="text-zinc-400" />
                      ) : (
                        <Car size={15} className="text-zinc-400" />
                      )}
                      <span className="text-sm text-zinc-300">
                        {ride.vehicleType}
                      </span>
                    </div>

                    {/* Fare Cost Column */}
                    <p className="text-sm font-semibold text-white">
                      ₹{ride.fare}
                    </p>

                    {/* Dynamic Status Badges */}
                    <div className="flex items-center">
                      <span
                        className={`px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                          ride.status === "COMPLETED"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : ride.status === "PENDING"
                              ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {ride.status.toLowerCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
