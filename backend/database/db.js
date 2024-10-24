const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres", //the username I created the postgresql database with
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASSWORD || "pass123",
  port: process.env.DB_PORT || 5432,
});

module.exports = { pool };