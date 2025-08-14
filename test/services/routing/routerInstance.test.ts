import { expect, test, describe, vi, beforeEach } from "vitest";
import { RouterInstance } from "@/services/routing/routerInstance";
import type { SupportedLocale } from "@/services/i18n/types";
import type { RouteLocationAsPathGeneric } from "vue-router";
import { MAPPED_ROUTES } from "@/services/routing/routes";
import { RouteNames } from "@/services/routing/constants";

describe("services/routing/routerInstance", () => {
    let routerInstance: RouterInstance;
    const ANY_PATH: string = "/any-path";
    const UNSUPPORTED_LOCALE: any = "unsup-locale";
    const SUPPORTED_LOCALE: SupportedLocale = "en";
    const LOCALIZED_PATH: string = "/not-any-other-path";
    const ROUTE_INFO_WITH_LOCALIZED_PATH: any = {
        path: {
            [SUPPORTED_LOCALE]: LOCALIZED_PATH,
        },
    };

    beforeEach(() => {
        vi.restoreAllMocks();
        routerInstance = Object.create(RouterInstance.prototype);
    });

    test("whenRouteRequiresAuth_andIsHiddenOnAuth_thenReturnsError", () => {
        const userIsAuthenticated = true;
        const routeRequiresAuthentication = true;
        const routeHiddenOnAuthentication = true;

        expect(
            routerInstance.routeRespectAuthRequirements(
                userIsAuthenticated,
                routeRequiresAuthentication,
                routeHiddenOnAuthentication,
            ),
        ).toBeInstanceOf(Error);
    });

    test("whenRouteRequiresAuth_andUserIsAuth_thenShouldBeAccessible", () => {
        const userIsAuthenticated = true;
        const routeRequiresAuthentication = true;
        const routeHiddenOnAuthentication = false;

        expect(
            routerInstance.routeRespectAuthRequirements(
                userIsAuthenticated,
                routeRequiresAuthentication,
                routeHiddenOnAuthentication,
            ),
        ).toBeTruthy();
    });

    test("whenRouteDoesNotRequiresAuth_andUserIsAuth_thenShouldBeAccessible", () => {
        const userIsAuthenticated = true;
        const routeRequiresAuthentication = false;
        const routeHiddenOnAuthentication = false;

        expect(
            routerInstance.routeRespectAuthRequirements(
                userIsAuthenticated,
                routeRequiresAuthentication,
                routeHiddenOnAuthentication,
            ),
        ).toBeTruthy();
    });

    test("whenRouteDoesNotRequiresAuth_andUserIsNotAuth_thenShouldBeAccessible", () => {
        const userIsAuthenticated = false;
        const routeRequiresAuthentication = false;
        const routeHiddenOnAuthentication = false;

        expect(
            routerInstance.routeRespectAuthRequirements(
                userIsAuthenticated,
                routeRequiresAuthentication,
                routeHiddenOnAuthentication,
            ),
        ).toBeTruthy();
    });

    test("whenRouteRequiresAuth_andUserIsNotAuth_thenShouldNotBeAccessible", () => {
        const userIsAuthenticated = false;
        const routeRequiresAuthentication = true;
        const routeHiddenOnAuthentication = false;

        expect(
            routerInstance.routeRespectAuthRequirements(
                userIsAuthenticated,
                routeRequiresAuthentication,
                routeHiddenOnAuthentication,
            ),
        ).toBeFalsy();
    });

    test("whenRouteIsHiddenOnAuth_andUserIsAuth_thenShouldNotBeAccessible", () => {
        const userIsAuthenticated = true;
        const routeRequiresAuthentication = false;
        const routeHiddenOnAuthentication = true;

        expect(
            routerInstance.routeRespectAuthRequirements(
                userIsAuthenticated,
                routeRequiresAuthentication,
                routeHiddenOnAuthentication,
            ),
        ).toBeFalsy();
    });

    test("whenRouteIsHiddenOnAuth_andUserIsNotAuth_thenShouldBeAccessible", () => {
        const userIsAuthenticated = false;
        const routeRequiresAuthentication = false;
        const routeHiddenOnAuthentication = true;

        expect(
            routerInstance.routeRespectAuthRequirements(
                userIsAuthenticated,
                routeRequiresAuthentication,
                routeHiddenOnAuthentication,
            ),
        ).toBeTruthy();
    });

    test("whenRouteHasPath_butLocalePointsToDifferentPath_thenRouteDoesNotRespectLocale", () => {
        expect(
            routerInstance.routeRespectsLocale(ROUTE_INFO_WITH_LOCALIZED_PATH, ANY_PATH, SUPPORTED_LOCALE),
        ).toBeFalsy();
    });

    test("whenPathFromRouteInfoPointsToLocalizedPath_thenRouteRespectsLocale", () => {
        expect(
            routerInstance.routeRespectsLocale(ROUTE_INFO_WITH_LOCALIZED_PATH, LOCALIZED_PATH, SUPPORTED_LOCALE),
        ).toBeTruthy();
    });

    test("whenPathFromRouteInfoCannotBeLocalized_thenReturnsError", () => {
        expect(
            routerInstance.routeRespectsLocale(ROUTE_INFO_WITH_LOCALIZED_PATH, ANY_PATH, UNSUPPORTED_LOCALE),
        ).toBeInstanceOf(Error);
    });

    test("whenGeneratingValidLocalizedRoute_andRouteCannotBeLocalized_thenReturnsError", () => {
        expect(
            routerInstance.generateValidLocalizedRoute(ROUTE_INFO_WITH_LOCALIZED_PATH, UNSUPPORTED_LOCALE),
        ).toBeInstanceOf(Error);
    });

    test("whenGeneratingValidLocalizedRoute_thenPathCorrespondsToTheGivenLocaleVersion_withReplaceOption", () => {
        let localizedRoute = routerInstance.generateValidLocalizedRoute(
            ROUTE_INFO_WITH_LOCALIZED_PATH,
            SUPPORTED_LOCALE,
        );
        expect(localizedRoute).not.toBeInstanceOf(Error);

        localizedRoute = localizedRoute as RouteLocationAsPathGeneric;
        expect(localizedRoute.path).toBe(LOCALIZED_PATH);
        expect(localizedRoute.replace).toBeTruthy();
    });

    test("whenGeneratingInvalidAuthRequirementsRoute_andCurrentLocaleIsNotSupported_thenReturnsError", () => {
        expect(routerInstance.generateInvalidAuthRequirementsRoute(UNSUPPORTED_LOCALE)).toBeInstanceOf(Error);
    });

    test("whenGeneratingInvalidAuthRequirementsRoute_thenReturnsHomeRouteLocalized_withReplaceOption", () => {
        let localizedRoute = routerInstance.generateInvalidAuthRequirementsRoute(SUPPORTED_LOCALE);
        expect(localizedRoute).not.toBeInstanceOf(Error);

        localizedRoute = localizedRoute as RouteLocationAsPathGeneric;
        const homeRouteLocalized = MAPPED_ROUTES[RouteNames.HOME].path[SUPPORTED_LOCALE];
        expect(localizedRoute.path).toBe(homeRouteLocalized);
        expect(localizedRoute.replace).toBeTruthy();
    });
});
