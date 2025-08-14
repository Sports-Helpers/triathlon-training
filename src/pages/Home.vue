<template>
    <div class="px-6 py-6">
        <h1 class="text-4xl text-center">
            {{ $t("pages.home.description") }}
        </h1>

        <ToggleGroup
            v-model="activity"
            @update:model-value="(newActivity) => preventNoSelection(newActivity as Activity)"
            type="single"
            class="mx-auto mt-4"
            size="lg"
        >
            <ToggleGroupItem class="w-27" value="run" aria-label="Toggle running">
                <Footprints />
            </ToggleGroupItem>

            <ToggleGroupItem class="w-27" value="bike" aria-label="Toggle bike">
                <Bike />
            </ToggleGroupItem>

            <ToggleGroupItem class="w-27" value="swim" aria-label="Toggle swim">
                <Waves />
            </ToggleGroupItem>
        </ToggleGroup>
    </div>
</template>

<script setup lang="ts">
import { Footprints, Bike, Waves } from "lucide-vue-next";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ref } from "vue";

type Activity = "run" | "bike" | "swim";

const activity = ref<Activity>("run");
const previousActivity = ref<Activity>(activity.value);

function preventNoSelection(newActivity: Activity) {
    if (newActivity === undefined) {
        activity.value = previousActivity.value;
    } else {
        previousActivity.value = activity.value;
    }
}
</script>
