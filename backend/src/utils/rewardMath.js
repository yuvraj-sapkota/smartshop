// Single source of truth for how cashback and referral rewards are
// calculated. Previously this same formula was hand-written separately in
// userFund.service.js, adminDashboard.service.js, order.service.js, and
// referral.service.js — which meant a future change (or bug fix) had to be
// made correctly in all four places, or the numbers would quietly disagree
// with each other across different screens of the app.
//
// Default rates are used whenever an order doesn't have its own stored rate
// (e.g. legacy orders placed before RewardConfig existed).
export const DEFAULT_CASHBACK_RATE = 0.25;
export const DEFAULT_REFERRAL_RATE = 0.1;

// For plain JavaScript math on values already pulled out of the database
// (e.g. looping over order.items in application code).
export const calculateReward = (commissionAmount, rate, fallbackRate) => {
  const effectiveRate = rate ?? fallbackRate;
  return parseFloat((commissionAmount * effectiveRate).toFixed(2));
};

// For use *inside* a MongoDB aggregation pipeline. This returns a Mongo
// expression object (not a real calculation) — Mongo evaluates it while
// aggregating, so it has to stay in Mongo's $multiply/$ifNull syntax rather
// than being a normal function call.
export const rewardAggregationExpr = (commissionField, rateField, fallbackRate) => ({
  $multiply: [commissionField, { $ifNull: [rateField, fallbackRate] }],
});
