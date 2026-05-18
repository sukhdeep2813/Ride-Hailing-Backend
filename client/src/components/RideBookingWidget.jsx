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
  // 1. State Management for Input Toggles & Vehicle Selection
  const [destination, setDestination] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("BoltSedan");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // Reusable dataset mirroring your exact layout cards
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

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-100 p-5 text-zinc-900 font-sans mt-10">
      {/* --- SECTION 1: PICKUP & DESTINATION INPUTS --- */}
      <div className="space-y-3 relative">
        {/* Pickup  */}
        <div>
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            Pickup Location
          </label>
          <div className="w-full flex items-center gap-3 bg-zinc-50 border border-zinc-200 px-3 py-2.5 rounded-xl">
            <Navigation
              size={16}
              className="text-zinc-600 fill-zinc-600 shrink-0"
            />
            <span className="text-sm font-medium text-zinc-800 truncate">
              From:{" "}
              <span className="text-zinc-500 font-normal">
                Current Location / NSUT, New Delhi
              </span>
            </span>
          </div>
        </div>

        {/* Connecting Line Aesthetic */}
        <div className="absolute left-5 top-[52px] h-6 w-0.5 border-l-2 border-dotted border-zinc-300 z-0" />

        {/* Destination Target Input with Mock Autocomplete Toggle */}
        <div className="relative z-10">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            Destination
          </label>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-between gap-3 bg-white border border-orange-600/40 hover:border-orange-600 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
          >
            <div className="flex items-center gap-3 w-full">
              <MapPin
                size={16}
                className="text-zinc-700 fill-zinc-300 shrink-0"
              />
              <span
                className={`text-sm font-medium ${destination ? "text-zinc-800" : "text-zinc-400"}`}
              >
                {destination || "To: Connaught Place, New Delhi"}
              </span>
            </div>
            <ChevronDown size={16} className="text-zinc-400 shrink-0" />
          </div>

          
          {showDropdown && (
            <div className="absolute left-0 right-0 mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden z-50">
              <button
                onClick={() =>
                  handleDestinationSelect("Connaught Place, New Delhi")
                }
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-50 text-zinc-700 border-b border-zinc-100 transition-colors"
              >
                To: Connaught Place, New Delhi
              </button>
              <button
                onClick={() =>
                  handleDestinationSelect("Connaught Place, New Delhi")
                }
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-50 text-zinc-700 transition-colors"
              >
                To: Connaught Place, New Delhi
              </button>
            </div>
          )}
        </div>
      </div>

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

      {/* --- SECTION 4: CALL TO ACTION ACTION --- */}
      <button className="w-full mt-5 bg-[#FF5722] hover:bg-[#E64A19] active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all text-center text-base tracking-wide">
        Request Bolt
      </button>
    </div>
  );
};

export default RideBookingWidget;
