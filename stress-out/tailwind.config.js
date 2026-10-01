import { defineConfig } from 'tailwindcss'

export default defineConfig({
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@radix-ui/react-*/dist/index.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
})
