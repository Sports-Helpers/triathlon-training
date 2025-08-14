import { expect, test, describe, beforeEach, vi } from "vitest";
import { RoutingService } from "@/services/routing/routingService";
import { RouterInstance } from "@/services/routing/routerInstance";

describe("services/routing/routingService", () => {
    let routingService: RoutingService;
    const ANY_USER_AUTHENTICATION_VALUE = true;
    const ANY_ROUTE_INFO: any = {};

    beforeEach(() => {
        vi.restoreAllMocks();
        routingService = new RoutingService(Object.create(RouterInstance.prototype));
    });

    test("whenCheckingIfRouteIsAccessible_thenVerifiesRouteAuthRequirements", () => {
        const routerInstanceSpy = vi
            .spyOn(routingService.getRouterInstance(), "routeRespectAuthRequirements")
            .mockReturnValue(true);

        routingService.routeIsAccessible(ANY_USER_AUTHENTICATION_VALUE, ANY_ROUTE_INFO);

        expect(routerInstanceSpy).toHaveBeenCalledOnce();
    });

    test("whenCheckingIfRouteIsAccessible_ifVerifyingRouteAuthRequirementsFails_thenReturnError", () => {
        vi.spyOn(routingService.getRouterInstance(), "routeRespectAuthRequirements").mockReturnValue(new Error());

        expect(routingService.routeIsAccessible(ANY_USER_AUTHENTICATION_VALUE, ANY_ROUTE_INFO)).toBeInstanceOf(Error);
    });
});
