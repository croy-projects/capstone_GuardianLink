import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // default:5173 - can change this to any port number
    proxy: {
      // Redirect API calls to backend
      "/api": "http://localhost:5000"
    }
  }
})
