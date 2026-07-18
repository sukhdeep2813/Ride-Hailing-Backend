import { driverStore } from "../../store/driverStore";

export const getDistanceKm = () => {
  // haversine formula
  const R = 6371; // Radius of Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export const getNearbyDrivers = (req, res) => {
  const { lat, lng, radiusKm = 3 } = req.query;

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ message: "Missing pickup location coordinate" });
  }

  const riderLat = parseFloat(lat);
  const riderLng = parseFloat(lng);
  const searchRadius = parseFloat(radiusKm);

  const allDrivers = driverStore.gectLiveDrivers();
  const nearbyDrivers = allDrivers.filter((driver) =>{
      const distance = getDistanceKm(riderLat, riderLng, driver.lat, driver.lng); 

      return distance <= searchRadius;
  })
};
