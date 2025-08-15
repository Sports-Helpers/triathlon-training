<template>
    <div class="px-6 py-6">
        <h1 class="text-4xl text-center">
            Brique par brique, continue.
        </h1>

        <ToggleGroup
            v-model="activity"
            @update:model-value="(newActivity) => preventNoSelection(newActivity as Activity)"
            type="single"
            class="mx-auto mt-4"
            size="lg"
        >
            <ToggleGroupItem class="w-27" value="run" aria-label="Toggle running">
                <Footprints :color="colorSelector('run')" />
            </ToggleGroupItem>

            <ToggleGroupItem class="w-27" value="bike" aria-label="Toggle bike">
                <Bike :color="colorSelector('bike')" />
            </ToggleGroupItem>

            <ToggleGroupItem class="w-27" value="swim" aria-label="Toggle swim">
                <Waves :color="colorSelector('swim')" />
            </ToggleGroupItem>
        </ToggleGroup>

        <div>
            <RunTab v-if="activity === 'run'"/>
            <BikeTab v-else-if="activity === 'bike'"/>
            <SwimTab v-else="activity === 'swim'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Footprints, Bike, Waves } from "lucide-vue-next";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import BikeTab from "@/components/sports_tabs/bike/BikeTab.vue";
import RunTab from "@/components/sports_tabs/run/RunTab.vue";
import SwimTab from "@/components/sports_tabs/swim/SwimTab.vue";
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

function colorSelector(buttonActivity: Activity) {
    return buttonActivity == activity.value ? "#db143a" : ""; 
}
</script>
