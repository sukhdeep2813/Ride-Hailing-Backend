import { express } from "express";
import { calculateFare } from "../controllers/fareController";
import { protectedRoute } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/calculate", protectedRoute, calculateFare);
