import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please log in first.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object
    req.userId = decoded?.id;

    if (!req.userId) {
      return res.status(403).json({
        success: false,
        message: "Invalid token, please login again.",
      });
    }

    next(); // ✅ Continue to next middleware or controller
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({
      success: false,
      message: "Authentication failed. Token may be expired or invalid.",
    });
  }
};

export default userAuth;
