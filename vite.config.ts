import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { windi } from 'svelte-windicss-preprocess'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  plugins: [
    svelte({
      preprocess: windi(),
    }),
    WindiCSS(),
  ],
})
