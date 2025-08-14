import { expect, test, describe, beforeEach, vi } from "vitest";
import { POP_LOG_DEBUG } from "@/logging/logger";
import type { EnvMode } from "@/logging/types";

describe("logging/logger", () => {
    const ANY_DATA = {
        hello: "world",
    };

    beforeEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllEnvs();
    });

    test("whenUsingLoggingInProduction_thenShouldNotLogToConsole", () => {
        const envMode: EnvMode = "production";
        vi.stubEnv("MODE", envMode);

        const consoleSpy = vi.spyOn(console, "log");
        POP_LOG_DEBUG(ANY_DATA);

        expect(consoleSpy).not.toHaveBeenCalled();
    });

    test("whenUsingLoggingInDevelopment_thenShouldLogToConsole", () => {
        const envMode: EnvMode = "development";
        vi.stubEnv("MODE", envMode);

        const consoleSpy = vi.spyOn(console, "log");
        POP_LOG_DEBUG(ANY_DATA);

        expect(consoleSpy).toHaveBeenCalledWith(ANY_DATA);
    });

    test("whenUsingLoggingInUnexpectedMode_thenShouldNotLogToConsole", () => {
        const envMode: any = "unexpected_env_mode";
        vi.stubEnv("MODE", envMode);

        const consoleSpy = vi.spyOn(console, "log");
        POP_LOG_DEBUG(ANY_DATA);

        expect(consoleSpy).not.toHaveBeenCalled();
    });
});
