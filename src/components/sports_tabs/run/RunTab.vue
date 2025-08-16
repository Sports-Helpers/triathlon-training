<template>
    <div class="w-full max-w-2xl mx-auto space-y-6 mt-6">
        <div class="text-center font-bold">Convertisseur de vitesse et pace de course.</div>

        <Card class="p-6 shadow-card transition-smooth hover:shadow-elegant">
            <div class="space-y-4">
                <div class="flex items-center gap-2 mb-4">
                    <Button
                        @click="updateMode('pace')"
                        :variant="mode === 'pace' ? 'default' : 'outline'"
                        class="gap-2"
                    >
                        <ClockIcon class="w-4 h-4" />
                        Pace
                    </Button>
                    <Button
                        @click="updateMode('speed')"
                        :variant="mode === 'speed' ? 'default' : 'outline'"
                        class="gap-2"
                    >
                        <BoltIcon class="w-4 h-4" />
                        Vitesse
                    </Button>

                    <Button
                        @click="updateUnitType(unitType === 'imperial' ? 'metric' : 'imperial')"
                        variant="ghost"
                        size="sm"
                        class="gap-2 h-8 ml-auto"
                    >
                        <ArrowsRightLeftIcon class="w-3 h-3" />
                        {{ unitType === "metric" ? "Km" : "Miles" }}
                    </Button>
                </div>

                <div class="relative">
                    <div v-if="mode === 'speed'">
                        <Input
                            v-model="speedInput"
                            :placeholder="unitType === 'metric' ? 'Vitesse (km/h)' : 'Vitesse (mph)'"
                            type="number"
                            class="text-lg h-12"
                        />
                    </div>

                    <div v-else class="flex gap-2 items-center">
                        <Input
                            v-model="paceInput.minutes"
                            placeholder="Minutes"
                            type="number"
                            class="text-lg h-12 flex-1"
                        />:
                        <Input
                            v-model="paceInput.seconds"
                            placeholder="Secondes"
                            type="number"
                            class="text-lg h-12 flex-1"
                        />
                    </div>
                </div>
            </div>
        </Card>

        <div v-if="inputResults">
            <Card
                class="p-4 shadow-card bg-gradient-accent text-accent-foreground grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div>
                    <div class="flex items-center gap-2 mb-3">
                        <ClockIcon class="w-5 h-5" />
                        <h3 class="font-semibold">Pace</h3>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="font-mono font-bold"> {{ inputResults.metric.pace }}/km</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-mono font-bold">{{ inputResults.imperial.pace }}/mile</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="flex items-center gap-2 mb-3">
                        <BoltIcon class="w-5 h-5" />
                        <h3 class="font-semibold">Vitesse</h3>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="font-mono font-bold"> {{ inputResults.metric.speed }} km/h </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-mono font-bold"> {{ inputResults.imperial.speed }} mph </span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ref, computed } from "vue";
import { BoltIcon, ArrowsRightLeftIcon, ClockIcon } from "@heroicons/vue/24/outline";

const MILES_TO_KM_RATIO: number = 1.6;
const MIN_IN_HOUR: number = 60;
const SEC_IN_MIN: number = 60;

type Mode = "speed" | "pace";
type UnitType = "metric" | "imperial";
type InputResults = {
    metric: {
        speed: string;
        pace: string;
    };
    imperial: {
        speed: string;
        pace: string;
    };
};
type MinSecPace = {
    minutes: number | undefined;
    seconds: number | undefined;
};

const mode = ref<Mode>("pace");
const unitType = ref<UnitType>("metric");

const speedInput = ref<number | undefined>();
const paceInput = ref<MinSecPace>({
    minutes: 5,
    seconds: 0,
});

function calculateMinSecPace(decimalPace: number) {
    const minutes = Math.floor(decimalPace);
    const seconds = Math.round((decimalPace - minutes) * 60);

    return {
        minutes: minutes,
        seconds: seconds,
    };
}

function calculateDecimalPace(minSecPace: MinSecPace): number | undefined {
    if (minSecPace.minutes === undefined || minSecPace.seconds === undefined) {
        return undefined;
    }

    return minSecPace.minutes + minSecPace.seconds / SEC_IN_MIN;
}

function convertDecimalPaceToString(decimalPace: number): string {
    const minSecPace = calculateMinSecPace(decimalPace);
    return `${minSecPace.minutes}:${minSecPace.seconds.toString().padStart(2, "0")}`;
}

function updateMode(newMode: Mode) {
    mode.value = newMode;

    if (newMode === "pace") {
        if (speedInput.value !== undefined) {
            paceInput.value = calculateMinSecPace(applyModeTransformation(speedInput.value, "speed"));
        }

        speedInput.value = undefined;
    } else {
        if (paceInput.value.minutes !== undefined && paceInput.value.seconds !== undefined) {
            speedInput.value = applyModeTransformation(calculateDecimalPace(paceInput.value)!, "pace");
        }

        paceInput.value.minutes = undefined;
        paceInput.value.seconds = 0;
    }
}

function updateUnitType(newUnitType: UnitType) {
    if (mode.value === "pace") {
        const decimalPace = calculateDecimalPace(paceInput.value);
        if (decimalPace !== undefined) {
            paceInput.value = calculateMinSecPace(paceUnitTransformation(decimalPace, newUnitType));
        }
    } else {
        if (speedInput.value !== undefined) {
            speedInput.value = speedUnitTransformation(speedInput.value, newUnitType);
        }
    }

    unitType.value = newUnitType;
}

function speedUnitTransformation(value: number, wantedUnitType: UnitType) {
    // To ensure floating numbers
    value = Number(value);

    if (unitType.value === wantedUnitType) {
        return value;
    }

    if (wantedUnitType === "metric") {
        return value * MILES_TO_KM_RATIO;
    } else {
        return value / MILES_TO_KM_RATIO;
    }
}

function paceUnitTransformation(value: number, wantedUnitType: UnitType) {
    // To ensure floating numbers
    value = Number(value);

    if (unitType.value === wantedUnitType) {
        return value;
    }

    if (wantedUnitType === "metric") {
        return value / MILES_TO_KM_RATIO;
    } else {
        return value * MILES_TO_KM_RATIO;
    }
}

function applyModeTransformation(value: number, valueMode: Mode): number {
    if (mode.value === valueMode) {
        return value;
    }

    // Convert from pace to speed or speed to pace: same thing
    return MIN_IN_HOUR / value;
}

const inputResults = computed(() => {
    // One of the two should be undefined, since values are reset on updateMode(...)
    const speedValue: number | undefined = speedInput.value;
    const paceValue: number | undefined = calculateDecimalPace(paceInput.value);

    // No value given in input
    if (mode.value === "speed" && speedValue === undefined) {
        return undefined;
    } else if (mode.value === "pace" && paceValue === undefined) {
        return undefined;
    }

    if (speedValue === undefined && paceValue === undefined) {
        throw new Error("speedValue or paceValue should be defined.");
    }

    const usedValue: number = speedValue === undefined ? paceValue! : speedValue;
    const speedInCurrentUnit = applyModeTransformation(usedValue, "speed");
    const paceInCurrentUnit = applyModeTransformation(usedValue, "pace");

    return {
        metric: {
            speed: speedUnitTransformation(speedInCurrentUnit, "metric").toFixed(1),
            pace: convertDecimalPaceToString(paceUnitTransformation(paceInCurrentUnit, "metric")),
        },
        imperial: {
            speed: speedUnitTransformation(speedInCurrentUnit, "imperial").toFixed(1),
            pace: convertDecimalPaceToString(paceUnitTransformation(paceInCurrentUnit, "imperial")),
        },
    } as InputResults;
});
</script>
