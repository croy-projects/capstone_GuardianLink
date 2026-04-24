import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirect API calls to backend
      "/api": "http://localhost:5000",
      "/uploads": "http://localhost:5000"
    }
  }
})
