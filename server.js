// // ✅ Load environment variables first!
// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/mongodb.js";
// import authRouter from "./routes/authRoutes.js";
// import userRouter from "./routes/userRoutes.js";

// // Create app
// const app = express();

// // Connect to DB
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000", // local dev
//       "https://fantasy-buzz.vercel.app", // your deployed frontend
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // 👈 very important for cookies
//   })
// );

// // Routes
// app.get("/", (req, res) => {
//   res.send("API is running successfully 🚀");
// });
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);

// // ✅ Export app for Vercel
// export default app;

// // ✅ Run locally only if not in Vercel
// if (process.env.NODE_ENV !== "production") {
//   const PORT = process.env.PORT || 4000;
//   app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
// }

// ✅ Load environment variables first!
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// Connect to DB
connectDB();

// ✅ Access frontend URLs from .env
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.PROD_FRONTEND_URL,
];

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // 👈 required if using cookies / tokens
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
