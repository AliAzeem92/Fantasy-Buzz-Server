import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const facebookLogin = async (req, res) => {
  try {
    const { name, email, id, avatar } = req.body;

    if (!name || !email || !id) {
      return res.status(400).json({
        success: false,
        message: "Missing required Facebook user data",
      });
    }

    // Check if user exists or create new one
    let user = await User.findOne({ 
      $or: [{ email }, { facebookId: id }] 
    });

    if (!user) {
      user = await User.create({
        name,
        email,
        facebookId: id,
        avatar: avatar || "",
        provider: "facebook",
        isVerified: true, // Facebook users are pre-verified
      });
    } else if (user.provider === "local") {
      // Update existing local user to Facebook
      user.provider = "facebook";
      user.isVerified = true;
      if (avatar) user.avatar = avatar;
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie and respond
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Facebook login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.error("Facebook login error:", error);
    return res.status(500).json({
      success: false,
      message: "Facebook login failed",
    });
  }
};