import { Ok } from "reliq";
import { Err } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";

export type Database = {
    get(key: string):
        Promise<
            | Ok<Some<string>>
            | Ok<None>
            | Err<[unknown]>
        >;

    set(key: string, data: string):
        Promise<
            | Ok<void>
            | Err<[unknown]>
        >;
};