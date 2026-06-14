import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@features': path.resolve(__dirname, './src/features'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@stores': path.resolve(__dirname, './src/stores'),
        '@api': path.resolve(__dirname, './src/api'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@contexts': path.resolve(__dirname, './src/contexts'),
      },
    },
    server: {
      port: 3000,
      host: true,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react-router')) return 'router';
              if (id.includes('@tanstack/react-query')) return 'query';
              if (id.includes('zustand')) return 'state';
              if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('scheduler')) return 'react-vendor';
              return 'vendor';
            }
            if (id.includes('/src/features/')) {
              const m = id.match(/\/features\/([^/]+)\/pages\/([^/.]+)/);
              if (m) return `${m[1]}-${m[2]}`;
            }
          },
        },
      },
    },
  };
});
