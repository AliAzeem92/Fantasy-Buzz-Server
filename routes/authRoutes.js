import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOTP,
  verifyEmail,
  isAuthenticated,
  sendResetOTP,
  verifyResetOTP,
  resetPassword,
} from "../controller/authController.js";
import userAuth from "../middleware/userAuth.js";
import { requireAuth, requireVerifiedAuth } from "../middleware/authSecurity.js";
import { googleLogin } from "../controller/googleAuthController.js";


const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", requireAuth, sendVerifyOTP);
authRouter.post("/verify-account", requireAuth, verifyEmail);
authRouter.get("/is-auth", requireAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOTP);
authRouter.post("/verify-reset-otp", verifyResetOTP);
authRouter.post("/reset-password", resetPassword);

// Social login routes
authRouter.post("/google-login", googleLogin);

export default authRouter;
