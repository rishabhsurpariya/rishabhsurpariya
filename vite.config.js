import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const mimeTypes = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

function serveRootMediaPlugin() {
  return {
    name: 'serve-root-media',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const decodedUrl = decodeURIComponent(req.url || '').split('?')[0]
        if (
          decodedUrl.startsWith('/huddle/') ||
          decodedUrl.startsWith('/mAInu_project/') ||
          decodedUrl.startsWith('/moreworks_media/')
        ) {
          const filePath = path.join(__dirname, decodedUrl.replace(/^\//, ''))
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase()
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
            fs.createReadStream(filePath).pipe(res)
            return
          }
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), serveRootMediaPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      ignored: ['**/moreworks_media/**', '**/mAInu_project/**', '**/huddle/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
