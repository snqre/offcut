import { Ok } from "reliq";
import { Err } from "reliq";
import { ProductDto } from "@common";
import { z as ZodValidator } from "zod";

export type ProductOrderDto = {
    product: ProductDto;
    amount: number;
};
export function ProductOrderDto(_product: ProductDto, _amount: number):
    | Ok<ProductOrderDto>
    | Err<"INVALID_AMOUNT"> {
    
    /** @constructor */ {
        if (_amount < 0) return Err("INVALID_AMOUNT");
        if (_amount > Number.MAX_SAFE_INTEGER) return Err("INVALID_AMOUNT");
        if (!Number.isInteger(_amount)) return Err("INVALID_AMOUNT");
        return Ok({ product: _product, amount: _amount });
    }
}
export namespace ProductOrderDto {
    export const Schema = ProductDto.Schema.and(ZodValidator.object({
        amount: ZodValidator.number()
    }));
}