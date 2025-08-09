import mongoose from "mongoose";

/**
 * Middleware to ensure database connection for each request
 * This is important for serverless functions where connections can be dropped
 */
const ensureDBConnection = async (req, res, next) => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      return next();
    }

    // If connecting, wait for it
    if (mongoose.connection.readyState === 2) {
      await new Promise((resolve) => {
        mongoose.connection.once("connected", resolve);
      });
      return next();
    }

    // If disconnected, try to reconnect
    if (
      mongoose.connection.readyState === 0 ||
      mongoose.connection.readyState === 3
    ) {
      const dbURI = process.env.DBURL_PROD || process.env.DB_CONNECTION_STRING;

      if (!dbURI) {
        return res.status(500).json({
          success: false,
          error: {
            message: "Database configuration error",
            statusCode: 500,
          },
        });
      }

      await mongoose.connect(dbURI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      });
    }

    next();
  } catch (error) {
    console.error("Database middleware error:", error);
    return res.status(500).json({
      success: false,
      error: {
        message: "Database connection failed",
        statusCode: 500,
        details: error.message,
      },
    });
  }
};

export default ensureDBConnection;
