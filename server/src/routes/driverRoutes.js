import express from "express";
import { driverStore } from "../store/driverStore.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";
import { getNearbyDrivers } from "../controllers/nearbyController.js";

const router = express.Router();

router.get("/nearby", protectedRoute, getNearbyDrivers);

export default router;
