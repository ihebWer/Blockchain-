import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    include: ['@rainbow-me/rainbowkit', 'wagmi']
  },
  resolve: {
    alias: {
      'stream': 'stream-browserify',
      'util': 'util'
    }
  }
});
