import { z as ZodValidator } from "zod";
import { Ok } from "reliq";
import { Err } from "reliq";

export const UnsafeProductDataSchema =
    ZodValidator.object({
        name: ZodValidator.string().min(1).refine(name => name.trim().length > 0),
        price: ZodValidator.number().min(0).finite(),
        stock: ZodValidator.number().min(0).finite().int()
    });
export type ProductDataR = ProductDataT | ProductDataE;
export type ProductDataT = Ok<ProductData>;
export type ProductDataE =
    | Err<"INVALID_NAME">
    | Err<"PRICE_BELOW_ZERO">
    | Err<"PRICE_ABOVE_MAX_SAFE_INTEGER">
    | Err<"STOCK_BELOW_ZERO">
    | Err<"STOCK_ABOVE_MAX_SAFE_INTEGER">
    | Err<"STOCK_NOT_AN_INTEGER">
    | Err<"SCHEMA_FAILED">;
export type ProductData = {
    name: string;
    price: number;
    stock: number;
};
export function ProductData(_self: ProductData): ProductDataR {
    /** @constructor */ {
        if (_self.name.length === 0) return Err("INVALID_NAME");
        if (_self.price < 0) return Err("PRICE_BELOW_ZERO");
        if (_self.price > Number.MAX_SAFE_INTEGER) return Err("PRICE_ABOVE_MAX_SAFE_INTEGER");
        if (_self.stock < 0) return Err("STOCK_BELOW_ZERO");
        if (_self.stock > Number.MAX_SAFE_INTEGER) return Err("STOCK_ABOVE_MAX_SAFE_INTEGER");
        if (Number.isSafeInteger(_self.stock) === false) return Err("STOCK_NOT_AN_INTEGER");
        let match = UnsafeProductDataSchema.safeParse(_self).success;
        if (match === false) return Err("SCHEMA_FAILED");
        return Ok(_self);
    }
}