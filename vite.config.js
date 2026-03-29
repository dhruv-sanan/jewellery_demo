import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor'
          }
          if (id.includes('gsap') || id.includes('@gsap')) {
            return 'gsap-vendor'
          }
          if (id.includes('framer-motion')) {
            return 'framer-vendor'
          }
        },
      },
    },
  },
})
