import { Ok } from "reliq";
import { Err } from "reliq";
import { z as ZodValidator } from "zod";

export type ProductDto = {
    name: string;
    price: number;
    stock: number;
};
export function ProductDto(_instance: ProductDto):
    | Ok<ProductDto>
    | Err<"INVALID_NAME">
    | Err<"INVALID_INSTANCE">
    | Err<"PRICE_BELOW_ZERO">
    | Err<"PRICE_ABOVE_MAX_SAFE_INTEGER">
    | Err<"STOCK_BELOW_ZERO">
    | Err<"STOCK_ABOVE_MAX_SAFE_INTEGER">
    | Err<"STOCK_NOT_AN_INTEGER"> {
    
    /** @constructor */ {
        if (_instance.name.length === 0) return Err("INVALID_NAME");
        if (_instance.price < 0) return Err("PRICE_BELOW_ZERO");
        if (_instance.price > Number.MAX_SAFE_INTEGER) return Err("PRICE_ABOVE_MAX_SAFE_INTEGER");
        if (_instance.stock < 0) return Err("STOCK_BELOW_ZERO");
        if (_instance.stock > Number.MAX_SAFE_INTEGER) return Err("STOCK_ABOVE_MAX_SAFE_INTEGER");
        if (!Number.isSafeInteger(_instance.stock)) return Err("STOCK_NOT_AN_INTEGER");
        if (!ProductDto.Schema.safeParse(_instance).success) return Err("INVALID_INSTANCE"); 
        return Ok(_instance);
    }
}
export namespace ProductDto {
    export const Schema = 
        ZodValidator.object({
            name: ZodValidator.string().min(1).refine(x => x.trim().length > 0),
            price: ZodValidator.number().min(0).finite(),
            stock: ZodValidator.number().min(0).finite().int()
        });
}