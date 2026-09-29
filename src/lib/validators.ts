import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  password: z.string().min(8).max(100)
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1)
});

export const requestSchema = z.object({
  categoryId: z.string().min(1),
  quantityKg: z.coerce.number().positive().max(100000),
  location: z.string().trim().min(3).max(250)
});

export const statusSchema = z.object({
  status: z.enum(["PENDING", "COLLECTED", "COMPLETED"]),
  note: z.string().trim().max(300).optional()
});
