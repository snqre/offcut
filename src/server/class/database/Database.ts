import { Ok } from "reliq";
import { Err } from "reliq";

export type Database = {
    get(key: string):
        Promise<
            | Ok<unknown>
            | Err<[unknown]>
        >;

    set(key: string, data: unknown):
        Promise<
            | Ok<void>
            | Err<[unknown]>
        >;
};