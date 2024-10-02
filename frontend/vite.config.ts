import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite'
//  @ts-ignore
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //  @ts-ignore
    tailwindcss()
  ],
})
