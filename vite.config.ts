import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    coverage: {
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      reporter: ['text', 'html'],
      exclude: ['**/types/**', '**/main.ts', '**/*.d.ts']
    }
  }
})
