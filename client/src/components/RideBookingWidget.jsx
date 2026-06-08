import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Bike,
  Car,
  ChevronDown,
  CreditCard,
  Banknote,
} from "lucide-react";
import { useLayout } from "../context/LayoutContext";
import { toast } from "react-hot-toast";

const RideBookingWidget = () => {
  // State Management for Inputs & Toggles
  const { setIsSearching, setRoutePoints } = useLayout();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [selectedVehicle, setSelectedVehicle] = useState("BoltSedan");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const vehicleOptions = [
    {
      id: "BoltBike",
      name: "BoltBike",
      price: "85",
      time: "4 min",
      icon: Bike,
    },
    {
      id: "BoltMini",
      name: "BoltMini",
      price: "160",
      time: "6 min",
      icon: Car,
    },
    {
      id: "BoltSedan",
      name: "BoltSedan",
      price: "230",
      time: "7 min",
      icon: Car,
    },
    {
      id: "BoltSuite",
      name: "BoltSuite",
      price: "130",
      time: "4 min",
      icon: Car,
    },
    {
      id: "BoltMinini",
      name: "BoltMinini",
      price: "160",
      time: "6 min",
      icon: Car,
    },
    {
      id: "BoltSedan2",
      name: "BoltSedan",
      price: "230",
      time: "7 min",
      icon: Car,
    },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!pickup.trim() || !destination.trim()) {
      toast.error("Please enter both pickup and destination locations.", {
        style: {
          background: "#1c1c1e",
          color: "#fff",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      });
      return; // stopping the function execution if validation fails
    }

    setRoutePoints({
      pickup: pickup.toLowerCase().trim(),
      destination: destination.toLowerCase().trim(),
    });

    // if (!destination.trim()) {
    //   toast.error("Destination location is required.", {
    //     style: { background: "#1c1c1e", color: "#fff", borderRadius: "12px" },
    //   });
    //   return;
    // }

    // const lookupKey = pickup.toLowerCase().trim();

    // if (MOCK_GEOCODE_DATABASE[lookupKey]) {
    //   const newCordinates = MOCK_GEOCODE_DATABASE[lookupKey];
    //   setMapCenter(newCordinates);

    //   toast.success(`Route generated successfully!${pickup}`, {
    //     style: { background: "#1c1c1e", color: "#fff", borderRadius: "12px" },
    //     iconTheme: { primary: "#499949", secondary: "#fff" },
    //   });
    //   setIsSearching(true);
    // } else {
    //   toast.error(
    //     "Location not in demo index. Try 'Dwarka Mor' or 'Connaught Place'!",
    //     {
    //       duration: 4000,
    //     },
    //   );
    // }
    // 3. Success Toast Notification before animation kicks in

    // Trigger the search state to hide the widget and show the map results

    toast.loading("Plotting optimal ride path...", { duration: 1500 });

    // 2. Clear panels via translation slide animations
    setTimeout(() => {
      setIsSearching(true);
    }, 1000);

    console.log("Submitting Ride Request:", {
      pickup,
      destination,
      selectedVehicle,
      paymentMethod,
    });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-100 p-5 text-zinc-900 font-sans ">
      {/* --- SECTION 1: PICKUP & DESTINATION INPUT FIELDS --- */}
      <form onSubmit={handleFormSubmit} className="space-y-4 relative">
        {/* Pickup Field */}
        <div className="relative">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            Pickup Location
          </label>
          <div className="relative flex items-center">
            <Navigation
              size={16}
              className="absolute left-3 text-zinc-500 fill-zinc-400 z-10 shrink-0"
            />
            <input
              type="text"
              placeholder="Current Location / Enter pickup address..."
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Connecting Line Aesthetic */}
        <div className="absolute left-5 top-14 h-7 w-0.5 border-l-2 border-dotted border-zinc-300 z-0" />

        {/* Destination Field with Mock Autocomplete Menu */}
        <div className="relative z-10">
          <div className="relative flex items-center">
            <MapPin
              size={16}
              className="absolute left-3 text-zinc-700 fill-zinc-200 z-10 shrink-0"
            />
            <input
              type="text"
              placeholder="Enter destination address..."
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="w-full bg-white border border-orange-600/30 pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
            />
          </div>
        </div>
      </form>

      {/* --- SECTION 2: VEHICLE OPTIONS GRID --- */}
      <div className="mt-5">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">
          Vehicle Category
        </span>
        <div className="grid grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
          {vehicleOptions.map((v) => {
            const isSelected = selectedVehicle === v.id;
            return (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v.id)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center cursor-pointer transition-all select-none ${
                  isSelected
                    ? "bg-[#FF5722] border-[#FF5722] text-white shadow-md shadow-orange-500/20"
                    : "bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300"
                }`}
              >
                <v.icon
                  size={22}
                  className={`${isSelected ? "text-white" : "text-zinc-900"}`}
                />
                <span className="text-xs font-bold mt-1 tracking-tight truncate w-full">
                  {v.name}
                </span>
                <span className="text-sm font-extrabold mt-0.5">
                  ₹{v.price}
                </span>
                <span
                  className={`text-[10px] mt-0.5 ${isSelected ? "text-orange-100" : "text-zinc-400"}`}
                >
                  {v.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- SECTION 3: PAYMENT METHOD BAR --- */}
      <div className="mt-5 pt-4 border-t border-zinc-100">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">
          Payment Method
        </span>
        <div className="flex items-center gap-4 text-sm font-medium">
          {/* Cash Selection */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "Cash"}
              onChange={() => setPaymentMethod("Cash")}
              className="accent-[#FF5722] w-4 h-4"
            />
            <div className="flex items-center gap-1.5 text-zinc-700">
              <Banknote size={16} className="text-zinc-500" />
              <span>Cash</span>
            </div>
          </label>

          <span className="text-zinc-300">|</span>

          {/* Card Selection */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "Card"}
              onChange={() => setPaymentMethod("Card")}
              className="accent-[#FF5722] w-4 h-4"
            />
            <div className="flex items-center gap-1.5 text-zinc-700">
              <CreditCard size={16} className="text-zinc-500" />
              <span>Card (**** 1234)</span>
            </div>
          </label>
        </div>
      </div>

      {/* --- SECTION 4: CALL TO ACTION --- */}
      <button
        onClick={handleFormSubmit}
        className="w-full mt-5 bg-[#FF5722] hover:bg-[#E64A19] active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all text-center text-base tracking-wide"
      >
        Request Bolt
      </button>
    </div>
  );
};

export default RideBookingWidget;
