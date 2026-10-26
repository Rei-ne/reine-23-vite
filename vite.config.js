import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { pitchDevPlugin } from './netlify/pitch-dev.mjs'

export default defineConfig({
  plugins: [react(), pitchDevPlugin()],
  server: {
    fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.netlify/**', '**/netlify/**'] },
  },
  build: {
    outDir: 'dist/client',
  },
})
