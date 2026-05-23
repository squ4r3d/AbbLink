import { z } from 'zod'

export const HelloRequestSchema = z.object({
  text: z.string(),
})

export const HelloResponseSchema = z.object({
  message: z.string(),
})

export type HelloRequest = z.infer<typeof HelloRequestSchema>
export type HelloResponse = z.infer<typeof HelloResponseSchema>
