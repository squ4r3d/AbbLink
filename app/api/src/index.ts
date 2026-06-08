import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sharedVersion } from 'shared'
import { helloEndpoint } from 'shared/endpoints/hello'
import type { HelloRequest, HelloResponse } from 'shared/schemas/hello'

const app = new Hono()

const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173'

app.use(
  '*',
  cors({
    origin: corsOrigin,
    allowMethods: ['GET', 'POST'],
  })
)

app.get('/api/ping', (c) => {
  return c.json({
    ok: true,
    message: 'API is running',
    sharedVersion,
    now: new Date().toISOString(),
  })
})

app.post('/api/hello', async (c) => {
  const body = (await c.req.json()) as HelloRequest
  const request = helloEndpoint.request.parse(body)
  const response = helloEndpoint.response.parse({
    message: `hello ${request.text}`,
  })

  return c.json(response satisfies HelloResponse, 200)
})

app.get('/', (c) => {
  return c.text('AbbLink API is running')
})

const port = Number(process.env.PORT ?? 8787)
serve({ fetch: app.fetch, port })
console.log(`AbbLink API listening on http://localhost:${port}`)
