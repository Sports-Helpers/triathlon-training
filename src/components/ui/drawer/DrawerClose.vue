<script setup lang="ts">
import type { DrawerCloseProps } from "vaul-vue";
import { DrawerClose } from "vaul-vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = withDefaults(defineProps<DrawerCloseProps & { isProgrammaticClose?: boolean }>(), {
    isProgrammaticClose: true,
});
</script>

<template>
    <DrawerClose v-if="isProgrammaticClose" data-slot="drawer-close" v-bind="props">
        <slot></slot>
    </DrawerClose>

    <DrawerClose v-else data-slot="drawer-close" v-bind="props">
        <XMarkIcon class="close-drawer-icon" />
    </DrawerClose>
</template>
