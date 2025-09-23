import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), commonjs(), nodePolyfills()],
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    include: ["borsh"],
  },
  base: "/",
  server: {
    host: "0.0.0.0",
    port: 5174,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, Content-Type, Authorization",
    },
    proxy: {
      "/api/coin-prices": {
        target: "https://axiom.trade",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/api\/coin-prices/, "/api/coin-prices"),
      },
      "/api": {
        target: "https://launch.scopium.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      "/api/coingecko": {
        target: "https://api.coingecko.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/coingecko/, ""),
      },
    },
  },
});
