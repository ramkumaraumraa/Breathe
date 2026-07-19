import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: false,
  },
  resolve: {
    alias: {
      '@/app/components/atoms': resolve(__dirname, './packages/react/src/atoms'),
      '@/app/components/molecules': resolve(__dirname, './packages/react/src/molecules'),
      '@/app/components/organisms': resolve(__dirname, './packages/react/src/organisms'),
      '@/app/components/templates': resolve(__dirname, './packages/react/src/templates'),
      '@/app/components/custom/kaayo': resolve(__dirname, './packages/react/src/kaayo'),
      '@': resolve(__dirname, './src'),
    },
  },
})
