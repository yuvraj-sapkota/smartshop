import {
  getDueAmountService,
  submitPaymentService,
  getMyPaymentsService,
  getAllPaymentsService,
  updatePaymentStatusService,
} from "./sellerPayment.service.js";

// GET /api/seller-payments/due-amount
export const getDueAmount = async (req, res, next) => {
  try {
    const sellerId = req.user._id;
    const data = await getDueAmountService(sellerId);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

// POST /api/seller-payments/submit
// expects multipart/form-data — multer attaches req.file
export const submitPayment = async (req, res, next) => {
  try {
    const sellerId = req.user._id;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Screenshot is required" });
    }

    // If using cloudinary / local multer, adjust the URL field accordingly
    const screenshotUrl = req.file.path; // cloudinary → req.file.path; local → req.file.filename

    const payment = await submitPaymentService(
      sellerId,
      req.body,
      screenshotUrl,
    );

    res.status(201).json({
      success: true,
      message: "Payment submitted successfully. Awaiting admin approval.",
      payment,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/seller-payments/my-payments
export const getMyPayments = async (req, res, next) => {
  try {
    const sellerId = req.user._id;
    const payments = await getMyPaymentsService(sellerId);
    res.status(200).json({ success: true, payments });
  } catch (error) {
    next(error);
  }
};

// GET /api/seller-payments/all  (admin)
export const getAllPayments = async (req, res, next) => {
  try {
    const payments = await getAllPaymentsService();
    res.status(200).json({ success: true, payments });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/seller-payments/:id/status  (admin)
export const updatePaymentStatus = async (req, res, next) => {
  
  try {
    const payment = await updatePaymentStatusService(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: `Payment ${payment.status} successfully`,
      payment,
    });
  } catch (error) {
    next(error);
  }
};
