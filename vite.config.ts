import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Config do Vite: React + PWA (offline) + alias "@" para "src"
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // Garante que o service worker seja registrado mesmo em builds de dev
      devOptions: { enabled: false },
      workbox: {
        // Cache do app shell (JS/CSS/HTML/imagens) para abrir offline
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff,woff2}"],
        // Pré-cache do worker do pdf.js (necessário para leitura offline)
        additionalManifestEntries: [],
        // Estratégia: cache-first para assets, network-first para navegação
        runtimeCaching: [
          {
            // Fontes do Google — cache-first com expiração de 1 ano
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
        // Navegar para o index.html quando offline (SPA)
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/^\/api\//],
      },
      manifest: {
        name: "Leitura — Leitor de PDF",
        short_name: "Leitura",
        description: "Leitor de PDF pessoal com anotações, citações e timer de leitura",
        theme_color: "#C96F4A",
        background_color: "#FAF6F0",
        // standalone = "Add to Home Screen" no Android/iOS
        display: "standalone",
        orientation: "portrait-primary",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        // Atalhos de tela (Android)
        shortcuts: [
          {
            name: "Biblioteca",
            url: "/",
            description: "Abrir sua biblioteca de livros",
          },
          {
            name: "Notas",
            url: "/notas",
            description: "Ver suas notas e citações",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: { "@": "/src" },
  },
});
