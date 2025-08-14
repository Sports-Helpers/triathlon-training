<template>
    <button v-bind="$attrs" class="appbar-secondary-item appbar-secondary-item-clickable">
        <slot></slot>
        <component v-if="props.icon" :is="props.icon" class="appbar-secondary-item-icon" />
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    icon: {
        required: true,
        type: Function,
    },
});
</script>
