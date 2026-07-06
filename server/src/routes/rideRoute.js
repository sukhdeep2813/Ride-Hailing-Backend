import express from "express";
import { protectedRoute } from "../middlewares/authMiddleware.js";
import { getRiderHistory } from "../controllers/rideHistoryController.js";
import { acceptRideJob, createRide, getPendingRides } from "../controllers/rideController.js";

const router = express.Router();

router.get("/history", protectedRoute, getRiderHistory);
router.post("/create", protectedRoute, createRide);
router.get("/pending", protectedRoute, getPendingRides);
router.patch("/accept/:rideId", protectedRoute, acceptRideJob);

export default router;
