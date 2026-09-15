import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    // Skip CSS processing, but let `x.css?raw` string imports through (vitest blanks them otherwise)
    css: { include: [/\?raw$/] },
    // packages/react-native and apps/* are tested with jest-expo, not vitest
    exclude: [...configDefaults.exclude, 'packages/react-native/**', 'apps/**'],
  },
  resolve: {
    alias: {
      '@/app/components/atoms': resolve(__dirname, './packages/react/src/atoms'),
      '@/app/components/molecules': resolve(__dirname, './packages/react/src/molecules'),
      '@/app/components/organisms': resolve(__dirname, './packages/react/src/organisms'),
      '@/app/components/templates': resolve(__dirname, './packages/react/src/templates'),
      '@/app/components/custom/kaayo': resolve(__dirname, './packages/react/src/kaayo'),
      '@aumraa/breathe-react/kaayo': resolve(__dirname, './packages/react/src/kaayo'),
      '@aumraa/breathe-react/technocracy': resolve(__dirname, './packages/react/src/technocracy'),
      '@aumraa/breathe-react/lemniscate': resolve(__dirname, './packages/react/src/lemniscate'),
      '@aumraa/breathe-react/aumraa': resolve(__dirname, './packages/react/src/aumraa'),
      '@': resolve(__dirname, './src'),
    },
  },
})
