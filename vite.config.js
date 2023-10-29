// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/routes/index.html'),
        books: resolve(__dirname, 'src/routes/books/index.html'),
        personal: resolve(__dirname, 'src/routes/personal/index.html'),
        visualizations: resolve(__dirname, 'src/routes/projects/visualizations/index.html'),
        botorch: resolve(__dirname, 'src/routes/projects/botorch/index.html'),
        sidebyside: resolve(__dirname, 'src/routes/projects/sidebyside/index.html'),
        basictable: resolve(__dirname, 'src/routes/projects/basictable/index.html'),
      }
    }
  },
  plugins: [react()],
});