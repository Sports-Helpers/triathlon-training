<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>
<template>
    <div data-slot="drawer-header" :class="cn('flex flex-col gap-1.5 p-1', props.class)">
        <slot></slot>
    </div>
</template>
