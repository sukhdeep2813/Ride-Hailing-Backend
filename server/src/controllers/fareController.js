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
      BoltBike: { name: "Bolt Bike", base: 25, perKm: 8, perMin: 1.5 },
      BoltMini: { name: "Bolt Mini", base: 40, perKm: 13, perMin: 2.0 },
      BoltSedan: { name: "Bolt Sedan", base: 55, perKm: 16, perMin: 2.5 },
      BoltSuite: { name: "Bolt Suite", base: 80, perKm: 22, perMin: 3.5 },
      BoltMinini: { name: "Bolt Go", base: 45, perKm: 14, perMin: 2.0 },
      BoltSedan2: { name: "Bolt Plus", base: 60, perKm: 18, perMin: 2.5 },
    };

    const calculateOption = Object.keys(vehicleRates).map((id) => {
      const rate = vehicleRates[id];

      const fareAmount =
        rate.base + distance * rate.perKm + durationMin * rate.perMin;

      return { id, name, fareAmount, time: `${durationMin} min` };
    });
    return res.status(200).json({
      success: true,
      distanceKm,
      durationMin,
      fares: calculatedOptions,
    });
  } catch (error) {
    console.error("Backend Fare Calculation Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error calculating fares." });
  }
};

// {Total Fare} = {Base Fare} + {Distance} * {Per KM Rate} + {Time} * {Per Minute Rate}
