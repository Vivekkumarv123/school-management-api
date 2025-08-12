import express from "express";
import initializeSequelize from "./src/config/db.js";
import defineSchoolModel from "./src/models/school.model.js";
import schoolRoutes from "./src/routes/school.routes.js";

const app = express();
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("School Management API is running .🚀");
});

// Version endpoint for testing
app.get("/version", (req, res) => {
  res.json({ version: process.env.npm_package_version || "1.0.0" });
});

// Routes
app.use("/api", schoolRoutes);

// Export app for testing
export default app;

// ✅ Export this for use in tests
export async function startServer() {
  try {
    const sequelize = await initializeSequelize();
    defineSchoolModel(sequelize);
    await sequelize.sync();

    const server = app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });

    return { server, sequelize };
  } catch (error) {
    console.error("❌ DB connection error:", error);
    throw error;
  }
}

// ✅ Start server only when run directly (not during tests)
if (process.env.NODE_ENV !== "test") {
  startServer();
}
