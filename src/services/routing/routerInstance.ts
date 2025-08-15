import { createRouter, createWebHistory, type RouteLocationAsPathGeneric, type Router } from "vue-router";
import { MAPPED_ROUTES } from "@/services/routing/routes";
import { RouteNames } from "@/services/routing/constants";
import type { RouteInfo, RouteNameValue } from "@/services/routing/types";
import { useUserSessionStore } from "@/stores/user/userSessionStore";

export class RouterInstance {
    private router: Router;

    constructor() {
        this.router = createRouter({
            history: createWebHistory(import.meta.env.BASE_URL),
            scrollBehavior(/*to, from, savedPosition*/) {
                return { top: 0 };
            },

            routes: [
                {
                    path: MAPPED_ROUTES[RouteNames.HOME].path,
                    alias: [MAPPED_ROUTES[RouteNames.HOME].path],
                    name: MAPPED_ROUTES[RouteNames.HOME].name,
                    component: () => import("@/pages/Home.vue"),
                    beforeEnter: [],
                },
                {
                    path: MAPPED_ROUTES[RouteNames.NOT_FOUND].path,
                    alias: [MAPPED_ROUTES[RouteNames.NOT_FOUND].path],
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
                return next(this.generateNotFoundRoute());
            }

            // Redirects to home if authentication requirements are not met
            if (
                !this.routeRespectAuthRequirements(
                    userSessionStore.isAuthenticated(),
                    routeInfo.requiresAuth,
                    routeInfo.hideOnAuth,
                )
            ) {
                return next(this.generateInvalidAuthRequirementsRoute());
            }

            return next();
        });
    }

    public getRouter(): Router {
        return this.router;
    }

    public generateInvalidAuthRequirementsRoute(): RouteLocationAsPathGeneric | Error {
        const path = MAPPED_ROUTES[RouteNames.HOME].path;
        if (path === undefined) {
            // TODO: Corrupted routes
            return new Error();
        }

        return {
            path: path,
            replace: true,
        };
    }

    public generateNotFoundRoute(): RouteLocationAsPathGeneric | Error {
        const routeInfo = MAPPED_ROUTES[RouteNames.NOT_FOUND];
        const path = routeInfo.path;

        return {
            path: path,
            replace: true,
        };
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
