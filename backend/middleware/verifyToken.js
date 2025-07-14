import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
  console.log("👉 Incoming cookies:", req.cookies); // ✅ Log all cookies

  const token = req.cookies?.jwt;
  console.log("👉 Extracted token:", token); // ✅ Log the JWT

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded); // ✅ See decoded userId

    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};
