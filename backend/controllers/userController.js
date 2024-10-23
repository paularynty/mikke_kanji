const bcrypt = require('bcryptjs');
const pool = require('../models/db');

// Handle user registration
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const existingUser = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username, ]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already taken.' });
    }

    // Hash the password
    // Insert the new user into the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'Hooray! Successfully created user.', user: result.rows[0] });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
};