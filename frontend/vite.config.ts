import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './',
  build: {
    outDir: 'dist',       // make sure build output goes to 'dist'
    rollupOptions: {
      input: '/index.html',
    },
  },
})
