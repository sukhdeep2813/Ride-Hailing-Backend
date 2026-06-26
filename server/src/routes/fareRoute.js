import express from "express";
import { calculateFare } from "../controllers/fareController.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/calculate", protectedRoute, calculateFare);

export default router;
