// // Handle user registration
// const registerUser = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Please provide all required fields.' });
//   }

//   try {
//     const existingUser = await pool.query(
//       `SELECT * FROM users WHERE username = $1`,
//       [username, ]
//     );
//     if (existingUser.rows.length > 0) {
//       return res.status(400).json({ error: 'Username already taken.' });
//     }

//     // Hash the password
//     // Insert the new user into the database
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
//       [username, hashedPassword]
//     );

//     res.status(201).json({ message: 'Hooray! Successfully created user.', user: result.rows[0] });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = {
//   registerUser,
// };

// express: A web application framework for Node.js, used to create APIs.
// pg: The PostgreSQL client for Node.js, used to interact with the PostgreSQL database.
// bcryptjs: A library for hashing passwords securely.
// jsonwebtoken: A library for creating and verifying JSON Web Tokens (JWTs).
// pool: A connection pool to the PostgreSQL database, imported from a local database configuration file.
const { pool } = require("../database/db");
const JWT_SECRET = "real-secure-key";
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
// const { Pool } = require("pg");
const userRouter = express.Router(); // Correctly define the Router

// app.use(express.json());

const authMiddleware = (req, res, next) => {
  const token = req.get("Authorization"); // Use "Authorization" to fetch the header
  if (!token) return res.status(401).json({ error: "Access denied: No token provided" });

  try {
    const cleanedToken = token.replace("Bearer ", ""); // Clean the token
    const authorized = jwt.verify(cleanedToken, JWT_SECRET);
    req.user = authorized; // Attach user data to request object
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

userRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const count_result = await pool.query(
      "SELECT username FROM users WHERE username = ($1)",
      [username]
    );
    if (count_result.rows.length !== 0) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING id, username;",
      [username, hashedPassword]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT id, username, hashed_password FROM users WHERE username = ($1)",
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    if (
      (await bcrypt.compare(password, result.rows[0].hashed_password)) === false
    ) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: result.rows[0].id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ auth_token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("/validate", authMiddleware, async (req, res) => {
  res.status(200).json({ msg: "Token validated" });
});

const testConnection = async () => {
  console.log("Attempting to connect to database...");
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Successfully connected to database:", res.rows[0]);
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

testConnection();

module.exports = { userRouter, authMiddleware };
