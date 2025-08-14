import { createI18n, type I18n } from "vue-i18n";
import fr from "@/services/i18n/fr.json";
import type { SupportedLocale } from "@/services/i18n/types";

type TFunction = (key: string) => string;

/**
 * Unique I18n instance used by the language service to manage
 * the current language.
 */
export class I18nInstance {
    private i18n = createI18n({
        sync: true,
        legacy: false,
        locale: "fr",
        fallbackLocale: "fr",
        messages: {
            fr: fr,
        },
    });

    public getRoot() {
        return this.i18n;
    }

    public $t: I18n["global"]["t"] & TFunction = this.i18n.global.t;

    public setLocale(locale: SupportedLocale) {
        this.i18n.global.locale.value = locale;
    }

    public getLocale(): SupportedLocale {
        return this.i18n.global.locale.value;
    }
}
