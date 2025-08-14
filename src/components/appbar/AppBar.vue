<template>
    <header class="header">
        <div class="appbar-container">
            <nav class="appbar-main">
                <AppBarDrawer :is-authenticated="isAuthenticated">
                    <DrawerTrigger>
                        <SecondaryItemIcon id="hamburger" class="md:hidden" @click="" :icon="Bars3Icon" />
                    </DrawerTrigger>
                </AppBarDrawer>

                <SiteTitle displayed-text="App Name" :route-name="MAPPED_ROUTES[RouteNames.HOME].name" />
            </nav>

            <nav class="appbar-links">
                <Link v-for="route in CORE_ROUTES" :route-info="route" :is-authenticated="isAuthenticated" />
            </nav>

            <nav class="appbar-secondary-items">
                <SecondaryItemLink
                    :icon="UserIcon"
                    :route-info="MAPPED_ROUTES[RouteNames.HOME]"
                    :is-authenticated="isAuthenticated"
                />

                <SecondaryItemIcon @click="" :icon="Cog8ToothIcon" />

                <SecondaryItemIcon @click="userSessionStore.changeTheme(themeService, nextTheme)" :icon="themeIcon" />

                <LanguageMenu />
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useUserSessionStore } from "@/stores/user/userSessionStore";
import { computed } from "vue";
import { MAPPED_ROUTES, CORE_ROUTES } from "@/services/routing/routes";
import { RouteNames } from "@/services/routing/constants";
import { Cog8ToothIcon } from "@heroicons/vue/24/outline";
import { MoonIcon } from "@heroicons/vue/24/outline";
import { SunIcon } from "@heroicons/vue/24/outline";
import { UserIcon } from "@heroicons/vue/24/outline";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import Link from "@/components/appbar/Link.vue";
import SiteTitle from "@/components/appbar/SiteTitle.vue";
import DrawerTrigger from "@/components/ui/drawer/DrawerTrigger.vue";
import AppBarDrawer from "@/components/appbar/AppBarDrawer.vue";
import SecondaryItemIcon from "@/components/appbar/SecondaryItemIcon.vue";
import SecondaryItemLink from "@/components/appbar/SecondaryItemLink.vue";
import LanguageMenu from "@/components/appbar/LanguageMenu.vue";
import { SUPPORTED_THEMES } from "@/services/themes/constants";
import { useThemeService } from "@/services/themes/themeService";

const userSessionStore = useUserSessionStore();
const themeService = useThemeService();

const isAuthenticated = computed(() => userSessionStore.isAuthenticated());
const isDarkTheme = computed(() => userSessionStore.isDarkTheme());
const themeIcon = computed(() => (isDarkTheme.value ? SunIcon : MoonIcon));

const nextTheme = computed(() => {
    return isDarkTheme.value ? SUPPORTED_THEMES["light"] : SUPPORTED_THEMES["dark"];
});
</script>
