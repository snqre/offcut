import { default as Validator } from "validator";
import { Ok } from "reliq";
import { Err } from "reliq";
import { z as ZodValidator } from "zod";

let _schema =
    ZodValidator.object({
        username:
            ZodValidator
                .string()
                .min(1)
                .refine(v => v ? v.trim().length > 0 : true),
        hash:
            ZodValidator
                .string()
                .min(1)
                .refine(v => v ? v.trim().length > 0 : true),
        email:
            ZodValidator
                .string()
                .optional()
                .refine(v => v ? Validator.isEmail(v) : true),
        phoneNumber:
            ZodValidator
                .string()
                .optional()
                .refine(v => v ? Validator.isMobilePhone(v) : true),
        address:
            ZodValidator
                .string()
                .optional()
                .refine(v => v ? v.trim().length > 0 : true)
    });

export type UserData<T extends string> = {
    username: T;
    hash: string;

    email:
        | string
        | void;

    phoneNumber:
        | string
        | void;

    address:
        | string
        | void;
};
export function UserData<T extends string>(_instance: UserData<T>):
    | Ok<UserData<T>>
    | Err<"INVALID_USERNAME">
    | Err<"INVALID_HASH">
    | Err<"INVALID_EMAIL">
    | Err<"INVALID_PHONE_NUMBER">
    | Err<"INVALID_ADDRESS">
    | Err<"INVALID_INSTANCE"> {

    /** @constructor */ {

        /***/ {
            if (_instance.username.length === 0) return Err("INVALID_USERNAME");
            if (_instance.hash.length === 0) return Err("INVALID_HASH");
            if (_instance.email && !Validator.isEmail(_instance.email)) return Err("INVALID_EMAIL");
            if (_instance.phoneNumber && !Validator.isMobilePhone(_instance.phoneNumber)) return Err("INVALID_PHONE_NUMBER");
            if (_instance.address && _instance.address.length === 0) return Err("INVALID_ADDRESS");
        }

        /***/ {
            if (!isUserData(_instance, _instance.username)) return Err("INVALID_INSTANCE");
        }

        return Ok(_instance);
    }
}

export function isUserData<T extends string>(unknown: unknown, username: T): unknown is UserData<T> {

    /***/ {
        let match: boolean = _schema.safeParse(unknown).success && (unknown as UserData<"">).username === username;
        if (match) return true;
    }
    
    return false;
}