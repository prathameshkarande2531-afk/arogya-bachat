import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Vercel serves from the root; GitHub Pages serves from /arogya-bachat/
  base: process.env.VERCEL ? '/' : '/arogya-bachat/',
  plugins: [react(), tailwindcss()],
})
