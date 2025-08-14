import { expect, test, describe, beforeEach, vi } from "vitest";
import { LanguageService } from "@/services/i18n/languageService";
import { I18nInstance } from "@/services/i18n/i18nInstance";
import type { SupportedLanguage, SupportedLocale } from "@/services/i18n/types";
import { SUPPORTED_LANGUAGES } from "@/services/i18n/constants";

describe("services/i18n/languageService", () => {
    let languageService: LanguageService;
    const FRENCH_LOCALE: SupportedLocale = "fr";
    const OTHER_SUPPORTED_LANGUAGE: SupportedLanguage<any> = {
        label: "SUPPORTED_LABEL",
        locale: "SUPPORTED_LOCALE",
    };
    const UNSUPPORTED_LANGUAGE: SupportedLanguage<any> = {
        label: "UNSUPPORTED_LABEL",
        locale: "UNSUPPORTED_LOCALE",
    };

    beforeEach(() => {
        vi.restoreAllMocks();
        languageService = new LanguageService(new I18nInstance());
    });

    test("whenGettingDefaultLocale_thenIsFrench", () => {
        const defaultLocale = languageService.getLocale();

        expect(defaultLocale).toBe(SUPPORTED_LANGUAGES[FRENCH_LOCALE].locale);
    });

    test("whenSelectingOtherSupportedLanguage_thenLocaleIsChangedAndReturned", () => {
        vi.spyOn(languageService, "isValidLanguage").mockReturnValue(true);

        const returnedLocale = languageService.selectLanguage(OTHER_SUPPORTED_LANGUAGE);
        const newLocale = languageService.getLocale();

        expect(returnedLocale).toBe(newLocale);
        expect(returnedLocale).toBe(OTHER_SUPPORTED_LANGUAGE.locale);
    });

    test("whenSelectingInvalidLanguage_thenLocaleIsNotChangedAndNotReturned", () => {
        vi.spyOn(languageService, "isValidLanguage").mockReturnValue(false);

        const initialLocale = languageService.getLocale();
        const returnedLocale = languageService.selectLanguage(UNSUPPORTED_LANGUAGE);
        const currentLocale = languageService.getLocale();

        expect(returnedLocale).not.toBe(UNSUPPORTED_LANGUAGE.locale);
        expect(initialLocale).toBe(currentLocale);
    });

    test("whenSelectingInvalidLanguage_thenReturnsError", () => {
        vi.spyOn(languageService, "isValidLanguage").mockReturnValue(false);

        expect(languageService.selectLanguage(UNSUPPORTED_LANGUAGE)).toBeInstanceOf(Error);
    });
});
