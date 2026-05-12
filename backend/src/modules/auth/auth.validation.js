import { z } from "zod";

export const registerUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  address: z.string().optional(),

  referBy: z.string().optional(),
});

export const registerSellerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  storeName: z.string().min(2, "Store name required"),

  storeAddress: z.string().min(2, "Store address required"),

  referBy: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});
