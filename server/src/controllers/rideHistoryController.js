import prisma from "../config/db.js";
export const getRiderHistory = async (req, res) => {
  try {
    const riderId = req.user.id;

    const history = await prisma.ride.findMany({
      where: { riderId },
      orderBy: { createdAt: "desc" }, // Newest rides first
      include: {
        driver: {
          select: {
            name: true,
            avatar: true,
            rating: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    console.error("Error fetching ride history:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error fetching history.",
    });
  }
};
