import { defineConfig } from 'vite'
import react from '@vitejs/react-refresh' // ou @vitejs/plugin-react

export default defineConfig({
  plugins: [react()],
})