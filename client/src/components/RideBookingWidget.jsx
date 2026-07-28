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
import { api } from "../api/api.js";
import { useEffect } from "react";
import { formateTime } from "../utils/timeFormatter.js";
import generateNearbyDrivers from "../utils/offsetCoordinateGenerator.js";

const RideBookingWidget = () => {
  const {
    setIsSearching,
    setRoutePoints,
    routeMetrics,
    setIsVehicleSelected,
    pickupCoordinates,
    setNearbyDrivers,
  } = useLayout();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [selectedVehicle, setSelectedVehicle] = useState("BoltSedan");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const pickupAutocomplete = usePlaceAutocomplete();
  const destAutocomplete = usePlaceAutocomplete();

  const [faresList, setFaresList] = useState([]);
  const [isLoadingFares, setIsLoadingFares] = useState(false);

  const iconMap = {
    BoltBike: Bike,
    BoltMini: Car,
    BoltSedan: Car,
    BoltSuite: Car,
    BoltMinini: Car,
    BoltSedan2: Car,
  };

  useEffect(() => {
    if (!routeMetrics) {
      setFaresList([]);
      return;
    }

    const fetchFares = async () => {
      try {
        setIsLoadingFares(true);
        const response = await api.calculateRidesFares({
          distanceKm: routeMetrics.distanceKm,
          durationMin: routeMetrics.durationMin,
        });

        if (response.success && response.fares) {
          setFaresList(response.fares);
        }
      } catch (error) {
        console.error(
          "Failed fetching secure calculations from backend:",
          error,
        );
        toast.error("Error computing platform handling fares.");
      } finally {
        setIsLoadingFares(false);
      }
    };

    fetchFares();
  }, [routeMetrics]);

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

  const handleFormSubmit = async (e) => {
    if (e) e.preventDefault();

    // 1️⃣ STAGE 1: If map metrics haven't loaded yet, fetch the route path line
    if (!routeMetrics) {
      const finalPickup = PlaceExtractorForPickupAnsDestination(pickup);
      const finalDestination =
        PlaceExtractorForPickupAnsDestination(destination);

      console.log(
        "📍 Sending to Maps Engine -> Pickup:",
        finalPickup,
        "| Destination:",
        finalDestination,
      );

      if (!finalPickup.trim() || !finalDestination.trim()) {
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
        pickup: finalPickup.trim(),
        destination: finalDestination.trim(),
      });

      setIsSearching(true); // Mounts the map renderer lines
      toast.loading("Plotting optimal ride path...", { duration: 1500 });
      return; // 💡 Stop here so they can choose their car option!
    }

    // 2️⃣ STAGE 2: Metrics exist, user is looking at fares, and hits button a SECOND time
    try {
      const bookingToast = toast.loading("Processing your booking request...");

      // Find the fare value from your faresList array matching the selected variant name
      const chosenFareObj = faresList.find((f) => f.id === selectedVehicle);
      const finalPrice = chosenFareObj ? chosenFareObj.fare : 0;

      const finalPickup = PlaceExtractorForPickupAnsDestination(pickup);
      const finalDestination =
        PlaceExtractorForPickupAnsDestination(destination);

      const response = await api.createRideBooking({
        pickupLocation: finalPickup,
        destLocation: finalDestination,
        distanceKm: routeMetrics.distanceKm,
        durationMin: routeMetrics.durationMin,
        vehicleType: selectedVehicle,
        fare: finalPrice,
        paymentMethod: paymentMethod, // e.g., "Cash"
      });

      toast.dismiss(bookingToast);

      console.log("Ride booking response:", response);

      if (response && (response.success || response.ride)) {
        if (!pickupCoordinates) {
          toast.error("Pickup coordinates not available.");
          return;
        }

        const drivers = generateNearbyDrivers(
          pickupCoordinates.lat,
          pickupCoordinates.lng,
          6,
        );

        setNearbyDrivers(drivers);
        console.log("these are driver : ", drivers);

        toast.success(`Ride Requested! Finding your ${selectedVehicle}...`, {
          style: { background: "#1c1c1e", color: "#fff", borderRadius: "12px" },
        });

        // 💡 ONLY NOW do we hide the input widget panel and show the loading overlay
        setTimeout(() => {
          setIsVehicleSelected(true);
        }, 800);
      } else {
        toast.error(response.message || "Failed to process booking on server.");
      }
    } catch (error) {
      console.error("Submission pipeline broke:", error);
      toast.error("Network error creating your ride request.");
    }
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
                    <span className="truncate">{placeText}</span>
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
                    <span className="truncate">{placeText}</span>
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
        {isLoadingFares ? (
          // 💡 SKELETON PLACEHOLDER WHILE FARES ARE STREAMING OVER NETWORKS
          <div className="grid grid-cols-3 gap-2.5 py-2 text-center select-none">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-zinc-50 border border-zinc-100 p-3 rounded-xl animate-pulse flex flex-col items-center space-y-2"
              >
                <div className="w-6 h-6 bg-zinc-200 rounded-full" />
                <div className="w-14 h-3 bg-zinc-200 rounded" />
                <div className="w-10 h-4 bg-zinc-200 rounded animate-shimmer" />
              </div>
            ))}
          </div>
        ) : faresList.length > 0 ? (
          // 💡 RENDER DYNAMIC CALCULATED PRICING SLOTS RECEIVED FROM EXPRESS
          <div className="grid grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
            {faresList.map((v) => {
              const isSelected = selectedVehicle === v.id;
              const VehicleIcon = iconMap[v.id] || Car;

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
                  <VehicleIcon
                    size={22}
                    className={`${isSelected ? "text-white" : "text-zinc-900"}`}
                  />
                  <span className="text-xs font-bold mt-1 tracking-tight truncate w-full">
                    {v.name}
                  </span>
                  <span className="text-sm font-extrabold mt-0.5">
                    ₹{v.fare}
                  </span>
                  <span
                    className={`text-[10px] mt-0.5 ${isSelected ? "text-orange-100" : "text-blue-600"}`}
                  >
                    {formateTime(v.time)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          // 💡 DEFAULT FILLER FALLBACK CONTEXT STATE PRIOR TO INPUT VALIDATIONS
          <div className="text-center p-4 border border-dashed border-zinc-200 rounded-xl bg-zinc-50 text-xs font-medium text-zinc-400">
            Select route path to display dynamic vehicle variant options.
          </div>
        )}
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
