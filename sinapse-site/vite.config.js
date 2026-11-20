import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vercel serve o site na raiz ("/"). Para publicar em subpasta, defina BASE_PATH.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
});
