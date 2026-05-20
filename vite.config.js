import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'framer-motion': ['framer-motion'],
          'axios': ['axios'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 600,
    // Minify with Terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
    // Generate sourcemaps for debugging
    sourcemap: false,
    // Optimize asset sizes
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'i18next',
      'react-i18next',
      'i18next-browser-languagedetector',
      'framer-motion',
      'react-helmet-async',
    ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
