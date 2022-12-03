// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        books: resolve(__dirname, 'books/index.html'),
        personal: resolve(__dirname, 'personal/index.html'),
        processing: resolve(__dirname, 'projects/processing/index.html'),
        botorch: resolve(__dirname, 'projects/botorch/index.html')
      }
    }
  }
})