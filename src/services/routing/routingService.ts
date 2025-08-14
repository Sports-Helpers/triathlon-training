import { RouterInstance } from "@/services/routing/routerInstance";
import type { RouteInfo } from "@/services/routing/types";
import { inject } from "vue";

export class RoutingService {
    private routerInstance;

    constructor(routerInstance: RouterInstance) {
        this.routerInstance = routerInstance;
    }

    // Should ONLY be used externally to create the Vue application
    public getRouterInstance(): RouterInstance {
        return this.routerInstance;
    }

    public routeIsAccessible(userIsAuthenticated: boolean, routeInfo: RouteInfo): boolean | Error {
        return this.routerInstance.routeRespectAuthRequirements(
            userIsAuthenticated,
            routeInfo.requiresAuth,
            routeInfo.hideOnAuth,
        );
    }
}

export const ROUTING_SERVICE_KEY = "routingService" as const;

export function useRoutingService(): RoutingService {
    const service = inject<RoutingService>(ROUTING_SERVICE_KEY);
    if (!service) {
        throw new Error("RoutingService was not provided");
    }
    return service;
}
