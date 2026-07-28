import { useEffect, useState } from "react";

export const useDriverTelemetry = (socket, driverId, vehicleType, isOnline) => {
  const [mockLocation, setMockLocation] = useState({
    lat: 28.6088,
    lng: 77.0348,
    heading: 90,
  });
  

  useEffect(() => {
    if (!socket || !driverId || !isOnline) return;

    const interval = setInterval(() => {
      // 1. Calculate values safely using the previous state
      setMockLocation((prev) => {
        const latDelta = (Math.random() - 0.5) * 0.0003;
        const lngDelta = (Math.random() - 0.5) * 0.0003;

        const nextLocation = {
          lat: prev.lat + latDelta,
          lng: prev.lng + lngDelta,
          heading: Math.floor(Math.random() * 360),
        };

        // 2. Emit the event immediately using the calculated values
        socket.emit("driver_heartbeat", {
          driverId,
          lat: nextLocation.lat,
          lng: nextLocation.lng,
          heading: nextLocation.heading,
          vehicleType,
        });

        return nextLocation;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [socket, driverId, vehicleType, isOnline]);
};
