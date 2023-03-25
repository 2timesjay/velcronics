// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        books: resolve(__dirname, 'books/index.html'),
        personal: resolve(__dirname, 'personal/index.html'),
        visualizations: resolve(__dirname, 'projects/visualizations/index.html'),
        botorch: resolve(__dirname, 'projects/botorch/index.html'),
        sidebyside: resolve(__dirname, 'projects/sidebyside/index.html'),
        basictable: resolve(__dirname, 'projects/basictable/index.html'),
      }
    }
  },
  plugins: [react()],
});