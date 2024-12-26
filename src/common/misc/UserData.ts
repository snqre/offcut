import { default as Validator } from "validator";
import { z as ZodValidator } from "zod";
import { Ok } from "reliq";
import { Err } from "reliq";

export const UnsafeUserDataSchema =
    ZodValidator.object({
        username: ZodValidator.string().min(1),
        hash: ZodValidator.string().min(1),
        email: ZodValidator.string().optional().refine(x => x ? Validator.isEmail(x) : true),
        phoneNumber: ZodValidator.string().optional().refine(x => x ? Validator.isMobilePhone(x) : true),
        address: ZodValidator.string().optional().refine(x => x ? x.trim().length > 0 : true)
    });
export type UserDataR = UserDataT | UserDataE;
export type UserDataT = Ok<UserData>;
export type UserDataE =
    | Err<"INVALID_USERNAME">
    | Err<"INVALID_HASH">
    | Err<"INVALID_EMAIL">
    | Err<"INVALID_PHONE_NUMBER">
    | Err<"INVALID_ADDRESS">
    | Err<"SCHEMA_FAILED">;
export type UserData = {
    username: string;
    hash: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
};
export function UserData(_self: UserData): UserDataR {
    /** @constructor */ {
        if (_self.username.length === 0) return Err("INVALID_USERNAME");
        if (_self.hash.length === 0) return Err("INVALID_HASH");
        if (_self.email && Validator.isEmail(_self.email) === false) return Err("INVALID_EMAIL");
        if (_self.phoneNumber && Validator.isMobilePhone(_self.phoneNumber)) return Err("INVALID_PHONE_NUMBER");
        if (_self.address && _self.address.length === 0) return Err("INVALID_ADDRESS");
        let match = UnsafeUserDataSchema.safeParse(_self).success;
        if (match === false) return Err("SCHEMA_FAILED");
        return Ok(_self);
    }
}