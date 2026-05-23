import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { buildHello, sharedVersion } from 'shared'
import { HelloRequest, HelloResponse, type HelloRequestType } from 'shared/api/hello'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST'],
  })
)

app.get('/api/ping', (c) => {
  return c.json({
    ok: true,
    message: buildHello('api'),
    sharedVersion,
    now: new Date().toISOString(),
  })
})

app.post('/api/hello', async (c) => {
  const body = (await c.req.json()) as HelloRequestType
  const request = HelloRequest.parse(body)
  const response = HelloResponse.parse({
    message: `hello ${request.text}`,
  })

  return c.json(response, 200)
})

app.get('/', (c) => {
  return c.text('AbbLink API is running')
})

const port = Number(process.env.PORT ?? 8787)
serve({ fetch: app.fetch, port })
console.log(`AbbLink API listening on http://localhost:${port}`)
