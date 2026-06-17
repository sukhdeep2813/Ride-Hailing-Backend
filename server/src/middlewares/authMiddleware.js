import jwt from "jsonwebtoken";

export const protectedRoute = async (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization || req.headers["Authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Extract the token payload from after the space split
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. Token malformed." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Middleware Auth Verification Failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
