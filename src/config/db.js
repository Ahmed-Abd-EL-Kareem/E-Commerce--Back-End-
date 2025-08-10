// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     // Use the environment variable (support both DBURL_PROD and DB_CONNECTION_STRING)
//     const dbURI = process.env.DBURL_PROD || process.env.DB_CONNECTION_STRING;

//     if (!dbURI) {
//       throw new Error("Database URI not found in environment variables");
//     }

//     console.log("Attempting to connect to database...");

//     // Simple connection with minimal options for stability
//     const connection = await mongoose.connect(dbURI);

//     console.log(`✅ Database Connected: ${connection.connection.host}`);

//     // Handle connection events
//     mongoose.connection.on("error", (err) => {
//       console.error("❌ Database connection error:", err);
//     });

//     mongoose.connection.on("disconnected", () => {
//       console.log("⚠️ Database disconnected");
//     });

//     mongoose.connection.on("connected", () => {
//       console.log("🔗 Database connected");
//     });

//     return connection;
//   } catch (error) {
//     console.error("❌ Database connection failed:", error.message);
//     throw error;
//   }
// };

// export default connectDB;



import mongoose from "mongoose";

let isConnected = false; // Track connection state across function calls

const connectDB = async () => {
  if (isConnected) {
    // Already connected, reuse the connection
    return;
  }

  const dbURI = process.env.DBURL_PROD || process.env.DB_CONNECTION_STRING;

  if (!dbURI) {
    throw new Error("Database URI not found in environment variables");
  }

  try {
    console.log("Attempting to connect to database...");

    const db = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Wait up to 30s for DB server
    });

    isConnected = db.connections[0].readyState === 1;
    console.log(`✅ Database Connected: ${db.connection.host}`);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("❌ Database connection error:", err);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ Database disconnected");
      isConnected = false;
    });

  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw error;
  }
};

export default connectDB;

