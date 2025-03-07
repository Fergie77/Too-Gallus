import { defineConfig } from 'vite'

// vite.config.js
export default defineConfig({
  root: './src',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    lib: {
      entry: 'main.js',
      name: 'TooGallus',
      fileName: 'too-gallus',
      formats: ['umd'],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  plugins: [], // Remove any ESLint plugins here
})
