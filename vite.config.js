import { defineConfig } from 'vite'

// vite.config.js
export default defineConfig({
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
      output: {
        entryFileNames: 'main.js',
        compact: true,
      },
    },
  },
  plugins: [],
})
