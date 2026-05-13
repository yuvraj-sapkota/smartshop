import { success } from "zod";

const errorMiddleware = (error, req, res, next) => {
  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};

export default errorMiddleware;
