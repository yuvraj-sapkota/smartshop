import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../modules/auth/auth.model.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // Bearer token check
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("No token provided", 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // attach user to request
    req.user = user;

    next();
  } catch (error) {
    next(new AppError("Invalid token", 401));
  }
};

export default protect;
