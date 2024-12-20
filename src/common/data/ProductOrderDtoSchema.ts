import { z as ZodValidator } from "zod";
import { ProductDtoSchema } from "@common";

export const ProductOrderDtoSchema = ZodValidator.object({
    product: ProductDtoSchema,
    amount: ZodValidator.number().min(1).int()
});