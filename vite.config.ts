import { defineConfig, type PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        visualizer({
            filename: "rollup_bundle_stats.html",
            template: "flamegraph",
            open: false,
        }) as PluginOption,
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
