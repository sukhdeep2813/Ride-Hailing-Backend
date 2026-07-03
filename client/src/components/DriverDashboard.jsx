import React, { useState, useEffect } from "react";
import { MapPin, Car, Check, RefreshCw, AlertCircle } from "lucide-react";
import MapDashboard from "../pages/MapDashboard";
import { api } from "../api/api";
import toast from "react-hot-toast";

const DriverDashboard = () => {
  //rides
  const [availableRides, setAvailableRides] = useState([]);
  // loading
  const [loading, setLoading] = useState(false);

  // refreshing
  const [isRefreshing, setIsRefreshing] = useState(false);

  {
    /**
        1 .setLoading ---> true 
        2. fetch jobs 

        3 .try --> call pending reqyest from backend via api.method
        4. Catch  --> catch the error 

        5. finAalyy 
        {\
        setLoading ---> false;
        setIsRefreshing --> false
        }
         */
  }

  const fetchJobs = async (showSilent = false) => {
    if (!showSilent) setLoading(true);
    try {
      const response = await api.getPendingRides();
      if (response) {
        if (Array.isArray(response.rides)) {
          setAvailableRides(response.rides);
        } else if (Array.isArray(response)) {
          setAvailableRides(response);
        } else if (response.success && response.rides) {
          setAvailableRides(response.rides);
        }
      }
    } catch (error) {
      console.error("Error fetching pending rides:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // second Side Effect for mounting polling cycle to fetching pending requests from backend like every 10 seconde

  {
    /**
    fetchJobs again settimeoutinterval 
    setInterval and pass something  
        
        
    */
  }
  useEffect(() => {
    fetchJobs();

    // Poll for new requests every 4 seconds dynamically
    const interval = setInterval(() => {
      fetchJobs(true); // pass true to fetch silently without flashing loaders
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  //mannual refresh button to fetch jobs again
  const handleManualRefresh = () => {
    setIsRefreshing(true);
    fetchJobs();
  };

  //setRefreshing -> true;

  //Logic : Atomic patch  claim request  submission  to backend
  //handleAcceceptJob      ---->

  const handleAcceptJob = async (rideId) => {
    const actionToast = toast.loading("Accepting job...");
    try {
      const response = await api.acceptRideJob(rideId);

      toast.dismiss(actionToast);
      if (response && response.success) {
        toast.success("Ride accepted! Proceed to the rider's destination.", {
          icon: "🚗",
        });
        setAvailableRides((prevRides) =>
          prevRides.filter((ride) => ride.id !== rideId),
        );
      } else {
        toast.error(response.message || "This job is no longer available.");
        fetchJobs(true); // Silently refresh to clear dead rows
      }
    } catch (error) {
      toast.dismiss(actionToast);
      console.error("Claim request failed:", error);
      toast.error("Network error claiming this trip.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-3">
        <RefreshCw className="animate-spin text-orange-500" size={28} />
        <p className="text-sm text-zinc-400 font-medium">
          Scanning for open booking requests...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header Panel Dashboard Block */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2 text-white">
            <Car className="text-orange-500" size={28} /> Driver Console
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Accept open matching jobs below to clear logs
          </p>
        </div>

        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="p-3 bg-[#111] border border-white/10 rounded-xl hover:bg-[#151515] transition active:scale-95 disabled:opacity-50 text-zinc-300 cursor-pointer"
          title="Refresh Job Board"
        >
          <RefreshCw
            size={16}
            className={isRefreshing ? "animate-spin text-orange-500" : ""}
          />
        </button>
      </div>

      {/* Main Grid View Container */}
      {availableRides.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl py-20 px-4 bg-[#0a0a0a] text-center max-w-2xl mx-auto">
          <AlertCircle className="text-zinc-600 mb-3 animate-pulse" size={36} />
          <h3 className="text-base font-semibold text-zinc-300">
            No active bookings nearby
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-xs">
            New rider booking requests will stream directly into this console
            view panel automatically.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {availableRides.map((ride) => (
            <div
              key={ride.id}
              className="bg-[#111] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all duration-200 shadow-xl"
            >
              <div>
                {/* Meta Row Headers */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-orange-500/10 text-orange-400 rounded-md border border-orange-500/20">
                    {ride.vehicleType}
                  </span>
                  <span className="text-xl font-black text-white">
                    ₹{ride.fare}
                  </span>
                </div>

                {/* Routing Addresses Panel Layout */}
                <div className="space-y-4 text-xs text-zinc-300 border-l border-zinc-800 ml-2 pl-4 relative my-5">
                  <div className="relative">
                    <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-zinc-500 border-2 border-black" />
                    <p className="font-bold text-zinc-500 tracking-wide uppercase text-[10px]">
                      PICKUP LOCATION
                    </p>
                    <p
                      className="text-sm text-white font-medium truncate mt-0.5"
                      title={ride.pickupLoc}
                    >
                      {ride.pickupLoc}
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-black" />
                    <p className="font-bold text-zinc-500 tracking-wide uppercase text-[10px]">
                      DROPOFF DESTINATION
                    </p>
                    <p
                      className="text-sm text-white font-medium truncate mt-0.5"
                      title={ride.dropoffLoc}
                    >
                      {ride.dropoffLoc}
                    </p>
                  </div>
                </div>

                {/* Distance and Est Duration Metrics info row */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-3 mb-4 text-zinc-400 text-[11px]">
                  <p>
                    Distance:{" "}
                    <span className="text-white font-semibold">
                      {ride.distanceKm} km
                    </span>
                  </p>
                  <p>
                    Est Time:{" "}
                    <span className="text-white font-semibold">
                      {ride.durationMin} mins
                    </span>
                  </p>
                </div>
              </div>

              {/* Accept Input Action Controller Trigger */}
              <button
                onClick={() => handleAcceptJob(ride.id)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold text-sm py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2 shadow-lg shadow-orange-500/10 cursor-pointer"
              >
                <Check size={16} strokeWidth={3} /> Accept Job
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DriverDashboard;
