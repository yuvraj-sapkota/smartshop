import { z } from "zod";

export const createProductSchema = z
  .object({
    name: z.string().trim().min(1, "Product name is required"),
    price: z
      .number({ message: "Price must be a number" })
      .positive("Price must be greater than 0"),
    commission: z
      .number({ message: "Commission must be a number" })
      .positive("Commission must be greater than 0"),
    measure: z.string().trim().min(1, "Measure is required"),
  })
  .refine((data) => data.commission <= data.price, {
    message: "Commission cannot be greater than the price",
    path: ["commission"],
  });
