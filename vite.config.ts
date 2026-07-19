import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Component source now lives in the publishable package (@aumraa/breathe-react).
      // These specific aliases must come before the generic '@' alias.
      '@/app/components/atoms': path.resolve(__dirname, './packages/react/src/atoms'),
      '@/app/components/molecules': path.resolve(__dirname, './packages/react/src/molecules'),
      '@/app/components/organisms': path.resolve(__dirname, './packages/react/src/organisms'),
      '@/app/components/templates': path.resolve(__dirname, './packages/react/src/templates'),
      '@/app/components/custom/kaayo': path.resolve(__dirname, './packages/react/src/kaayo'),
      '@aumraa/breathe-react/kaayo': path.resolve(__dirname, './packages/react/src/kaayo'),
      '@aumraa/breathe-react/technocracy': path.resolve(__dirname, './packages/react/src/technocracy'),
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-radix': [
            '@radix-ui/react-accordion', '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar', '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible', '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card', '@radix-ui/react-label',
            '@radix-ui/react-menubar', '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover', '@radix-ui/react-progress',
            '@radix-ui/react-radio-group', '@radix-ui/react-scroll-area',
            '@radix-ui/react-select', '@radix-ui/react-separator',
            '@radix-ui/react-slider', '@radix-ui/react-slot',
            '@radix-ui/react-switch', '@radix-ui/react-tabs',
            '@radix-ui/react-toast', '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group', '@radix-ui/react-tooltip',
          ],
          'vendor-mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'vendor-charts': ['recharts'],
          'vendor-motion': ['motion'],
          'vendor-forms': ['react-hook-form', 'react-day-picker', 'date-fns'],
          'vendor-prism': ['prism-react-renderer'],
        },
      },
    },
  },
})
