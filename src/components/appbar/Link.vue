<template>
    <router-link
        v-if="showRoute"
        v-bind="$attrs"
        :to="{ name: props.routeInfo.name }"
        class="appbar-link"
        :class="{
            'appbar-link-on-current-page': currentRoute.name == props.routeInfo.name,
            'appbar-link-not-on-current-page': currentRoute.name != props.routeInfo.name,
        }"
    >
        {{ props.routeInfo.displayedName }}
    </router-link>
</template>

<script setup lang="ts">
import type { RouteInfo } from "@/services/routing/types";
import { computed, type PropType } from "vue";
import { useRoute } from "vue-router";
import { useRoutingService } from "@/services/routing/routingService";

const routingService = useRoutingService();

const props = defineProps({
    routeInfo: {
        required: true,
        type: Object as PropType<RouteInfo>,
    },
    isAuthenticated: {
        required: true,
        type: Boolean,
    },
});

const currentRoute = useRoute();
const showRoute = computed(() => {
    const userIsAuthenticated = props.isAuthenticated;
    return routingService.routeIsAccessible(userIsAuthenticated, props.routeInfo);
});
</script>
