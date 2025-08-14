import type { SupportedTheme, SupportedThemeLabel } from "@/services/themes/types";
import { SUPPORTED_THEMES } from "@/services/themes/constants";
import { ThemeInstance } from "@/services/themes/themeInstance";
import { POP_LOG_DEBUG } from "@/logging/logger";
import { inject } from "vue";

export class ThemeService {
    private themeInstance: ThemeInstance;

    constructor(themeInstance: ThemeInstance) {
        this.themeInstance = themeInstance;
    }

    public isValidTheme(theme: SupportedTheme<any>): boolean {
        return Object.keys(SUPPORTED_THEMES).includes(theme.label);
    }

    public getTheme(): SupportedThemeLabel {
        return this.themeInstance.getTheme().label;
    }

    public selectTheme(theme: SupportedTheme<any>): Error | SupportedThemeLabel {
        POP_LOG_DEBUG(`ThemeService - selectTheme (${theme.label})`);
        if (!this.isValidTheme(theme)) {
            return new Error();
        }

        this.themeInstance.setTheme(theme);
        return theme.label;
    }
}

export const THEME_SERVICE_KEY = "themeService" as const;

export function useThemeService(): ThemeService {
    const service = inject<ThemeService>(THEME_SERVICE_KEY);
    if (!service) {
        throw new Error("ThemeService was not provided");
    }
    return service;
}
