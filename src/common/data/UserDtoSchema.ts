import { default as Validator } from "validator";
import { z as ZodValidator } from "zod";

export const UserDtoSchema = ZodValidator.object({
    username: ZodValidator.string().min(1),
    hash: ZodValidator.string().min(1),
    email: ZodValidator.string().optional().refine(x => x ? Validator.isEmail(x) : true),
    phoneNumber: ZodValidator.string().optional().refine(x => x ? Validator.isMobilePhone(x) : true),
    address: ZodValidator.string().optional().refine(x => x ? x.trim().length > 0 : true)
});