import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['src/test/e2e/**', 'node_modules/**'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'next/navigation': path.resolve(__dirname, './node_modules/next/navigation.js'),
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
      exclude: [
        'node_modules/',
        'src/test/setup.ts',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/**',
      ],
    },
  },
})
