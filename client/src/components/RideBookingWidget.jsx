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
import { usePlaceAutocomplete } from "../hooks/usePlaceAutocomplete";
import { toast } from "react-hot-toast";
import { getPlaceString } from "../utils/googlePlacesHelper";
import { PlaceExtractorForPickupAnsDestination } from "../utils/placesExtracter";

const RideBookingWidget = () => {
  const { setIsSearching, setRoutePoints } = useLayout();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [selectedVehicle, setSelectedVehicle] = useState("BoltSedan");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const pickupAutocomplete = usePlaceAutocomplete();
  const destAutocomplete = usePlaceAutocomplete();

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

  const handleInputChange = (text, type) => {
    if (type === "pickup") {
      setPickup(text);
      pickupAutocomplete.fetchPredictions(text);
    } else {
      setDestination(text);
      destAutocomplete.fetchPredictions(text);
    }
  };

  // 💡 MARKED CHANGE #1: Standardized helper layout logic to read the New Places API object layer correctly
  const handleSelectPlace = (placeText, type) => {
    if (type === "pickup") {
      setPickup(placeText);
      pickupAutocomplete.clearPredictions();
      pickupAutocomplete.refreshSessionToken(); // Optional: Cycle tokens cleanly on pick
    } else {
      setDestination(placeText);
      destAutocomplete.clearPredictions();
      destAutocomplete.refreshSessionToken(); // Optional: Cycle tokens cleanly on pick
    }
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();

    const finalPickup = PlaceExtractorForPickupAnsDestination(pickup);
    const finalDestination = PlaceExtractorForPickupAnsDestination(destination);

    if (!finalPickup.trim() || !finalDestination.trim().trim()) {
      toast.error("Please enter both pickup and destination locations.", {
        style: {
          background: "#1c1c1e",
          color: "#fff",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      });
      return;
    }

    setRoutePoints({
      pickup: finalPickup.toLowerCase().trim(),
      destination: finalDestination.toLowerCase().trim(),
    });

    toast.loading("Plotting optimal ride path...", { duration: 1500 });

    setTimeout(() => {
      setIsSearching(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-100 p-5 text-zinc-900 font-sans">
      {/* --- SECTION 1: PICKUP & DESTINATION INPUT FIELDS --- */}
      <div className="space-y-4 relative">
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
              onChange={(e) => handleInputChange(e.target.value, "pickup")}
              className="w-full bg-zinc-50 border border-zinc-200 pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>

          {pickupAutocomplete.predictions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-zinc-200 mt-1 rounded-xl shadow-2xl z-50 max-h-52 overflow-y-auto overflow-x-hidden divide-y divide-zinc-100">
              {pickupAutocomplete.predictions.map((item, index) => {
                const placeText = getPlaceString(item);
                const placeId = item.placePrediction?.placeId || index;

                return (
                  <li
                    key={placeId}
                    // 💡 MARKED CHANGE #2: Pass explicit plain string token parameter matching handleSelectPlace refactor
                    onClick={() => handleSelectPlace(placeText, "pickup")}
                    className="px-4 py-3 text-xs font-semibold hover:bg-zinc-50 text-zinc-700 cursor-pointer transition-colors flex items-center gap-2 truncate"
                  >
                    <Navigation size={12} className="text-zinc-400 shrink-0" />
                    <span className="truncate">{placeText.oh.Ei[0]}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Connecting Line Aesthetic */}
        <div className="absolute left-5 top-14 h-7 w-0.5 border-l-2 border-dotted border-zinc-300 z-0" />

        {/* Destination Field Wrapper */}
        <div className="relative z-20">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            Where To?
          </label>
          <div className="relative flex items-center">
            <MapPin
              size={16}
              className="absolute left-3 text-zinc-700 fill-zinc-200 z-10 shrink-0"
            />
            <input
              type="text"
              placeholder="Enter destination address..."
              value={destination}
              onChange={(e) => handleInputChange(e.target.value, "destination")}
              className="w-full bg-white border border-zinc-200 pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
            />
          </div>

          {/* 💡 FLOATING DROPDOWN FOR DESTINATION - FIXED */}
          {destAutocomplete.predictions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-zinc-200 mt-1 rounded-xl shadow-2xl z-50 max-h-52 overflow-y-auto overflow-x-hidden divide-y divide-zinc-100">
              {destAutocomplete.predictions.map((item, index) => {
                // 💡 MARKED CHANGE #3: Updated parsing variables to point to placePrediction wrapper properties safely
                const placeText = getPlaceString(item);
                const placeId =
                  item.place_id || item.placePrediction?.placeId || index;

                return (
                  <li
                    key={placeId}
                    // 💡 MARKED CHANGE #4: Updated click target triggers to cleanly match the pickup mapping model values
                    onClick={() => handleSelectPlace(placeText, "destination")}
                    className="px-4 py-3 text-xs font-semibold hover:bg-zinc-50 text-zinc-700 cursor-pointer transition-colors flex items-center gap-2 truncate"
                  >
                    <MapPin size={12} className="text-zinc-400 shrink-0" />
                    <span className="truncate">{placeText.oh.Ei[0]}</span>
                  </li>
                );
              })}
            </ul>
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
        className="w-full mt-5 bg-[#FF5722] hover:bg-[#E64A19] active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all text-center text-base tracking-wide cursor-pointer"
      >
        Request Bolt
      </button>
    </div>
  );
};

export default RideBookingWidget;
