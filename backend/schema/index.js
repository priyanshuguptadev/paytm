import { z } from 'zod'

const userSignUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  username: z.string(),
  password: z.string().min(8)
})

const userSignInSchema = z.object({
  username: z.string(),
  password: z.string().min(8)
})

const updateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(8).optional()
})

export { userSignUpSchema, userSignInSchema, updateSchema }