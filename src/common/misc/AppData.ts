import { UserData } from "@common";
import { ProductData } from "@common";
import { z as ZodValidator } from "zod";
import { Ok } from "reliq";
import { Err } from "reliq";
import { UnsafeUserDataSchema } from "@common";
import { UnsafeProductDataSchema } from "@common";

export const UnsafeAppDataSchema = ZodValidator.object({
    users: ZodValidator.array(UnsafeUserDataSchema),
    products: ZodValidator.array(UnsafeProductDataSchema)
});
export type AppDataR = AppDataT | AppDataE;
export type AppDataT = Ok<AppData>;
export type AppDataE = Err<"ERR_SCHEMA_FAILED">;
export type AppData = {
    users: Array<UserData>;
    products: Array<ProductData>;
};
export function AppData(_self: AppData): AppDataR {
    /** @constructor */ {
        let match = UnsafeAppDataSchema.safeParse(_self).success;
        if (match === false) return Err("ERR_SCHEMA_FAILED");
        return Ok(_self);
    }
}