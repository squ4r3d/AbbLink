import type { z } from 'zod'

export type BodyEndpoint<
  Method extends string,
  Path extends string,
  PathParams,
  Query,
  RequestSchema extends z.ZodTypeAny,
  ResponseSchema extends z.ZodTypeAny
> = {
  method: Method
  path: Path
  pathParams: PathParams
  query: Query
  request: RequestSchema
  response: ResponseSchema
}

export type GetEndpoint<
  Path extends string,
  PathParams,
  Query,
  ResponseSchema extends z.ZodTypeAny
> = {
  method: 'GET'
  path: Path
  pathParams: PathParams
  query: Query
  request: undefined
  response: ResponseSchema
}
