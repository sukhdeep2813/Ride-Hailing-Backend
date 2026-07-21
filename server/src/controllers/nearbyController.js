import { driverStore } from "../../store/driverStore.js";

// 1. Fixed parameter signatures
export const getDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in KM
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
  try {
    const { lat, lng, radiusKm = 3 } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "Missing pickup location coordinate" });
    }

    // Parse floats FIRST before validating isNaN
    const riderLat = parseFloat(lat);
    const riderLng = parseFloat(lng);
    const searchRadius = parseFloat(radiusKm);

    if (isNaN(riderLat) || isNaN(riderLng)) {
      return res
        .status(400)
        .json({ error: "Valid lat and lng query params are required." });
    }

    // Call method on driverStore (fixed typo)
    const allDrivers = driverStore.getLiveDrivers();

    const nearbyDrivers = allDrivers
      .map((driver) => {
        const distance = getDistanceKm(
          riderLat,
          riderLng,
          driver.lat,
          driver.lng,
        );
        return {
          ...driver,
          distanceKm: Math.round(distance * 100) / 100, // Round to 2 decimal places
        };
      })
      .filter((driver) => driver.distanceKm <= searchRadius);

    // ALWAYS return a JSON response!
    return res.status(200).json({
      success: true,
      count: nearbyDrivers.length,
      drivers: nearbyDrivers,
    });
  } catch (error) {
    console.error("Error in getNearbyDrivers:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
