import { HelloRequestSchema, HelloResponseSchema } from '../schemas/hello'
import type { BodyEndpoint } from './types'

/**
 * POST /api/hello
 * 送った文字列に hello を付けて返す
 */
export const helloEndpoint: BodyEndpoint<
  'POST',
  '/api/hello',
  undefined,
  undefined,
  typeof HelloRequestSchema,
  typeof HelloResponseSchema
> = {
  method: 'POST',
  path: '/api/hello',
  pathParams: undefined,
  query: undefined,
  request: HelloRequestSchema,
  response: HelloResponseSchema,
} as const
