import { z } from "zod"

export const campaignSchema = z.object({
  categoryId: z.number().int().positive(),
  titleEn: z.string().min(1).max(200),
  titleTr: z.string().min(1).max(200),
  descriptionEn: z.string().min(1).max(5000),
  descriptionTr: z.string().min(1).max(5000),
  shortDescriptionEn: z.string().min(1).max(500),
  shortDescriptionTr: z.string().min(1).max(500),
  imageUrl: z.string().url(),
  goalAmount: z.number().positive(),
  isFeatured: z.boolean().optional(),
  isUrgent: z.boolean().optional(),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
})

export const newsSchema = z.object({
  titleEn: z.string().min(1).max(200),
  titleTr: z.string().min(1).max(200),
  contentEn: z.string().min(1).max(10000),
  contentTr: z.string().min(1).max(10000),
  excerptEn: z.string().min(1).max(500),
  excerptTr: z.string().min(1).max(500),
  imageUrl: z.string().url(),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
})

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(10).max(20).optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
})

export const volunteerSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(10).max(20),
  country: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  skills: z.string().min(1).max(500),
  availability: z.string().min(1).max(200),
  experience: z.string().max(2000).optional(),
})

export const newsletterSchema = z.object({
  email: z.string().email().max(255),
})

export const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(100),
})

export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  return { success: false, errors: result.error }
}
