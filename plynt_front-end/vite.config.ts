import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// Dynamically import tanstackStart so the module resolves at build time
// (same approach used by @lovable.dev/vite-tanstack-config internally)
const { tanstackStart } = await import("@tanstack/react-start/plugin/vite");

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    TanStackRouterVite({
      autoCodeSplitting: true,
      codeSplittingOptions: { addHmr: false },
    }),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro(),
    react(),
  ],
  build: {
    target: "esnext",
  },
});
