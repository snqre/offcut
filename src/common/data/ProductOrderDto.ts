import { Ok } from "reliq";
import { Err } from "reliq";
import { ProductDto } from "@common";
import { ProductDtoSchema } from "@common";

export type ProductOrderDto = {
    product: ProductDto;
    amount: number;
};
export function ProductOrderDto(_instance: ProductOrderDto):
    | Ok<ProductOrderDto>
    | Err<"AMOUNT_BELOW_ZERO">
    | Err<"AMOUNT_ABOVE_MAX_SAFE_INTEGER">
    | Err<"AMOUNT_NOT_AN_INTEGER">
    | Err<"INVALID_INSTANCE"> {
    
    /** @constructor */ {
        if (_instance.amount < 0) return Err("AMOUNT_BELOW_ZERO");
        if (_instance.amount > Number.MAX_SAFE_INTEGER) return Err("AMOUNT_ABOVE_MAX_SAFE_INTEGER");
        if (!Number.isInteger(_instance.amount)) return Err("AMOUNT_NOT_AN_INTEGER");
        if (!ProductDtoSchema.safeParse(_instance).success) return Err("INVALID_INSTANCE");
        return Ok(_instance);
    }
}