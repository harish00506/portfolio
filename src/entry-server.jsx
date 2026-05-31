import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Used by scripts/prerender.mjs to produce the static HTML at build time.
export function render() {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
