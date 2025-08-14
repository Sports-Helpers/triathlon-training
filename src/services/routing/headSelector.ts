import type { RouteRecordNameGeneric } from "vue-router";
import type { RouteHead, RouteNameValue } from "@/services/routing/types";
import { RouteNames } from "@/services/routing/constants";
import { MAPPED_ROUTES } from "@/services/routing/routes";
import { LanguageService } from "@/services/i18n/languageService";

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

    public translate(languageService: LanguageService, head: RouteHead): RouteHead {
        return {
            title: languageService.$t(head.title),
            meta: [
                {
                    name: "description",
                    content: languageService.$t(head.meta[0].content),
                },
            ],
        };
    }
}
