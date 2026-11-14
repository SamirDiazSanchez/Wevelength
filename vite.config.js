import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Wavelength - Palabras',
        short_name: 'Wavelength',
        description: 'Pares de palabras y número objetivo para jugar Wavelength',
        lang: 'es',
        display: 'standalone',
        orientation: 'any',
        background_color: '#0f1226',
        theme_color: '#0f1226',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: { globPatterns: ['**/*.{js,css,html,svg,png,json,webmanifest}'] }
    })
  ]
});
