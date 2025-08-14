import type { EnvMode } from "@/logging/types";

export function POP_LOG_DEBUG(data: any) {
    const CURRENT_ENV = import.meta.env.MODE as EnvMode;

    switch (CURRENT_ENV) {
        case "development":
            console.log(data);
            break;
        default:
            break;
    }
}
