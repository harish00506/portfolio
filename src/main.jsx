import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'
import './index.css'

const rootEl = document.getElementById('root')
// Analytics is mounted here rather than in App.jsx so the prerendered tree in
// entry-server.jsx stays free of it: it is a browser-only concern that injects
// its script from an effect, and App.jsx is for routes only. It renders no DOM,
// so hydration still matches the prerendered markup.
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>
)

// When the page was pre-rendered (production build), the root already has
// server-rendered markup, so hydrate it. Otherwise (dev) do a fresh render.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
