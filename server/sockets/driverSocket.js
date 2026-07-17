import { driverStore } from "../store/driverStore.js";

export const initDriverSockets = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 WebSockets Connected: ${socket.id}`);

    socket.on("driver_heartbeat", (data) => {
      const { driverId, lat, lng, heading, vehicleType } = data;

      if (!driverId || !lat || !lng) return;

      socket.driverId = driverId;

      driverStore.update(driverId, { lat, lng, heading, vehicleType });
    });

    socket.on("disconnect", () => {
      if (socket.driverId) {
        console.log(`❌ Driver went offline: ${socket.driverId}`);
        driverStore.remove(socket.driverId);
      }
    });
  });
};
