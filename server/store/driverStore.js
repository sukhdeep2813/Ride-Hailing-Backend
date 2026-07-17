const activeDriver = new Map();

export const driverStore = {
  update: (driverId, data) => {
    activeDriver.set(driverId, {
      lat: parseFloat(data.lat),
      lng: parseFloat(data.lng),
      heading: parseFloat(data.heading || 0),
      vehicleType: data.vehicleType,
      lastPing: Date.now(), // Track time to catch dropped connections
    });
  },

  remove: (driverId) => {
    activeDriver.delete(driverId);
  },

  gectLiveDrivers: () => {
    const curr_time = Date.now();
    const STALE_TIMEOUT = 12000;
    const list = [];

    for (const [id, data] of activeDriver.entries()) {
      if (curr_time - data.lastPing) {
        activeDriver.delete(id);
        continue;
      }
      list.push({ id, ...data });
    }
    return list;
  },
};
