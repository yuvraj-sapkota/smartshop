import {
  getAvailableBalanceService,
  submitWithdrawalService,
  getMyWithdrawalsService,
  getAllWithdrawalsService,
  updateWithdrawalStatusService,
} from "./userFund.service.js";

// GET /api/user-fund/available-balance
export const getAvailableBalance = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const data = await getAvailableBalanceService(userId);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

// POST /api/user-fund/submit-withdrawal
export const submitWithdrawal = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const withdrawal = await submitWithdrawalService(userId, req.body);
    res.status(201).json({
      success: true,
      message: "Withdrawal request submitted successfully. ",
      withdrawal,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/user-fund/my-withdrawals
export const getMyWithdrawals = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const withdrawals = await getMyWithdrawalsService(userId);
    res.status(200).json({ success: true, withdrawals });
  } catch (error) {
    next(error);
  }
};

// GET /api/user-fund/all-withdrawals  (admin)
export const getAllWithdrawals = async (req, res, next) => {
  try {
    const withdrawals = await getAllWithdrawalsService();
    res.status(200).json({ success: true, withdrawals });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/user-fund/:id/status  (admin)
export const updateWithdrawalStatus = async (req, res, next) => {
  try {
    const withdrawal = await updateWithdrawalStatusService(
      req.params.id,
      req.body,
    );
    res.status(200).json({
      success: true,
      message: `Withdrawal ${withdrawal.status} successfully`,
      withdrawal,
    });
  } catch (error) {
    next(error);
  }
};
