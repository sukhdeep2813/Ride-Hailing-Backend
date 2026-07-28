import { useEffect } from "react";
import { io } from "socket.io-client";
import { useLayout } from "../context/LayoutContext";

// Initialize outside the component so it doesn't reconnect on every render
const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000", {
  transports: ["websocket"],
});

export const useLiveDrivers = () => {
  const { setNearbyDrivers } = useLayout();

  useEffect(() => {
    // Listen for the exact event your Express backend is emitting
    socket.on("drivers:nearbyUpdate", (liveDrivers) => {
      // Overwrites your context state, triggering MapContainer's useMemo
      setNearbyDrivers(liveDrivers);
    });

    return () => {
      socket.off("drivers:nearbyUpdate");
    };
  }, [setNearbyDrivers]);

  // Optional: Expose the socket instance in case you want to manually emit events later
  // return { socket };
};
