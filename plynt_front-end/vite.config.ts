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
    // addHmr disabled: Vite 8 SSR module runner does not inject
    // TSRSplitComponent into the SSR environment, causing a ReferenceError
    // on every route, and a "Duplicate declaration hot" Babel error on HMR.
    // Disable until upstream fix lands (vitejs/vite#21889).
    TanStackRouterVite({
      autoCodeSplitting: true,
      codeSplittingOptions: { addHmr: false },
    }),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
  ],
  build: {
    target: "esnext",
  },
});
