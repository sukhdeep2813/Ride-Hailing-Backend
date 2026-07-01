import prisma from "../config/db.js";

export const createRide = async (req, res) => {
  try {
    const {
      pickupLocation,
      destLocation,
      vehicleType,
      fare,
      distanceKm,
      durationMin,
    } = req.body;

    const riderId = req.user.id;

    if (
      !pickupLocation ||
      !destLocation ||
      !vehicleType ||
      !fare ||
      !distanceKm ||
      !durationMin
    ) {
      return res.status(400).json({ message: "Missing required ride details" });
    }

    const newRide = await prisma.ride.create({
      data: {
        riderId,
        pickupLoc: pickupLocation,
        dropoffLoc: destLocation,
        vehicleType,
        fare: parseFloat(fare),
        distanceKm: parseFloat(distanceKm || 0),
        durationMin: parseFloat(durationMin || 0),
        status: "PENDING", // Default
      },
    });

    return res
      .status(201)
      .json({ message: "Ride created successfully", ride: newRide });
  } catch (error) {
    console.error("Error creating ride booking:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error creating ride." });
  }
};
