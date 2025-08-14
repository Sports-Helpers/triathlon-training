import { test, describe, beforeEach, vi, expect } from "vitest";
import { ThemeService } from "@/services/themes/themeService";
import { ThemeInstance } from "@/services/themes/themeInstance";
import type { SupportedTheme, SupportedThemeLabel } from "@/services/themes/types";
import { SUPPORTED_THEMES } from "@/services/themes/constants";

describe("services/theme/themeService", () => {
    let themeService: ThemeService;
    const LIGHT_THEME: SupportedThemeLabel = "light";
    const OTHER_SUPPORTED_THEME: SupportedTheme<any> = {
        label: "SUPPORTED_LABEL",
    };
    const UNSUPPORTED_THEME: SupportedTheme<any> = {
        label: "UNSUPPORTED_LABEL",
    };

    beforeEach(() => {
        vi.restoreAllMocks();
        themeService = new ThemeService(new ThemeInstance());
    });

    test("whenGettingDefaultTheme_thenIsLight", () => {
        const defaultTheme = themeService.getTheme();

        expect(defaultTheme).toBe(SUPPORTED_THEMES[LIGHT_THEME].label);
    });

    test("whenSelectingOtherSupportedTheme_thenThemeIsChangedAndReturned", () => {
        vi.spyOn(themeService, "isValidTheme").mockReturnValue(true);

        const returnedTheme = themeService.selectTheme(OTHER_SUPPORTED_THEME);
        const newTheme = themeService.getTheme();

        expect(returnedTheme).toBe(newTheme);
        expect(returnedTheme).toBe(OTHER_SUPPORTED_THEME.label);
    });

    test("whenSelectingInvalidTheme_thenThemeIsNotChangedAndNotReturned", () => {
        vi.spyOn(themeService, "isValidTheme").mockReturnValue(false);

        const initialTheme = themeService.getTheme();
        const returnedTheme = themeService.selectTheme(UNSUPPORTED_THEME);
        const currentTheme = themeService.getTheme();

        expect(returnedTheme).not.toBe(UNSUPPORTED_THEME.label);
        expect(initialTheme).toBe(currentTheme);
    });

    test("whenSelectingInvalidLanguage_thenReturnsError", () => {
        vi.spyOn(themeService, "isValidTheme").mockReturnValue(false);

        expect(themeService.selectTheme(UNSUPPORTED_THEME)).toBeInstanceOf(Error);
    });
});
