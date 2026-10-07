import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Dynamically import tanstackStart so the module resolves at build time
// (same approach used by @lovable.dev/vite-tanstack-config internally)
const { tanstackStart } = await import("@tanstack/react-start/plugin/vite");

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
  ],
  build: {
    target: "esnext",
  },
  // Vercel deployment target (matches vercel.json)
  // @ts-expect-error - nitro types not exposed directly
  nitro: {
    preset: "vercel",
  },
});
