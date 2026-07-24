import { z } from "zod";

export const updateProfileSchema = z.object({
  username: z.string().trim().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().trim().optional(),
  address: z.string().trim().optional(),
  storeName: z.string().trim().optional(),
  storeAddress: z.string().trim().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export const addReferralSchema = z.object({
  referralUsername: z.string().trim().min(1, "Referral username is required"),
});
