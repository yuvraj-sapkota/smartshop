import rateLimit from "express-rate-limit";

// Limits login/register attempts to slow down brute-force / spam signups.
// 10 attempts per 15 minutes per IP.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const resetTime = req.rateLimit?.resetTime;
    const minutesLeft = resetTime
      ? Math.max(1, Math.ceil((resetTime.getTime() - Date.now()) / 60000))
      : 15;

    res.status(429).json({
      success: false,
      message: `Too many attempts. Please try again in ${minutesLeft} minute${
        minutesLeft === 1 ? "" : "s"
      }.`,
    });
  },
});

// Limits withdrawal/payment-proof submissions — these are naturally rare
// actions for a real user, so a tight cap here won't affect anyone legitimate.
// 20 requests per 15 minutes per IP.
export const fundActionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const resetTime = req.rateLimit?.resetTime;
    const minutesLeft = resetTime
      ? Math.max(1, Math.ceil((resetTime.getTime() - Date.now()) / 60000))
      : 15;
    res.status(429).json({
      success: false,
      message: `Too many requests. Please try again in ${minutesLeft} minute${
        minutesLeft === 1 ? "" : "s"
      }.`,
    });
  },
});

// Limits order creation — sellers legitimately create many orders per day,
// so this stays generous and only catches abnormal spam volume.
// 150 requests per 15 minutes per IP.
export const orderCreateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const resetTime = req.rateLimit?.resetTime;
    const minutesLeft = resetTime
      ? Math.max(1, Math.ceil((resetTime.getTime() - Date.now()) / 60000))
      : 15;
    res.status(429).json({
      success: false,
      message: `Too many requests. Please try again in ${minutesLeft} minute${
        minutesLeft === 1 ? "" : "s"
      }.`,
    });
  },
});
