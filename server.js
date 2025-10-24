// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv/config";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/mongodb.js";
// import authRouter from "./routes/authRoutes.js";
// import userRouter from "./routes/userRoutes.js";

// // dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 4000;
// connectDB();

// const allowedOrigins = [process.env.FRONTEND_URL];

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: allowedOrigins, credentials: true }));

// // API Endpoints
// app.get("/", (req, res) => {
//   res.send("API is running");
// });
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on PORT: ${PORT}`);
// });
// ✅ Load environment variables first!
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

// Create app
const app = express();

// Connect to DB
connectDB();

// Middleware
const allowedOrigins = [process.env.FRONTEND_URL];
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("API is running successfully 🚀");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// ✅ Export app for Vercel
export default app;

// ✅ Run locally only if not in Vercel
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
}
