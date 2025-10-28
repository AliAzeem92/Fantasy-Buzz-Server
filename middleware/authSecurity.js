import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Enhanced authentication middleware with security checks
export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No authentication token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await userModel.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found.",
      });
    }

    // Attach user to request
    req.user = user;
    req.userId = user._id;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }
    
    return res.status(401).json({
      success: false,
      message: "Invalid token. Authentication failed.",
    });
  }
};

// Middleware to require email verification
export const requireVerification = (req, res, next) => {
  if (req.user.provider === 'local' && !req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message: "Email verification required. Please verify your email to continue.",
      requiresVerification: true
    });
  }
  next();
};

// Combined middleware for full authentication + verification
export const requireVerifiedAuth = [requireAuth, requireVerification];

export default requireAuth;