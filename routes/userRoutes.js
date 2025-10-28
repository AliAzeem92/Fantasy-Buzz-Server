import express from "express";
import { getUserData } from "../controller/userController.js";
import { requireVerifiedAuth } from "../middleware/authSecurity.js";

const userRouter = express.Router();

// All user routes require verified authentication
userRouter.get("/user-info", requireVerifiedAuth, getUserData);

export default userRouter;
