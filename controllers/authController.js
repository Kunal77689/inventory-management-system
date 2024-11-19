const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const user = await User.findOne({ where: { Username } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { UserID: user.UserID, Role: user.Role },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  const { Username, Password, Role } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { Username } });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create the new user
    const user = await User.create({
      Username,
      Password: hashedPassword,
      Role,
    });

    // Generate JWT token for the newly created user
    const token = jwt.sign(
      { UserID: user.UserID, Role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Optional: Set token expiration to 1 hour
    );

    // Send success message and token
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
};
