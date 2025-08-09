import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { URL } from "url";

// Only load .env locally
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
}
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("❌ DATABASE_URL not set in environment variables");
}

const parsed = new URL(dbUrl);

const DB_HOST = parsed.hostname;
const DB_PORT = parsed.port || 3306;
const DB_USER = parsed.username;
const DB_PASS = parsed.password;
const DB_NAME = parsed.pathname.replace("/", "");

// Step 1: Create DB if not exists (only works if user has permission)
async function ensureDatabase() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  await connection.end();
}

await ensureDatabase();

// Step 2: Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("✅ Database connected & ready");
} catch (err) {
  console.error("❌ Database connection error:", err);
}

export default sequelize;
