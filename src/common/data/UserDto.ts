import { default as Validator } from "validator";
import { Ok } from "reliq";
import { Err } from "reliq";
import { UserDtoSchema } from "@common";

export type UserDto = {
    username: string;
    hash: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
};
export function UserDto(_instance: UserDto):
    | Ok<UserDto>
    | Err<"INVALID_USERNAME">
    | Err<"INVALID_HASH">
    | Err<"INVALID_EMAIL">
    | Err<"INVALID_PHONE_NUMBER">
    | Err<"INVALID_ADDRESS">
    | Err<"INVALID_INSTANCE"> {

    /** @constructor */ {
        if (_instance.username.length === 0) return Err("INVALID_USERNAME");
        if (_instance.hash.length === 0) return Err("INVALID_HASH");
        if (_instance.email && !Validator.isEmail(_instance.email)) return Err("INVALID_EMAIL");
        if (_instance.phoneNumber && !Validator.isMobilePhone(_instance.phoneNumber)) return Err("INVALID_PHONE_NUMBER");
        if (_instance.address && _instance.address.length === 0) return Err("INVALID_ADDRESS");
        if (!UserDtoSchema.safeParse(_instance).success) return Err("INVALID_INSTANCE");
        return Ok(_instance);
    }
}