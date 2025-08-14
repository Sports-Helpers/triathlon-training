import { expect, test, describe, beforeEach, vi } from "vitest";
import { I18nInstance } from "@/services/i18n/i18nInstance";
import type { SupportedLocale } from "@/services/i18n/types";
import { SUPPORTED_LANGUAGES } from "@/services/i18n/constants";

describe("services/i18n/i18nInstance", () => {
    let i18nInstance: I18nInstance;
    const ANY_SUPPORTED_LOCALE: any = "SUPPORTED_LOCALE";
    const FRENCH_LOCALE: SupportedLocale = "fr";

    beforeEach(() => {
        vi.restoreAllMocks();
        i18nInstance = new I18nInstance();
    });

    test("whenGettingDefaultLocale_thenIsFrench", () => {
        const defaultLocale = i18nInstance.getLocale();

        expect(defaultLocale).toBe(SUPPORTED_LANGUAGES[FRENCH_LOCALE].locale);
    });

    test("whenSettingLocale_thenChangesRootLocale", () => {
        i18nInstance.setLocale(ANY_SUPPORTED_LOCALE);

        expect(i18nInstance.getLocale()).toBe(ANY_SUPPORTED_LOCALE);
    });
});
