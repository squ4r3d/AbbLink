export const sharedVersion = 'shared-hello-v1'

export const buildHello = (source: string) => {
  return `Hello from ${source}`
}

export {
  HelloRequestSchema,
  HelloResponseSchema,
} from './schemas/hello'
export {
  HelloRequest,
  HelloResponse,
  type HelloRequestType,
  type HelloResponseType,
} from './api/hello'
