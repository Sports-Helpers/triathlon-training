import { RouteNames, RoutePaths } from "@/services/routing/constants";
import type { SupportedLocale } from "@/services/i18n/types";

export type RouteNameValue = (typeof RouteNames)[keyof typeof RouteNames];

export type RoutePathValue = (typeof RoutePaths)[keyof typeof RoutePaths];

export type RouteHead = {
    title: string;
    meta: [
        {
            name: string;
            content: string;
        },
    ];
};

export type RouteInfo = {
    name: RouteNameValue;
    path: {
        [Locale in SupportedLocale]: RoutePathValue[Locale];
    };
    displayedName: string;
    head: RouteHead;
    requiresAuth: boolean;
    hideOnAuth: boolean;
    addToSiteMap: boolean;
};

export type MappedRoutes = {
    [K in RouteNameValue]: RouteInfo;
};

/**
 * One-to-one correspondance with RouteNames
 */
type GeneralRoutes = typeof RouteNames.HOME | typeof RouteNames.ABOUT;

/**
 * One-to-one correspondance with RouteNames
 */
type OrphanRoutes = typeof RouteNames.NOT_FOUND;

type MatchedGroupIdentifiers = {
    GENERAL: GeneralRoutes;
    ORPHAN: OrphanRoutes;
};

export type GroupedRoutes = {
    [Group in keyof MatchedGroupIdentifiers]: {
        [Route in MatchedGroupIdentifiers[Group]]: RouteInfo;
    };
};
