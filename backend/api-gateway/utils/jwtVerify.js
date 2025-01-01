const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyJWT = (req) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }


  try {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          console.error("JWT Verification Error:", err);
          return res.status(403).json({ message: "Forbidden" });
        }
        return 
    });       
  } catch {
    return null;
  }
};

module.exports = { verifyJWT };
