<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <SecondaryItemIcon :icon="GlobeAmericasIcon" />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-50">
            <DropdownMenuLabel>{{ $t("navigation.languages.displayed_name") }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem
                    v-for="language in SUPPORTED_LANGUAGES"
                    @click="userSessionStore.changeLanguage(languageService, language)"
                    class="flex"
                    :class="{
                        'cursor-pointer': !isCurrentLocale(language.locale),
                    }"
                    :disabled="isCurrentLocale(language.locale)"
                >
                    <div class="w-4">
                        <CheckIcon v-if="isCurrentLocale(language.locale)" />
                    </div>

                    <div>{{ language.locale.toLocaleUpperCase() }} - {{ language.label }}</div>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { GlobeAmericasIcon, CheckIcon } from "@heroicons/vue/24/outline";
import SecondaryItemIcon from "@/components/appbar/SecondaryItemIcon.vue";
import { SUPPORTED_LANGUAGES } from "@/services/i18n/constants";
import { useUserSessionStore } from "@/stores/user/userSessionStore";
import { storeToRefs } from "pinia";
import type { SupportedLocale } from "@/services/i18n/types";
import { useLanguageService } from "@/services/i18n/languageService";

const userSessionStore = useUserSessionStore();
const languageService = useLanguageService();
const { locale } = storeToRefs(userSessionStore);

function isCurrentLocale(comparedLocale: SupportedLocale) {
    return locale.value === comparedLocale;
}
</script>
