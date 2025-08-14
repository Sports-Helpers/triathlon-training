export const RouteNames = {
    HOME: "home",
    ABOUT: "about",
    NOT_FOUND: "not_found",
} as const;

export const RoutePaths = {
    HOME: {
        en: "/",
        fr: "/",
    },
    ABOUT: {
        en: "/about",
        fr: "/a-propos",
    },
    NOT_FOUND: {
        en: "/not-found",
        fr: "/page-introuvable",
    },
} as const;
