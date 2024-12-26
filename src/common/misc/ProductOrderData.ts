import { ProductData } from "@common";
import { UnsafeProductDataSchema } from "@common";
import { Ok } from "reliq";
import { Err } from "reliq";
import { z as ZodValidator } from "zod";

export const UnsafeProductOrderDataSchema =
    ZodValidator.object({
        product: UnsafeProductDataSchema,
        amount: ZodValidator.number().min(1).int()
    });
export type ProductOrderDataR = ProductOrderDataT | ProductOrderDataE;
export type ProductOrderDataT = Ok<ProductOrderData>;
export type ProductOrderDataE =
    | Err<"AMOUNT_BELOW_ZERO">
    | Err<"AMOUNT_ABOVE_MAX_SAFE_INTEGER">
    | Err<"AMOUNT_NOT_AN_INTEGER">
    | Err<"SCHEMA_FAILED">;
export type ProductOrderData = {
    product: ProductData;
    amount: number;
};
export function ProductOrderData(_self: ProductOrderData): ProductOrderDataR {
    /** @constructor */ {
        if (_self.amount < 0) return Err("AMOUNT_BELOW_ZERO");
        if (_self.amount > Number.MAX_SAFE_INTEGER) return Err("AMOUNT_ABOVE_MAX_SAFE_INTEGER");
        if (Number.isSafeInteger(_self.amount) === false) return Err("AMOUNT_NOT_AN_INTEGER");
        let match = UnsafeProductOrderDataSchema.safeParse(_self).success;
        if (match === false) return Err("SCHEMA_FAILED");
        return Ok(_self);
    }
}