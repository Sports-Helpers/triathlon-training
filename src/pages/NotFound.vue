<template>
    <div class="px-6 py-6">
        <h1 class="text-4xl text-center">Page introuvable</h1>
        <h1 class="text-lg py-3 text-center">Brique par brique, continue.</h1>
        <div class="text-center">
            <Button class="mx-1" @click="router.push({ name: MAPPED_ROUTES[RouteNames.HOME].name })">
                Aller au tableau de bord
            </Button>
            <Button class="mx-1" @click="router.back()"> Retourner sur mes pas </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { MAPPED_ROUTES } from "@/services/routing/routes";
import { RouteNames } from "@/services/routing/constants";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
