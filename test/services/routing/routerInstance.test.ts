import { expect, test, describe, vi, beforeEach } from "vitest";
import { RouterInstance } from "@/services/routing/routerInstance";

describe("services/routing/routerInstance", () => {
    let routerInstance: RouterInstance;

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
});
