import { z as ZodValidator } from "zod";

export const ProductDtoSchema = ZodValidator.object({
    name: ZodValidator.string().min(1).refine(name => name.trim().length > 0),
    price: ZodValidator.number().min(0).finite(),
    stock: ZodValidator.number().min(0).finite().int()
});