import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env.local";
dotenv.config({ path: envFile });

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

// Step 1: Create DB if it doesn't exist
async function ensureDatabase() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT || 3306,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  await connection.end();
}

await ensureDatabase(); // run immediately

// Step 2: Initialize Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT || 3306,
  logging: false, // disable SQL logs
});

try {
  await sequelize.authenticate();
  console.log("✅ Database connected & ready");
} catch (err) {
  console.error("❌ Database connection error:", err);
}

export default sequelize;
