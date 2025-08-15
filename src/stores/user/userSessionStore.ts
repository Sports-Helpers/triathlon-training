import { defineStore } from "pinia";
import type { SupportedTheme, SupportedThemeLabel } from "@/services/themes/types";
import { POP_LOG_DEBUG } from "@/logging/logger";
import { ThemeService } from "@/services/themes/themeService";
import { SUPPORTED_THEMES } from "@/services/themes/constants";

const DEFAULT_THEME: SupportedThemeLabel = "light";

export const useUserSessionStore = defineStore("userSessionStore", {
    state: () => ({
        theme: DEFAULT_THEME as SupportedThemeLabel,
    }),

    actions: {
        isAuthenticated(): boolean {
            return false;
        },

        isDarkTheme(): boolean {
            return this.theme === "dark";
        },

        changeTheme(themeService: ThemeService, newTheme: SupportedTheme<any>): void {
            const themeLabelOrError = themeService.selectTheme(newTheme);
            if (themeLabelOrError instanceof Error) {
                return;
            }

            this.theme = themeLabelOrError;
        },

        getCurrentTheme(): SupportedTheme<any> {
            return SUPPORTED_THEMES[this.theme];
        },

        refreshSession(themeService: ThemeService): void {
            POP_LOG_DEBUG("UserSessionStore - refreshSession");
            themeService.selectTheme(this.getCurrentTheme());
        },
    },

    persist: true,
});
