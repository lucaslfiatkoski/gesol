import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";


const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];

export default defineConfig({
  plugins,
  define: {
    // Variáveis de ambiente definidas diretamente no Vite config
    'import.meta.env.VITE_APP_LOGO': JSON.stringify('/logo.svg'),
    'import.meta.env.VITE_APP_TITLE': JSON.stringify('Gesol Energia Solar'),
    'import.meta.env.VITE_ANALYTICS_ENDPOINT': JSON.stringify('http://localhost:3000/analytics'),
    'import.meta.env.VITE_ANALYTICS_WEBSITE_ID': JSON.stringify('12345'),
    'import.meta.env.VITE_OAUTH_PORTAL_URL': JSON.stringify('http://localhost:3000'),
    'import.meta.env.VITE_APP_ID': JSON.stringify('gesol-app-local-id'),
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
