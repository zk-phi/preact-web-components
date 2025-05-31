import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import dts from "vite-plugin-dts";
import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    dts(),
    analyzer({
      analyzerMode: "static",
      fileName: "stats.preact.html",
    }),
  ],
  build: {
    outDir: "dist",
    sourcemap: true,
    lib: {
      entry: ["src/index.ts", "src/attributeTypes.ts"],
      formats: ["es"],
    },
    rollupOptions: {
      external: ["preact", "preact/jsx-runtime"],
    },
  },
})
