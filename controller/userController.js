import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        provider: user.provider,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error occurred: ${error.message}`,
    });
  }
};
