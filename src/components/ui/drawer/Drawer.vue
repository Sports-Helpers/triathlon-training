<script setup lang="ts">
import type { DrawerRootEmits, DrawerRootProps } from "vaul-vue";
import { useForwardPropsEmits } from "reka-ui";
import { DrawerRoot } from "vaul-vue";
import type { ComputedRef } from "vue";

const props = withDefaults(defineProps<DrawerRootProps>(), {
    shouldScaleBackground: true,
});

const emits = defineEmits<DrawerRootEmits>();

const forwarded = useForwardPropsEmits(props, emits) as ComputedRef<Record<string, any>>;
</script>

<template>
    <DrawerRoot data-slot="drawer" v-bind="forwarded">
        <slot></slot>
    </DrawerRoot>
</template>
