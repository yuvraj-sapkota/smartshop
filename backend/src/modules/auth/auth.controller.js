import {
  registerUserSchema,
  registerSellerSchema,
  loginSchema,
} from "./auth.validation.js";

import {
  createUserService,
  createSellerService,
  loginService,
} from "./auth.service.js";

// USER REGISTER
export const registerUser = async (req, res) => {
  try {
    const validatedData = registerUserSchema.parse(req.body);

    const result = await createUserService(validatedData);

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// SELLER REGISTER
export const registerSeller = async (req, res) => {
  try {
    const validatedData = registerSellerSchema.parse(req.body);

    const result = await createSellerService(validatedData);

    res.status(201).json({
      success: true,
      message: "Seller registered successfully",
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginService(
      validatedData.email,
      validatedData.password,
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
