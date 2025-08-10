// // Import required packages
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// // Import custom modules and middleware
// import connectDB from "./src/config/db.js";
// import init from "./index.routes.js";

// // Load environment variables first
// dotenv.config();

// // Initialize Express application
// const app = express();

// // Configure CORS middleware - Updated for production
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "https://e-commerce-back-65kq8vo9l-ahmeds-projects-e9ff88c7.vercel.app",
//       // Add your frontend domain here
//       process.env.FRONTEND_URL,
//     ].filter(Boolean), // Remove undefined values
//     credentials: true,
//   })
// );

// // Configure middleware for parsing JSON and URL-encoded bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Initialize routes
// init(app);

// // Database Connection with error handling
// const initializeApp = async () => {
//   try {
//     await connectDB();
//     console.log("✅ Database connected successfully");
//   } catch (error) {
//     console.error("❌ Database connection failed:", error.message);
//     // In production, you might want to exit the process
//     // process.exit(1);
//   }
// };

// // Initialize database connection
// initializeApp();

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`🚀 Server is running on port ${port}`);
//   console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
// });

// Import required packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import custom modules and middleware
import connectDB from "./src/config/db.js";
import init from "./index.routes.js";

// Load environment variables first
dotenv.config();

// Initialize Express application
const app = express();

// Configure CORS middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://e-commerce-back-65kq8vo9l-ahmeds-projects-e9ff88c7.vercel.app",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  })
);

// Middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect DB before each request (for serverless cold starts)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Database connection error middleware:", err);
    res.status(500).json({ status: "error", message: "Database connection failed" });
  }
});

// Initialize routes after DB middleware
init(app);

// Run only if not in serverless
if (!process.env.VERCEL) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

export default app; // Required for Vercel serverless

