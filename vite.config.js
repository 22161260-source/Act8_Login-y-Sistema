import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Fase 4: sustituye XX por el número de tu equipo antes de "npm run build".
  // Ejemplo, equipo 05 -> base: '/t3_act8_eq05/'
  base: '/t3_act8_eqXX/',
})
