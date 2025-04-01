import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'


export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: true, // Habilita a leitura do .babelrc
        configFile: true, // Habilita a leitura do babel.config.js
      }
    })
  ],
  build: {
    rollupOptions: {
      external: ['@tanstack/react-query'] 
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    mode: 'development'
  },
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
      '@tanstack/react-query': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'node_modules/@tanstack/react-query/dist/react-query.development.js')
    }
  }
)
