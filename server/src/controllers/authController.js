import prisma from "../config/db.js";
import passport from "../config/passport.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = [
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect to the desired page
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  },
];

export const SignUpController = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // 1. Server-side Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // 2. Check if the user already exists in Neon PostgreSQL
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }

    // 3. Core Security: Hash the password before database write
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new User row in PostgreSQL
    const newUser = await prisma.user.create({
      data: {
        email,
        name: name || email.split("@")[0], // Fallback to name extraction if empty
        // If your schema has a password field, store the hashedPassword here
        password: hashedPassword,
        role: role,
      },
    });

    // 5. Generate a JSON Web Token (JWT) matching your frontend login state
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Return the payload back to your SignUp.jsx handler
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup System Error:", error);
    res.status(500).json({ message: "Internal server registry error." });
  }
};

export const LoginController = async (req, res) => {
  try {
    // Step 1 : Extract email and password from req.body. Before touching the database, check that both fields are non-empty strings and conform to basic structural rules (e.g., verifying the email contains an @ symbol)

    const { email, password } = req.body;

    //validating inputs field
    if (!email || !password || !email.includes("@")) {
      return res.status(400).json({ message: "abe jhaatu shi daal na" });
    }

    //step 2 : Query database ( using the provided email address to check if the user exists.\
    //Security Rule: Do not check the password yet. First, simply establish if a record exists under that email.
    const dummyHash =
      "$2b$10$NxW92.gN8.SVRXyV5G2AJuA5I4Z7YqE0gJ9h8i7j6k5l4m3n2o1p.";
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    const isValidPassword = await bcrypt.compare(
      password,
      user ? user.password : dummyHash,
    );

    if (!user || !isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    /// everything is ok then send response to the frontend

    return res.status(200).json({
      message: "Successfully Login",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Server Panic:", error);
    return res
      .status(500)
      .json({ message: "Internal authentication server fault." });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        phone: true,
        rating,
        createdAt: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User account profile not found." });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ message: "Internal server retrieval fault." });
  }
};
export default {
  googleAuth,
  googleAuthCallback,
  SignUpController,
  LoginController,
  getUserProfile,
};
