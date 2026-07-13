const generateNearbyDrivers = (centerLat, centerLng, count) => {
  const drivers = [];

  for (let i = 0; i < count; i++) {
    const latOffset = (Math.random() - 0.5) * 0.015;
    const lngOffset = (Math.random() - 0.5) * 0.015;

    drivers.push({
      id: `${i}`,
      lat: centerLat + latOffset,
      lng: centerLng + lngOffset,
      heading: Math.floor(Math.random() * 360),
    });
  }
  return drivers;
};
export default generateNearbyDrivers;
