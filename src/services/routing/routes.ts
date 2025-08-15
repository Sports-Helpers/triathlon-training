import type { GroupedRoutes, MappedRoutes, RouteInfo } from "@/services/routing/types";
import { RouteNames, RoutePaths } from "@/services/routing/constants";

/**
 * The following types exist to facilitate the lookup of route info from its
 * name only. They SHOULD NOT be used in a use-case where you need to group
 * routes.
 */
export const MAPPED_ROUTES: MappedRoutes = {
    [RouteNames.HOME]: {
        name: RouteNames.HOME,
        path: RoutePaths.HOME,
        displayedName: "Tableau de bord",
        requiresAuth: false,
        hideOnAuth: false,
        addToSiteMap: true,
        head: {
            title: "Triathlon Training - Tableau de bord",
            meta: [
                {
                    name: "description",
                    content: "Brique par brique, continue.",
                },
            ],
        },
    },
    [RouteNames.NOT_FOUND]: {
        name: RouteNames.NOT_FOUND,
        path: RoutePaths.NOT_FOUND,
        displayedName: "Oups!",
        requiresAuth: false,
        hideOnAuth: false,
        addToSiteMap: false,
        head: {
            title: "Triathlon Training - Page introuvable",
            meta: [
                {
                    name: "description",
                    content: "La page recherchée n'a pas été trouvée.",
                },
            ],
        },
    },
} as const;

/**
 * The following types exist to facilitate the display of grouped routes. They
 * SHOULD NOT be used in a use-case where you need to lookup a route from a
 * name only.
 */
export const GROUPED_ROUTES: GroupedRoutes = {
    GENERAL: {
        [RouteNames.HOME]: MAPPED_ROUTES[RouteNames.HOME],
    },
    ORPHAN: {
        [RouteNames.NOT_FOUND]: MAPPED_ROUTES[RouteNames.NOT_FOUND],
    },
} as const;

/**
 * Core routes to be displayed in the AppBar / its associated drawer on mobile.
 */
export const CORE_ROUTES: RouteInfo[] = [MAPPED_ROUTES[RouteNames.HOME]] as const;
