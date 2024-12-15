import type { MaybeAsync } from "@common";
import type { MaybeResult } from "@common";

export type MaybeAsyncMaybeResult<T, E> = MaybeAsync<MaybeResult<T, E>>;