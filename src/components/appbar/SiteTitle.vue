<template>
    <router-link v-bind="$attrs" class="appbar-link appbar-link-site-title" :to="{ name: props.routeName }">
        <slot></slot>
        {{ props.displayedText }}
    </router-link>
</template>

<script setup lang="ts">
const props = defineProps({
    displayedText: {
        required: false,
        type: String,
    },
    routeName: {
        required: true,
        type: String,
    },
});
</script>
