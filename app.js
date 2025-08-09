import express from "express";
import sequelize from "./src/config/db.js";
import schoolRoutes from "./src/routes/school.routes.js";

const app = express();
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("School Management API is running 🚀");
});

// Routes
app.use("/api", schoolRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    await sequelize.sync(); // Creates table if it doesn't exist

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB connection error:", error);
  }
})();
