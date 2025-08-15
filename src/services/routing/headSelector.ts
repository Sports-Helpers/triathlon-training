import type { RouteRecordNameGeneric } from "vue-router";
import type { RouteHead, RouteNameValue } from "@/services/routing/types";
import { RouteNames } from "@/services/routing/constants";
import { MAPPED_ROUTES } from "@/services/routing/routes";

export class HeadSelector {
    private isValidRouteName(name: any): boolean {
        return name !== undefined && Object.values(RouteNames).includes(name);
    }

    public select(name: RouteRecordNameGeneric): RouteHead {
        if (this.isValidRouteName(name)) {
            return MAPPED_ROUTES[name as RouteNameValue].head;
        } else {
            return MAPPED_ROUTES[RouteNames.HOME].head;
        }
    }
}
