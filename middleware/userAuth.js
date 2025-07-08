import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorized access, please login again",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
      next();
    } else {
      return res.json({
        success: false,
        message: "Not Authorized, please login again",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: `Server error occurred: ${error.message}`,
    });
  }
};

export default userAuth;
