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
    const { email, password, name } = req.body;

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
        role: "RIDER", // Default system assignment
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
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Signup System Error:", error);
    res.status(500).json({ message: "Internal server registry error." });
  }
};

export default { googleAuth, googleAuthCallback, SignUpController };
