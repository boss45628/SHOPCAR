import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log("🚀 DB_HOST:", process.env.DB_HOST);
console.log("🚀 DB_PORT:", process.env.DB_PORT);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;
