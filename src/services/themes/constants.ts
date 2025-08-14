import type { SupportedThemes } from "@/services/themes/types";

export const SUPPORTED_THEMES: SupportedThemes = {
    dark: {
        label: "dark",
    },
    light: {
        label: "light",
    },
} as const;
