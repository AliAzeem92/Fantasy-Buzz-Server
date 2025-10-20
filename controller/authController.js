import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

// Register a new user
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Create JWT for cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send verification email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify Your Account with OTP",
      text: `Hello ${name},\n\nYour verification OTP is: ${otp}\n\nThis OTP is valid for 10 minutes.\n\nBest regards,\nFantasy Buzz`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: "User registered successfully! OTP sent to your email.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email & Password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome Back!",
      text: `Hello ${user.name},\n\nYou have successfully logged in to our service. We're glad to have you back!\n\nBest regards,\nYour Company`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error occur: ${error.message}`,
    });
  }
};

// logout user
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error occur: ${error.message}`,
    });
  }
};

// Send User verification OTP
export const sendVerifyOTP = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account is already verified",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify Your Account with OTP",
      text: `Hello ${user.name},\n\nYour verification OTP is: ${otp}\n\nThis OTP is valid for 10 minutes.\n\nBest regards,\nYour Company`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Verification OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error occur: ${error.message}`,
    });
  }
};

// Verify User email with OTP
export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.userId;

  if (!userId || !otp) {
    return res.json({
      success: false,
      message: "User ID and OTP are missing",
    });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.verifyOtp || user.verifyOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (Date.now() > user.verifyOtpExpireAt) {
      return res.json({
        success: false,
        message: "OTP expired",
      });
    }

    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "User email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error occur: ${error.message}`,
    });
  }
};

// Check if user is authenticated
export const isAuthenticated = (req, res) => {
  try {
    return res.json({
      success: true,
      message: "User is authenticated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error occur: ${error.message}`,
    });
  }
};

// Send Password Reset OTP
export const sendResetOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found with this email",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOpt = otp;
    user.resetOptExpireAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Hello ${user.name},\n\nYour password reset OTP is: ${otp}\n\nThis OTP is valid for 5 minutes.\n\nBest regards,\nYour Company`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Password reset OTP sent successfully to your email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error occur: ${error.message}`,
    });
  }
};

// Reset User Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, OTP, and new password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.resetOpt || user.resetOpt !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (Date.now() > user.resetOptExpireAt) {
      return res.json({
        success: false,
        message: "OTP expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOpt = "";
    user.resetOptExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error occur: ${error.message}`,
    });
  }
};
