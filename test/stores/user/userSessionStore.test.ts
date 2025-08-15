import { expect, test, describe, beforeEach, vi } from "vitest";
import { useUserSessionStore } from "@/stores/user/userSessionStore";
import { createPinia, setActivePinia } from "pinia";
import { ThemeService } from "@/services/themes/themeService";
import { mock } from "ts-mockito";

describe("stores/userSessionStore", () => {
    let themeServiceMock = mock(ThemeService);

    const ANY_SUPPORTED_THEME: any = {
        label: "any_theme",
    };

    const getStoreInstance = () => {
        return useUserSessionStore();
    };

    beforeEach(() => {
        setActivePinia(createPinia());
        vi.restoreAllMocks();
        themeServiceMock = mock(ThemeService);
    });

    test("whenCheckingDefaultUserState_thenIsNotAuthenticated", () => {
        const store = getStoreInstance();

        expect(store.isAuthenticated()).toBeFalsy();
    });

    test("whenChangingTheme_thenThemeServiceSelectsNewTheme", () => {
        const store = getStoreInstance();
        const themeServiceSpy = vi.spyOn(themeServiceMock, "selectTheme");

        store.changeTheme(themeServiceMock, ANY_SUPPORTED_THEME);

        expect(themeServiceSpy).toHaveBeenCalledExactlyOnceWith(ANY_SUPPORTED_THEME);
    });

    test("whenChangingTheme_thenThemeIsUpdated", () => {
        const store = getStoreInstance();
        vi.spyOn(themeServiceMock, "isValidTheme").mockReturnValue(true);
        vi.spyOn(themeServiceMock, "selectTheme").mockReturnValue(ANY_SUPPORTED_THEME.label);

        store.changeTheme(themeServiceMock, ANY_SUPPORTED_THEME);
        const theme = store.theme;

        expect(theme).toBe(ANY_SUPPORTED_THEME.label);
    });

    test("givenErrorOnThemeService_whenChangingTheme_thenThemeIsNotModified", () => {
        const store = getStoreInstance();

        store.changeTheme(themeServiceMock, ANY_SUPPORTED_THEME);
        const theme = store.theme;

        expect(theme).not.toBe(ANY_SUPPORTED_THEME.theme);
    });

    test("whenCheckingThemeIsDark_thenBasesResponseOnCurrentTheme", () => {
        const store = getStoreInstance();

        store.theme = "light";
        expect(store.isDarkTheme()).toBeFalsy();

        store.theme = "dark";
        expect(store.isDarkTheme()).toBeTruthy();
    });

    test("whenCheckingDefaultTheme_thenIsLight", () => {
        const store = getStoreInstance();
        expect(store.isDarkTheme()).toBeFalsy();
        expect(store.theme).toBe("light");
    });

    test("whenRefreshingUserSession_thenSelectsTheme", () => {
        const themeServiceSpy = vi.spyOn(themeServiceMock, "selectTheme");
        const store = getStoreInstance();

        store.refreshSession(themeServiceMock);

        expect(themeServiceSpy).toHaveBeenCalledOnce();
    });
});
