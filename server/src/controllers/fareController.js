export const calculateFare = async (req, res) => {
  try {
    const { distanceKm, durationMin } = req.body;

    //basic check
    if (distanceKm === undefined || durationMin === undefined) {
      return res
        .status(400)
        .json({ message: "Missing distance or duration metrics" });
    }

    const vehicleRates = {
      BoltBike: {
        name: "Bolt Bike",
        base: 25,
        perKm: 8,
        perMin: 1.5,
        speedMultiplier: 0.75,
      },
      BoltMini: {
        name: "Bolt Mini",
        base: 40,
        perKm: 13,
        perMin: 2.0,
        speedMultiplier: 1.0,
      },
      BoltSedan: {
        name: "Bolt Sedan",
        base: 55,
        perKm: 16,
        perMin: 2.5,
        speedMultiplier: 1.0,
      },
      BoltSuite: {
        name: "Bolt Suite",
        base: 80,
        perKm: 22,
        perMin: 3.5,
        speedMultiplier: 0.95,
      },
      BoltMinini: {
        name: "Bolt Go",
        base: 45,
        perKm: 14,
        perMin: 2.0,
        speedMultiplier: 0.95,
      },
      BoltSedan2: {
        name: "Bolt Plus",
        base: 60,
        perKm: 18,
        perMin: 2.5,
        speedMultiplier: 0.9,
      },
    };

    const calculateOption = Object.keys(vehicleRates).map((id) => {
      const rate = vehicleRates[id];

      const dynamicDuration = Math.round(durationMin * rate.speedMultiplier);
      const fareAmount =
        rate.base + distanceKm * rate.perKm + durationMin * rate.perMin;

      const fare = Math.round(fareAmount);

      return { id, name: rate.name, fare, time: `${dynamicDuration} min` };
    });
    return res.status(200).json({
      success: true,
      distanceKm,
      durationMin,
      fares: calculateOption,
    });
  } catch (error) {
    console.error("Backend Fare Calculation Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error calculating fares." });
  }
};

// {Total Fare} = {Base Fare} + {Distance} * {Per KM Rate} + {Time} * {Per Minute Rate}
