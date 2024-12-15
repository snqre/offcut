import type { MaybeResult } from "@common";

export type AsyncMaybeResult<T, E> = Promise<MaybeResult<T, E>>;