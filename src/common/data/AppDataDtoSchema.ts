import { UserDtoSchema } from "@common";
import { ProductDtoSchema } from "@common";
import { z as ZodValidator } from "zod";

export const AppDataDtoSchema = ZodValidator.object({
    users: ZodValidator.array(UserDtoSchema),
    products: ZodValidator.array(ProductDtoSchema)
});