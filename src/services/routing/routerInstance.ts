import { createRouter, createWebHistory, type RouteLocationAsPathGeneric, type Router } from "vue-router";
import { MAPPED_ROUTES } from "@/services/routing/routes";
import { RouteNames } from "@/services/routing/constants";
import type { RouteInfo, RouteNameValue } from "@/services/routing/types";
import type { SupportedLocale } from "@/services/i18n/types";
import { useUserSessionStore } from "@/stores/user/userSessionStore";

export class RouterInstance {
    private router: Router;

    constructor() {
        this.router = createRouter({
            history: createWebHistory(import.meta.env.BASE_URL),
            scrollBehavior(/*to, from, savedPosition*/) {
                return { top: 0 };
            },

            // EXISITNG LIMITATION: Although paths will work regarding of your locale (and be translated accordingly),
            // a change of language will not update the path of the current page. It will be updated on reload.
            // Alias path should exist for all supported languages, and all default paths
            // should be for the same language.
            routes: [
                {
                    path: MAPPED_ROUTES[RouteNames.HOME].path.en,
                    alias: [MAPPED_ROUTES[RouteNames.HOME].path.fr],
                    name: MAPPED_ROUTES[RouteNames.HOME].name,
                    component: () => import("@/pages/Home.vue"),
                    beforeEnter: [],
                },
                {
                    path: MAPPED_ROUTES[RouteNames.ABOUT].path.en,
                    alias: [MAPPED_ROUTES[RouteNames.ABOUT].path.fr],
                    name: MAPPED_ROUTES[RouteNames.ABOUT].name,
                    component: () => import("@/pages/About.vue"),
                    beforeEnter: [],
                },
                {
                    path: MAPPED_ROUTES[RouteNames.NOT_FOUND].path.en,
                    alias: [MAPPED_ROUTES[RouteNames.NOT_FOUND].path.fr],
                    name: MAPPED_ROUTES[RouteNames.NOT_FOUND].name,
                    component: () => import("@/pages/NotFound.vue"),
                    beforeEnter: [],
                },
                {
                    path: "/:catchAll(.*)",
                    component: () => import("@/pages/NotFound.vue"),
                    beforeEnter: [],
                },
            ],
        });

        this.router.beforeEach(async (to, _ /*from*/, next) => {
            // Accept the use of a store here since it can't really be passed through the service
            const userSessionStore = useUserSessionStore();
            const routeInfo: RouteInfo | undefined = MAPPED_ROUTES[to.name as RouteNameValue];

            // If this case happens, then either the route was not registered, or this is simply an
            // invalid route. In either case, the user should probably be redirected to an unfound page.
            if (!routeInfo) {
                return next(this.generateNotFoundLocalizedRoute(userSessionStore.locale));
            }

            // Redirects to localized home if authentication requirements are not met
            if (
                !this.routeRespectAuthRequirements(
                    userSessionStore.isAuthenticated(),
                    routeInfo.requiresAuth,
                    routeInfo.hideOnAuth,
                )
            ) {
                return next(this.generateInvalidAuthRequirementsRoute(userSessionStore.locale));
            }

            // Redirects to localized path if user settings and path are incoherent
            if (!this.routeRespectsLocale(routeInfo, to.path, userSessionStore.locale)) {
                const route = this.generateValidLocalizedRoute(routeInfo, userSessionStore.locale);
                return next(route);
            }

            return next();
        });
    }

    public getRouter(): Router {
        return this.router;
    }

    public generateInvalidAuthRequirementsRoute(locale: SupportedLocale): RouteLocationAsPathGeneric | Error {
        const path = MAPPED_ROUTES[RouteNames.HOME].path[locale];
        if (path === undefined) {
            // TODO: Invalid locale or corrupted routes
            return new Error();
        }

        return {
            path: path,
            replace: true,
        };
    }

    public generateNotFoundLocalizedRoute(locale: SupportedLocale): RouteLocationAsPathGeneric | Error {
        const routeInfo = MAPPED_ROUTES[RouteNames.NOT_FOUND];
        const path = routeInfo.path[locale];

        return {
            path: path,
            replace: true,
        };
    }

    public generateValidLocalizedRoute(
        routeInfo: RouteInfo,
        locale: SupportedLocale,
    ): RouteLocationAsPathGeneric | Error {
        const path = routeInfo.path[locale];
        if (path === undefined) {
            // TODO: Invalid locale or corrupted routeInfo
            return new Error();
        }

        return {
            path: path,
            replace: true,
        };
    }

    public routeRespectsLocale(routeInfo: RouteInfo, path: string, locale: SupportedLocale): boolean | Error {
        const expectedPath = routeInfo.path[locale];
        if (expectedPath === undefined) {
            // TODO: Invalid locale or corrupted routeInfo
            return new Error();
        }

        if (path !== expectedPath) {
            return false;
        }

        return true;
    }

    public routeRespectAuthRequirements(
        userIsAuthenticated: boolean,
        routeRequiresAuthentication: boolean,
        routeHiddenOnAuthentication: boolean,
    ): boolean | Error {
        if (routeRequiresAuthentication && routeHiddenOnAuthentication) {
            // TOOD: Case should not exist
            return new Error();
        }

        if (routeRequiresAuthentication && !userIsAuthenticated) {
            return false;
        }

        if (routeHiddenOnAuthentication && userIsAuthenticated) {
            return false;
        }

        return true;
    }
}
