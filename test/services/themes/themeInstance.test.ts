import { expect, test, describe, vi, beforeEach } from "vitest";
import { ThemeInstance } from "@/services/themes/themeInstance";
import { SUPPORTED_THEMES } from "@/services/themes/constants";
import type { SupportedThemeLabel } from "@/services/themes/types";

describe("services/themes/themeInstance", () => {
    let themeInstance: ThemeInstance;
    const LIGHT_THEME: SupportedThemeLabel = "light";
    const ANY_SUPPORTED_THEME: any = {
        label: "ANY_SUPPORTED_LABEL",
    };

    beforeEach(() => {
        vi.restoreAllMocks();
        themeInstance = new ThemeInstance();
    });

    test("whenGettingDefaultTheme_thenIsLight", () => {
        const defaultTheme = themeInstance.getTheme();

        expect(defaultTheme.label).toBe(SUPPORTED_THEMES[LIGHT_THEME].label);
    });

    test("whenSettingTheme_thenUpdatesColorMode_andCurrentTheme", () => {
        themeInstance.setTheme(ANY_SUPPORTED_THEME);

        const newTheme = themeInstance.getTheme();

        expect(newTheme).toBe(ANY_SUPPORTED_THEME);
    });
});
