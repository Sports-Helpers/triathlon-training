<template>
    <!-- <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-2 justify-center">
        <Button
          variant={mode === "speed" ? "default" : "outline"}
          onClick={() => setMode("speed")}
          className="gap-2"
        >
          <Zap className="w-4 h-4" />
          Speed
        </Button>
        <Button
          variant={mode === "pace" ? "default" : "outline"}
          onClick={() => setMode("pace")}
          className="gap-2"
        >
          <Timer className="w-4 h-4" />
          Pace
        </Button>
      </div>

      {/* Input Card */}
      <Card className="p-6 shadow-card transition-smooth hover:shadow-elegant">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-sm">
              {mode === "speed" ? "Speed Input" : "Pace Input"}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
              className="gap-2 h-8"
            >
              <ArrowRightLeft className="w-3 h-3" />
              {unit === "metric" ? "Metric" : "Imperial"}
            </Button>
          </div>
          
          <div className="relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                mode === "speed"
                  ? unit === "metric"
                    ? "Enter speed (km/h)"
                    : "Enter speed (mph)"
                  : unit === "metric"
                  ? "Enter pace (mm:ss per km)"
                  : "Enter pace (mm:ss per mile)"
              }
              className="text-lg h-12"
            />
            {inputValue && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearInput}
                className="absolute right-2 top-2 h-8 w-8 p-0"
              >
                ×
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Results Cards */}
      {(result.speedKmh !== null || result.speedMph !== null) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Speed Results */}
          <Card className="p-4 shadow-card bg-gradient-primary text-primary-foreground">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5" />
              <h3 className="font-semibold">Speed</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Km/h:</span>
                <span className="font-mono font-bold">
                  {result.speedKmh?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Mph:</span>
                <span className="font-mono font-bold">
                  {result.speedMph?.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>

          {/* Pace Results */}
          <Card className="p-4 shadow-card bg-gradient-accent text-accent-foreground">
            <div className="flex items-center gap-2 mb-3">
              <Timer className="w-5 h-5" />
              <h3 className="font-semibold">Pace</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Min/km:</span>
                <span className="font-mono font-bold">{result.paceMinKm}</span>
              </div>
              <div className="flex justify-between">
                <span>Min/mile:</span>
                <span className="font-mono font-bold">{result.paceMinMi}</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div> -->
</template>

<script setup lang="ts">
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { ref } from 'vue';

// type Mode = "speed" | "pace";
// type UnitType = "metric" | "imperial";

// const mode = ref<Mode>("speed");
// const unitType = ref<UnitType>("imperial");
// const inputValue = ref<number | undefined>();
</script>
