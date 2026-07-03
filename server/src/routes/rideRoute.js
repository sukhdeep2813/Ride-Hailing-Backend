import express from "express";
import { protectedRoute } from "../middlewares/authMiddleware.js";
import { getRiderHistory } from "../controllers/rideHistoryController.js";
import { createRide, getPendingRides } from "../controllers/rideController.js";

const router = express.Router();

router.get("/history", protectedRoute, getRiderHistory);
router.post("/create", protectedRoute, createRide);
router.get("/pending", protectedRoute, getPendingRides);

export default router;
