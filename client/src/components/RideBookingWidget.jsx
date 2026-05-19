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

const RideBookingWidget = () => {
  // State Management for Inputs & Toggles
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
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

  const handleDestinationSelect = (val) => {
    setDestination(val);
    setShowDropdown(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Ride Request:", {
      pickup,
      destination,
      selectedVehicle,
      paymentMethod,
    });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-100 p-5 text-zinc-900 font-sans mt-10">
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
        <div className="absolute left-5 top-[56px] h-7 w-0.5 border-l-2 border-dotted border-zinc-300 z-0" />

        {/* Destination Field with Mock Autocomplete Menu */}
        <div className="relative z-10">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            Destination
          </label>
          <div className="relative flex items-center">
            <MapPin
              size={16}
              className="absolute left-3 text-zinc-700 fill-zinc-200 z-10 shrink-0"
            />
            <input
              type="text"
              placeholder="Where to? (e.g. Connaught Place)"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full bg-white border border-orange-600/30 pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
            />
            <ChevronDown
              size={16}
              className="absolute right-3 text-zinc-400 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
          </div>

         
          {showDropdown && (
            <div className="absolute left-0 right-0 mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden z-50 max-h-48 overflow-y-auto">
              <button
                type="button"
                onClick={() =>
                  handleDestinationSelect("Connaught Place, New Delhi")
                }
                className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-50 text-zinc-700 border-b border-zinc-100 transition-colors flex flex-col"
              >
                <span className="font-semibold text-zinc-800">
                  Connaught Place
                </span>
                <span className="text-xs text-zinc-400">
                  New Delhi, Delhi, India
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleDestinationSelect("NSUT Campus, Dwarka")}
                className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-50 text-zinc-700 transition-colors flex flex-col"
              >
                <span className="font-semibold text-zinc-800">NSUT Campus</span>
                <span className="text-xs text-zinc-400">
                  Azad Hind Fauj Marg, Dwarka Sector 3
                </span>
              </button>
            </div>
          )}
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
