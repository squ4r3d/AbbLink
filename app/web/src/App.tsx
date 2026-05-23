import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { helloEndpoint, sharedVersion } from 'shared'
import type { HelloRequest, HelloResponse } from 'shared'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiMessage, setApiMessage] = useState('Loading...')
  const [apiTime, setApiTime] = useState('')
  const [apiError, setApiError] = useState('')
  const [helloText, setHelloText] = useState('world')
  const [helloStatus, setHelloStatus] = useState('')
  const [helloResponse, setHelloResponse] =
    useState<HelloResponse | null>(null)

  const apiBase = useMemo(
    () => import.meta.env.VITE_API_BASE ?? 'http://localhost:8787',
    []
  )

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${apiBase}/api/ping`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setApiMessage(String(data.message ?? ''))
        setApiTime(String(data.now ?? ''))
        setApiError('')
      })
      .catch((err) => {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        setApiError(err instanceof Error ? err.message : 'Unknown error')
      })

    return () => controller.abort()
  }, [apiBase])

  const handleHello = () => {
    const payload: HelloRequest = { text: helloText }
    const parsed = helloEndpoint.request.safeParse(payload)
    if (!parsed.success) {
      setHelloStatus('Invalid text')
      return
    }

    setHelloStatus('Sending...')
    fetch(`${apiBase}${helloEndpoint.path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`)
        }
        return res.json()
      })
      .then((data: HelloResponse) => {
        setHelloResponse(data)
        setHelloStatus('OK')
      })
      .catch((err) => {
        setHelloStatus(err instanceof Error ? err.message : 'Unknown error')
      })
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <div style={{ marginTop: '16px' }}>
          <p>sharedVersion: {sharedVersion}</p>
          <p>
            API: {apiError ? `Error: ${apiError}` : apiMessage}
            {apiTime ? ` (${apiTime})` : ''}
          </p>
          <div style={{ marginTop: '8px' }}>
            <input
              type="text"
              value={helloText}
              onChange={(event) => setHelloText(event.target.value)}
              placeholder="Say hello"
            />
            <button
              type="button"
              style={{ marginLeft: '8px' }}
              onClick={handleHello}
            >
              Send Hello
            </button>
            {helloStatus ? <p>{helloStatus}</p> : null}
            {helloResponse ? <p>Response: {helloResponse.message}</p> : null}
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
