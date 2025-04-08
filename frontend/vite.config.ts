import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  },
  define: {
    'process.env': {},
    'process.browser': true,
  },
  resolve: {
    alias: {
      // Adicione aliases se necessário para compatibilidade com Next.js
    }
  },
  server: {
    port: 5173,
    open: true
  }
})