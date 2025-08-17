import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
    server: {
      host: '0.0.0.0',  // Make the server listen on all network interfaces
      port: 5173, // You can set this to whatever port you prefer
      open: true, // Optional: auto-open the browser
    },
    plugins: [
      react(),
      tailwindcss(),
    ],
})