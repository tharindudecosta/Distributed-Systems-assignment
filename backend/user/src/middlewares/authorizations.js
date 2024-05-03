// middlewares/auth.js
const jwt = require("jsonwebtoken");

const JWT_SECRET="shashi"
const JWT_EXPIRES_IN="1h"

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid authentication token" });
  }
};

const isStudent = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "student") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid authentication token" });
  }
};

const isFaculty = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "faculty") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid authentication token" });
  }
};

module.exports = { isAdmin, isStudent, isFaculty };
