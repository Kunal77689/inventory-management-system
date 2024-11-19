const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Retrieve token from header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token and decode user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user data (from JWT) to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticateUser;
