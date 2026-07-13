import { z } from "zod";

const locationFields = {
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
};

export const registerUserSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    address: z.string().optional(),
    referBy: z.string().optional(),
    ...locationFields,
  })
  .refine((data) => (data.latitude == null) === (data.longitude == null), {
    message: "Both latitude and longitude are required together",
    path: ["latitude"],
  })
  .refine(
    (data) =>
      (data.latitude != null && data.longitude != null) ||
      (data.address && data.address.trim().length > 0),
    { message: "Share your location or enter your address", path: ["address"] },
  );

export const registerSellerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    storeName: z.string().min(2, "Store name required"),
    storeAddress: z.string().optional(), // was required — that was the bug
    referBy: z.string().optional(),
    ...locationFields,
  })
  .refine((data) => (data.latitude == null) === (data.longitude == null), {
    message: "Both latitude and longitude are required together",
    path: ["latitude"],
  })
  .refine(
    (data) =>
      (data.latitude != null && data.longitude != null) ||
      (data.storeAddress && data.storeAddress.trim().length >= 2),
    {
      message: "Share your store's location or enter its address",
      path: ["storeAddress"],
    },
  );

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});
