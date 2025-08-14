import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            vue: "vue/dist/vue.esm-bundler.js",
        },
    },
    test: {
        coverage: {
            exclude: [
                "**/*.vue", // Components
                "*.ts", // Root of repo (mainly config files)
                "src/*.ts", // Root of repo (mainly config files)
                "**/*.config.ts", // All other config files
                "dist/**", // Build
                "src/i18n/**", // Nothing to test here
                "**/types.ts", // Don't test directly
                "**/constants.ts", // Don't test directly
            ],
        },
    },
});
