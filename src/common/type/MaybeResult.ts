import { Result } from "reliq";

export type MaybeResult<T, E> = Result<T, E> | T;