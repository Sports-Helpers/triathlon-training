<template>
    <button v-bind="$attrs">
        <router-link v-if="icon" :to="{ name: props.routeInfo.name }">
            <SecondaryItemIcon :icon="icon" />
        </router-link>

        <Link v-else-if="displayedText" :route-info="props.routeInfo" :is-authenticated="props.isAuthenticated" />

        <slot v-else></slot>
    </button>
</template>

<script setup lang="ts">
import type { RouteInfo } from "@/services/routing/types";
import Link from "@/components/appbar/Link.vue";
import SecondaryItemIcon from "@/components/appbar/SecondaryItemIcon.vue";
import type { PropType } from "vue";

const props = defineProps({
    icon: {
        required: false,
        type: Function,
    },
    displayedText: {
        required: false,
        type: Boolean,
    },
    routeInfo: {
        required: true,
        type: Object as PropType<RouteInfo>,
    },
    isAuthenticated: {
        required: true,
        type: Boolean,
    },
});
</script>
