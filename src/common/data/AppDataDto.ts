import { Ok } from "reliq";
import { Err } from "reliq";
import { ProductDto } from "@common";
import { UserDto } from "@common";
import { z as ZodValidator } from "zod";

export type AppDataDto = {
    users: Array<UserDto>;
    products: Array<ProductDto>;
};
export function AppDataDto(_instance: AppDataDto): Ok<AppDataDto> | Err<"INVALID_INSTANCE"> {
    
    /** @constructor */ {
        if (!AppDataDto.Schema.safeParse(_instance).success) return Err("INVALID_INSTANCE");
        return Ok(_instance);
    }
}
export namespace AppDataDto {
    export const Schema =
        ZodValidator.object({
            users: ZodValidator.array(UserDto.Schema),
            products: ZodValidator.array(ProductDto.Schema)
        });
}