import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow access from outside the container
    port: 5173,      // Make sure it matches the EXPOSE command in Dockerfile
    strictPort: true
  }
});
