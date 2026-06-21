import express from "express";
import {
  googleAuth,
  googleAuthCallback,
  SignUpController,
  LoginController,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";

import { protectedRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Routes
router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);

router.post("/signup", SignUpController); // Implement this controller to handle user registration
router.post("/login", LoginController); // Implement this controller to handle user login

router.get("/profile", protectedRoute, getUserProfile);
router.put("/profile/update", protectedRoute, updateUserProfile);

export default router;
