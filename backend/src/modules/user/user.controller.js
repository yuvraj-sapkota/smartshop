import { getAllUsersService, getCustomersService } from "./user.service.js";

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await getCustomersService();

    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};
