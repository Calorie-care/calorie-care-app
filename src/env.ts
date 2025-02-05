import { z } from 'zod'

const envSchema = z.object({
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  EXPO_PUBLIC_API_URL: z.string(),
})

export const env = envSchema.parse(process.env)
