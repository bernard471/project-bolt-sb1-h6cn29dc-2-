import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['xterm', 'xterm-addon-fit', 'xterm-addon-web-links'],
  },
  server: {
    port: 5173,
    host: true
  }
});