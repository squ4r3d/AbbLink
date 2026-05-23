import { HelloRequestSchema, HelloResponseSchema } from '../schemas/hello'

export const HelloRequest = HelloRequestSchema
export const HelloResponse = HelloResponseSchema

export type HelloRequestType = import('../schemas/hello').HelloRequest
export type HelloResponseType = import('../schemas/hello').HelloResponse
