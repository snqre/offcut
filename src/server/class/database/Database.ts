import type { MaybeAsyncMaybeResult } from "@common";

export type Database = {
    get(key: string): MaybeAsyncMaybeResult<unknown, [unknown]>;
    set(key: string, data: unknown): MaybeAsyncMaybeResult<void, [unknown]>;
};