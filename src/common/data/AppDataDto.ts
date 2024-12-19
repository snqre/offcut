import { Ok } from "reliq";
import { Err } from "reliq";
import { UserDto } from "@common";
import { ProductDto } from "@common";
import { AppDataDtoSchema } from "@common";

export type AppDataDto = {
    users: Array<UserDto>;
    products: Array<ProductDto>;
};
export function AppDataDto(_instance: AppDataDto): 
    | Ok<AppDataDto> 
    | Err<"INVALID_INSTANCE"> {
    
    /** @constructor */ {
        if (!AppDataDtoSchema.safeParse(_instance).success) return Err("INVALID_INSTANCE");
        return Ok(_instance);
    }
}