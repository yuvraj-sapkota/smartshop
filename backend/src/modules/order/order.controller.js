import { createOrderService, getMyOrdersService } from "./order.service.js";

export const createOrder = async (req, res, next) => {
  try {
    const sellerId = req.user._id;
    const order = await createOrderService(req.body, sellerId);
    res.status(201).json({
      success: true,
      message: "Sales order created successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const sellerId = req.user._id;
    const orders = await getMyOrdersService(sellerId);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    next(error);
  }
};
