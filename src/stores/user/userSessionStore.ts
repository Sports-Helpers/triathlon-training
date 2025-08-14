import { defineStore } from "pinia";
import type { SupportedTheme, SupportedThemeLabel } from "@/services/themes/types";
import type { SupportedLanguage, SupportedLocale } from "@/services/i18n/types";
import { LanguageService } from "@/services/i18n/languageService";
import { SUPPORTED_LANGUAGES } from "@/services/i18n/constants";
import { POP_LOG_DEBUG } from "@/logging/logger";
import { ThemeService } from "@/services/themes/themeService";
import { SUPPORTED_THEMES } from "@/services/themes/constants";

const DEFAULT_LOCALE: SupportedLocale = "fr";
const DEFAULT_THEME: SupportedThemeLabel = "light";

export const useUserSessionStore = defineStore("userSessionStore", {
    state: () => ({
        theme: DEFAULT_THEME as SupportedThemeLabel,
        locale: DEFAULT_LOCALE as SupportedLocale,
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

        changeLanguage(languageService: LanguageService, newLanguage: SupportedLanguage<any>): void {
            const localeOrError = languageService.selectLanguage(newLanguage);
            if (localeOrError instanceof Error) {
                return;
            }

            this.locale = localeOrError;
        },

        getCurrentLanguage(): SupportedLanguage<any> {
            return SUPPORTED_LANGUAGES[this.locale];
        },

        getCurrentTheme(): SupportedTheme<any> {
            return SUPPORTED_THEMES[this.theme];
        },

        refreshSession(languageService: LanguageService, themeService: ThemeService): void {
            POP_LOG_DEBUG("UserSessionStore - refreshSession");
            languageService.selectLanguage(this.getCurrentLanguage());
            themeService.selectTheme(this.getCurrentTheme());
        },
    },

    persist: true,
});
