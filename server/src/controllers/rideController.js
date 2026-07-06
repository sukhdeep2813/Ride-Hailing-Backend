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

export const getPendingRides = async (req, res) => {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago
    const rides = await prisma.ride.findMany({
      where: { status: "PENDING", createdAt: { gte: thirtyMinutesAgo } },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ sucess: true, rides });
  } catch (error) {
    console.error("Error fetching pending rides, rides", error);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};

export const acceptRideJob = async (req, res) => {
  try {
    const { rideId } = req.params;
    const driverId = req.user.id;

    const existingRide = await prisma.ride.findUnique({
      where: { id: rideId },
    });

    if (!existingRide) {
      return res
        .status(404)
        .json({ success: false, message: "Ride not found" });
    }
    if (existingRide.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "This ride has already been taken by another driver.",
      });
    }

    //update now in database
    const updateRides = await prisma.ride.update({
      where: { id: rideId },
      data: {
        status: "ACCEPTED",
        driverId: driverId,
      },
      include: { rider: { select: { name: true } } },
    });

    return res.status(200).json({
      success: true,
      message: "Ride Accepted successfully",
      ride: updateRides,
    });
  } catch (error) {
    console.error("Error accepting ride job:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error accepting ride job." });
  }
};
