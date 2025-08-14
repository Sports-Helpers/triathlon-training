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
        displayedName: "navigation.home.displayed_name",
        requiresAuth: false,
        hideOnAuth: false,
        addToSiteMap: true,
        head: {
            title: "navigation.home.head_title",
            meta: [
                {
                    name: "description",
                    content: "navigation.home.meta",
                },
            ],
        },
    },
    [RouteNames.ABOUT]: {
        name: RouteNames.ABOUT,
        path: RoutePaths.ABOUT,
        displayedName: "navigation.about.displayed_name",
        requiresAuth: false,
        hideOnAuth: false,
        addToSiteMap: true,
        head: {
            title: "navigation.about.head_title",
            meta: [
                {
                    name: "description",
                    content: "navigation.about.meta",
                },
            ],
        },
    },
    [RouteNames.NOT_FOUND]: {
        name: RouteNames.NOT_FOUND,
        path: RoutePaths.NOT_FOUND,
        displayedName: "navigation.not_found.displayed_name",
        requiresAuth: false,
        hideOnAuth: false,
        addToSiteMap: false,
        head: {
            title: "navigation.not_found.head_title",
            meta: [
                {
                    name: "description",
                    content: "navigation.not_found.meta",
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
        [RouteNames.ABOUT]: MAPPED_ROUTES[RouteNames.ABOUT],
    },
    ORPHAN: {
        [RouteNames.NOT_FOUND]: MAPPED_ROUTES[RouteNames.NOT_FOUND],
    },
} as const;

/**
 * Core routes to be displayed in the AppBar / its associated drawer on mobile.
 */
export const CORE_ROUTES: RouteInfo[] = [MAPPED_ROUTES[RouteNames.HOME], MAPPED_ROUTES[RouteNames.ABOUT]] as const;
