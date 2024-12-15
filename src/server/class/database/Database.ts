import type { MaybeAsyncMaybeResult } from "@common";

export type Database<T extends object> = {
    get(key: string): MaybeAsyncMaybeResult<T, [unknown]>;
    set(key: string, data: T): MaybeAsyncMaybeResult<void, [unknown]>;
};