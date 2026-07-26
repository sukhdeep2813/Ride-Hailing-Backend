import dotenv from "dotenv";
import express from "express";
import http from "http"; // 1. Import Node's HTTP module
import { Server } from "socket.io"; // 2. Import Socket.io Server
import cors from "cors";
import passport from "./config/passport.js";
import session from "express-session";
import authRoute from "./routes/authRoute.js";
import fareRoute from "./routes/fareRoute.js";
import rideRoute from "./routes/rideRoute.js";
import { initDriverSockets } from "../sockets/driverSocket.js"; // 3. Import your socket handler
import driverRoutes from "./routes/driverRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 4. Create the HTTP server wrapping Express
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  },
});

// 6. Initialize your socket connection events
initDriverSockets(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use("/api/auth", authRoute);
app.use("/api/fare", fareRoute);
app.use("/api/rides", rideRoute);
app.use("/api/create", rideRoute);
app.use("/api/drivers", driverRoutes);


app.get("/", (req, res) => {
  res.send("Backend is Working");
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
