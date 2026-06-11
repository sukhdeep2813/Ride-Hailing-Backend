import express from "express";
import { googleAuth, googleAuthCallback, SignUpController } from "../controllers/authController.js";

const router = express.Router();

//Routes 
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);


router.post('/signup', SignUpController); // Implement this controller to handle user registration
// router.post('/login', LoginController); // Implement this controller to handle user login

export default router;