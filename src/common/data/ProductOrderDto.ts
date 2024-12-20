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
    | Err<"INVALID_AMOUNT">
    | Err<"INVALID_INSTANCE"> {
    
    /** @constructor */ {
        if (_instance.amount < 0) return Err("INVALID_AMOUNT");
        if (_instance.amount > Number.MAX_SAFE_INTEGER) return Err("INVALID_AMOUNT");
        if (!Number.isInteger(_instance.amount)) return Err("INVALID_AMOUNT");
        if (!ProductDtoSchema.safeParse(_instance).success) return Err("INVALID_INSTANCE");
        return Ok(_instance);
    }
}