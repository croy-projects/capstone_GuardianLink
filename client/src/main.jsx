import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Root App component
import App from './app/App'

// Mount React app into <div id="root"> in index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* StrictMode helps catch bugs during development */}
    <App />
  </StrictMode>,
)
